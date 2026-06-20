const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const placeholders = new Set();
const titles = new Set();
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const phMatches = [...html.matchAll(/placeholder=\"([^\"]+)\"/g)];
  phMatches.forEach(m => placeholders.add(m[1]));
  const titleMatches = [...html.matchAll(/<title>([^<]+)<\/title>/g)];
  titleMatches.forEach(m => titles.add(m[1]));
}
console.log('Placeholders:', Array.from(placeholders));
console.log('Titles:', Array.from(titles));
