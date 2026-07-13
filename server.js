const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const { initializeDatabase, isDbConnected, getDefaultData } = db;

const app = express();
const PORT = process.env.PORT || 8000;
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static website files from current folder
app.use(express.static(__dirname));
// Serve uploaded images
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${Date.now()}_${basename}${ext}`);
  }
});
const upload = multer({ storage: storage });

// API Endpoints

// Get all site data from database (or fallback to JSON)
app.get('/api/data', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (!isDbConnected()) {
    console.log('Database not connected. Serving from local fallback data.json...');
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return res.json(JSON.parse(raw));
      } catch (err) {
        console.error('Failed to parse fallback data.json:', err);
      }
    }
    return res.json(getDefaultData());
  }

  try {
    const [settingsRows] = await db.pool.query('SELECT key_name, value_data FROM settings');
    const [productRows] = await db.pool.query('SELECT * FROM products');
    const [brandRows] = await db.pool.query('SELECT * FROM brands');
    const [projectRows] = await db.pool.query('SELECT * FROM projects');
    const [blogRows] = await db.pool.query('SELECT * FROM blog_posts');
    const [orderRows] = await db.pool.query('SELECT * FROM orders');

    const data = {};

    // Settings & general sections
    for (const row of settingsRows) {
      try {
        data[row.key_name] = JSON.parse(row.value_data);
      } catch (err) {
        console.error(`Error parsing setting key ${row.key_name}:`, err);
      }
    }

    // Map database fields to site-data structure
    data.products = productRows.map(p => ({
      id: p.id,
      name: p.name,
      nameEn: p.nameEn,
      brand: p.brand,
      brandEn: p.brandEn,
      price: Number(p.price),
      originalPrice: Number(p.originalPrice),
      isOffer: Boolean(p.isOffer),
      stockTotal: p.stockTotal,
      stockSold: p.stockSold,
      category: p.category,
      image: p.image,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
      description: p.description,
      descriptionEn: p.descriptionEn,
      featured: Boolean(p.featured),
      showPrice: Boolean(p.showPrice),
      specifications: typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || []),
      techFiles: typeof p.techFiles === 'string' ? JSON.parse(p.techFiles) : (p.techFiles || []),
      salesMode: p.salesMode || 'both'
    }));

    data.brands = brandRows.map(b => ({
      id: b.id,
      name: b.name,
      nameEn: b.nameEn,
      logo: b.logo,
      description: b.description,
      country: b.country
    }));

    data.projects = projectRows.map(p => ({
      id: p.id,
      name: p.name,
      nameEn: p.nameEn,
      description: p.description,
      descriptionEn: p.descriptionEn,
      image: p.image,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
      status: p.status,
      statusEn: p.statusEn,
      category: p.category,
      categoryEn: p.categoryEn,
      owner: p.owner,
      ownerEn: p.ownerEn,
      location: p.location,
      locationEn: p.locationEn,
      duration: p.duration,
      durationEn: p.durationEn,
      value: p.value,
      valueEn: p.valueEn,
      techFiles: typeof p.techFiles === 'string' ? JSON.parse(p.techFiles) : p.techFiles
    }));

    data.blogPosts = blogRows.map(p => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      image: p.image,
      date: p.date,
      category: p.category,
      content: p.content
    }));

    data.orders = orderRows.map(o => ({
      id: o.id,
      date: o.date,
      product: o.product,
      total: Number(o.total),
      status: o.status,
      customer: o.customer
    }));

    // Inject username and password from users table into settings.username/password for UI compatibility
    const [userRows] = await db.pool.query('SELECT username, password FROM users LIMIT 1');
    if (userRows.length > 0) {
      if (!data.settings) data.settings = {};
      data.settings.username = userRows[0].username;
      data.settings.password = userRows[0].password;
    }

    res.json(data);
  } catch (err) {
    console.error('Failed to read data from database:', err);
    res.status(500).json({ success: false, message: 'Database read error' });
  }
});

// Update site data in database (or fallback to JSON)
app.post('/api/data', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: 'Empty request body' });
  }

  if (!isDbConnected()) {
    console.log('Database not connected. Saving to local fallback data.json...');
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2), 'utf8');
      return res.json({ success: true, message: 'Data saved successfully in fallback JSON' });
    } catch (err) {
      console.error('Failed to save to local fallback data.json:', err);
      return res.status(500).json({ success: false, message: 'Failed to write fallback data' });
    }
  }

  const { settings, banners, homepage, about, categories, sectors, faqs, messages, products, brands, projects, blogPosts, orders } = req.body;
  const connection = await db.pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Settings & general sections updates
    const sections = { settings, banners, homepage, about, categories, sectors, faqs, messages };
    
    // Extract credentials from settings if they exist
    let dbUsername = '';
    let dbPassword = '';
    if (settings) {
      const settingsToSave = { ...settings };
      dbUsername = settingsToSave.username;
      dbPassword = settingsToSave.password;
      delete settingsToSave.username;
      delete settingsToSave.password;
      sections.settings = settingsToSave;

      // Sync logo file immediately to avoid flickering
      if (settings.logoUrl && settings.logoUrl.startsWith('/uploads/')) {
        const logoPath = path.join(__dirname, settings.logoUrl);
        const targetPath = path.join(__dirname, 'images', 'logo.png');
        if (fs.existsSync(logoPath)) {
          try {
            fs.copyFileSync(logoPath, targetPath);
            console.log('Successfully synchronized images/logo.png with uploaded logo:', settings.logoUrl);
          } catch (err) {
            console.error('Failed to sync logo file:', err);
          }
        }
      }
    }

    for (const key of Object.keys(sections)) {
      if (sections[key] !== undefined) {
        await connection.query(
          'INSERT INTO settings (key_name, value_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_data = ?',
          [key, JSON.stringify(sections[key]), JSON.stringify(sections[key])]
        );
      }
    }

    // Update users table admin credentials if provided
    if (dbUsername && dbPassword) {
      const [allUsers] = await connection.query('SELECT id FROM users LIMIT 1');
      if (allUsers.length > 0) {
        await connection.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [
          dbUsername,
          dbPassword,
          allUsers[0].id
        ]);
      } else {
        await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [
          dbUsername,
          dbPassword
        ]);
      }
    }

    // 2. Sync Products
    if (products && Array.isArray(products)) {
      for (const p of products) {
        await connection.query(
          `INSERT INTO products (id, name, nameEn, brand, brandEn, price, originalPrice, isOffer, stockTotal, stockSold, category, image, images, description, descriptionEn, featured, showPrice, specifications, techFiles, salesMode) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           name = VALUES(name), nameEn = VALUES(nameEn), brand = VALUES(brand), brandEn = VALUES(brandEn),
           price = VALUES(price), originalPrice = VALUES(originalPrice), isOffer = VALUES(isOffer),
           stockTotal = VALUES(stockTotal), stockSold = VALUES(stockSold), category = VALUES(category),
           image = VALUES(image), images = VALUES(images), description = VALUES(description),
           descriptionEn = VALUES(descriptionEn), featured = VALUES(featured), showPrice = VALUES(showPrice),
           specifications = VALUES(specifications), techFiles = VALUES(techFiles), salesMode = VALUES(salesMode)`,
          [
            p.id, p.name, p.nameEn || '', p.brand || '', p.brandEn || '', p.price, p.originalPrice || p.price,
            p.isOffer ? 1 : 0, p.stockTotal || 100, p.stockSold || 0, p.category || '', p.image || '',
            JSON.stringify(p.images || [p.image || '', '', '', '']), p.description || '', p.descriptionEn || '',
            p.featured ? 1 : 0, p.showPrice !== false ? 1 : 0,
            JSON.stringify(p.specifications || []), JSON.stringify(p.techFiles || []), p.salesMode || 'both'
          ]
        );
      }
      const productIds = products.map(p => p.id);
      if (productIds.length > 0) {
        await connection.query('DELETE FROM products WHERE id NOT IN (?)', [productIds]);
      } else {
        await connection.query('DELETE FROM products');
      }
    }

    // 3. Sync Brands
    if (brands && Array.isArray(brands)) {
      for (const b of brands) {
        await connection.query(
          `INSERT INTO brands (id, name, nameEn, logo, description, country) 
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           name = VALUES(name), nameEn = VALUES(nameEn), logo = VALUES(logo),
           description = VALUES(description), country = VALUES(country)`,
          [b.id, b.name, b.nameEn || '', b.logo || '', b.description || '', b.country || '']
        );
      }
      const brandIds = brands.map(b => b.id);
      if (brandIds.length > 0) {
        await connection.query('DELETE FROM brands WHERE id NOT IN (?)', [brandIds]);
      } else {
        await connection.query('DELETE FROM brands');
      }
    }

    // 4. Sync Projects
    if (projects && Array.isArray(projects)) {
      for (const p of projects) {
        await connection.query(
          `INSERT INTO projects (id, name, nameEn, description, descriptionEn, image, images, status, statusEn, category, categoryEn, owner, ownerEn, location, locationEn, duration, durationEn, value, valueEn, techFiles) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           name = VALUES(name), nameEn = VALUES(nameEn), description = VALUES(description), descriptionEn = VALUES(descriptionEn),
           image = VALUES(image), images = VALUES(images), status = VALUES(status), statusEn = VALUES(statusEn),
           category = VALUES(category), categoryEn = VALUES(categoryEn), owner = VALUES(owner), ownerEn = VALUES(ownerEn),
           location = VALUES(location), locationEn = VALUES(locationEn), duration = VALUES(duration), durationEn = VALUES(durationEn),
           value = VALUES(value), valueEn = VALUES(valueEn), techFiles = VALUES(techFiles)`,
          [
            p.id, p.name, p.nameEn || '', p.description || '', p.descriptionEn || '', p.image || '',
            JSON.stringify(p.images || [p.image || '']), p.status || '', p.statusEn || '', p.category || '',
            p.categoryEn || '', p.owner || '', p.ownerEn || '', p.location || '', p.locationEn || '',
            p.duration || '', p.durationEn || '', p.value || '', p.valueEn || '', JSON.stringify(p.techFiles || [])
          ]
        );
      }
      const projectIds = projects.map(p => p.id);
      if (projectIds.length > 0) {
        await connection.query('DELETE FROM projects WHERE id NOT IN (?)', [projectIds]);
      } else {
        await connection.query('DELETE FROM projects');
      }
    }

    // 5. Sync Blog Posts
    if (blogPosts && Array.isArray(blogPosts)) {
      for (const p of blogPosts) {
        await connection.query(
          `INSERT INTO blog_posts (id, title, excerpt, image, date, category, content) 
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           title = VALUES(title), excerpt = VALUES(excerpt), image = VALUES(image),
           date = VALUES(date), category = VALUES(category), content = VALUES(content)`,
          [p.id, p.title, p.excerpt || '', p.image || '', p.date || '', p.category || '', p.content || '']
        );
      }
      const postIds = blogPosts.map(p => p.id);
      if (postIds.length > 0) {
        await connection.query('DELETE FROM blog_posts WHERE id NOT IN (?)', [postIds]);
      } else {
        await connection.query('DELETE FROM blog_posts');
      }
    }

    // 6. Sync Orders
    if (orders && Array.isArray(orders)) {
      for (const o of orders) {
        await connection.query(
          `INSERT INTO orders (id, date, product, total, status, customer) 
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           date = VALUES(date), product = VALUES(product), total = VALUES(total),
           status = VALUES(status), customer = VALUES(customer)`,
          [o.id, o.date, o.product || '', o.total || 0, o.status || '', o.customer || '']
        );
      }
      const orderIds = orders.map(o => o.id);
      if (orderIds.length > 0) {
        await connection.query('DELETE FROM orders WHERE id NOT IN (?)', [orderIds]);
      } else {
        await connection.query('DELETE FROM orders');
      }
    }

    await connection.commit();
    
    // Save backup copy to local data.json file
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2), 'utf8');
      console.log('Successfully saved database backup to local data.json file.');
    } catch (fsErr) {
      console.error('Failed to write backup copy to data.json:', fsErr);
    }

    res.json({ success: true, message: 'Data saved successfully in MySQL' });
  } catch (err) {
    await connection.rollback();
    console.error('Failed to write data to database:', err);
    res.status(500).json({ success: false, message: 'Database write error' });
  } finally {
    connection.release();
  }
});

// Admin Authentication endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!isDbConnected()) {
    console.log('Database not connected. Performing fallback authentication...');
    let currentData = getDefaultData();
    if (fs.existsSync(DATA_FILE)) {
      try {
        currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      } catch (e) {}
    }
    const s = currentData.settings || {};
    if (username === (s.username || 'admin') && password === (s.password || 'admin123')) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: 'Invalid credentials (fallback)' });
    }
  }

  try {
    const [rows] = await db.pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [
      username,
      password
    ]);
    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Database authentication error:', err);
    res.status(500).json({ success: false, message: 'Authentication error' });
  }
});

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// File Upload Endpoint (PDF, images, etc.) for RFQ attachments
const fileUpload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.xls', '.xlsx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مدعوم'), false);
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max
});

app.post('/api/upload-file', fileUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl, originalName: req.file.originalname });
});

// Fallback for SPA routing if needed
app.get('*', (req, res, next) => {
  const ext = path.extname(req.path);
  if (!ext) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    next();
  }
});

// Initialize DB first, then start server
initializeDatabase()
  .then(async () => {
    // Sync logo from DB on startup to prevent flickering
    try {
      const [rows] = await db.pool.query("SELECT value_data FROM settings WHERE key_name = 'settings'");
      if (rows.length > 0) {
        const settingsData = JSON.parse(rows[0].value_data);
        if (settingsData && settingsData.logoUrl && settingsData.logoUrl.startsWith('/uploads/')) {
          const logoPath = path.join(__dirname, settingsData.logoUrl);
          const targetPath = path.join(__dirname, 'images', 'logo.png');
          if (fs.existsSync(logoPath)) {
            fs.copyFileSync(logoPath, targetPath);
            console.log('Synchronized logo on startup successfully from:', settingsData.logoUrl);
          }
        }
      }
    } catch (e) {
      console.error('Failed to sync logo on startup:', e);
    }

    app.listen(PORT, () => {
      console.log(`Smart Electricity Company (SEC) server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Critical database initialization failure:', err);
    process.exit(1);
  });
