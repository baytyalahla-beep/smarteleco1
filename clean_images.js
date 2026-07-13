const fs = require('fs');
const path = require('path');

const DIR = 'f:\\stitch_electric_house_website_clone\\industrial_excellence';

const files = fs.readdirSync(DIR);
const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

files.forEach(file => {
  const ext = path.extname(file);
  if (ext === '.html' || ext === '.js' || ext === '.json') {
    const filePath = path.join(DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" with transparent pixel
    let modifiedContent = content.replace(/src="https:\/\/lh3\.googleusercontent\.com\/[^"]+"/g, `src="${transparentPixel}"`);
    
    // Replace style="background-image: url('')" with none or empty
    modifiedContent = modifiedContent.replace(/url\(['"]?https:\/\/lh3\.googleusercontent\.com\/[^'")]*['"]?\)/g, `url('')`);

    // Replace straight string occurrences in json or js
    modifiedContent = modifiedContent.replace(/"https:\/\/lh3\.googleusercontent\.com\/[^"]+"/g, `""`);

    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`Removed heavy googleusercontent images from: ${file}`);
    }
  }
});
