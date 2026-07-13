const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const API_URL = 'https://smarteleco.com/api/data';

async function pushData() {
  console.log('Reading data.json...');
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(raw);
  
  console.log('Pushing data to database via API...');
  console.log('Products:', (data.products || []).length);
  console.log('Brands:', (data.brands || []).length);
  console.log('Projects:', (data.projects || []).length);
  console.log('Blog Posts:', (data.blogPosts || []).length);
  console.log('Orders:', (data.orders || []).length);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw
  });
  
  const result = await response.json();
  console.log('Response:', JSON.stringify(result));
  
  // Test login
  console.log('\nTesting login with admin/admin123...');
  const loginRes = await fetch('https://smarteleco.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' })
  });
  const loginResult = await loginRes.json();
  console.log('Login result:', JSON.stringify(loginResult));
}

pushData().catch(console.error);
