const fs = require('fs');
const code = fs.readFileSync('f:/stitch_electric_house_website_clone/industrial_excellence/dashboard.html', 'utf8');
const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('attemptLogin') || l.includes('login') || l.includes('Login')) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});
