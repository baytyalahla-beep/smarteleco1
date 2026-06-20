const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const version = Date.now();
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (html.match(/site-renderer\.js(\?v=\d+)?\"/)) {
    html = html.replace(/site-renderer\.js(\?v=\d+)?\"/g, `site-renderer.js?v=${version}"`);
    changed = true;
  }
  if (html.match(/site-data\.js(\?v=\d+)?\"/)) {
    html = html.replace(/site-data\.js(\?v=\d+)?\"/g, `site-data.js?v=${version}"`);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated', file);
  }
}
