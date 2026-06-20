const fs = require('fs');
let js = fs.readFileSync('site-data.js', 'utf8');

js = js.replace(/brand:\s*'([^']+)'/g, (match, arBrand) => {
  const map = {
    'شنايدر إليكتريك': 'Schneider Electric',
    'فيليبس هيو': 'Philips Hue',
    'كابلات الرياض': 'Riyadh Cables',
    'إيه بي بي': 'ABB',
    'لوغراند': 'Legrand',
    'هيكفيجن': 'Hikvision'
  };
  if (map[arBrand]) {
    return `brand: '${arBrand}', brandEn: '${map[arBrand]}'`;
  }
  return match;
});

js = js.replace(/brand:\s*"([^"]+)"/g, (match, arBrand) => {
  const map = {
    'شنايدر إليكتريك': 'Schneider Electric',
    'فيليبس هيو': 'Philips Hue',
    'كابلات الرياض': 'Riyadh Cables',
    'إيه بي بي': 'ABB',
    'لوغراند': 'Legrand',
    'هيكفيجن': 'Hikvision'
  };
  if (map[arBrand]) {
    return `brand: "${arBrand}", brandEn: "${map[arBrand]}"`;
  }
  return match;
});

fs.writeFileSync('site-data.js', js, 'utf8');
console.log('Updated site-data.js');
