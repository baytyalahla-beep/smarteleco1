const fs = require('fs');
let js = fs.readFileSync('site-renderer.js', 'utf8');

const newKeys = {
    "ما الذي تبحث عنه؟": "What are you looking for?",
    "بريدك الإلكتروني": "Email Address",
    "ابحث عن علامة تجارية...": "Search for a brand...",
    "أدخل اسمك هنا": "Enter your name here",
    "كيف يمكننا مساعدتك اليوم؟": "How can we help you today?",
    "بيت الكهرباء": "Electric House",
    "الليره السورية": "SYP",
    "الأحد - الخميس: 8:00 ص - 5:30 م": "Sunday - Thursday: 8:00 AM - 5:30 PM",
    "الجمعة - السبت: مغلق": "Friday - Saturday: Closed",
    "الرقم | العنوان بالعربي | العنوان بالإنجليزي": "Number | Arabic Title | English Title",
    "الاسم بالعربي | الاسم بالإنجليزي | الحجم": "Arabic Name | English Name | Size",
    "مثال: نصائح فنية": "Example: Technical Tips",
    "السنة": "Year",
    "العنوان": "Title",
    "من نحن | Electric House": "About Us | Electric House",
    "المدونة | بيت الكهرباء": "Blog | Electric House",
    "العلامات التجارية - شركة بيت الكهرباء": "Brands - Electric House",
    "عربة التسوق | Electric House": "Shopping Cart | Electric House",
    "اتصل بنا | إلكتريك هاوس": "Contact Us | Electric House",
    "لوحة التحكم | بيت الكهرباء": "Dashboard | Electric House",
    "Electric House | بيت الكهرباء": "Electric House",
    "العروض الحصرية - Electric House": "Exclusive Offers - Electric House",
    "تفاصيل المنتج | إلكتريك هاوس": "Product Details | Electric House",
    "قائمة المنتجات | إليكتريك هاوس": "Products List | Electric House",
    "تفاصيل المشروع - Electric House": "Project Details - Electric House",
    "المشاريع - شركة إلكتريك هاوس": "Projects - Electric House",
    "الخدمات - Electric House": "Services - Electric House",
    "شكراً لطلبك - Electric House": "Thank You for Your Order - Electric House"
};

let keyString = '';
for (const [k, v] of Object.entries(newKeys)) {
    keyString += `    ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}

// Inject new keys
js = js.replace('const textMapping = {', 'const textMapping = {\n' + keyString);

// Update translateNodes
const newTranslateNodes = `  const translateNodes = () => {
    // 1. Text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      const txt = node.nodeValue.trim();
      if (textMapping[txt]) {
        node.nodeValue = node.nodeValue.replace(txt, textMapping[txt]);
      }
    }
    
    // 2. Document Title
    const titleTxt = document.title.trim();
    if (textMapping[titleTxt]) {
        document.title = textMapping[titleTxt];
    }

    // 3. Placeholders
    document.querySelectorAll('[placeholder]').forEach(el => {
      const txt = el.getAttribute('placeholder').trim();
      if (textMapping[txt]) {
        el.setAttribute('placeholder', textMapping[txt]);
      }
    });

    // 4. Title attributes
    document.querySelectorAll('[title]').forEach(el => {
      const txt = el.getAttribute('title').trim();
      if (textMapping[txt]) {
        el.setAttribute('title', textMapping[txt]);
      }
    });
  };`;

// Replace the old translateNodes
js = js.replace(/const translateNodes = \(\) => \{[\s\S]*?\};\n\n  translateNodes\(\);/, newTranslateNodes + '\n\n  translateNodes();');

fs.writeFileSync('site-renderer.js', js, 'utf8');
console.log('Updated site-renderer.js');
