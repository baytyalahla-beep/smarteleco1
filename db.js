require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u856730022_smarteleco1',
  password: process.env.DB_PASSWORD || 'Smarteleco1@$6',
  database: process.env.DB_NAME || 'u856730022_smarteleco1',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

let dbConnected = false;

function getDefaultData() {
  try {
    const code = fs.readFileSync(path.join(__dirname, 'site-data.js'), 'utf8');
    const sandbox = {
      localStorage: {
        getItem: () => null,
        setItem: () => {}
      },
      console: console
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    if (sandbox.SiteData && sandbox.SiteData.DEFAULT_DATA) {
      return sandbox.SiteData.DEFAULT_DATA;
    }
  } catch (err) {
    console.error('Failed to parse site-data.js for default data:', err);
  }
  return {};
}

async function initializeDatabase() {
  console.log('Initializing database connection...');
  try {
    const connection = await pool.getConnection();
    connection.release();
    dbConnected = true;
    console.log('Connected to MySQL database successfully.');
  } catch (err) {
    console.error('\n******************************************************************');
    console.error('WARNING: Could not connect to MySQL database.');
    console.error('Error Details:', err.message);
    console.error('The server will run in fallback mode using site-data.js / data.json.');
    console.error('******************************************************************\n');
    dbConnected = false;
    return;
  }
  
  try {
    // 1. Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key_name VARCHAR(100) PRIMARY KEY,
        value_data LONGTEXT
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        brand VARCHAR(100),
        brandEn VARCHAR(100),
        price DECIMAL(15,2) DEFAULT 0,
        originalPrice DECIMAL(15,2) DEFAULT 0,
        isOffer TINYINT(1) DEFAULT 0,
        stockTotal INT DEFAULT 100,
        stockSold INT DEFAULT 0,
        category VARCHAR(100),
        image VARCHAR(500),
        images JSON,
        description TEXT,
        descriptionEn TEXT,
        featured TINYINT(1) DEFAULT 0,
        showPrice TINYINT(1) DEFAULT 1,
        specifications JSON,
        techFiles JSON,
        salesMode VARCHAR(50) DEFAULT 'both'
      )
    `);

    // Safely add columns if the table already exists
    try {
      await pool.query("ALTER TABLE products ADD COLUMN specifications JSON NULL");
    } catch (e) {}
    try {
      await pool.query("ALTER TABLE products ADD COLUMN techFiles JSON NULL");
    } catch (e) {}
    try {
      await pool.query("ALTER TABLE products ADD COLUMN salesMode VARCHAR(50) DEFAULT 'both'");
    } catch (e) {}

    await pool.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        logo VARCHAR(500),
        description TEXT,
        country VARCHAR(100)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        nameEn VARCHAR(255),
        description TEXT,
        descriptionEn TEXT,
        image VARCHAR(500),
        images JSON,
        status VARCHAR(50),
        statusEn VARCHAR(50),
        category VARCHAR(100),
        categoryEn VARCHAR(100),
        owner VARCHAR(255),
        ownerEn VARCHAR(255),
        location VARCHAR(255),
        locationEn VARCHAR(255),
        duration VARCHAR(100),
        durationEn VARCHAR(100),
        value VARCHAR(100),
        valueEn VARCHAR(100),
        techFiles JSON
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        image VARCHAR(500),
        date VARCHAR(50),
        category VARCHAR(100),
        content LONGTEXT
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        date VARCHAR(50),
        product VARCHAR(255),
        total DECIMAL(15,2) DEFAULT 0,
        status VARCHAR(50),
        customer VARCHAR(255)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE,
        password VARCHAR(255)
      )
    `);

    console.log('Database tables check/creation complete.');

    // 2. Seeding default data if empty
    const defaultData = getDefaultData();

    // Settings seeding
    const [settingsRows] = await pool.query('SELECT COUNT(*) as count FROM settings');
    if (settingsRows[0].count === 0) {
      console.log('Seeding settings data...');
      const keys = ['settings', 'banners', 'homepage', 'about', 'categories', 'sectors', 'faqs', 'messages'];
      for (const key of keys) {
        if (defaultData[key]) {
          await pool.query('INSERT INTO settings (key_name, value_data) VALUES (?, ?)', [
            key,
            JSON.stringify(defaultData[key])
          ]);
        }
      }
    }

    // Products seeding
    const [productRows] = await pool.query('SELECT COUNT(*) as count FROM products');
    if (productRows[0].count === 0 && defaultData.products) {
      console.log('Seeding products data...');
      for (const p of defaultData.products) {
        await pool.query(
          `INSERT INTO products (id, name, nameEn, brand, brandEn, price, originalPrice, isOffer, stockTotal, stockSold, category, image, images, description, descriptionEn, featured, showPrice, specifications, techFiles, salesMode) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id, p.name, p.nameEn || '', p.brand || '', p.brandEn || '', p.price, p.originalPrice || p.price,
            p.isOffer ? 1 : 0, p.stockTotal || 100, p.stockSold || 0, p.category || '', p.image || '',
            JSON.stringify(p.images || [p.image || '', '', '', '']), p.description || '', p.descriptionEn || '',
            p.featured ? 1 : 0, p.showPrice !== false ? 1 : 0,
            JSON.stringify(p.specifications || []), JSON.stringify(p.techFiles || []), p.salesMode || 'both'
          ]
        );
      }
    }

    // Brands seeding
    const [brandRows] = await pool.query('SELECT COUNT(*) as count FROM brands');
    if (brandRows[0].count === 0 && defaultData.brands) {
      console.log('Seeding brands data...');
      for (const b of defaultData.brands) {
        await pool.query(
          `INSERT INTO brands (id, name, nameEn, logo, description, country) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [b.id, b.name, b.nameEn || '', b.logo || '', b.description || '', b.country || '']
        );
      }
    }

    // Projects seeding
    const [projectRows] = await pool.query('SELECT COUNT(*) as count FROM projects');
    if (projectRows[0].count === 0 && defaultData.projects) {
      console.log('Seeding projects data...');
      for (const p of defaultData.projects) {
        await pool.query(
          `INSERT INTO projects (id, name, nameEn, description, descriptionEn, image, images, status, statusEn, category, categoryEn, owner, ownerEn, location, locationEn, duration, durationEn, value, valueEn, techFiles) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id, p.name, p.nameEn || '', p.description || '', p.descriptionEn || '', p.image || '',
            JSON.stringify(p.images || [p.image || '']), p.status || '', p.statusEn || '', p.category || '',
            p.categoryEn || '', p.owner || '', p.ownerEn || '', p.location || '', p.locationEn || '',
            p.duration || '', p.durationEn || '', p.value || '', p.valueEn || '', JSON.stringify(p.techFiles || [])
          ]
        );
      }
    }

    // Blog posts seeding
    const [blogRows] = await pool.query('SELECT COUNT(*) as count FROM blog_posts');
    if (blogRows[0].count === 0 && defaultData.blogPosts) {
      console.log('Seeding blog posts data...');
      for (const p of defaultData.blogPosts) {
        await pool.query(
          `INSERT INTO blog_posts (id, title, excerpt, image, date, category, content) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [p.id, p.title, p.excerpt || '', p.image || '', p.date || '', p.category || '', p.content || '']
        );
      }
    }

    // Orders seeding
    const [orderRows] = await pool.query('SELECT COUNT(*) as count FROM orders');
    if (orderRows[0].count === 0 && defaultData.orders) {
      console.log('Seeding orders data...');
      for (const o of defaultData.orders) {
        await pool.query(
          `INSERT INTO orders (id, date, product, total, status, customer) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [o.id, o.date, o.product || '', o.total || 0, o.status || '', o.customer || '']
        );
      }
    }

    // Admin user seeding
    const [userRows] = await pool.query('SELECT COUNT(*) as count FROM users');
    if (userRows[0].count === 0) {
      console.log('Seeding default admin user...');
      const settings = defaultData.settings || {};
      const username = settings.username || 'admin';
      const password = settings.password || 'admin123';
      await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    }

    console.log('Database initialization & seeding successful!');
  } catch (err) {
    console.error('Error during database schema setup or seeding:', err);
    dbConnected = false;
  }
}

module.exports = {
  pool,
  initializeDatabase,
  isDbConnected: () => dbConnected,
  getDefaultData
};
