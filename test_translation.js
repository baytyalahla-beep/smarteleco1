const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('site-renderer.js', 'utf8');
const match = js.match(/const textMapping = \{([\s\S]*?)\};/);
const mapStr = '{' + match[1] + '}';
const fn = new Function('return ' + mapStr);
const textMapping = fn();

const dom = new JSDOM(html);
const document = dom.window.document;
const NodeFilter = dom.window.NodeFilter;

let replacedCount = 0;
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
let node;
while (node = walker.nextNode()) {
  const txt = node.nodeValue.trim();
  if (textMapping[txt]) {
    node.nodeValue = node.nodeValue.replace(txt, textMapping[txt]);
    replacedCount++;
    console.log('Replaced:', txt, '->', textMapping[txt]);
  } else if (txt.length > 0 && /[\u0600-\u06FF]/.test(txt)) {
    console.log('UNMATCHED ARABIC:', txt);
  }
}
console.log('Total Replaced:', replacedCount);
