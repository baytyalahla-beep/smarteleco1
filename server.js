const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

// Extract default data from site-data.js dynamically
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

// Read site data
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = getDefaultData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse data.json, falling back to defaults:', err);
    return getDefaultData();
  }
}

// Write site data
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to write data.json:', err);
    return false;
  }
}

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
app.get('/api/data', (req, res) => {
  res.json(readData());
});

app.post('/api/data', (req, res) => {
  const success = writeData(req.body);
  if (success) {
    res.json({ success: true, message: 'Data saved successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to write data' });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// Fallback for SPA routing if needed (optional since we serve static .html directly)
app.get('*', (req, res, next) => {
  const ext = path.extname(req.path);
  if (!ext) {
    // If route doesn't have extension, redirect or serve index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Smart Electricity Company (SEC) server running on port ${PORT}`);
});
