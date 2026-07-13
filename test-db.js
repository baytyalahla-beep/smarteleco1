require('dotenv').config();

console.log('=== Database Connection Diagnostic ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_PASSWORD length:', (process.env.DB_PASSWORD || '').length);
console.log('DB_PASSWORD value:', process.env.DB_PASSWORD);
console.log('');

const mysql = require('mysql2/promise');

async function test() {
  try {
    console.log('Attempting connection...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306')
    });
    console.log('SUCCESS! Connected to database!');
    await connection.end();
  } catch (err) {
    console.error('FAILED:', err.message);
  }
  process.exit(0);
}

test();
