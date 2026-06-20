const fs = require('fs');
const jsPath = 'site-renderer.js';
let js = fs.readFileSync(jsPath, 'utf8');

const additionalTranslations = {
  "راجع طلباتك قبل التواصل معنا لإتمام العملية": "Review your orders before contacting us to complete the process",
  "شنايدر إلكتريك": "Schneider Electric",
  "قاطع تيار كهربائي 3 فاز - 100 أمبير": "3-Phase Circuit Breaker - 100A",
  "رقم الموديل: SE-100-ABC-X": "Model Number: SE-100-ABC-X",
  "السعر الإجمالي": "Total Price",
  "450.00 ر.س": "450.00 SAR",
  "كابلات الرياض": "Riyadh Cables",
  "سلك كهرباء نحاس 6 ملم - 100 متر": "Copper Wire 6mm - 100m",
  "اللون: أحمر - عزل حراري عالي": "Color: Red - High Thermal Insulation",
  "280.00 ر.س": "280.00 SAR",
  "فيلبس": "Philips",
  "كشاف ليد خارجي 50 واط - مقاوم للماء": "LED Outdoor Floodlight 50W - Waterproof",
  "إضاءة بيضاء - ضمان سنتين": "White Light - 2 Years Warranty",
  "625.00 ر.س": "625.00 SAR",
  "عدد الأصناف": "Number of Items",
  "03 منتجات": "03 Products",
  "1,355.00 ر.س": "1,355.00 SAR",
  "ضريبة القيمة المضافة (15%)": "VAT (15%)",
  "203.25 ر.س": "203.25 SAR",
  "1,558.25 ر.س": "1,558.25 SAR",
  "لإتمام عملية الشراء والحصول على أفضل عرض سعر للمؤسسات، يرجى التواصل معنا مباشرة عبر الواتساب.": "To complete the purchase and get the best corporate quote, please contact us directly via WhatsApp.",
  "طلب عبر الواتساب": "Order via WhatsApp",
  "لماذا الواتساب؟": "Why WhatsApp?",
  "بصفتنا شركة متخصصة، نفضل التواصل المباشر لضمان توافر الكميات الضخمة، وتنسيق الخدمات اللوجستية، وتقديم خصومات خاصة للمشاريع الكبرى.": "As a specialized company, we prefer direct communication to ensure the availability of large quantities, coordinate logistics, and provide special discounts for major projects.",
  "متابعة التسوق وإضافة المزيد من المنتجات": "Continue Shopping and Add More Products",
  "فروعنا": "Our Branches",
  "حسابي": "My Account",
  "المفضلة": "Favorites",
  "اشترك": "Subscribe",
  "150.00 ر.س": "150.00 SAR",
  "180.00 ر.س": "180.00 SAR",
  "85.00 ر.س": "85.00 SAR",
  "45.00 ر.س": "45.00 SAR",
  "320.00 ر.س": "320.00 SAR"
};

// Find the textMapping object
const match = js.match(/(const textMapping = \{)([\s\S]*?)(\n\s*\};)/);
if (match) {
  let innerStr = match[2];
  for (const [ar, en] of Object.entries(additionalTranslations)) {
    if (!innerStr.includes(`"${ar}"`)) {
      innerStr += `,\n    "${ar}": "${en}"`;
    }
  }
  js = js.replace(match[0], match[1] + innerStr + match[3]);
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('Added missing translations to site-renderer.js');
} else {
  console.log('Could not find textMapping object');
}
