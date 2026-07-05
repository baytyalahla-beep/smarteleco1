/**
 * site-renderer.js - Renders CMS data on public pages
 * Reads from localStorage (via site-data.js) and updates DOM
 */

/* ========== BILINGUAL ENGINE DICTIONARY ========== */
const TRANSLATIONS = {
  ar: {
    branches: "فروعنا",
    my_account: "حسابي",
    favorites: "المفضلة",
    cart: "عربة التسوق",
    search_placeholder: "ما الذي تبحث عنه؟",
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    products: "المنتجات",
    projects: "المشاريع",
    brands: "العلامات التجارية",
    blog: "مركز المعرفة",
    contact: "اتصل بنا",
    offers: "العروض",
    subscribe: "اشترك",
    email_placeholder: "بريدك الإلكتروني",
    footer_desc: "شركة رائدة في مجال تقديم الحلول الكهربائية والصناعية المتكاملة والأتمتة في سوريا.",
    footer_links: "روابط سريعة",
    footer_categories: "تسوق حسب القسم",
    footer_newsletter: "اشترك في النشرة البريدية",
    footer_newsletter_desc: "ابقَ على اطلاع بأحدث المنتجات والعروض الحصرية.",
    rights_reserved: "جميع الحقوق محفوظة لشركة الكهرباء الذكية",
    currency: "ل.س",
    add_to_cart: "أضف للسلة",
    rfq_intro: "للحصول على عرض سعر فني ومالي مخصص لمشروعك، يرجى ملء البيانات التالية وسيقوم مهندسونا بالتواصل معك فوراً.",
    company_name: "اسم الشركة / المؤسسة",
    boq_file: "ملف جدول الكميات والمواصفات (BOQ)",
    project_notes: "ملاحظات أو متطلبات خاصة بالطلب",
    submit_rfq_btn: "إرسال طلب التسعير",
    name_field: "الاسم الكامل",
    email_field: "البريد الإلكتروني المهني",
    phone_field: "رقم الهاتف / الجوال",
    secure_checkout: "تواصل آمن ومباشر مع مبيعاتنا",
    thank_you_title: "تم استلام طلب التسعير بنجاح ✓",
    thank_you_desc: "شكراً لتواصلك معنا. تم تسجيل طلب التسعير الخاص بمشروعكم بنجاح وسيقوم فريقنا الهندسي بدراسة الكميات والمواصفات الفنية والتواصل معكم خلال 24 ساعة.",
    project_details: "تفاصيل المشروع",
    whatsapp_enquiry: "تواصل عبر واتساب",
    request_quote: "طلب عرض سعر",
    filter_all: "الكل",
    categories_title: "التصنيفات",
    price_label: "السعر",
    original_price: "بدلاً من",
    offer_ends: "ينتهي العرض في:",
    remaining_stock: "متبقي",
    pieces: "قطعة",
    partners: "شركاء النجاح والعلامات العالمية المعروضة",
    newsletter_title: "النشرة البريدية",
    order_summary: "ملخص الطلب",
    items_count: "عدد الأصناف",
    subtotal: "المجموع الفرعي",
    vat: "ضريبة القيمة المضافة (15%)",
    final_total: "الإجمالي النهائي",
    cart_empty: "عربة التسوق فارغة",
    cart_empty_desc: "لم تقم بإضافة أي منتجات إلى السلة بعد.",
    browse_products: "تصفح المنتجات",
    secure_checkout: "تواصل آمن ومباشر مع مبيعاتنا",
    whatsapp_order_msg: "مرحباً شركة الكهرباء الذكية، أريد طلب المنتجات التالية:\n\n",
    contact_header: "اتصل بنا",
    contact_subtitle: "نحن هنا لمساعدتك والإجابة على جميع استفساراتك",
    send_msg: "إرسال الرسالة",
    name_field: "الاسم الكامل",
    phone_field: "رقم الجوال",
    msg_field: "نص الرسالة",
    msg_sent: "تم إرسال رسالتك بنجاح ✓",
    project_overview: "نظرة عامة على المشروع",
    project_sidebar_title: "بطاقة تفاصيل المشروع",
    owner: "المالك",
    duration: "الفترة الزمنية",
    location: "الموقع",
    value: "قيمة المشروع",
    tech_files: "تحميل الملفات الفنية للمشروع",
    tech_specs: "مواصفات الملف الفني",
    eng_drawings: "رسومات هندسية ومخططات",
    official_docs: "العقود والمستندات الرسمية",
    download_btn: "تحميل الملف",
    services_hero_title: "خدمات وحلول شركة الكهرباء الذكية",
    services_hero_desc: "تقدم حلولاً مخصصة لقطاعات الطاقة المتنوعة وتوريد وتركيب الأنظمة بمستويات كفاءة عالمية.",
    enquire_now: "طلب استشارة أو تسعير",
    more_details: "للمزيد من التفاصيل",
    order_service: "لطلب الخدمة مباشرة",
    cta_title: "هل تبحث عن حلول هندسية لمشروعك القادم؟",
    cta_desc: "تواصل معنا اليوم للحصول على أفضل الاستشارات الهندسية المتكاملة وتوريد المعدات الكهربائية الصناعية بأعلى المواصفات.",
    about_hero_title: "من نحن - شركة الكهرباء الذكية",
    about_hero_desc: "أكثر من 40 عاماً من الخبرة والريادة في توريد المعدات والحلول الكهربائية للمشاريع السكنية والصناعية الكبرى.",
    our_mission: "مهمتنا",
    our_vision: "رؤيتنا",
    our_quote: "كلمة الإدارة",
    history_timeline: "مسيرتنا التاريخية",
    featured_products: "منتجات مميزة",
    featured_products_desc: "اخترنا لك باقة من أفضل المنتجات العالمية الأكثر طلباً.",
    limited_offer: "عرض لفترة محدودة",
    promo_banner_title: "وفر حتى 25% على كافة المعدات الصناعية",
    promo_banner_desc: "احصل على خصومات حصرية للمؤسسات والشركات على لوحات التوزيع، القواطع الكهربائية، وأنظمة الطاقة الذكية.",
    shop_now: "تسوق العروض الآن",
    sub_promo_1_title: "المفاتيح الكهربائية الذكية",
    sub_promo_1_desc: "وفر حتى 15% على مفاتيح لوغراند ولوحات التحكم",
    sub_promo_2_title: "أدوات ومعدات احترافية",
    sub_promo_2_desc: "وفر حتى 20% على المفكات وأجهزة القياس المتقدمة",
    active_offers: "العروض الحالية النشطة",
    active_offers_desc: "الأسعار المخفضة سارية حتى انتهاء الوقت الموضح أو نفاد الكمية المخصصة للعرض.",
    filter_by: "فلترة العروض",
    quotation_req: "يتطلب تسعير خاص للمشروع",
    products_all: "جميع المنتجات",
    price_range: "نطاق السعر",
    sort_best: "الأكثر مبيعاً",
    sort_newest: "الأحدث",
    sort_price_asc: "السعر: من الأقل للأعلى",
    sort_price_desc: "السعر: من الأعلى للأقل",
    price_from: "من",
    price_to: "إلى",
    showing_count: "عرض {x} من {y} منتج",
    categories: "الفئات",
    brands: "العلامات التجارية",
    search_results: "نتائج البحث لـ",
    no_products: "لا توجد منتجات تطابق خيارات البحث."
  },
  en: {
    branches: "Branches",
    my_account: "My Account",
    favorites: "Favorites",
    cart: "Cart",
    search_placeholder: "What are you looking for?",
    home: "Home",
    about: "About Us",
    services: "Services",
    products: "Products",
    projects: "Projects",
    brands: "Brands",
    blog: "Knowledge Center",
    contact: "Contact Us",
    offers: "Offers",
    subscribe: "Subscribe",
    email_placeholder: "Your Email Address",
    footer_desc: "A leading engineering company providing integrated electrical and industrial solutions, including supply, design, consultancy, and automation.",
    footer_links: "Quick Links",
    footer_categories: "Shop by Category",
    footer_newsletter: "Subscribe to Newsletter",
    footer_newsletter_desc: "Stay updated with our latest products and exclusive offers.",
    rights_reserved: "All rights reserved to Smart Electricity Company (SEC) © 2026",
    currency: "SYP",
    add_to_cart: "Add to Cart",
    rfq_intro: "To get a customized technical and financial quotation for your project, please fill in the details below. Our engineers will contact you shortly.",
    company_name: "Company / Institution Name",
    boq_file: "Bill of Quantities & Specs (BOQ) File",
    project_notes: "Special Notes or Requirements",
    submit_rfq_btn: "Submit Quote Request",
    name_field: "Full Name",
    email_field: "Professional Email",
    phone_field: "Phone Number / Mobile",
    secure_checkout: "Secure and direct contact with our sales team",
    thank_you_title: "Quotation Request Submitted Successfully ✓",
    thank_you_desc: "Thank you for reaching out. Your RFQ has been registered. Our engineering team will review the BOQ and technical specifications and contact you within 24 hours.",
    project_details: "Project Details",
    whatsapp_enquiry: "WhatsApp Enquiry",
    request_quote: "Request Quote",
    filter_all: "All",
    categories_title: "Categories",
    price_label: "Price",
    original_price: "instead of",
    offer_ends: "Offer ends in:",
    remaining_stock: "Remaining",
    pieces: "pcs",
    partners: "Success Partners & Top Brands",
    newsletter_title: "Newsletter",
    order_summary: "Order Summary",
    items_count: "Items Count",
    subtotal: "Subtotal",
    vat: "VAT (15%)",
    final_total: "Final Total",
    cart_empty: "Your Cart is Empty",
    cart_empty_desc: "You haven't added any products to your cart yet.",
    browse_products: "Browse Products",
    secure_checkout: "Secure and direct contact with our sales team",
    whatsapp_order_msg: "Hello Smart Electricity Company (SEC), I would like to order the following items:\n\n",
    contact_header: "Contact Us",
    contact_subtitle: "We are here to help and answer all your inquiries",
    send_msg: "Send Message",
    name_field: "Full Name",
    phone_field: "Phone Number",
    msg_field: "Message",
    msg_sent: "Your message has been sent successfully ✓",
    project_overview: "Project Overview",
    project_sidebar_title: "Project Specs Card",
    owner: "Owner",
    duration: "Duration Time",
    location: "Location",
    value: "Project Value",
    tech_files: "Technical Files Download",
    tech_specs: "Technical Specs Sheet",
    eng_drawings: "Engineering Drawings & Layouts",
    official_docs: "Contracts & Official Approvals",
    download_btn: "Download File",
    services_hero_title: "Smart Electricity Company (SEC) Services & Solutions",
    services_hero_desc: "Providing tailored solutions for various energy sectors, and supplying/installing systems with global efficiency.",
    enquire_now: "Request Consulting or Quotation",
    more_details: "More Details",
    order_service: "Order Service Directly",
    cta_title: "Looking for engineering solutions for your next project?",
    cta_desc: "Contact us today for the best integrated engineering consultations and supply of electrical industrial equipment.",
    about_hero_title: "About Us - Smart Electricity Company (SEC)",
    about_hero_desc: "Empowering industries through integrated engineering solutions that rebuild and develop electrical and industrial systems.",
    our_mission: "Our Mission",
    our_vision: "Our Vision",
    our_quote: "Executive Board Quote",
    history_timeline: "Our History Timeline",
    featured_products: "Featured Products",
    featured_products_desc: "We selected a range of the most popular global products for you.",
    limited_offer: "Limited Time Offer",
    promo_banner_title: "Save up to 25% on all industrial equipment",
    promo_banner_desc: "Get exclusive corporate discounts on distribution boards, circuit breakers, and smart energy systems.",
    shop_now: "Shop Offers Now",
    sub_promo_1_title: "Smart Wall Switches",
    sub_promo_1_desc: "Save up to 15% on Legrand switches and control panels",
    sub_promo_2_title: "Professional Tools & Gear",
    sub_promo_2_desc: "Save up to 20% on screwdrivers and advanced measuring devices",
    active_offers: "Current Active Offers",
    active_offers_desc: "Discounted prices are valid until timer ends or promotional stock runs out.",
    filter_by: "Filter Offers",
    quotation_req: "Requires special project quotation",
    products_all: "All Products",
    price_range: "Price Range",
    sort_best: "Best Sellers",
    sort_newest: "Newest",
    sort_price_asc: "Price: Low to High",
    sort_price_desc: "Price: High to Low",
    price_from: "From",
    price_to: "To",
    showing_count: "Showing {x} of {y} products",
    categories: "Categories",
    brands: "Brands",
    search_results: "Search results for",
    no_products: "No products match the selected criteria."
  }
};

const CATEGORY_TRANSLATIONS = {
  "القواطع الكهربائية": "Circuit Breakers",
  "المفاتيح والأفياش": "Switches & Sockets",
  "الأسلاك والكابلات": "Wires & Cables",
  "الإضاءة": "Lighting",
  "أجهزة القياس": "Measuring Devices",
  "أنظمة المراقبة": "CCTV Systems",
  "لوحات التوزيع": "Distribution Boards",
  "أنظمة الطاقة الشمسية": "Solar Power Systems"
};

window.toggleLanguage = function() {
  const currentLang = localStorage.getItem('electric_house_lang') || 'ar';
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('electric_house_lang', newLang);
  location.reload();
};

function getLocalized(obj, key, lang) {
  if (!obj) return '';
  if (lang === 'en' && obj[`${key}En`]) return obj[`${key}En`];
  return obj[key] || '';
}

/* ========== STATS COUNTER ANIMATIONS ========== */
function animateNumber(element, finalValueStr) {
  const match = finalValueStr.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
  if (!match) return;

  const prefix = match[1] || '';
  const numberStr = match[2];
  const suffix = match[3] || '';
  
  const isFloat = numberStr.includes('.');
  const hasComma = numberStr.includes(',');
  const cleanNumberStr = numberStr.replace(/,/g, '');
  const finalVal = isFloat ? parseFloat(cleanNumberStr) : parseInt(cleanNumberStr, 10);
  
  if (isNaN(finalVal)) return;

  let startVal = 0;
  const duration = 1500;
  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing: easeOutCubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    let currentVal = startVal + (finalVal - startVal) * easeProgress;
    
    let formattedVal;
    if (isFloat) {
      formattedVal = currentVal.toFixed(1);
    } else {
      formattedVal = Math.floor(currentVal).toString();
    }
    
    if (hasComma) {
      formattedVal = formattedVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    element.textContent = prefix + formattedVal + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = finalValueStr;
    }
  };
  
  requestAnimationFrame(update);
}

function initStatsCounterAnimations() {
  const elements = document.querySelectorAll(
    '.text-4xl.font-extrabold, .text-headline-xl.font-bold, .block.text-2xl.font-extrabold.text-primary, .item-card span.text-2xl.font-extrabold'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          const originalText = el.textContent.trim();
          const match = originalText.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
          if (match) {
            el.textContent = match[1] + '0' + match[3];
          }
          animateNumber(el, originalText);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    observer.observe(el);
  });
}

/* ========== FAVORITES MANAGEMENT ========== */
window.toggleFavorite = function(btn, productId) {
  const heart = btn.querySelector('.material-symbols-outlined');
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  const isFilled = heart && (heart.style.fontVariationSettings.includes("'FILL' 1") || heart.style.fontVariationSettings.includes('"FILL" 1') || heart.style.fontVariationSettings.includes('FILL 1') || btn.classList.contains('text-error') || btn.classList.contains('bg-red-50'));

  if (isFilled) {
    if (heart) heart.style.fontVariationSettings = "'FILL' 0";
    if (btn.classList.contains('text-error') && btn.classList.contains('bg-white')) {
      btn.classList.remove('text-error', 'bg-white');
      btn.classList.add('text-on-surface-variant', 'bg-white/80');
    } else {
      btn.classList.remove('bg-red-50', 'text-error', 'border-error');
      btn.classList.add('border-primary', 'text-primary');
    }
    showToastNotification(isEn ? 'Removed from favorites' : 'تم الإزالة من المفضلة');
  } else {
    if (heart) heart.style.fontVariationSettings = "'FILL' 1";
    if (btn.classList.contains('text-on-surface-variant')) {
      btn.classList.add('text-error', 'bg-white');
      btn.classList.remove('text-on-surface-variant', 'bg-white/80');
    } else {
      btn.classList.add('bg-red-50', 'text-error', 'border-error');
      btn.classList.remove('border-primary', 'text-primary');
    }
    showToastNotification(isEn ? 'Added to favorites ✓' : 'تم الإضافة إلى المفضلة ✓');
  }
};

/* ========== CATALOGS DOWNLOAD MODAL ========== */
window.openCatalogsModal = function() {
  let modal = document.getElementById('catalogs-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'catalogs-modal';
    modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-md w-full p-6 text-right shadow-2xl animate-fade-in" dir="rtl" style="font-family: Cairo, sans-serif;">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-headline-md text-headline-md text-deep-forest font-bold">تحميل الكتالوجات الفنية</h3>
          <button onclick="document.getElementById('catalogs-modal').style.display='none'" class="w-8 h-8 rounded-full bg-surface-gray hover:bg-outline-variant/30 flex items-center justify-center">
            <span class="material-symbols-outlined text-on-surface">close</span>
          </button>
        </div>
        <p class="text-sm text-on-surface-variant mb-6">اختر الكتالوج الذي ترغب في تحميله للحصول على كامل المواصفات الفنية والموديلات:</p>
        <div class="space-y-3">
          <a href="DESIGN.md" download class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-primary/5 transition-all group">
            <span class="font-bold text-on-surface group-hover:text-primary">كتالوج القواطع الكهربائية الذكية</span>
            <span class="material-symbols-outlined text-primary">download</span>
          </a>
          <a href="DESIGN.md" download class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-primary/5 transition-all group">
            <span class="font-bold text-on-surface group-hover:text-primary">كتالوج أنظمة التحكم والأتمتة الصناعية</span>
            <span class="material-symbols-outlined text-primary">download</span>
          </a>
          <a href="DESIGN.md" download class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-primary/5 transition-all group">
            <span class="font-bold text-on-surface group-hover:text-primary">كتالوج كابلات الطاقة والتحكم</span>
            <span class="material-symbols-outlined text-primary">download</span>
          </a>
          <a href="DESIGN.md" download class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-primary/5 transition-all group">
            <span class="font-bold text-on-surface group-hover:text-primary">بروفايل شركة الكهرباء الذكية (SEC)</span>
            <span class="material-symbols-outlined text-primary">download</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
};

function applyGlobalCustomSettings(s) {
  if (!s) return;
  
  // 1. Font Family
  if (s.fontFamily) {
    const fontName = s.fontFamily;
    const googleFonts = ['Cairo', 'Tajawal', 'Amiri', 'El Messiri', 'Montserrat', 'Inter', 'Roboto', 'Outfit'];
    if (googleFonts.includes(fontName)) {
      const linkId = 'custom-google-font';
      let link = document.getElementById(linkId);
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@300;400;500;600;700;800&display=swap`;
    }
    
    const styleId = 'custom-global-styles';
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.textContent = `
      body, html, *, button, input, select, textarea, span, p, h1, h2, h3, h4, h5, h6, a {
        font-family: '${fontName}', sans-serif !important;
      }
    `;
  }
  
  // 2. Logo Width Override
  if (s.logoWidth) {
    const logoStyleId = 'custom-logo-styles';
    let logoStyle = document.getElementById(logoStyleId);
    if (!logoStyle) {
      logoStyle = document.createElement('style');
      logoStyle.id = logoStyleId;
      document.head.appendChild(logoStyle);
    }
    logoStyle.textContent = `
      header img, .shrink-0.h-12.w-auto img, img[alt*="Logo"], img[alt*="logo"] {
        width: ${s.logoWidth}px !important;
        max-width: none !important;
        height: auto !important;
      }
    `;
  }
}

function initFloatingContactButtons(s) {
  if (!s) return;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  let container = document.getElementById('floating-contact-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'floating-contact-container';
    container.className = 'fixed bottom-6 left-6 z-[9999] flex flex-col gap-3';
    document.body.appendChild(container);
  }
  
  const phone = s.phone || (s.phones && s.phones[0]) || '966500000000';
  const cleanPhone = phone.replace('+', '').replace(/ /g, '');
  
  let whatsappUrl = s.whatsapp || `https://wa.me/${cleanPhone}`;
  if (whatsappUrl && !whatsappUrl.startsWith('http')) {
    whatsappUrl = 'https://' + whatsappUrl;
  }
  
  if (!document.getElementById('floating-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'floating-animation-styles';
    style.textContent = `
      @keyframes float-pulse {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4); }
        50% { transform: scale(1.08); box-shadow: 0 4px 24px rgba(37, 211, 102, 0.6); }
      }
      @keyframes float-pulse-blue {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 14px rgba(0, 105, 84, 0.4); }
        50% { transform: scale(1.08); box-shadow: 0 4px 24px rgba(0, 105, 84, 0.6); }
      }
      .animate-float-whatsapp {
        animation: float-pulse 2s infinite ease-in-out;
      }
      .animate-float-call {
        animation: float-pulse-blue 2s infinite ease-in-out 1s;
      }
      @media (max-width: 768px) {
        #floating-contact-container {
          bottom: 5.5rem !important; /* Raise buttons above bottom nav bar */
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  container.innerHTML = `
    <!-- WhatsApp Floating Button -->
    <a href="${whatsappUrl}" target="_blank" class="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 relative group animate-float-whatsapp">
      <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.019 14.111.996 11.487.996c-5.43 0-9.852 4.37-9.856 9.8.001 2.03.535 4.022 1.547 5.751l-.995 3.637 3.733-.972-.259-.155zm11.382-7.51c-.329-.164-1.94-.954-2.24-1.064-.3-.11-.518-.165-.736.164-.219.33-.847 1.064-1.037 1.282-.19.219-.38.247-.708.082-.329-.164-1.389-.51-2.645-1.63-1.027-.917-1.72-2.05-1.921-2.378-.201-.329-.022-.507.142-.671.148-.148.33-.384.494-.576.164-.192.219-.33.329-.549.11-.219.055-.411-.027-.576-.082-.164-.736-1.77-.999-2.428-.27-.643-.54-.549-.736-.549h-.627c-.218 0-.573.082-.873.411-.3.33-1.146 1.118-1.146 2.723 0 1.605 1.171 3.155 1.334 3.374.163.219 2.304 3.516 5.58 4.931.78.337 1.389.538 1.862.689.784.249 1.497.214 2.061.13.629-.094 1.94-.794 2.212-1.529.273-.735.273-1.365.191-1.498-.082-.132-.3-.219-.628-.383z"/>
      </svg>
      <span class="absolute right-16 bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md font-bold">
        ${isEn ? 'Chat on WhatsApp' : 'تواصل معنا عبر واتساب'}
      </span>
    </a>
    
    <!-- Direct Call Floating Button -->
    <a href="tel:${cleanPhone}" class="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 relative group animate-float-call">
      <span class="material-symbols-outlined text-[28px]">call</span>
      <span class="absolute right-16 bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md font-bold">
        ${isEn ? 'Call Us' : 'اتصل بنا مباشرة'}
      </span>
    </a>
  `;
}

function initMobileBottomNavigation() {
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'dashboard.html') return; // Do not render on dashboard

  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';

  // Check if already exists, if not create it
  let bottomNav = document.getElementById('mobile-bottom-nav');
  if (!bottomNav) {
    bottomNav = document.createElement('div');
    bottomNav.id = 'mobile-bottom-nav';
    bottomNav.className = 'md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant flex justify-around items-center py-3 z-50';
    document.body.appendChild(bottomNav);
  }

  // Determine active states based on current page
  const isHome = page === 'index.html' || page === '';
  const isProducts = page === 'products.html';
  const isBrands = page === 'brands.html';

  bottomNav.innerHTML = `
    <a class="flex flex-col items-center ${isHome ? 'text-primary font-bold' : 'text-on-surface-variant'}" href="index.html">
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${isHome ? 1 : 0};">home</span>
      <span class="text-[10px] font-label-sm">${isEn ? 'Home' : 'الرئيسية'}</span>
    </a>
    <a class="flex flex-col items-center ${isProducts ? 'text-primary font-bold' : 'text-on-surface-variant'}" href="products.html">
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${isProducts ? 1 : 0};">category</span>
      <span class="text-[10px] font-label-sm">${isEn ? 'Products' : 'المنتجات'}</span>
    </a>
    <a class="flex flex-col items-center ${isBrands ? 'text-primary font-bold' : 'text-on-surface-variant'}" href="brands.html">
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${isBrands ? 1 : 0};">verified</span>
      <span class="text-[10px] font-label-sm">${isEn ? 'Brands' : 'العلامات التجارية'}</span>
    </a>
    <a class="flex flex-col items-center text-on-surface-variant" href="javascript:void(0);" id="mobile-bottom-nav-menu-btn">
      <span class="material-symbols-outlined">menu</span>
      <span class="text-[10px] font-label-sm">${isEn ? 'More' : 'المزيد'}</span>
    </a>
  `;

  // Bind click listener for "More" button
  const menuBtn = document.getElementById('mobile-bottom-nav-menu-btn');
  if (menuBtn) {
    menuBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof window.toggleMobileMenu === 'function') {
        window.toggleMobileMenu();
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof SiteData === 'undefined') return;

  const data = SiteData.getData();
  const page = location.pathname.split('/').pop() || 'index.html';
  const lang = localStorage.getItem('electric_house_lang') || 'ar';

  // Apply visual font customization and logo width overrides
  applyGlobalCustomSettings(data.settings);

  // Initialize WhatsApp & Call floating buttons on all public pages
  if (page !== 'dashboard.html') {
    initFloatingContactButtons(data.settings);
  }

  // Apply visual transitions & loaders
  setupTransitionsAndLoaders();

  renderHeader(data.settings, page);
  renderFooter(data.settings);
  updateCartBadge();

  // Apply layout translation globally
  applyLayoutTranslations(lang);

  // Initialize Dynamic Mobile Bottom Navigation on all public pages
  initMobileBottomNavigation();

  // Set active nav link based on current page
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    link.className = "text-on-surface-variant hover:text-primary transition-all text-label-lg font-label-lg pb-1";
    const href = link.getAttribute('href');
    if (href === page || (page === 'project-detail.html' && href === 'projects.html')) {
      link.className = "text-primary border-b-2 border-primary font-bold pb-1 text-label-lg font-label-lg";
    }
  });

  // Update WhatsApp links globally across all pages
  document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
    if (data.settings.whatsapp) {
      el.href = data.settings.whatsapp;
    }
  });

  const renderers = {
    'index.html': () => renderHomePage(data),
    'about.html': () => renderAboutPage(data),
    'services.html': () => renderServicesPage(data),
    'products.html': () => renderProductsPage(data),
    'product-detail.html': () => renderProductDetailPage(data),
    'brands.html': () => renderBrandsPage(data),
    'projects.html': () => renderProjectsPage(data),
    'project-detail.html': () => renderProjectDetailPage(data),
    'offers.html': () => renderOffersPage(data),
    'blog.html': () => renderBlogPage(data),
    'faq.html': () => renderFaqPage(data),
    'contact.html': () => renderContactPage(data),
    'cart.html': () => renderCartPage(data),
    'thank-you.html': () => renderThankYouPage(data)
  };
  if (renderers[page]) renderers[page]();

  // Setup scroll animations using Intersection Observer
  setupScrollAnimations();

  // Initialize statistics count-up animations
  initStatsCounterAnimations();
  
  // Initialize dynamic DOM translator
  initDynamicTranslator();

  // Hook up expert and catalog buttons globally
  const contactExpertBtns = Array.from(document.querySelectorAll('button')).filter(btn => 
    btn.textContent.includes('تواصل مع خبير') || 
    btn.textContent.includes('Contact an Expert') || 
    btn.textContent.includes('تحدث مع خبير') || 
    btn.textContent.includes('Talk to an Expert') ||
    btn.textContent.includes('تواصل مع مستشار فني') ||
    btn.textContent.includes('Contact a technical consultant') ||
    btn.textContent.includes('Contact technical consultant')
  );
  contactExpertBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      window.open(data.settings.whatsapp || 'https://wa.me/963986001965', '_blank');
    };
  });

  const downloadBtns = Array.from(document.querySelectorAll('button')).filter(btn => btn.textContent.includes('تحميل الكتالوجات') || btn.textContent.includes('Download Catalogs') || btn.textContent.includes('تحميل بروفايل الشركة') || btn.textContent.includes('Download Company Profile'));
  downloadBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      window.openCatalogsModal();
    };
  });

  const browseCatalogBtns = Array.from(document.querySelectorAll('button')).filter(btn => 
    btn.textContent.includes('تصفح كتالوج المنتجات') || 
    btn.textContent.includes('Browse products catalog') || 
    btn.textContent.includes('تصفح الكتالوج') ||
    btn.textContent.includes('Browse catalog')
  );
  browseCatalogBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      window.location.href = 'products.html';
    };
  });
});

/* ========== HEADER ========== */
function renderHeader(s, currentPage) {
  const header = document.querySelector('header');
  if (!header) return;

  // Dynamically remove My Account (حسابي) and Favorites (المفضلة) from public website header
  const accountLink = header.querySelector('a[href="dashboard.html"]');
  if (accountLink) accountLink.remove();
  
  const favBtn = Array.from(header.querySelectorAll('button, a')).find(el => 
    el.textContent.includes('المفضلة') || 
    el.textContent.includes('Favorites') || 
    el.querySelector('.material-symbols-outlined')?.textContent === 'favorite'
  );
  if (favBtn) favBtn.remove();

  // Setup Global Header Search Input wiring to support search on products & services
  const searchInput = header.querySelector('input[placeholder]');
  if (searchInput && !searchInput.dataset.globalSearchListener) {
    searchInput.dataset.globalSearchListener = 'true';
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        const page = location.pathname.split('/').pop() || 'index.html';
        if (page !== 'products.html') {
          window.location.href = 'products.html?search=' + encodeURIComponent(query);
        } else {
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });
  }

  // 1. Inject Mobile CSS Overrides
  if (!document.getElementById('mobile-header-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-header-styles';
    style.textContent = `
      @media (max-width: 768px) {
        /* Hide Top Utility Bar */
        header > div > div:first-of-type {
          display: none !important;
        }
        /* Compact Main Header Bar */
        header > div > div:nth-of-type(2) {
          flex-wrap: wrap !important;
          padding: 0.5rem 1.0rem !important;
          gap: 0.5rem !important;
        }
        /* Search bar full width */
        header > div > div:nth-of-type(2) > div:nth-of-type(2) {
          order: 3 !important;
          width: 100% !important;
          max-width: 100% !important;
          margin-top: 0.25rem !important;
        }
        /* Logo sizing */
        header > div > div:nth-of-type(2) > div:first-of-type {
          height: 2.2rem !important;
        }
        /* Hide action labels */
        header > div > div:nth-of-type(2) > div:nth-of-type(3) span.text-label-sm {
          display: none !important;
        }
        header > div > div:nth-of-type(2) > div:nth-of-type(3) {
          gap: 0.75rem !important;
        }
        /* Hide desktop nav */
        header nav {
          display: none !important;
        }
        /* Make hero carousel responsive */
        section.relative {
          height: 380px !important;
        }
        section.relative h1 {
          font-size: 24px !important;
          line-height: 32px !important;
        }
        section.relative p {
          font-size: 14px !important;
          line-height: 20px !important;
          margin-bottom: 1.5rem !important;
        }
        section.relative a {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Add Mobile Toggle Hamburger Button
  const mainHeaderBar = header.querySelector('div > div:nth-of-type(2)');
  if (mainHeaderBar && !document.getElementById('mobile-menu-toggle')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'mobile-menu-toggle';
    toggleBtn.className = 'md:hidden p-1.5 text-deep-forest hover:bg-surface-gray rounded-lg order-first flex items-center justify-center';
    toggleBtn.innerHTML = '<span class="material-symbols-outlined text-[28px]">menu</span>';
    mainHeaderBar.insertBefore(toggleBtn, mainHeaderBar.firstChild);
    toggleBtn.onclick = () => { window.toggleMobileMenu(); };
  }

  // Dynamic navigation injection for Services page
  const nav = header.querySelector('nav');
  if (nav) {
    // Normalize existing links to prevent duplication
    nav.querySelectorAll('a').forEach(a => {
      const text = (a.textContent || '').trim();
      const href = a.getAttribute('href');
      if ((href === '#' || !href) && (text === 'العروض' || text === 'Offers')) {
        a.setAttribute('href', 'offers.html');
      }
    });
    if (!nav.querySelector('a[href="services.html"], .nav-dropdown')) {
      const servicesLink = document.createElement('a');
      servicesLink.href = 'services.html';
      servicesLink.textContent = 'الخدمات';
      servicesLink.className = 'text-on-surface-variant hover:text-primary transition-all text-label-lg font-label-lg pb-1';
      const links = Array.from(nav.children);
      const aboutIdx = links.findIndex(l => l.getAttribute?.('href') === 'about.html');
      if (aboutIdx !== -1) nav.insertBefore(servicesLink, links[aboutIdx + 1] || null);
      else nav.appendChild(servicesLink);
    }
    if (!nav.querySelector('a[href="offers.html"]')) {
      const offersLink = document.createElement('a');
      offersLink.href = 'offers.html';
      offersLink.textContent = 'العروض';
      offersLink.className = 'text-on-surface-variant hover:text-primary transition-all text-label-lg font-label-lg pb-1';
      const links = Array.from(nav.children);
      const servicesLinkIndex = links.findIndex(l => l.getAttribute?.('href') === 'services.html');
      if (servicesLinkIndex !== -1 && servicesLinkIndex + 1 < links.length) {
        nav.insertBefore(offersLink, links[servicesLinkIndex + 1]);
      } else {
        nav.appendChild(offersLink);
      }
    }
  }

  // === GLOBAL DROPDOWN NAV UPGRADE ===
  // Inject dropdown CSS globally (once) and upgrade nav links to dropdown menus
  if (!document.getElementById('global-dropdown-css')) {
    const dropCSS = document.createElement('style');
    dropCSS.id = 'global-dropdown-css';
    dropCSS.textContent = `
      .nav-dropdown { position: relative; }
      .nav-dropdown-menu {
        display: none; position: absolute; top: calc(100% + 8px); right: 0;
        background: white; border: 1px solid #bccac3; border-radius: 12px;
        box-shadow: 0 10px 36px rgba(0,105,84,0.13); min-width: 220px;
        z-index: 200; padding: 8px 0; direction: rtl;
      }
      .nav-dropdown:hover .nav-dropdown-menu { display: block; }
      .nav-dropdown-menu a {
        display: flex; align-items: center; gap: 8px; padding: 10px 16px;
        color: #3d4945; font-size: 14px; transition: all 0.18s;
        border-right: 3px solid transparent; text-decoration: none;
        font-family: 'Cairo', sans-serif;
      }
      .nav-dropdown-menu a:hover { color: #006954; background: #f1f3ff; border-right-color: #006954; }
      .nav-dropdown-menu .drop-section-title {
        padding: 8px 16px 3px; font-size: 11px; font-weight: 700; color: #6d7a74;
        letter-spacing: 0.05em; font-family: 'Cairo', sans-serif;
      }
      .nav-dropdown-menu .drop-divider { height: 1px; background: #e0e7e5; margin: 4px 12px; }
      .nav-dropdown-trigger { display: inline-flex; align-items: center; gap: 3px; cursor: pointer; }
      .nav-dropdown-trigger .drop-arr { font-size: 18px; transition: transform 0.22s; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      .nav-dropdown:hover .drop-arr { transform: rotate(180deg); }
    `;
    document.head.appendChild(dropCSS);
  }

  // Upgrade existing nav links to rich dropdowns (runs once per page load)
  const navForDrop = header.querySelector('nav');
  if (navForDrop && !navForDrop.dataset.dropdownDone) {
    navForDrop.dataset.dropdownDone = 'true';
    const isEn = (localStorage.getItem('electric_house_lang') || 'ar') === 'en';

    // 1. Upgrade services link → dropdown
    const srvLink = navForDrop.querySelector('a[href="services.html"]');
    if (srvLink && !srvLink.closest('.nav-dropdown')) {
      const wr = document.createElement('div');
      wr.className = 'nav-dropdown';
      wr.innerHTML = `
        <span class="nav-dropdown-trigger text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg">
          ${isEn ? 'Services' : 'الخدمات'}
          <span class="material-symbols-outlined drop-arr">expand_more</span>
        </span>
        <div class="nav-dropdown-menu">
          <a href="services.html"><span class="material-symbols-outlined text-[17px] text-primary">electric_bolt</span>${isEn ? 'All Services' : 'جميع الخدمات'}</a>
          <a href="services.html#electrical"><span class="material-symbols-outlined text-[17px] text-primary">electrical_services</span>${isEn ? 'Electrical Solutions' : 'الحلول الكهربائية'}</a>
          <a href="services.html#solar"><span class="material-symbols-outlined text-[17px] text-primary">solar_power</span>${isEn ? 'Solar Energy' : 'الطاقة الشمسية'}</a>
          <a href="services.html#automation"><span class="material-symbols-outlined text-[17px] text-primary">precision_manufacturing</span>${isEn ? 'Industrial Automation' : 'الأتمتة الصناعية'}</a>
          <a href="services.html#agriculture"><span class="material-symbols-outlined text-[17px] text-primary">grass</span>${isEn ? 'Agricultural Solutions' : 'الحلول الزراعية'}</a>
        </div>`;
      srvLink.parentNode.insertBefore(wr, srvLink);
      srvLink.remove();
    }

    // 2. Upgrade products link → dropdown
    const prdLink = navForDrop.querySelector('a[href="products.html"]');
    if (prdLink && !prdLink.closest('.nav-dropdown')) {
      const wr = document.createElement('div');
      wr.className = 'nav-dropdown';
      wr.innerHTML = `
        <span class="nav-dropdown-trigger text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg">
          ${isEn ? 'Products' : 'المنتجات'}
          <span class="material-symbols-outlined drop-arr">expand_more</span>
        </span>
        <div class="nav-dropdown-menu">
          <a href="products.html"><span class="material-symbols-outlined text-[17px] text-primary">inventory_2</span>${isEn ? 'All Products' : 'جميع المنتجات'}</a>
          <div class="drop-divider"></div>
          <div class="drop-section-title">${isEn ? 'By Category' : 'تصفح حسب الفئة'}</div>
          <a href="products.html?cat=${encodeURIComponent('أنظمة الحماية الكهربائية')}"><span class="material-symbols-outlined text-[17px] text-primary">security</span>${isEn ? 'Protection Systems' : 'أنظمة الحماية'}</a>
          <a href="products.html?cat=${encodeURIComponent('أنظمة القيادة والتحكم')}"><span class="material-symbols-outlined text-[17px] text-primary">settings_input_component</span>${isEn ? 'Control Systems' : 'القيادة والتحكم'}</a>
          <a href="products.html?cat=${encodeURIComponent('الأتمتة الصناعية')}"><span class="material-symbols-outlined text-[17px] text-primary">smart_toy</span>${isEn ? 'Industrial Automation' : 'الأتمتة الصناعية'}</a>
          <a href="products.html?cat=${encodeURIComponent('الأنظمة الكهروميكانيكية والحركة')}"><span class="material-symbols-outlined text-[17px] text-primary">conveyor_belt</span>${isEn ? 'Electromechanical' : 'الكهروميكانيكية'}</a>
          <div class="drop-divider"></div>
          <a href="offers.html"><span class="material-symbols-outlined text-[17px] text-primary">local_offer</span>${isEn ? 'Special Offers' : 'العروض الخاصة'}</a>
        </div>`;
      prdLink.parentNode.insertBefore(wr, prdLink);
      prdLink.remove();
    }

    // 3. Add FAQ link if not already present
    if (!navForDrop.querySelector('a[href="faq.html"]')) {
      const faqA = document.createElement('a');
      faqA.href = 'faq.html';
      faqA.textContent = isEn ? 'FAQ' : 'الأسئلة الشائعة';
      faqA.className = 'text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg';
      const contactA = navForDrop.querySelector('a[href="contact.html"]');
      if (contactA) navForDrop.insertBefore(faqA, contactA);
      else navForDrop.appendChild(faqA);
    }
  }

  // Logo
  const logo = header.querySelector('img');
  if (logo) {
    if (s.logoUrl) logo.src = s.logoUrl;
    const parent = logo.parentElement;
    if (parent) {
      parent.classList.remove('h-12');
      parent.classList.add('h-16', 'md:h-20');
    }
  }
  
  // Update phone numbers
  const spans = header.querySelectorAll('span');
  spans.forEach(sp => {
    sp.childNodes.forEach(node => {
      if (node.nodeType === 3) { // Text Node
        const val = node.nodeValue.trim();
        if (val === '920000000' || val.match(/^9\d{8}$/)) {
          node.nodeValue = ' ' + s.phone;
        }
      }
    });
  });

  // Language switcher setup
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const utilsBar = header.querySelector('.flex.justify-between.items-center');
  if (utilsBar) {
    const langContainer = utilsBar.querySelector('.flex.gap-4:last-of-type');
    if (langContainer) {
      langContainer.innerHTML = `
        <span class="text-sm font-semibold flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">payments</span>
          <span>${lang === 'ar' ? 'دولار أمريكي ($)' : 'USD ($)'}</span>
        </span>
      `;
    }
  }

  // Mobile Menu Drawer Function
  window.toggleMobileMenu = function() {
    let drawer = document.getElementById('mobile-menu-drawer');
    const currentLang = localStorage.getItem('electric_house_lang') || 'ar';
    const isEn = currentLang === 'en';
    
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobile-menu-drawer';
      drawer.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-opacity duration-300 opacity-0 pointer-events-none';
      
      drawer.innerHTML = `
        <div class="bg-white w-72 h-full shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 transform translate-x-full absolute right-0" style="font-family: Cairo, sans-serif;">
          <div>
            <div class="flex justify-between items-center mb-8">
              <h3 class="font-bold text-lg text-deep-forest">${isEn ? 'Navigation' : 'القائمة الرئيسية'}</h3>
              <button onclick="window.toggleMobileMenu()" class="w-8 h-8 rounded-full bg-surface-gray flex items-center justify-center text-on-surface">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <nav class="flex flex-col gap-4 text-right">
              <a href="index.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">home</span>
                <span>${isEn ? 'Home' : 'الرئيسية'}</span>
              </a>
              <a href="about.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">info</span>
                <span>${isEn ? 'About Us' : 'من نحن'}</span>
              </a>
              <a href="services.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">engineering</span>
                <span>${isEn ? 'Services' : 'الخدمات'}</span>
              </a>
              <a href="products.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
                <span>${isEn ? 'Products' : 'المنتجات'}</span>
              </a>
              <a href="brands.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">verified</span>
                <span>${isEn ? 'Brands' : 'العلامات التجارية'}</span>
              </a>
              <a href="projects.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">business_center</span>
                <span>${isEn ? 'Projects' : 'المشاريع'}</span>
              </a>
              <a href="offers.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">local_offer</span>
                <span>${isEn ? 'Offers' : 'العروض'}</span>
              </a>
              <a href="blog.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">article</span>
                <span>${isEn ? 'Knowledge Center' : 'مركز المعرفة'}</span>
              </a>
              <a href="contact.html" class="flex items-center gap-3 py-2 px-3 hover:bg-primary/5 rounded-lg text-on-surface hover:text-primary transition-all font-semibold">
                <span class="material-symbols-outlined text-primary text-[20px]">call</span>
                <span>${isEn ? 'Contact Us' : 'اتصل بنا'}</span>
              </a>
            </nav>
          </div>
          
          <div class="border-t border-outline-variant/30 pt-6 space-y-4">
            <div class="flex justify-center items-center">
               <span class="text-sm font-bold text-deep-forest">${isEn ? 'USD ($)' : 'دولار أمريكي ($)'}</span>
            </div>
            <div class="text-[11px] text-on-surface-variant text-center">
              ${isEn ? 'Smart Electricity Company' : 'شركة الكهرباء الذكية'}
            </div>
          </div>
        </div>
      `;
      
      if (document.documentElement.dir === 'ltr' || document.body.classList.contains('LTR')) {
        const innerDiv = drawer.querySelector('.w-72');
        innerDiv.classList.remove('right-0', 'translate-x-full');
        innerDiv.classList.add('left-0', '-translate-x-full');
      }
      
      drawer.onclick = (e) => {
        if (e.target === drawer) {
          window.toggleMobileMenu();
        }
      };
      
      document.body.appendChild(drawer);
    }
    
    const isOpen = drawer.classList.contains('opacity-100');
    const inner = drawer.querySelector('.w-72');
    const isLtr = document.documentElement.dir === 'ltr' || document.body.classList.contains('LTR');
    
    if (isOpen) {
      drawer.classList.remove('opacity-100');
      drawer.classList.add('opacity-0', 'pointer-events-none');
      if (isLtr) {
        inner.classList.add('-translate-x-full');
      } else {
        inner.classList.add('translate-x-full');
      }
    } else {
      drawer.classList.remove('opacity-0', 'pointer-events-none');
      drawer.classList.add('opacity-100');
      if (isLtr) {
        inner.classList.remove('-translate-x-full');
      } else {
        inner.classList.remove('translate-x-full');
      }
    }
  };
}

/* ========== FOOTER ========== */
function renderFooter(s) {
  const footer = document.querySelector('footer');
  if (!footer) return;
  // Company name replaced with logo image if available
  const nameEl = footer.querySelector('.font-headline-md');
  if (nameEl) {
    if (s.logoUrl) {
      nameEl.innerHTML = `<img src="${s.logoUrl}" alt="${s.siteNameAr || s.siteName}" class="max-h-16 w-auto object-contain mb-4">`;
    } else {
      nameEl.textContent = s.siteName;
    }
  }
  // Copyright
  const copy = footer.querySelector('.text-white\\/60, [class*="text-white/60"]');
  if (copy) {
    const lang = localStorage.getItem('electric_house_lang') || 'ar';
    const copyText = lang === 'ar' 
      ? `جميع الحقوق محفوظة لشركة ${s.siteNameAr || 'الكهرباء الذكية'} © ${new Date().getFullYear()}`
      : `All rights reserved to ${s.siteNameEn || s.siteName || 'Smart Electricity Company'} © ${new Date().getFullYear()}`;
    
    copy.className = "flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 w-full mt-4 border-t border-white/10 pt-4";
    copy.innerHTML = `
      <span>${copyText}</span>
      <button onclick="toggleLanguage()" class="inline-flex items-center gap-1.5 bg-white/10 hover:bg-primary hover:text-white text-white/90 py-1.5 px-4 rounded-full font-bold text-xs transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
        <span class="material-symbols-outlined text-sm">language</span>
        <span>${lang === 'ar' ? 'English' : 'العربية'}</span>
      </button>
    `;
  }

  // Update social media links dynamically
  const socialContainer = footer.querySelector('.flex.gap-4');
  if (socialContainer) {
    const PLATFORM_SVGS = {
      facebook: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>`,
      instagram: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
      twitter: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      linkedin: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      youtube: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
      tiktok: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.07 1.21 2.58 1.9 4.18 2.03v3.85c-1.89-.08-3.71-.84-5.12-2.12-.09-.08-.16-.17-.24-.25v6.52c.06 3.15-1.95 6.09-4.97 7.02-3.29 1.08-6.99-.45-8.49-3.56-1.57-3.14-.62-7.14 2.24-9.15 1.52-1.07 3.42-1.47 5.23-1.1v3.9c-1.35-.38-2.83-.02-3.85.93-1.06 1-1.4 2.63-.84 4.01.55 1.45 2.1 2.37 3.65 2.22 1.66-.09 3.02-1.46 3.05-3.12V.02z"/></svg>`,
      snapchat: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M12.012 1.66c-3.18 0-6.19 2.06-6.19 6.27 0 1.25.43 2.15.81 2.87.23.44.41.87.11 1.24-.19.23-.55.45-.96.65-.67.33-1.41.69-1.41 1.45 0 .54.41.87.97.97.31.06.63.02.94-.02.5-.06.74.22.84.5.17.47-.19 1.13-.57 1.83-.34.62-.77 1.41-.33 1.9.23.25.68.39 1.34.39.46 0 .97-.07 1.44-.14.65-.1 1.03.21 1.18.52.27.53-.16 1.43-.65 2.45-.33.68-.74 1.52-.37 2.08.31.47 1.05.6 1.88.6.61 0 1.27-.07 1.83-.18.79-.15 1.13.25 1.25.55.22.56-.23 1.41-.72 2.37-.36.71-.82 1.6-.4 2.18.33.47 1.1.59 1.94.59 1.15 0 2.26-.2 3.12-.59.73-.33 1.12-.86 1.12-1.57 0-1.12-1.2-2.12-2.15-2.91-.45-.38-.85-.71-.85-1.18 0-.46.39-.77.85-1.12.96-.74 2.15-1.65 2.15-2.88 0-.75-.41-1.28-1.12-1.61-.86-.39-1.94-.78-1.94-1.5 0-.46.39-.78.85-1.14.96-.75 2.15-1.68 2.15-2.93 0-4.21-3.01-6.27-6.19-6.27z"/></svg>`,
      telegram: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 6.6 5.344 11.944 11.944 11.944 6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0zm5.833 8.361l-1.972 9.278c-.139.639-.528.806-1.056.514l-3.056-2.25-1.472 1.417c-.167.167-.306.306-.625.306l.222-3.125 5.694-5.139c.25-.222-.056-.347-.389-.125l-7.042 4.431-3.028-.944c-.667-.208-.681-.667.139-.986l11.833-4.556c.556-.208 1.042.125.861.986z"/></svg>`,
      pinterest: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 11.988-5.366 11.988-11.987C23.988 5.367 18.627 0 12.017 0z"/></svg>`,
      whatsapp: `<svg class="w-3 h-3 fill-current text-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.117-2.875-6.974-1.858-1.857-4.339-2.876-6.979-2.877-5.442 0-9.868 4.42-9.873 9.869-.001 1.699.444 3.359 1.29 4.825L1.879 21.8l4.768-1.251zM17.43 14.33c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>`
    };
    let html = '';
    for (const key in PLATFORM_SVGS) {
      if (s[key]) {
        html += `<a class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="${s[key]}" target="_blank" title="${key}">${PLATFORM_SVGS[key]}</a>`;
      }
    }
    if (html) {
      socialContainer.innerHTML = html;
      socialContainer.classList.add('flex-wrap', 'gap-2');
      socialContainer.classList.remove('gap-4');
    }
  }

  // Update footer categories dynamically
  const categoriesCol = Array.from(footer.querySelectorAll('.space-y-4')).find(col => {
    const h3 = col.querySelector('h3');
    return h3 && (h3.textContent.includes('تسوق') || h3.textContent.includes('Shop') || h3.textContent.includes('القسم') || h3.textContent.includes('Category'));
  });
  
  if (categoriesCol) {
    const h3 = categoriesCol.querySelector('h3');
    const lang = localStorage.getItem('electric_house_lang') || 'ar';
    const isEn = lang === 'en';
    if (h3) h3.textContent = isEn ? 'Product Categories' : 'أقسام المنتجات';
    
    const ul = categoriesCol.querySelector('ul');
    if (ul) {
      const dbCategories = (typeof SiteData !== 'undefined') ? (SiteData.getData('categories') || []) : [];
      ul.innerHTML = dbCategories.map(cat => {
        const cName = isEn ? (CATEGORY_TRANSLATIONS[cat] || cat) : cat;
        return `<li><a class="hover:text-primary-fixed transition-colors" href="products.html?category=${encodeURIComponent(cat)}">${cName}</a></li>`;
      }).join('');
    }
  }

  // Rename Blog link to Knowledge Center in footer quick links
  const quickLinksCol = Array.from(footer.querySelectorAll('.space-y-4')).find(col => {
    const h3 = col.querySelector('h3');
    return h3 && (h3.textContent.includes('روابط') || h3.textContent.includes('Quick') || h3.textContent.includes('سريعة'));
  });
  if (quickLinksCol) {
    const lang = localStorage.getItem('electric_house_lang') || 'ar';
    const isEn = lang === 'en';
    const blogLink = quickLinksCol.querySelector('a[href="blog.html"]');
    if (blogLink) {
      blogLink.textContent = isEn ? 'Knowledge Center' : 'مركز المعرفة';
    }
  }
}

/* ========== VISUAL LOADERS & TRANSITIONS ========== */
function setupTransitionsAndLoaders() {
  if (!document.getElementById('page-loader-style')) {
    const style = document.createElement('style');
    style.id = 'page-loader-style';
    style.textContent = `
      .page-loader {
        position: fixed;
        inset: 0;
        background: radial-gradient(circle, #006954 0%, #004A3C 100%);
        z-index: 100000;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        justify-content: center;
        transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.4s;
      }
      .page-loader.fade-out {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
      .loader-spinner-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .loader-spinner {
        width: 64px;
        height: 64px;
        border: 4px solid rgba(255,255,255,0.05);
        border-top: 4px solid #86f7d6;
        border-radius: 50%;
        animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        box-shadow: 0 0 20px rgba(134, 247, 214, 0.2);
      }
      .loader-logo {
        position: absolute;
        font-family: 'Cairo', sans-serif;
        color: #ffffff;
        font-weight: 800;
        font-size: 10px;
        letter-spacing: 1px;
        animation: pulse 1.5s ease-in-out infinite;
      }
      .loader-text {
        color: rgba(255, 255, 255, 0.8);
        font-family: 'Cairo', sans-serif;
        font-weight: 700;
        font-size: 14px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        letter-spacing: 0.5px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; transform: scale(0.95); }
        50% { opacity: 1; transform: scale(1.05); }
      }
      
      .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .scroll-reveal.reveal-active {
        opacity: 1;
        transform: translateY(0);
      }
      .stagger-1 { transition-delay: 0.08s; }
      .stagger-2 { transition-delay: 0.16s; }
      .stagger-3 { transition-delay: 0.24s; }
      .stagger-4 { transition-delay: 0.32s; }
      
      .hover-lift {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
      }
      .hover-lift:hover {
        transform: translateY(-6px);
        border-color: rgba(0, 105, 84, 0.4) !important;
        box-shadow: 0 20px 35px rgba(0, 74, 60, 0.12);
      }
      
      .hover-swell {
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .hover-swell:hover {
        transform: scale(1.03);
      }
      
      .whatsapp-gradient {
        background: linear-gradient(135deg, #25D366, #128C7E);
      }

      /* Ripple Effect Styles */
      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        background-color: rgba(255, 255, 255, 0.35);
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Loaders and page exit transition removed for instantaneous page loading

  // Global Ripple Effect on Buttons
  document.addEventListener('click', function (e) {
    const target = e.target.closest('button, .btn-primary, .btn-secondary, a[href="products.html"]');
    if (!target) return;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    // Position ripple
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    
    // Set offsets
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);
    
    // Remove ripple after animation completes
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
}

/* ========== INTERACTIVE SCROLL REVEAL ========== */
function setupScrollAnimations() {
  const selectors = [
    'section',
    'footer',
    '.grid > div',
    '.card',
    'article',
    '#services-page-grid > div',
    '#offers-products-grid > div'
  ];
  
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, index) => {
      if (el.closest('header') || el.closest('#project-hero') || el.closest('section.relative')) return;
      el.classList.add('scroll-reveal');
      el.classList.add('hover-lift');
      
      const gridIndex = index % 4;
      if (gridIndex > 0) {
        el.classList.add('stagger-' + gridIndex);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

/* ========== DOM TRANSLATOR ========== */
function applyLayoutTranslations(lang) {
  const t = TRANSLATIONS[lang];
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  // Update class lists for RTL/LTR changes
  if (lang === 'en') {
    document.body.classList.remove('RTL');
    document.body.classList.add('LTR');
    document.body.style.fontFamily = "'Inter', 'Roboto', sans-serif";
    // Rotate directional symbols
    document.querySelectorAll('.dir-arrow').forEach(el => {
      el.textContent = 'chevron_right';
    });
  } else {
    document.body.classList.remove('LTR');
    document.body.classList.add('RTL');
    document.body.style.fontFamily = "'Cairo', sans-serif";
    document.querySelectorAll('.dir-arrow').forEach(el => {
      el.textContent = 'chevron_left';
    });
  }

  // Scan and translate elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Dynamic translations are now handled by initDynamicTranslator

  // Fallback programmatic translation for layout structures
  const header = document.querySelector('header');
  if (header) {
    const branchesSpan = Array.from(header.querySelectorAll('span')).find(s => s.textContent.includes('فروعنا') || s.textContent.includes('Branches'));
    if (branchesSpan) {
      branchesSpan.innerHTML = `<span class="material-symbols-outlined text-[18px]">location_on</span> ${t.branches}`;
    }

    const accountSpan = header.querySelector('a[href="dashboard.html"] span:last-child');
    if (accountSpan) accountSpan.textContent = t.my_account;

    const favoriteSpan = header.querySelector('button span.text-label-sm');
    if (favoriteSpan) favoriteSpan.textContent = t.favorites;

    const cartSpan = header.querySelector('a[href="cart.html"] span.text-label-sm');
    if (cartSpan) cartSpan.textContent = t.cart;

    const searchInput = header.querySelector('input[placeholder]');
    if (searchInput) searchInput.placeholder = t.search_placeholder;

    // Nav links
    const nav = header.querySelector('nav');
    if (nav) {
      nav.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === 'index.html') a.textContent = t.home;
        else if (href === 'about.html') a.textContent = t.about;
        else if (href === 'services.html') a.textContent = t.services;
        else if (href === 'products.html') a.textContent = t.products;
        else if (href === 'brands.html') a.textContent = t.brands;
        else if (href === 'projects.html') a.textContent = t.projects;
        else if (href === 'offers.html') a.textContent = t.offers;
        else if (href === 'blog.html') a.textContent = t.blog;
        else if (href === 'contact.html') a.textContent = t.contact;
      });
    }

    // Language & Currency Switcher
    const utilBars = header.querySelectorAll('.flex.justify-between .flex.gap-4');
    if (utilBars.length >= 2) {
      const langContainer = utilBars[utilBars.length - 1]; // usually the second one
      const displayLang = lang === 'en' ? 'العربية' : 'English';
      langContainer.innerHTML = `
        <button onclick="toggleLanguage()" class="hover:text-primary font-bold transition-colors" id="lang-switcher">${displayLang}</button>
        <span>${t.currency}</span>
      `;
    }
  }

  const footer = document.querySelector('footer');
  if (footer) {
    const headings = footer.querySelectorAll('h3');
    headings.forEach(h => {
      const val = h.textContent.trim();
      if (val === 'روابط سريعة' || val === 'Quick Links') h.textContent = t.footer_links;
      else if (val === 'تسوق حسب القسم' || val === 'Shop by Category') h.textContent = t.footer_categories;
      else if (val === 'اشترك في النشرة البريدية' || val === 'Subscribe to Newsletter') h.textContent = t.footer_newsletter;
    });

    const newsletterDesc = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.includes('ابقَ') || p.textContent.includes('Stay updated'));
    if (newsletterDesc) newsletterDesc.textContent = t.footer_newsletter_desc;

    const footerDesc = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.includes('شركة رائدة') || p.textContent.includes('A leading provider'));
    if (footerDesc) footerDesc.textContent = t.footer_desc;

    const subscribeBtn = footer.querySelector('button');
    if (subscribeBtn) subscribeBtn.textContent = t.subscribe;

    const emailInput = footer.querySelector('input[type="email"]');
    if (emailInput) emailInput.placeholder = t.email_placeholder;
  }
}

/* ========== INDEX / HOME ========== */
function renderHomePage(data) {
  const h = data.homepage;
  const s = data.settings;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';

  // Hero section
  const heroSection = document.querySelector('section.relative');
  if (heroSection) {
    const heroTitle = heroSection.querySelector('h1');
    if (heroTitle) heroTitle.textContent = getLocalized(h, 'heroTitle', lang);
    const heroDesc = heroSection.querySelector('p');
    if (heroDesc) heroDesc.textContent = getLocalized(h, 'heroDescription', lang);
    const heroSubtitle = heroSection.querySelector('span.text-primary-fixed, span.tracking-widest');
    if (heroSubtitle) heroSubtitle.textContent = getLocalized(h, 'heroSubtitle', lang);

    // Dynamic slideshow
    let images = h.heroImages || [];
    if (!Array.isArray(images) || images.length === 0) {
      images = [h.heroImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg6AW-rBEfnFJxcXgFh3P7KBpWz23OJggV5lfBwSECw3cIJKRlM-q8lgmXUMKPGw0M6S8-xjrBJVKBdkCmIEWGiTm8jdO3sR9kQIAPQ2L4fwTRHpGkWBXnS1FYpDiKqaWgcNvXEllXLnwSUd3epD8PkqiXEZPNQy0k_g2mV3CQRUz_M9bVQV2HQCpqZLQoH-03fwEd9TZZ8fPtLPzHxNhSAhHfHyMGblhInXxjdKkJT8OxBjsm8pMKtLf-EiY4rKvEsllVlsY'];
    }
    images = images.filter(img => img && img.trim() !== '');
    if (images.length === 0) {
      images = ['https://lh3.googleusercontent.com/aida-public/AB6AXuBg6AW-rBEfnFJxcXgFh3P7KBpWz23OJggV5lfBwSECw3cIJKRlM-q8lgmXUMKPGw0M6S8-xjrBJVKBdkCmIEWGiTm8jdO3sR9kQIAPQ2L4fwTRHpGkWBXnS1FYpDiKqaWgcNvXEllXLnwSUd3epD8PkqiXEZPNQy0k_g2mV3CQRUz_M9bVQV2HQCpqZLQoH-03fwEd9TZZ8fPtLPzHxNhSAhHfHyMGblhInXxjdKkJT8OxBjsm8pMKtLf-EiY4rKvEsllVlsY'];
    }

    const innerContainer = heroSection.querySelector('.w-full.h-full.relative');
    if (innerContainer) {
      // Remove existing images
      innerContainer.querySelectorAll('img').forEach(img => img.remove());

      // Create new ones
      const imgElements = images.map((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === 0 ? 'opacity-100' : 'opacity-0'}`;
        img.style.zIndex = '0';
        return img;
      });

      // Position overlay on top
      const overlay = innerContainer.querySelector('.absolute.inset-0');
      if (overlay) {
        overlay.style.zIndex = '10';
      }

      // Append images
      imgElements.forEach(img => {
        innerContainer.insertBefore(img, overlay);
      });

      // Setup transition interval
      if (images.length > 1) {
        let currentIdx = 0;
        if (window.heroSliderInterval) {
          clearInterval(window.heroSliderInterval);
        }

        const nextSlide = () => {
          imgElements[currentIdx].classList.replace('opacity-100', 'opacity-0');
          currentIdx = (currentIdx + 1) % images.length;
          imgElements[currentIdx].classList.replace('opacity-0', 'opacity-100');
        };

        const prevSlide = () => {
          imgElements[currentIdx].classList.replace('opacity-100', 'opacity-0');
          currentIdx = (currentIdx - 1 + images.length) % images.length;
          imgElements[currentIdx].classList.replace('opacity-0', 'opacity-100');
        };

        window.heroSliderInterval = setInterval(nextSlide, 5000);

        // Chevron click listeners
        const nextBtn = heroSection.querySelector('button.absolute.right-4');
        const prevBtn = heroSection.querySelector('button.absolute.left-4');
        if (nextBtn) {
          nextBtn.onclick = (e) => {
            e.preventDefault();
            clearInterval(window.heroSliderInterval);
            nextSlide();
            window.heroSliderInterval = setInterval(nextSlide, 5000);
          };
        }
        if (prevBtn) {
          prevBtn.onclick = (e) => {
            e.preventDefault();
            clearInterval(window.heroSliderInterval);
            prevSlide();
            window.heroSliderInterval = setInterval(nextSlide, 5000);
          };
        }
      }
    }
  }

  // Stats
  if (h.stats) {
    const statEls = document.querySelectorAll('.text-4xl.font-extrabold, .text-headline-xl.font-bold');
    const statLabels = document.querySelectorAll('p.text-outline-variant, p.text-label-lg.font-label-lg.text-white');
    h.stats.forEach((stat, i) => {
      if (statEls[i]) statEls[i].textContent = stat.number;
      if (statLabels[i]) statLabels[i].textContent = getLocalized(stat, 'label', lang);
    });
  }

  // Dynamic About Us Section (Homepage)
  const aboutSecWrapper = document.getElementById('about-section-wrapper');
  if (aboutSecWrapper && data.about) {
    const ab = data.about;
    const homeAboutDesc = document.getElementById('home-about-desc');
    if (homeAboutDesc) homeAboutDesc.textContent = getLocalized(ab, 'description', lang);
    const homeAboutImg = document.getElementById('home-about-img');
    if (homeAboutImg && ab.image) homeAboutImg.src = ab.image;

    // Bento Grid: Mission, Vision, Quote
    const homeAboutMission = document.getElementById('home-about-mission');
    if (homeAboutMission) homeAboutMission.textContent = getLocalized(ab, 'mission', lang);
    const homeAboutVision = document.getElementById('home-about-vision');
    if (homeAboutVision) homeAboutVision.textContent = getLocalized(ab, 'vision', lang);
    const homeAboutQuote = document.getElementById('home-about-quote');
    if (homeAboutQuote) homeAboutQuote.textContent = `"${getLocalized(ab, 'quote', lang)}"`;

    // History Timeline
    const timelineContainer = document.getElementById('home-about-timeline-container');
    if (timelineContainer && ab.timeline) {
      const icons = ['flag', 'trending_up', 'stars', 'rocket', 'workspace_premium'];
      timelineContainer.innerHTML = ab.timeline.map((t, idx) => {
        const tTitle = getLocalized(t, 'title', lang);
        const tDesc = getLocalized(t, 'description', lang);
        const icon = icons[idx % icons.length];
        
        if (idx % 2 === 0) {
          return `
            <div class="relative mb-12 flex justify-between items-center w-full">
              <div class="w-5/12 hidden md:block"></div>
              <div class="z-20 flex items-center justify-center bg-primary text-white w-10 h-10 rounded-full absolute right-1/2 translate-x-1/2 border-4 border-surface">
                <span class="material-symbols-outlined text-sm">${icon}</span>
              </div>
              <div class="w-full md:w-5/12 bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:border-primary transition-colors text-right" dir="rtl">
                <span class="font-bold text-primary mb-2 block">${t.year}</span>
                <h4 class="font-headline-md text-headline-md mb-2 text-deep-forest">${tTitle}</h4>
                <p class="text-on-surface-variant font-body-md leading-relaxed">${tDesc}</p>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="relative mb-12 flex justify-between items-center w-full">
              <div class="w-full md:w-5/12 bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:border-primary transition-colors text-right" dir="rtl">
                <span class="font-bold text-primary mb-2 block">${t.year}</span>
                <h4 class="font-headline-md text-headline-md mb-2 text-deep-forest">${tTitle}</h4>
                <p class="text-on-surface-variant font-body-md leading-relaxed">${tDesc}</p>
              </div>
              <div class="z-20 flex items-center justify-center bg-primary text-white w-10 h-10 rounded-full absolute right-1/2 translate-x-1/2 border-4 border-surface">
                <span class="material-symbols-outlined text-sm">${icon}</span>
              </div>
              <div class="w-5/12 hidden md:block"></div>
            </div>
          `;
        }
      }).join('');
    }
  }

  // Services
  const serviceSection = document.querySelector('#services-section');
  if (serviceSection && h.services) {
    renderServiceCards(serviceSection, h.services);
  }

  // Featured Products
  const productsGrid = document.querySelector('#products-section-wrapper .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
  if (productsGrid) {
    const featured = data.products.filter(p => p.featured);
    if (featured.length > 0) {
      renderProductCards(productsGrid, featured, s.currency);
    }
  }

  // Most Sold Carousel (Best Sellers)
  const h2s = Array.from(document.querySelectorAll('h2'));
  const mostSoldHeader = h2s.find(el => el.textContent.trim() === 'الأكثر مبيعاً' || el.textContent.trim() === 'Best Sellers');
  if (mostSoldHeader) {
    const mostSoldContainer = mostSoldHeader.parentElement.nextElementSibling;
    if (mostSoldContainer) {
      const mostSoldProducts = [...data.products].sort((a, b) => (b.stockSold || 0) - (a.stockSold || 0)).slice(0, 4);
      renderHorizontalProductCards(mostSoldContainer, mostSoldProducts, s.currency);
    }
  }

  // Banners and Section Images rendering
  if (data.banners) {
    const b = data.banners;
    
    // 1. Secondary banners
    const secondarySection = document.querySelector('section.grid-cols-1.md\\:grid-cols-2');
    if (secondarySection) {
      const imgs = secondarySection.querySelectorAll('img');
      if (imgs[0] && b.secondaryBanner1) imgs[0].src = b.secondaryBanner1;
      if (imgs[1] && b.secondaryBanner2) imgs[1].src = b.secondaryBanner2;
    }

    // 2. Legrand section
    const legrandSection = Array.from(document.querySelectorAll('section')).find(sec => sec.textContent.includes('عالم ليجراند'));
    if (legrandSection) {
      const imgs = legrandSection.querySelectorAll('.grid img');
      if (imgs[0] && b.legrand1) imgs[0].src = b.legrand1;
      if (imgs[1] && b.legrand2) imgs[1].src = b.legrand2;
      if (imgs[2] && b.legrand3) imgs[2].src = b.legrand3;
      if (imgs[3] && b.legrand4) imgs[3].src = b.legrand4;
    }

    // 3. Philips section
    const philipsImg = document.querySelector('img[src*="AP1WRLsnpy"]');
    if (philipsImg && b.philipsBanner) {
      philipsImg.src = b.philipsBanner;
    }

    // 4. Bahra Cables section
    const bahraSection = Array.from(document.querySelectorAll('section')).find(sec => sec.textContent.includes('كابلات بحرة المتخصصة'));
    if (bahraSection) {
      const logo = bahraSection.querySelector('h2 + img') || bahraSection.querySelector('img[src*="AB6AXuCbARia"]');
      if (logo && b.bahraLogo) logo.src = b.bahraLogo;
      const imgs = bahraSection.querySelectorAll('.grid img');
      if (imgs[0] && b.bahra1) imgs[0].src = b.bahra1;
      if (imgs[1] && b.bahra2) imgs[1].src = b.bahra2;
      if (imgs[2] && b.bahra3) imgs[2].src = b.bahra3;
      if (imgs[3] && b.bahra4) imgs[3].src = b.bahra4;
    }

    // 5. Tools Section
    const toolsSection = Array.from(document.querySelectorAll('section')).find(sec => sec.textContent.includes('العدد والأدوات اليدوية'));
    if (toolsSection) {
      const banner = toolsSection.querySelector('.shadow-lg img, img[src*="AP1WRLtpW-u6"]');
      if (banner && b.toolsBanner) banner.src = b.toolsBanner;
    }

    // 6. CCTV Section
    const cctvSection = Array.from(document.querySelectorAll('section')).find(sec => sec.textContent.includes('أنظمة مراقبة ذكية'));
    if (cctvSection) {
      const banner = cctvSection.querySelector('img');
      if (banner && b.cctvBanner) banner.src = b.cctvBanner;
    }
  }

  const isEn = lang === 'en';

  // 7. Sectors Section Rendering
  const sectorsGrid = document.getElementById('home-sectors-grid');
  if (sectorsGrid && data.sectors) {
    sectorsGrid.innerHTML = data.sectors.map(sec => {
      const sTitle = isEn ? (sec.titleEn || sec.title) : sec.title;
      const sDesc = isEn ? (sec.descriptionEn || sec.description) : sec.description;
      return `
        <div class="bg-white rounded-2xl border border-outline-variant shadow-sm p-6 space-y-4 hover:shadow-lg transition-all hover:border-primary group text-right" dir="rtl">
          <div class="h-40 rounded-xl overflow-hidden mb-4 relative">
            <img src="${sec.image}" alt="${sTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-3xl text-primary bg-primary/10 p-2 rounded-lg">${sec.icon || 'engineering'}</span>
            <h3 class="font-bold text-lg text-deep-forest">${sTitle}</h3>
          </div>
          <p class="text-sm text-on-surface-variant leading-relaxed">${sDesc}</p>
        </div>
      `;
    }).join('');
  }

  // 8. Projects Section Rendering
  const projectsGrid = document.getElementById('home-projects-grid');
  if (projectsGrid && data.projects) {
    const featuredProjects = data.projects.slice(0, 3);
    projectsGrid.innerHTML = featuredProjects.map(proj => {
      const pName = isEn ? (proj.nameEn || proj.name) : proj.name;
      const pDesc = isEn ? (proj.descriptionEn || proj.description) : proj.description;
      const pStatus = isEn ? (proj.statusEn || proj.status) : proj.status;
      return `
        <div class="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col group hover:shadow-lg hover:border-primary transition-all text-right" dir="rtl">
          <div class="h-48 overflow-hidden relative">
            <img src="${proj.image}" alt="${pName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <span class="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">${pStatus}</span>
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-primary uppercase">${isEn ? (proj.categoryEn || proj.category) : proj.category}</span>
              <h3 class="font-bold text-lg text-deep-forest mt-1 mb-2">${pName}</h3>
              <p class="text-sm text-on-surface-variant line-clamp-2">${pDesc}</p>
            </div>
            <a href="project-detail.html?id=${proj.id}" class="text-primary font-bold text-sm hover:underline mt-4 inline-flex items-center gap-1">
              <span>${isEn ? 'View Project Details' : 'عرض تفاصيل المشروع'}</span>
              <span class="material-symbols-outlined text-[16px] dir-arrow">chevron_left</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // 9. Section Visibility Manager
  if (s && s.sectionVisibility) {
    const vis = s.sectionVisibility;
    
    // Map section elements to their keys
    const sectionsMap = {
      hero: document.getElementById('hero-section'),
      banners: document.getElementById('banners-section'),
      categories: document.getElementById('categories-section'),
      featured: document.getElementById('featured-section'),
      legrand: document.getElementById('legrand-section'),
      philips: document.getElementById('philips-section'),
      bahra: document.getElementById('bahra-section'),
      tools: document.getElementById('tools-section'),
      cctv: document.getElementById('cctv-section'),
      blog: document.getElementById('blog-section'),
      brands: document.getElementById('brands-section-wrapper'),
      sectors: document.getElementById('sectors-section-wrapper'),
      projects: document.getElementById('projects-section-wrapper')
    };

    Object.keys(sectionsMap).forEach(key => {
      const el = sectionsMap[key];
      if (el) {
        if (vis[key] === false) {
          el.style.display = 'none';
        } else {
          el.style.display = '';
        }
      }
    });
  }
}

/* ========== ABOUT ========== */
function renderAboutPage(data) {
  const a = data.about;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';

  // Mission
  const missionSection = document.querySelector('.col-span-12.md\\:col-span-7');
  if (missionSection) {
    const missionText = missionSection.querySelector('p');
    if (missionText) missionText.textContent = getLocalized(a, 'mission', lang);
  }

  // Vision
  const visionEls = document.querySelectorAll('.col-span-12.md\\:col-span-4');
  visionEls.forEach(el => {
    const h3 = el.querySelector('h3');
    if (h3 && (h3.textContent.includes('رؤيتنا') || h3.textContent.includes('Vision'))) {
      const p = el.querySelector('p');
      if (p) p.textContent = getLocalized(a, 'vision', lang);
    }
  });

  // Quote
  const quoteEl = document.querySelector('.italic');
  if (quoteEl && a.quote) quoteEl.textContent = `"${getLocalized(a, 'quote', lang)}"`;

  // Stats
  if (data.homepage && data.homepage.stats) {
    const statNumbers = document.querySelectorAll('.text-4xl.font-extrabold');
    const statLabels = document.querySelectorAll('.text-sm.opacity-80');
    data.homepage.stats.forEach((stat, i) => {
      if (statNumbers[i]) statNumbers[i].textContent = stat.number;
      if (statLabels[i]) statLabels[i].textContent = stat.label;
    });
  }

  // Dynamic Timeline Rendering
  const timelineContainer = document.getElementById('about-timeline-container');
  if (timelineContainer && a.timeline) {
    const icons = ['flag', 'trending_up', 'stars', 'rocket', 'workspace_premium'];
    timelineContainer.innerHTML = a.timeline.map((t, idx) => {
      const tTitle = getLocalized(t, 'title', lang);
      const tDesc = getLocalized(t, 'description', lang);
      const icon = icons[idx % icons.length];
      
      if (idx % 2 === 0) {
        return `
          <div class="relative mb-12 flex justify-between items-center w-full">
            <div class="w-5/12 hidden md:block"></div>
            <div class="z-20 flex items-center justify-center bg-primary text-white w-10 h-10 rounded-full absolute right-1/2 translate-x-1/2 border-4 border-surface">
              <span class="material-symbols-outlined text-sm">${icon}</span>
            </div>
            <div class="w-full md:w-5/12 bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:border-primary transition-colors text-right" dir="rtl">
              <span class="font-bold text-primary mb-2 block">${t.year}</span>
              <h4 class="font-headline-md text-headline-md mb-2 text-deep-forest">${tTitle}</h4>
              <p class="text-on-surface-variant font-body-md leading-relaxed">${tDesc}</p>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="relative mb-12 flex justify-between items-center w-full">
            <div class="w-full md:w-5/12 bg-white p-6 rounded-xl border border-outline-variant shadow-sm hover:border-primary transition-colors text-right" dir="rtl">
              <span class="font-bold text-primary mb-2 block">${t.year}</span>
              <h4 class="font-headline-md text-headline-md mb-2 text-deep-forest">${tTitle}</h4>
              <p class="text-on-surface-variant font-body-md leading-relaxed">${tDesc}</p>
            </div>
            <div class="z-20 flex items-center justify-center bg-primary text-white w-10 h-10 rounded-full absolute right-1/2 translate-x-1/2 border-4 border-surface">
              <span class="material-symbols-outlined text-sm">${icon}</span>
            </div>
            <div class="w-5/12 hidden md:block"></div>
          </div>
        `;
      }
    }).join('');
  }
}

/* ========== SERVICES PAGE ========== */
function renderServicesPage(data) {
  const h = data.homepage;
  const sSettings = data.settings;
  const grid = document.getElementById('services-page-grid');
  if (!grid || !h.services) return;
  
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  const phone = sSettings.phoneMobile || '966500000000';
  const cleanPhone = phone.replace('+', '').replace(/ /g, '');

  grid.innerHTML = h.services.map((s, index) => {
    const sTitle = isEn ? (s.titleEn || s.title) : s.title;
    const sTitleEn = s.titleEn || s.title;
    const sDesc = isEn ? (s.descriptionEn || s.description) : s.description;
    
    // Setup features checkmarks list
    const features = isEn ? (s.featuresEn || s.features || []) : (s.features || []);
    const checkIconClass = s.style === 'dark' ? 'text-primary-fixed bg-primary/20' : 'text-success-teal bg-success-teal/10';
    const featuresListHtml = features.length > 0 ? `
      <ul class="space-y-2.5 my-4">
        ${features.map(f => `
          <li class="flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-[18px] ${checkIconClass} p-0.5 rounded-full">check</span>
            <span class="${s.style === 'dark' ? 'text-white/90' : 'text-on-surface-variant'} font-medium">${f}</span>
          </li>
        `).join('')}
      </ul>
    ` : '';

    if (s.style === 'dark') {
      return `
        <div class="bg-deep-forest text-white rounded-2xl flex flex-col justify-between h-full shadow-lg border border-primary/20 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          <div>
            <div class="h-48 w-full overflow-hidden relative">
              <img src="${s.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJz4IPWMjFJ4q8AYdvgEdHcxNlZFgxzrtU2fXpRphDG_Fs0mMWRU-6SHWTxcWBBnWCdAv6PnlqJDlRcMz9u8INyEXKx6kLbvEVeYUU5lMvfhXEyc4NxBN25Cw_RbcPFG3GZsVXPaW0dQkZjy9p72VQ19o9KCmHHI3D4Ep-SXWK9YM-J6qVJuxuCL46XHOa6jkKTfr1aPR9N6sBBQHqLMo7rPKFP3hzzwz-dShV4S1CsYy0EsXnOiuMBCORNHAMcfHHZpbYEm8'}" alt="${sTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-[#004A3C] to-transparent"></div>
            </div>
            <div class="p-8 pt-6">
              <div class="flex justify-between items-start mb-6">
                <span class="material-symbols-outlined text-4xl text-primary-fixed bg-primary/20 p-3 rounded-xl">${s.icon}</span>
                <span class="text-xs font-bold tracking-widest text-primary-fixed uppercase">${isEn ? 'B2B Solution' : 'حلول الشركات'}</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-white mb-3">${sTitle}</h3>
              <p class="font-body-md text-body-md text-white/80 leading-relaxed mb-6">${sDesc}</p>
              ${featuresListHtml}
            </div>
          </div>
          <div class="p-8 pt-0 mt-auto flex flex-col sm:flex-row gap-3">
            <button onclick="addToCart('service_${index}', 1)" class="flex-1 bg-primary-fixed text-on-primary-fixed hover:bg-primary/20 hover:text-white border border-primary-fixed/20 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
              ${TRANSLATIONS[lang].add_to_cart}
            </button>
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(isEn ? 'Hello, I want to request: ' + sTitleEn : 'مرحباً، أود الاستفسار عن خدمة: ' + s.title)}" target="_blank" class="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg font-bold text-sm text-center transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">chat</span>
              ${isEn ? 'Order via WhatsApp' : 'طلب مباشرة'}
            </a>
          </div>
        </div>
      `;
    } else if (s.style === 'image') {
      return `
        <div class="relative rounded-2xl overflow-hidden h-[420px] flex flex-col justify-end p-8 shadow-lg group hover:scale-[1.02] transition-all duration-300 bg-cover bg-center" style="background-image: url('${s.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJz4IPWMjFJ4q8AYdvgEdHcxNlZFgxzrtU2fXpRphDG_Fs0mMWRU-6SHWTxcWBBnWCdAv6PnlqJDlRcMz9u8INyEXKx6kLbvEVeYUU5lMvfhXEyc4NxBN25Cw_RbcPFG3GZsVXPaW0dQkZjy9p72VQ19o9KCmHHI3D4Ep-SXWK9YM-J6qVJuxuCL46XHOa6jkKTfr1aPR9N6sBBQHqLMo7rPKFP3hzzwz-dShV4S1CsYy0EsXnOiuMBCORNHAMcfHHZpbYEm8'}')">
          <div class="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/60 to-transparent z-10"></div>
          <div class="relative z-20 text-white">
            <span class="material-symbols-outlined text-4xl text-primary-fixed bg-white/10 p-2.5 rounded-xl mb-4 inline-block">${s.icon}</span>
            <h3 class="font-headline-md text-headline-md text-white mb-2">${sTitle}</h3>
            <p class="text-sm text-white/90 leading-relaxed mb-6 line-clamp-2">${sDesc}</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button onclick="addToCart('service_${index}', 1)" class="flex-1 bg-primary-fixed text-on-primary-fixed hover:bg-white/20 hover:text-white border border-primary-fixed/20 py-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-xs">add_shopping_cart</span>
                ${TRANSLATIONS[lang].add_to_cart}
              </button>
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(isEn ? 'Hello, I want to request: ' + sTitleEn : 'مرحباً، أود الاستفسار عن خدمة: ' + s.title)}" target="_blank" class="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-xs">chat</span>
                ${isEn ? 'Order via WhatsApp' : 'طلب مباشرة'}
              </a>
            </div>
          </div>
        </div>
      `;
    } else if (s.style === 'stats') {
      return `
        <div class="bg-white text-on-surface rounded-2xl flex flex-col justify-between h-full shadow-md border border-outline-variant/30 relative overflow-hidden group hover:shadow-lg hover:border-primary transition-all duration-300">
          <div>
            <div class="h-48 w-full overflow-hidden relative">
              <img src="${s.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbcqI9I-D2WNM85FZ5AQhxemwEEwf0ryDKVqbKJEMOW_dNt8MBJCgHpW2gQhK1Hxuz90jt2EPMqnMNEpLJSJkfvSBJm_1wEulm3lhgLvpQPUbYuSsEQjq-7VKw4n2R0rQq_dqKwjJ1mCJOVcP6rAcvIeCVmfkfQ0vaqbZNfCi4f3z9HX2QY7U2oq9r4h_2r4RXWF_MKTA6GXKLRZWx5xcZJJ-3VJJxpkDe8r1OHUC-I3TtHqyI5XkAm8m0C-H2bBcHa2lC3Gl7A'}" alt="${sTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div class="p-8 pt-6">
              <div class="flex justify-between items-start mb-6">
                <span class="material-symbols-outlined text-4xl text-primary bg-primary/10 p-3 rounded-xl">${s.icon}</span>
                <span class="text-xs font-bold tracking-widest text-primary uppercase">${isEn ? 'Support & Numbers' : 'الدعم والأرقام'}</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-deep-forest mb-3">${sTitle}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">${sDesc}</p>
              
              <!-- Stats Box Grid -->
              <div class="grid grid-cols-2 gap-4 mt-6">
                ${(s.stats || []).map(st => `
                  <div class="bg-surface-gray/50 border border-outline-variant/20 rounded-xl p-4 text-center">
                    <span class="block text-2xl font-extrabold text-primary">${st.number}</span>
                    <span class="block text-xs text-on-surface-variant mt-1 font-semibold">${isEn ? (st.labelEn || st.label) : st.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <div class="p-8 pt-0 mt-auto flex flex-col sm:flex-row gap-3">
            <button onclick="addToCart('service_${index}', 1)" class="flex-1 bg-primary text-white hover:bg-deep-forest py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
              ${TRANSLATIONS[lang].add_to_cart}
            </button>
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(isEn ? 'Hello, I want to request: ' + sTitleEn : 'مرحباً، أود الاستفسار عن خدمة: ' + s.title)}" target="_blank" class="flex-1 bg-surface-gray hover:bg-outline-variant/20 text-primary py-2.5 rounded-lg font-bold text-sm text-center transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">chat</span>
              ${isEn ? 'Order via WhatsApp' : 'طلب مباشرة'}
            </a>
          </div>
        </div>
      `;
    } else {
      // Light card (default)
      return `
        <div class="bg-white text-on-surface rounded-2xl flex flex-col justify-between h-full shadow-md border border-outline-variant/30 relative overflow-hidden group hover:shadow-lg hover:border-primary transition-all duration-300">
          <div>
            <div class="h-48 w-full overflow-hidden relative">
              <img src="${s.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbcqI9I-D2WNM85FZ5AQhxemwEEwf0ryDKVqbKJEMOW_dNt8MBJCgHpW2gQhK1Hxuz90jt2EPMqnMNEpLJSJkfvSBJm_1wEulm3lhgLvpQPUbYuSsEQjq-7VKw4n2R0rQq_dqKwjJ1mCJOVcP6rAcvIeCVmfkfQ0vaqbZNfCi4f3z9HX2QY7U2oq9r4h_2r4RXWF_MKTA6GXKLRZWx5xcZJJ-3VJJxpkDe8r1OHUC-I3TtHqyI5XkAm8m0C-H2bBcHa2lC3Gl7A'}" alt="${sTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div class="p-8 pt-6">
              <div class="flex justify-between items-start mb-6">
                <span class="material-symbols-outlined text-4xl text-primary bg-primary/10 p-3 rounded-xl">${s.icon}</span>
                <span class="text-xs font-bold tracking-widest text-primary uppercase">${isEn ? 'Consulting & Supply' : 'الاستشارات والتوريد'}</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-deep-forest mb-3">${sTitle}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">${sDesc}</p>
              ${featuresListHtml}
            </div>
          </div>
          <div class="p-8 pt-0 mt-auto flex flex-col sm:flex-row gap-3">
            <button onclick="addToCart('service_${index}', 1)" class="flex-1 bg-primary text-white hover:bg-deep-forest py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
              ${TRANSLATIONS[lang].add_to_cart}
            </button>
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(isEn ? 'Hello, I want to request: ' + sTitleEn : 'مرحباً، أود الاستفسار عن خدمة: ' + s.title)}" target="_blank" class="flex-1 bg-surface-gray hover:bg-outline-variant/20 text-primary py-2.5 rounded-lg font-bold text-sm text-center transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">chat</span>
              ${isEn ? 'Order via WhatsApp' : 'طلب مباشرة'}
            </a>
          </div>
        </div>
      `;
    }
  }).join('');
}

/* ========== FAQ PAGE ========== */
window.toggleFAQ = function(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

window.submitContactForm = function(event, form) {
  event.preventDefault();
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const phone = form.querySelector('input[type="tel"]').value;
  const subject = form.querySelector('select').value;
  const message = form.querySelector('textarea').value;

  const messages = SiteData.getData('messages') || [];
  const newMessage = {
    id: 'MSG-' + Date.now().toString().slice(-6),
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
    date: new Date().toLocaleDateString('ar-SA'),
    status: 'جديد'
  };
  messages.push(newMessage);
  SiteData.saveData('messages', messages);

  alert(localStorage.getItem('electric_house_lang') === 'en' 
    ? 'Your message has been successfully received. We will respond shortly.' 
    : 'تم استلام رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت.');
  form.reset();
};

function renderFaqPage(data) {
  const faqs = data.faqs || [];
  const container = document.getElementById('faq-list');
  if (!container) return;

  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';

  if (faqs.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 bg-white rounded-xl border border-outline-variant">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">help_outline</span>
        <p class="text-on-surface-variant">${isEn ? 'No questions available' : 'لا توجد أسئلة شائعة متاحة حالياً'}</p>
      </div>
    `;
    return;
  }

  const renderFaqs = (filteredFaqs) => {
    container.innerHTML = filteredFaqs.map(f => {
      const question = isEn ? (f.questionEn || f.question) : f.question;
      const answer = isEn ? (f.answerEn || f.answer) : f.answer;
      return `
        <div class="faq-item bg-white rounded-xl border border-outline-variant overflow-hidden" data-cat="${f.category || 'all'}">
          <button class="faq-question w-full flex items-center justify-between p-5 text-right font-semibold text-on-surface hover:text-primary transition-colors" onclick="toggleFAQ(this)">
            <span>${question}</span>
            <span class="material-symbols-outlined faq-icon text-primary shrink-0 mr-3">expand_more</span>
          </button>
          <div class="faq-answer px-5 text-on-surface-variant font-body-md">
            <div class="pb-5 leading-relaxed whitespace-pre-line">${answer}</div>
          </div>
        </div>
      `;
    }).join('');
  };

  renderFaqs(faqs);

  // Set up click handlers on buttons to filter faqs
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('active');
        b.classList.remove('bg-primary');
        b.classList.remove('text-white');
        b.classList.add('border-outline-variant');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('active');
      btn.classList.add('bg-primary');
      btn.classList.add('text-white');
      btn.classList.remove('border-outline-variant');
      btn.classList.remove('text-on-surface-variant');

      const cat = btn.dataset.cat;
      if (cat === 'all') {
        renderFaqs(faqs);
      } else {
        renderFaqs(faqs.filter(f => f.category === cat));
      }
    };
  });
}

/* ========== PRODUCTS ========== */
function renderProductsPage(data) {
  const s = data.settings;
  const products = data.products;
  const categories = data.categories || [];
  const brands = data.brands || [];
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  const currency = isEn ? (s.currencyEn || s.currency || 'USD') : (s.currency || '$');

  // Read initial search query from URL parameter
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get('search');
  const initialBrand = params.get('brand');
  const initialCategory = params.get('category');
  const headerSearchInput = document.querySelector('header input[type="text"]');
  if (initialSearch && headerSearchInput) {
    headerSearchInput.value = initialSearch;
  }

  if (initialBrand) {
    setTimeout(() => {
      const chk = Array.from(document.querySelectorAll('.brand-checkbox')).find(el => el.value === initialBrand);
      if (chk) {
        chk.checked = true;
        chk.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 50);
  }

  if (initialCategory) {
    setTimeout(() => {
      const chk = Array.from(document.querySelectorAll('.cat-checkbox')).find(el => el.value === initialCategory);
      if (chk) {
        chk.checked = true;
        chk.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 50);
  }

  // Mobile Filters Drawer Setup
  const aside = document.querySelector('aside');
  if (aside && !document.getElementById('mobile-filter-toggle')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'mobile-filter-toggle';
    toggleBtn.className = 'md:hidden w-full bg-primary text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-4';
    toggleBtn.innerHTML = '<span class="material-symbols-outlined">filter_list</span> <span>' + (isEn ? 'Filter Products' : 'تصفية المنتجات') + '</span>';
    
    aside.parentNode.insertBefore(toggleBtn, aside);
    
    const filterStyle = document.createElement('style');
    filterStyle.id = 'mobile-filter-styles';
    filterStyle.textContent = `
      @media (max-width: 768px) {
        aside {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 10000;
          padding: 1.5rem;
          overflow-y: auto;
          align-items: center;
          justify-content: center;
        }
        aside.show-filter {
          display: flex !important;
        }
        aside > div {
          width: 100%;
          max-width: 320px;
          margin: auto;
          position: relative;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      }
    `;
    document.head.appendChild(filterStyle);
    
    const asideCard = aside.querySelector('.bg-white');
    if (asideCard && !document.getElementById('mobile-filter-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.id = 'mobile-filter-close';
      closeBtn.className = 'md:hidden absolute top-4 left-4 text-on-surface hover:text-primary';
      closeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
      asideCard.style.position = 'relative';
      asideCard.appendChild(closeBtn);
      
      closeBtn.onclick = (e) => {
        e.preventDefault();
        aside.classList.remove('show-filter');
      };
    }
    
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      aside.classList.add('show-filter');
    };
    
    aside.onclick = (e) => {
      if (e.target === aside) {
        aside.classList.remove('show-filter');
      }
    };
  }

  // Dynamic Filters Sidebar Setup
  const sidebarContainer = document.querySelector('aside > div.bg-white');
  const activeFilters = s.filters || [
    { id: "category", nameAr: "الفئة الرئيسية", nameEn: "Main Category", type: "category", enabled: true },
    { id: "brand", nameAr: "الشركة المصنعة", nameEn: "Manufacturer / Brand", type: "brand", enabled: true },
    { id: "industrial_app", nameAr: "التطبيق الصناعي", nameEn: "Industrial Application", type: "specification", specName: "التطبيق الصناعي", enabled: true, values: ["التوزيع والحماية", "تحكم المحركات", "الطاقة الشمسية", "الأتمتة الصناعية", "الحلول الزراعية", "القياس والمراقبة"] },
    { id: "voltage", nameAr: "الجهد الكهربائي", nameEn: "Voltage", type: "specification", specName: "الجهد", enabled: true, values: ["220V AC", "380V - 415V AC", "24V DC"] }
  ];

  if (sidebarContainer) {
    let filtersHtml = '';
    activeFilters.forEach(f => {
      if (!f.enabled) return;
      
      const filterTitle = isEn ? (f.nameEn || f.nameAr) : f.nameAr;
      let optionsHtml = '';
      
      if (f.id === 'category') {
        optionsHtml = categories.map(c => {
          const cName = isEn ? (CATEGORY_TRANSLATIONS[c] || c) : c;
          return `
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" value="${c}" class="cat-checkbox rounded border-outline-variant text-primary focus:ring-primary w-4 h-4">
              <span class="text-on-surface-variant group-hover:text-primary transition-colors text-sm">${cName}</span>
            </label>
          `;
        }).join('');
      } else if (f.id === 'brand') {
        optionsHtml = brands.map(b => {
          const bName = isEn ? (b.nameEn || b.name) : b.name;
          return `
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" value="${b.name}" class="brand-checkbox rounded border-outline-variant text-primary focus:ring-primary w-4 h-4">
              <span class="text-on-surface-variant group-hover:text-primary transition-colors text-sm">${bName}</span>
            </label>
          `;
        }).join('');
      } else if (f.values && f.values.length > 0) {
        optionsHtml = f.values.map(val => {
          return `
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" data-filter-id="${f.id}" value="${val}" class="custom-filter-checkbox rounded border-outline-variant text-primary focus:ring-primary w-4 h-4">
              <span class="text-on-surface-variant group-hover:text-primary transition-colors text-sm">${val}</span>
            </label>
          `;
        }).join('');
      }
      
      filtersHtml += `
        <div class="mb-6 border-b border-outline-variant/30 pb-4">
          <h3 class="font-label-lg text-label-lg text-on-surface mb-3 border-r-4 border-primary pr-2">${filterTitle}</h3>
          <div class="flex flex-col gap-2 mt-3">
            ${optionsHtml}
          </div>
        </div>
      `;
    });
    
    filtersHtml += `
      <button id="clear-filters-btn" class="w-full mt-2 py-2.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5 font-bold">
        <span class="material-symbols-outlined text-sm">filter_list_off</span>
        <span>${isEn ? 'Clear All Filters' : 'إعادة تعيين جميع الفلاتر'}</span>
      </button>
    `;
    
    sidebarContainer.innerHTML = filtersHtml;
    
    const clearBtn = sidebarContainer.querySelector('#clear-filters-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        sidebarContainer.querySelectorAll('input[type="checkbox"]').forEach(chk => chk.checked = false);
        applyFilters();
      };
    }
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.onchange = () => applyFilters();
  }

  // Header Search Input wiring
  if (headerSearchInput) {
    headerSearchInput.oninput = () => applyFilters();
    const searchForm = headerSearchInput.closest('form');
    if (searchForm) {
      searchForm.onsubmit = (e) => e.preventDefault();
    }
  }

  // Listen to checkboxes changes
  if (sidebarContainer) {
    sidebarContainer.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        applyFilters();
      }
    });
  }

  const grid = document.getElementById('products-grid') || document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3');

  function applyFilters() {
    if (!grid) return;

    // 1. Category filter
    const checkedCats = Array.from(document.querySelectorAll('.cat-checkbox:checked')).map(chk => chk.value);
    // 2. Brand filter
    const checkedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked')).map(chk => chk.value);
    // 3. Search query
    const searchQuery = headerSearchInput ? headerSearchInput.value.toLowerCase().trim() : '';

    // Search and display matching services if there is a query
    const services = data.homepage?.services || [];
    const matchedServices = services.filter(srv => {
      const title = (srv.title || '').toLowerCase();
      const titleEn = (srv.titleEn || '').toLowerCase();
      const desc = (srv.description || '').toLowerCase();
      const descEn = (srv.descriptionEn || '').toLowerCase();
      return title.includes(searchQuery) ||
             titleEn.includes(searchQuery) ||
             desc.includes(searchQuery) ||
             descEn.includes(searchQuery);
    });

    let servicesContainer = document.getElementById('search-services-results');
    if (!servicesContainer && grid) {
      servicesContainer = document.createElement('div');
      servicesContainer.id = 'search-services-results';
      servicesContainer.className = 'col-span-full mb-8';
      grid.parentNode.insertBefore(servicesContainer, grid);
    }

    if (servicesContainer) {
      if (searchQuery !== '' && matchedServices.length > 0) {
        servicesContainer.innerHTML = `
          <div class="mb-4">
            <h2 class="text-xl font-bold text-deep-forest mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined">engineering</span>
              <span>${isEn ? 'Matching Services' : 'الخدمات المطابقة'} (${matchedServices.length})</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${matchedServices.map((srv, idx) => {
                const sTitle = isEn ? (srv.titleEn || srv.title) : srv.title;
                const sDesc = isEn ? (srv.descriptionEn || srv.description) : srv.description;
                return `
                  <div class="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30 flex items-start gap-4 hover:shadow-md transition-all">
                    <span class="material-symbols-outlined text-3xl text-primary bg-primary/10 p-2.5 rounded-lg shrink-0">${srv.icon || 'engineering'}</span>
                    <div>
                      <h3 class="font-bold text-on-surface text-lg mb-1">${sTitle}</h3>
                      <p class="text-sm text-on-surface-variant line-clamp-2">${sDesc}</p>
                      <a href="services.html" class="inline-flex items-center gap-1 text-primary text-xs font-bold mt-2 hover:underline">
                        <span>${isEn ? 'View Services' : 'عرض التفاصيل'}</span>
                        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <hr class="border-outline-variant/30 my-6">
        `;
        servicesContainer.style.display = 'block';
      } else {
        servicesContainer.innerHTML = '';
        servicesContainer.style.display = 'none';
      }
    }

    // Custom specification filters check
    const customChecked = {};
    if (sidebarContainer) {
      sidebarContainer.querySelectorAll('.custom-filter-checkbox:checked').forEach(chk => {
        const fid = chk.getAttribute('data-filter-id');
        if (!customChecked[fid]) customChecked[fid] = [];
        customChecked[fid].push(chk.value);
      });
    }

    let filtered = products.filter(p => {
      // Category match
      if (checkedCats.length > 0 && !checkedCats.includes(p.category)) {
        return false;
      }

      // Brand match
      if (checkedBrands.length > 0) {
        let brandMatch = false;
        const pBrand = p.brand;
        if (pBrand) {
          const brandObj = brands.find(b => b.name === pBrand);
          if (checkedBrands.includes(pBrand) || (brandObj && checkedBrands.includes(brandObj.nameEn))) {
            brandMatch = true;
          }
        }
        if (!brandMatch) return false;
      }

      // Custom dynamic specifications filters match
      for (const fid of Object.keys(customChecked)) {
        const allowedValues = customChecked[fid];
        if (allowedValues.length === 0) continue;
        
        const filterObj = activeFilters.find(f => f.id === fid);
        const specName = filterObj ? filterObj.specName : null;
        
        let matched = false;
        if (specName) {
          const productSpec = (p.specifications || []).find(spec => 
            (spec.nameAr && spec.nameAr.includes(specName)) || 
            (spec.nameEn && spec.nameEn.toLowerCase().includes(specName.toLowerCase()))
          );
          if (productSpec) {
            const specVal = (productSpec.valueAr || productSpec.valueEn || '').toLowerCase();
            if (allowedValues.some(val => specVal.includes(val.toLowerCase()))) {
              matched = true;
            }
          }
        }
        
        if (!matched) {
          const pDesc = (p.description || '').toLowerCase();
          const pDescEn = (p.descriptionEn || '').toLowerCase();
          const pName = (p.name || '').toLowerCase();
          const pNameEn = (p.nameEn || '').toLowerCase();
          if (allowedValues.some(val => 
            pDesc.includes(val.toLowerCase()) || 
            pDescEn.includes(val.toLowerCase()) || 
            pName.includes(val.toLowerCase()) || 
            pNameEn.includes(val.toLowerCase())
          )) {
            matched = true;
          }
        }
        
        if (!matched) return false;
      }
      // Search match
      if (searchQuery !== '') {
        const pName = (p.name || '').toLowerCase();
        const pNameEn = (p.nameEn || '').toLowerCase();
        const pDesc = (p.description || '').toLowerCase();
        const pDescEn = (p.descriptionEn || '').toLowerCase();
        const pBrand = (p.brand || '').toLowerCase();
        const pCategory = (p.category || '').toLowerCase();

        const match = pName.includes(searchQuery) ||
                      pNameEn.includes(searchQuery) ||
                      pDesc.includes(searchQuery) ||
                      pDescEn.includes(searchQuery) ||
                      pBrand.includes(searchQuery) ||
                      pCategory.includes(searchQuery);

        if (!match) return false;
      }

      return true;
    });

    // 5. Sorting
    const sortVal = sortSelect ? sortSelect.value : 'best';
    if (sortVal === 'best') {
      filtered.sort((a, b) => (b.stockSold || 0) - (a.stockSold || 0));
    } else if (sortVal === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortVal === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // 6. Update Product count text
    const countLabel = document.getElementById('products-count');
    if (countLabel) {
      const template = TRANSLATIONS[lang].showing_count;
      countLabel.textContent = template.replace('{x}', filtered.length).replace('{y}', products.length);
    }

    // 7. Render Grid
    if (filtered.length > 0) {
      renderProductCards(grid, filtered, currency);
    } else {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white rounded-xl border border-outline-variant p-6">
          <span class="material-symbols-outlined text-6xl text-outline mb-2">inventory_2</span>
          <p class="text-on-surface-variant font-bold text-lg">${TRANSLATIONS[lang].no_products}</p>
        </div>
      `;
    }
  }

  applyFilters();
}

/* ========== PRODUCT DETAIL ========== */
function renderProductDetailPage(data) {
  const s = data.settings;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  // Find product ID from URL
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')) || 1;
  const product = data.products.find(p => p.id === id) || data.products[0];
  
  if (product) {
    const pName = isEn ? (product.nameEn || product.name) : product.name;
    const pDesc = isEn ? (product.descriptionEn || product.description) : product.description;
    
    // Breadcrumb
    const breadcrumb = document.querySelector('nav.flex.items-center span.text-primary.font-bold');
    if (breadcrumb) breadcrumb.textContent = pName;
    
    // Title
    const title = document.querySelector('h1.font-headline-lg');
    if (title) title.textContent = pName;
    
    // Brand
    const brandBadge = document.querySelector('span.bg-secondary-fixed');
    if (brandBadge) brandBadge.textContent = product.brand || (isEn ? 'SEC' : 'شركة الكهرباء الذكية');
    
    // Description
    const desc = document.querySelector('h1.font-headline-lg + p');
    if (desc) desc.textContent = pDesc || '';
    
    // Main Image
    const mainImg = document.querySelector('.product-image-zoom img');
    if (mainImg) {
      mainImg.src = product.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtV_B92R57OHsYyhkagOFqVoFphaz0nDtdVH7_jTVWYtVI1_C-siYoj8LIArD97HHH5vPlqN8gRUhPg2SgeqDPe-pSb4JEH7hU-Y0-GNo6tLzmfKd2VHZCKOwyoFGAjpPno5Vr3KnDasXEFztyHwL6NgAqaLoHgi_FG5ymA1OET2Y9zi0tso9CNCOLrYHZgv1ucAI1xK_VK774dCyfJ5DPj5cRLXvUX0_ecAgQahW-1Yh03Nj5BRJDAsMD7uB0R7ag2FvVF8pbSI4';
    }
    
    // Render Gallery
    const galleryContainer = document.querySelector('.lg\\:col-span-7 .grid.grid-cols-4.gap-4.mt-4');
    if (galleryContainer) {
      const imgs = product.images && product.images.length > 0 ? product.images : [product.image || ""];
      const activeImgs = imgs.filter(img => img);
      
      if (activeImgs.length > 0) {
        galleryContainer.innerHTML = activeImgs.map((img, i) => `
          <div class="${i === 0 ? 'border-2 border-primary' : 'border border-outline-variant'} rounded-lg overflow-hidden cursor-pointer transition-colors hover:border-primary thumbnail-btn" data-index="${i}">
            <img class="w-full aspect-square object-cover" src="${img}">
          </div>
        `).join('');
        
        const thumbs = galleryContainer.querySelectorAll('.thumbnail-btn');
        thumbs.forEach(thumb => {
          thumb.addEventListener('click', () => {
            thumbs.forEach(t => {
              t.classList.remove('border-2', 'border-primary');
              t.classList.add('border', 'border-outline-variant');
            });
            thumb.classList.remove('border', 'border-outline-variant');
            thumb.classList.add('border-2', 'border-primary');
            
            const index = parseInt(thumb.getAttribute('data-index'));
            if (mainImg) mainImg.src = activeImgs[index];
          });
        });
      } else {
        galleryContainer.style.display = 'none';
      }
    }

    // Price Visibility & Sales Mode
    const priceContainer = document.querySelector('.flex.items-center.gap-4 .text-primary.font-headline-md')?.parentElement;
    if (priceContainer) {
      const currency = isEn ? (s.currencyEn || s.currency || 'USD') : (s.currency || '$');
      const isRfqOnly = product.salesMode === 'rfq_only' || product.showPrice === false;
      
      if (!isRfqOnly) {
        if (product.isOffer && product.originalPrice > product.price) {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          priceContainer.innerHTML = `
            <span class="text-primary font-headline-md text-headline-md font-bold">${product.price} ${currency}</span>
            <span class="text-on-surface-variant line-through font-body-md text-body-md">${product.originalPrice} ${currency}</span>
            <span class="bg-error-container text-error px-2 py-1 rounded font-label-sm text-label-sm">${isEn ? 'Save' : 'وفر'} ${discountPercent}%</span>
          `;
        } else {
          priceContainer.innerHTML = `
            <span class="text-primary font-headline-md text-headline-md font-bold">${product.price} ${currency}</span>
          `;
        }
      } else {
        priceContainer.innerHTML = `
          <span class="text-primary font-headline-md text-headline-md font-bold">${isEn ? 'Request Quotation' : 'طلب تسعير'}</span>
        `;
      }
    }

    // Wire Quantity Controls & Cart addition
    const qtyInput = document.querySelector('.flex.items-center.border.border-outline.rounded-lg input');
    const minusBtn = document.querySelector('.flex.items-center.border.border-outline.rounded-lg button:first-child');
    const plusBtn = document.querySelector('.flex.items-center.border.border-outline.rounded-lg button:last-child');
    const addBtn = document.querySelector('button.flex-1.bg-primary');
    
    if (addBtn) {
      const isRfqOnly = product.salesMode === 'rfq_only' || product.showPrice === false;
      const btnText = addBtn.querySelector('span:last-child');
      if (btnText) {
        if (isRfqOnly) {
          btnText.textContent = isEn ? 'Add to Quote Request' : 'إضافة إلى طلب التسعير';
        } else if (product.salesMode === 'order_only') {
          btnText.textContent = isEn ? 'Buy Directly' : 'شراء مباشر';
        } else {
          btnText.textContent = isEn ? 'Add to Cart' : 'إضافة إلى السلة';
        }
      }
    }

    if (qtyInput && minusBtn && plusBtn && addBtn) {
      minusBtn.onclick = (e) => {
        e.preventDefault();
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) qtyInput.value = val - 1;
      };
      plusBtn.onclick = (e) => {
        e.preventDefault();
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
      };
      addBtn.onclick = (e) => {
        e.preventDefault();
        const qty = parseInt(qtyInput.value) || 1;
        addToCart(product.id, qty);
      };

      // Favorite Button binding on details page
      const favBtn = document.querySelector('button.flex-1.bg-primary')?.nextElementSibling;
      if (favBtn) {
        favBtn.onclick = (e) => {
          e.preventDefault();
          window.toggleFavorite(favBtn, product.id);
        };
      }
      
      // Talk to expert button on details page
      const talkBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('تحدث مع خبير') || btn.textContent.includes('Talk to an Expert'));
      if (talkBtn) {
        talkBtn.onclick = (e) => {
          e.preventDefault();
          window.open(data.settings.whatsapp || 'https://wa.me/963986001965', '_blank');
        };
      }
    }

    // --- Dynamic Related Products ---
    const relatedContainer = document.getElementById('related-products-grid');
    if (relatedContainer) {
      let related = data.products.filter(p => p.id !== product.id && p.category === product.category);
      if (related.length < 4) {
        const fallback = data.products.filter(p => p.id !== product.id && p.category !== product.category);
        related = related.concat(fallback).slice(0, 4);
      } else {
        related = related.slice(0, 4);
      }
      const currency = isEn ? (s.currencyEn || s.currency || 'USD') : (s.currency || '$');
      renderProductCards(relatedContainer, related, currency);
    }

    // --- Dynamic Tabs Content & Switcher ---
    // Specs Tab Content
    const specsTab = document.getElementById('tab-specs');
    if (specsTab) {
      let specRowsHtml = '';
      if (product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0) {
        specRowsHtml = product.specifications.map(spec => {
          const name = isEn ? (spec.nameEn || spec.nameAr) : spec.nameAr;
          const val = isEn ? (spec.valueEn || spec.valueAr) : spec.valueAr;
          return `
            <tr class="border-b border-outline-variant/30">
              <td class="py-3 font-bold text-deep-forest w-1/3">${name}</td>
              <td class="py-3 text-on-surface">${val}</td>
            </tr>
          `;
        }).join('');
      } else {
        const pBrand = product.brand || (isEn ? 'SEC' : 'شركة الكهرباء الذكية');
        let pOrigin = isEn ? 'Germany / France' : 'ألمانيا / فرنسا';
        if (pBrand.includes('شنايدر') || pBrand.toLowerCase().includes('schneider')) pOrigin = isEn ? 'France' : 'فرنسا';
        else if (pBrand.includes('سيمنز') || pBrand.toLowerCase().includes('siemens')) pOrigin = isEn ? 'Germany' : 'ألمانيا';
        else if (pBrand.includes('لوغراند') || pBrand.toLowerCase().includes('legrand')) pOrigin = isEn ? 'France' : 'فرنسا';
        else if (pBrand.includes('بحرة') || pBrand.toLowerCase().includes('bahra')) pOrigin = isEn ? 'Saudi Arabia' : 'المملكة العربية السعودية';
        
        specRowsHtml = `
          <tr class="border-b border-outline-variant/30"><td class="py-3 font-bold text-deep-forest w-1/3">${isEn ? 'Brand' : 'العلامة التجارية'}</td><td class="py-3 text-on-surface">${pBrand}</td></tr>
          <tr class="border-b border-outline-variant/30"><td class="py-3 font-bold text-deep-forest">${isEn ? 'Category' : 'الفئة'}</td><td class="py-3 text-on-surface">${isEn ? (CATEGORY_TRANSLATIONS[product.category] || product.category) : product.category}</td></tr>
          <tr class="border-b border-outline-variant/30"><td class="py-3 font-bold text-deep-forest">${isEn ? 'Voltage' : 'الجهد الكهربائي'}</td><td class="py-3 text-on-surface">${isEn ? '380V - 415V AC' : '380 - 415 فولت AC'}</td></tr>
          <tr class="border-b border-outline-variant/30"><td class="py-3 font-bold text-deep-forest">${isEn ? 'Poles' : 'عدد الأقطاب'}</td><td class="py-3 text-on-surface">${isEn ? '3-Pole (3P) / 4-Pole (4P)' : '3 أقطاب (3P) / 4 أقطاب (4P)'}</td></tr>
          <tr class="border-b border-outline-variant/30"><td class="py-3 font-bold text-deep-forest">${isEn ? 'Protection Class' : 'درجة الحماية'}</td><td class="py-3 text-on-surface">IP40 / IK08</td></tr>
          <tr><td class="py-3 font-bold text-deep-forest">${isEn ? 'Country of Origin' : 'بلد المنشأ'}</td><td class="py-3 text-on-surface">${pOrigin}</td></tr>
        `;
      }
      
      specsTab.innerHTML = `
        <div class="bg-white p-6 rounded-xl border border-outline-variant shadow-sm max-w-3xl mx-auto overflow-hidden">
          <table class="w-full text-right ${isEn ? 'text-left' : 'text-right'} border-collapse">
            <tbody>
              ${specRowsHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    // Techfiles Tab Content
    const techTab = document.getElementById('tab-techfiles');
    if (techTab) {
      let filesHtml = '';
      if (product.techFiles && Array.isArray(product.techFiles) && product.techFiles.length > 0) {
        filesHtml = product.techFiles.map(file => {
          const name = isEn ? (file.nameEn || file.nameAr) : file.nameAr;
          const url = file.url || '#';
          const size = file.size || '1.5 MB';
          return `
            <div class="py-3 flex justify-between items-center">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-red-600 text-3xl">picture_as_pdf</span>
                <div>
                  <p class="font-bold text-on-surface">${name}</p>
                  <p class="text-xs text-on-surface-variant">PDF (${size})</p>
                </div>
              </div>
              <a href="${url}" target="_blank" class="text-primary font-bold hover:underline flex items-center gap-1">
                <span>${isEn ? 'Download' : 'تحميل'}</span>
                <span class="material-symbols-outlined text-sm">download</span>
              </a>
            </div>
          `;
        }).join('');
      } else {
        filesHtml = `
          <div class="py-3 flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-red-600 text-3xl">picture_as_pdf</span>
              <div>
                <p class="font-bold text-on-surface">${isEn ? 'Technical Datasheet' : 'كتالوج المنتج الفني الفصيلي'}</p>
                <p class="text-xs text-on-surface-variant">PDF (2.4 MB)</p>
              </div>
            </div>
            <a href="#" onclick="event.preventDefault(); alert('${isEn ? 'Downloading Technical Datasheet...' : 'جاري تحميل الكتالوج الفني...' || 'Downloading...'}')" class="text-primary font-bold hover:underline flex items-center gap-1">
              <span>${isEn ? 'Download' : 'تحميل'}</span>
              <span class="material-symbols-outlined text-sm">download</span>
            </a>
          </div>
          <div class="py-3 flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-red-600 text-3xl">picture_as_pdf</span>
              <div>
                <p class="font-bold text-on-surface">${isEn ? 'Installation & Safety Guide' : 'دليل التركيب والصيانة والتشغيل'}</p>
                <p class="text-xs text-on-surface-variant">PDF (1.8 MB)</p>
              </div>
            </div>
            <a href="#" onclick="event.preventDefault(); alert('${isEn ? 'Downloading Installation Guide...' : 'جاري تحميل دليل التركيب...' || 'Downloading...'}')" class="text-primary font-bold hover:underline flex items-center gap-1">
              <span>${isEn ? 'Download' : 'تحميل'}</span>
              <span class="material-symbols-outlined text-sm">download</span>
            </a>
          </div>
        `;
      }
      
      techTab.innerHTML = `
        <div class="bg-white p-6 rounded-xl border border-outline-variant shadow-sm max-w-3xl mx-auto space-y-4">
          <h4 class="font-bold text-deep-forest mb-4">${isEn ? 'Technical Datasheets & User Manuals' : 'الكتيبات الفنية وشهادات المطابقة'}</h4>
          <div class="divide-y divide-outline-variant/30">
            ${filesHtml}
          </div>
        </div>
      `;
    }

    // Reviews Tab Content
    const reviewsTab = document.getElementById('tab-reviews');
    if (reviewsTab) {
      reviewsTab.innerHTML = `
        <div class="bg-white p-6 rounded-xl border border-outline-variant shadow-sm max-w-3xl mx-auto space-y-6">
          <div class="flex items-center gap-4 border-b border-outline-variant/30 pb-4">
            <div class="text-center">
              <p class="text-5xl font-black text-deep-forest">4.8</p>
              <p class="text-xs text-on-surface-variant mt-1">${isEn ? 'out of 5 stars' : 'من 5 نجوم'}</p>
            </div>
            <div>
              <div class="flex text-amber-500"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span></div>
              <p class="text-sm text-on-surface-variant mt-1">${isEn ? 'Based on 12 reviews' : 'بناءً على 12 تقييماً معتمداً'}</p>
            </div>
          </div>
          <div class="space-y-4 divide-y divide-outline-variant/20">
            <div class="pt-4 text-right ${isEn ? 'text-left' : 'text-right'}">
              <div class="flex justify-between items-center mb-1">
                <p class="font-bold text-deep-forest">${isEn ? 'Eng. Khalid Al-Homsi' : 'م. خالد الحمصي'}</p>
                <div class="flex text-amber-500 text-sm"><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span></div>
              </div>
              <p class="text-body-md text-on-surface-variant">${isEn ? 'Excellent build quality, highly reliable for massive electrical projects. Approved in our company.' : 'ممتاز جداً للمشاريع الكهربائية الكبيرة، جودة التصنيع عالية جداً ومعتمد في مشاريعنا الهندسية.'}</p>
            </div>
            <div class="pt-4 text-right ${isEn ? 'text-left' : 'text-right'}">
              <div class="flex justify-between items-center mb-1">
                <p class="font-bold text-deep-forest">${isEn ? 'Anas Al-Sayed' : 'أنس السيد'}</p>
                <div class="flex text-amber-500 text-sm"><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span><span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span></div>
              </div>
              <p class="text-body-md text-on-surface-variant">${isEn ? 'Super fast response and excellent support. The component operates flawlessly.' : 'توصيل سريع وخدمة عملاء ممتازة من شركة الكهرباء الذكية. القاطع يعمل بكفاءة تامة.'}</p>
            </div>
          </div>
        </div>
      `;
    }

    // Tabs Click Logic
    const tabButtons = document.querySelectorAll('#product-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const targetTab = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => {
          b.className = "tab-btn text-on-surface-variant hover:text-primary pb-4 whitespace-nowrap border-b-2 border-transparent transition-all";
        });
        btn.className = "tab-btn text-primary font-bold border-b-2 border-primary pb-4 whitespace-nowrap transition-all";
        
        tabContents.forEach(content => {
          if (content.id === `tab-${targetTab}`) {
            content.classList.remove('hidden');
          } else {
            content.classList.add('hidden');
          }
        });
      };
    });
  }
}

/* ========== BRANDS ========== */
function renderBrandsPage(data) {
  const brands = data.brands || [];
  const grid = document.getElementById('brands-grid') || document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2') || document.querySelector('[class*="grid-cols-1"][class*="md:grid-cols-2"]');
  if (!grid || !brands.length) return;
  
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';

  // Find or setup search input
  const searchInput = document.getElementById('brand-search-input') || document.querySelector('input[placeholder*="علامة"], input[placeholder*="brand"]');
  if (searchInput && !searchInput.dataset.listenerAdded) {
    searchInput.id = 'brand-search-input';
    searchInput.dataset.listenerAdded = 'true';
    searchInput.addEventListener('input', () => {
      filterAndRender();
    });
  }

  // Find or setup category buttons
  const catButtons = document.querySelectorAll('.flex.gap-2 button');
  let selectedCategory = 'all';
  catButtons.forEach(btn => {
    if (!btn.dataset.listenerAdded) {
      btn.dataset.listenerAdded = 'true';
      btn.addEventListener('click', () => {
        catButtons.forEach(b => {
          b.className = "px-6 py-2 hover:bg-surface-container-low text-on-surface-variant rounded-lg font-label-lg text-label-lg transition-colors";
        });
        btn.className = "px-6 py-2 bg-primary text-white rounded-lg font-label-lg text-label-lg";
        
        const txt = btn.textContent.trim();
        if (txt === 'الكل' || txt === 'All') {
          selectedCategory = 'all';
        } else if (txt === 'كهرباء' || txt === 'Electrical' || txt === 'Electricity') {
          selectedCategory = 'كهرباء';
        } else if (txt === 'صناعة' || txt === 'Industrial' || txt === 'Industry') {
          selectedCategory = 'صناعة';
        } else if (txt === 'إضاءة' || txt === 'Lighting') {
          selectedCategory = 'إضاءة';
        }
        filterAndRender();
      });
    }
  });

  function filterAndRender() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    const filtered = brands.filter(b => {
      // 1. Search Query Match
      if (query !== '') {
        const name = (b.name || '').toLowerCase();
        const nameEn = (b.nameEn || '').toLowerCase();
        const desc = (b.description || '').toLowerCase();
        const descEn = (b.descriptionEn || '').toLowerCase();
        const country = (b.country || '').toLowerCase();
        
        const match = name.includes(query) || 
                      nameEn.includes(query) || 
                      desc.includes(query) || 
                      descEn.includes(query) ||
                      country.includes(query);
        if (!match) return false;
      }
      
      // 2. Category Match
      if (selectedCategory !== 'all') {
        const bCat = (b.category || '').toLowerCase();
        if (!bCat.includes(selectedCategory.toLowerCase()) && !selectedCategory.toLowerCase().includes(bCat)) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white rounded-xl border border-outline-variant p-6">
          <span class="material-symbols-outlined text-6xl text-outline mb-2">verified</span>
          <p class="text-on-surface-variant font-bold text-lg">${isEn ? 'No brands found matching your search.' : 'لا توجد علامات تجارية تطابق خيارات البحث.'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(b => {
      const bName = isEn ? (b.nameEn || b.name) : b.name;
      const bDesc = isEn ? (b.descriptionEn || b.description) : b.description;
      
      return `
        <div class="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden group hover:border-primary transition-all hover:shadow-lg flex flex-col justify-between h-full">
          <div>
            <div class="h-48 bg-surface-gray flex items-center justify-center p-8 border-b border-outline-variant/30 relative">
              ${b.logo ? `<img src="${b.logo}" alt="${bName}" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500">` :
              `<div class="text-center"><span class="material-symbols-outlined text-6xl text-outline">verified</span><p class="text-on-surface-variant mt-2 font-bold">${b.nameEn}</p></div>`}
            </div>
            <div class="p-6">
              <h3 class="font-headline-md text-headline-md text-deep-forest mb-1">${bName}</h3>
              <p class="text-sm text-primary font-semibold mb-2">${b.nameEn} · ${b.country || ''}</p>
              <p class="font-body-md text-body-md text-on-surface-variant line-clamp-3">${bDesc}</p>
            </div>
          </div>
          <div class="p-6 pt-0">
            <a href="products.html?brand=${encodeURIComponent(b.name)}" class="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1.5 mt-4">
              <span>${isEn ? 'View Products' : 'عرض منتجات الماركة'}</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  filterAndRender();
}

/* ========== PROJECTS ========== */
function renderProjectsPage(data) {
  const projects = data.projects;
  const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3') || document.getElementById('projects-page-grid');
  if (!grid || !projects.length) return;

  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';

  // 1. Populate category chips
  const chipsContainer = document.getElementById('projects-filter-chips');
  if (chipsContainer) {
    const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
    chipsContainer.innerHTML = categories.map(cat => {
      const isAll = cat === 'all';
      let label = isAll ? (isEn ? 'All' : 'الكل') : cat;
      if (isEn && !isAll) {
        const sampleProj = projects.find(p => p.category === cat);
        if (sampleProj && sampleProj.categoryEn) {
          label = sampleProj.categoryEn;
        }
      }
      const activeClass = isAll ? 'bg-primary text-white font-bold' : 'bg-surface-gray text-on-surface-variant hover:bg-outline-variant/20 font-bold';
      return `
        <button onclick="filterProjects('${cat}')" class="project-chip px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${activeClass}" data-category="${cat}">
          ${label}
        </button>
      `;
    }).join('');
  }

  // 2. Render all projects initially
  renderProjectCardsList(grid, projects, isEn, lang);

  // 3. Define filtering function globally
  window.filterProjects = function(cat) {
    document.querySelectorAll('.project-chip').forEach(chip => {
      const isChipActive = chip.getAttribute('data-category') === cat;
      if (isChipActive) {
        chip.className = "project-chip px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm bg-primary text-white";
      } else {
        chip.className = "project-chip px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm bg-surface-gray text-on-surface-variant hover:bg-outline-variant/20";
      }
    });

    const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
    renderProjectCardsList(grid, filtered, isEn, lang);
  };
}

function renderProjectCardsList(container, list, isEn, lang) {
  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-on-surface-variant font-bold bg-white rounded-xl border border-outline-variant">
        ${isEn ? 'No projects in this category.' : 'لا توجد مشاريع في هذا القسم حالياً.'}
      </div>
    `;
    return;
  }
  container.innerHTML = list.map(p => {
    const pName = isEn ? (p.nameEn || p.name) : p.name;
    const pDesc = isEn ? (p.descriptionEn || p.description) : p.description;
    const pCat = isEn ? (p.categoryEn || p.category) : p.category;
    const pStatus = isEn ? (p.statusEn || p.status) : p.status;
    
    return `
      <div class="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden group hover:border-primary transition-all hover:shadow-lg flex flex-col">
        <div class="h-56 overflow-hidden relative">
          ${p.image ? `<img src="${p.image}" alt="${pName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
          `<div class="w-full h-full bg-surface-gray flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-outline">engineering</span></div>`}
          <span class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${p.status === 'مكتمل' || p.statusEn === 'Completed' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary text-white'}">${pStatus}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col">
          <span class="text-xs font-bold text-primary uppercase tracking-wider">${pCat}</span>
          <h3 class="font-headline-md text-headline-md text-deep-forest mt-1 mb-2">${pName}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">${pDesc}</p>
          <div class="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
            <a href="project-detail.html?id=${p.id}" class="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              ${TRANSLATIONS[lang].project_details} <span class="material-symbols-outlined text-[16px] dir-arrow">chevron_left</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ========== PROJECT DETAIL PAGE ========== */
function renderProjectDetailPage(data) {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')) || 1;
  const project = data.projects.find(p => p.id === id) || data.projects[0];
  
  if (!project) return;
  
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  const pName = isEn ? (project.nameEn || project.name) : project.name;
  const pDesc = isEn ? (project.descriptionEn || project.description) : project.description;
  const pCat = isEn ? (project.categoryEn || project.category) : project.category;
  const pStatus = isEn ? (project.statusEn || project.status) : project.status;
  
  const pOwner = isEn ? (project.ownerEn || project.owner) : project.owner;
  const pLoc = isEn ? (project.locationEn || project.location) : project.location;
  const pDur = isEn ? (project.durationEn || project.duration) : project.duration;
  const pVal = isEn ? (project.valueEn || project.value) : project.value;
  
  // Breadcrumbs
  const breadcrumb = document.getElementById('project-breadcrumb');
  if (breadcrumb) breadcrumb.textContent = pName;
  
  // Hero section
  const hero = document.getElementById('project-hero');
  if (hero) {
    if (project.image) {
      hero.style.backgroundImage = `url('${project.image}')`;
    } else {
      hero.style.backgroundColor = '#004A3C';
    }
  }
  
  const catEl = document.getElementById('project-category');
  if (catEl) catEl.textContent = pCat;
  
  const statusEl = document.getElementById('project-status');
  if (statusEl) {
    statusEl.textContent = pStatus;
    if (project.status === 'مكتمل' || project.statusEn === 'Completed') {
      statusEl.className = 'px-4 py-1.5 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full';
    } else {
      statusEl.className = 'px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full';
    }
  }
  
  const titleEl = document.getElementById('project-title');
  if (titleEl) titleEl.textContent = pName;
  
  // Overview
  const descEl = document.getElementById('project-description');
  if (descEl) descEl.textContent = pDesc;
  
  // Sidebar details
  const ownerEl = document.getElementById('sidebar-owner');
  if (ownerEl) ownerEl.textContent = pOwner;
  
  const locEl = document.getElementById('sidebar-location');
  if (locEl) locEl.textContent = pLoc;
  
  const durEl = document.getElementById('sidebar-duration');
  if (durEl) durEl.textContent = pDur;
  
  const valEl = document.getElementById('sidebar-value');
  if (valEl) valEl.textContent = pVal;

  // Asymmetrical Gallery
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    const images = project.images && project.images.length > 0 ? project.images : [project.image || ""];
    const activeImgs = images.filter(img => img);
    
    if (activeImgs.length > 0) {
      let html = '';
      activeImgs.forEach((img, i) => {
        if (i === 0) {
          html += `
            <div class="md:col-span-2 md:row-span-2 h-[400px] rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm relative group cursor-pointer" onclick="viewGalleryImage('${img}')">
              <img src="${img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <span class="material-symbols-outlined absolute bottom-4 right-4 bg-white/80 p-2 rounded-full text-deep-forest text-lg opacity-0 group-hover:opacity-100 transition-opacity">zoom_in</span>
            </div>
          `;
        } else if (i < 4) {
          html += `
            <div class="h-[190px] rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm relative group cursor-pointer" onclick="viewGalleryImage('${img}')">
              <img src="${img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <span class="material-symbols-outlined absolute bottom-3 right-3 bg-white/80 p-1.5 rounded-full text-deep-forest text-sm opacity-0 group-hover:opacity-100 transition-opacity">zoom_in</span>
            </div>
          `;
        }
      });
      galleryGrid.innerHTML = html;
    } else {
      const gallerySection = document.getElementById('project-gallery-section');
      if (gallerySection) gallerySection.style.display = 'none';
    }
  }

  // Technical files download list
  const filesList = document.getElementById('tech-files-list');
  if (filesList) {
    const files = project.techFiles || [];
    if (files.length > 0) {
      filesList.innerHTML = files.map(f => {
        const name = isEn ? (f.nameEn || f.nameAr) : f.nameAr;
        return `
          <div class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/30 hover:border-primary transition-all bg-surface-gray/10 hover:shadow-sm">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-red-600 bg-red-50 p-2.5 rounded-lg">picture_as_pdf</span>
              <div>
                <p class="font-bold text-on-surface text-sm">${name}</p>
                <p class="text-xs text-on-surface-variant font-medium">${f.size || '1.2 MB'} · PDF Document</p>
              </div>
            </div>
            <button onclick="downloadMockFile('${name.replace(/'/g, "\\'")}')" class="bg-primary/10 hover:bg-primary hover:text-white text-primary transition-colors py-2 px-4 rounded-lg font-bold text-xs flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">download</span>
              ${isEn ? 'Download' : 'تحميل'}
            </button>
          </div>
        `;
      }).join('');
    } else {
      filesList.innerHTML = `<p class="text-on-surface-variant text-sm text-center py-4">${isEn ? 'No technical files available.' : 'لا توجد ملفات فنية متاحة لهذا المشروع.'}</p>`;
    }
  }

  // WhatsApp CTA
  const whatsappBtn = document.getElementById('cta-whatsapp');
  if (whatsappBtn) {
    const phone = data.settings.phoneMobile || '966500000000';
    const cleanPhone = phone.replace('+', '').replace(/ /g, '');
    const ctaMsg = isEn 
      ? `Hello Smart Electricity Company (SEC), I am interested in solutions for project: ${pName}`
      : `مرحباً شركة الكهرباء الذكية، أود الاستفسار عن حلول هندسية لمشروع: ${pName}`;
    whatsappBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(ctaMsg)}`;
  }
}

/* ========== GALLERY VIEWER LIGHTBOX ========== */
window.viewGalleryImage = function(src) {
  let viewer = document.getElementById('gallery-lightbox');
  if (!viewer) {
    viewer = document.createElement('div');
    viewer.id = 'gallery-lightbox';
    viewer.className = 'fixed inset-0 bg-black/90 backdrop-blur-md z-[100000] flex items-center justify-center p-4 cursor-zoom-out opacity-0 transition-opacity duration-300 pointer-events-none';
    viewer.onclick = () => {
      viewer.classList.remove('opacity-100');
      viewer.classList.add('opacity-0');
      setTimeout(() => viewer.style.display = 'none', 300);
    };
    viewer.innerHTML = `
      <button class="absolute top-6 right-6 text-white hover:text-primary transition-colors bg-white/10 p-2.5 rounded-full flex items-center justify-center">
        <span class="material-symbols-outlined text-2xl">close</span>
      </button>
      <img id="lightbox-img" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 scale-95">
    `;
    document.body.appendChild(viewer);
  }
  const img = viewer.querySelector('#lightbox-img');
  img.src = src;
  viewer.style.display = 'flex';
  setTimeout(() => {
    viewer.classList.remove('pointer-events-none', 'opacity-0');
    viewer.classList.add('opacity-100');
  }, 10);
};

/* ========== MOCK DOWNLOAD FILE ========== */
window.downloadMockFile = function(fileName) {
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const msg = lang === 'en' 
    ? `Downloading: ${fileName}...`
    : `بدء تحميل الملف: ${fileName}...`;
  showToastNotification(msg);
  setTimeout(() => {
    showToastNotification(lang === 'en' ? 'Download completed ✓' : 'اكتمل التحميل بنجاح ✓');
  }, 1500);
};

/* ========== COUNTDOWN TIMER ========== */
function setupCountdownTimer() {
  let targetTime = localStorage.getItem('offers_countdown_target');
  if (!targetTime) {
    targetTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('offers_countdown_target', targetTime);
  } else {
    targetTime = parseInt(targetTime);
    if (targetTime < new Date().getTime()) {
      targetTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
      localStorage.setItem('offers_countdown_target', targetTime);
    }
  }

  function updateClock() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((diff % (60 * 1000)) / 1000);

    const dEl = document.getElementById('timer-days');
    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-mins');
    const sEl = document.getElementById('timer-secs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  updateClock();
  const timerInterval = setInterval(updateClock, 1000);
}

/* ========== OFFERS PAGE ========== */
function renderOffersPage(data) {
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  const s = data.settings;
  
  // Ticking countdown timer
  setupCountdownTimer();
  
  // Filter products where isOffer === true
  const offerProducts = data.products.filter(p => p.isOffer);
  
  // Render Categories List in Sidebar
  const catList = document.getElementById('offers-categories-list');
  if (catList) {
    const categories = ['all', ...new Set(offerProducts.map(p => p.category))];
    catList.innerHTML = categories.map(cat => {
      const label = cat === 'all' 
        ? (isEn ? 'All Offers' : 'كل العروض')
        : (isEn ? (CATEGORY_TRANSLATIONS[cat] || cat) : cat);
      const isActive = cat === 'all';
      return `
        <button onclick="filterOfferProducts('${cat}')" class="offer-cat-btn flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-right transition-colors w-full ${isActive ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-gray/50'}" data-category="${cat}">
          <span>${label}</span>
          <span class="text-xs bg-outline-variant/30 px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'text-on-surface-variant'}">
            ${cat === 'all' ? offerProducts.length : offerProducts.filter(p => p.category === cat).length}
          </span>
        </button>
      `;
    }).join('');
  }

  // Render Offer Products Grid
  const grid = document.getElementById('offers-products-grid');
  const currency = isEn ? (s.currencyEn || s.currency || 'USD') : (s.currency || '$');
  if (grid) {
    renderOfferProductCards(grid, offerProducts, currency);
  }

  // Set filter handler
  window.filterOfferProducts = function(cat) {
    document.querySelectorAll('.offer-cat-btn').forEach(btn => {
      const isBtnActive = btn.getAttribute('data-category') === cat;
      if (isBtnActive) {
        btn.className = "offer-cat-btn flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-right transition-colors w-full bg-primary text-white";
        const badge = btn.querySelector('span:last-child');
        if (badge) badge.className = "text-xs bg-white/20 text-white px-2 py-0.5 rounded-full";
      } else {
        btn.className = "offer-cat-btn flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-right transition-colors w-full text-on-surface-variant hover:bg-surface-gray/50";
        const badge = btn.querySelector('span:last-child');
        if (badge) badge.className = "text-xs bg-outline-variant/30 px-2 py-0.5 rounded-full text-on-surface-variant";
      }
    });

    const filtered = cat === 'all' ? offerProducts : offerProducts.filter(p => p.category === cat);
    renderOfferProductCards(grid, filtered, currency);
  };
}

function renderOfferProductCards(container, products, currency) {
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  const brandData = (typeof SiteData !== 'undefined') ? (SiteData.getData('brands') || []) : [];
  
  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-on-surface-variant font-bold">
        ${isEn ? 'No promotional offers in this category.' : 'لا توجد عروض ترويجية في هذا القسم حالياً.'}
      </div>
    `;
    return;
  }
  
  container.innerHTML = products.map(p => {
    const isPriceVisible = p.showPrice !== false;
    const originalPriceText = isPriceVisible ? `${p.originalPrice} ${currency}` : '';
    const discountPriceText = isPriceVisible ? `${p.price} ${currency}` : 'طلب تسعير';
    
    let discountPercent = 0;
    if (isPriceVisible && p.originalPrice > p.price) {
      discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    }
    
    const stockTotal = p.stockTotal || 100;
    const stockSold = p.stockSold || 0;
    const stockRemaining = Math.max(0, stockTotal - stockSold);
    const percentRemaining = Math.round((stockRemaining / stockTotal) * 100);
    
    const pName = isEn ? (p.nameEn || p.name) : p.name;
    let pBrand = (isEn ? (p.brandEn || p.brand) : p.brand) || (isEn ? 'SEC' : 'شركة الكهرباء الذكية');
    if (isEn && p.brand) {
      const bObj = brandData.find(b => b.name === p.brand);
      if (bObj && bObj.nameEn) {
        pBrand = bObj.nameEn;
      }
    }
    
    return `
      <div class="bg-white rounded-xl border border-outline-variant shadow-sm group overflow-hidden flex flex-col hover:border-primary transition-all hover:shadow-lg relative">
        ${discountPercent > 0 ? `
          <span class="absolute top-3 right-3 bg-error text-white font-extrabold text-xs px-2.5 py-1 rounded-full z-20 shadow">
            -${discountPercent}%
          </span>
        ` : ''}
        
        <div class="h-52 overflow-hidden relative bg-surface-gray">
          <a href="product-detail.html?id=${p.id}" class="block w-full h-full">
            ${p.image ? `<img src="${p.image}" alt="${pName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
            `<div class="w-full h-full flex items-center justify-center"><span class="material-symbols-outlined text-5xl text-outline">image</span></div>`}
          </a>
          <button class="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-white transition-colors">
            <span class="material-symbols-outlined text-[20px]">favorite</span>
          </button>
        </div>
        
        <div class="p-5 flex flex-col flex-grow">
          <span class="font-label-sm text-label-sm text-primary mb-1">${pBrand}</span>
          <h4 class="font-label-lg text-label-lg text-on-surface mb-2 line-clamp-1">
            <a href="product-detail.html?id=${p.id}" class="hover:text-primary transition-colors font-bold">${pName}</a>
          </h4>
          
          <div class="flex items-baseline gap-2 mb-4">
            <span class="font-headline-md text-headline-md text-deep-forest font-bold">${discountPriceText}</span>
            ${discountPercent > 0 ? `
              <span class="text-xs text-on-surface-variant line-through">${originalPriceText}</span>
            ` : ''}
          </div>
          
          <div class="space-y-1.5 mb-6">
            <div class="flex justify-between text-xs font-bold">
              <span class="text-on-surface-variant">
                ${isEn ? 'Stock Remaining' : 'الكمية المتبقية'}
              </span>
              <span class="${stockRemaining < 15 ? 'text-error font-extrabold animate-pulse' : 'text-primary'}">
                ${stockRemaining} ${isEn ? 'pcs' : 'قطعة'}
              </span>
            </div>
            <div class="w-full bg-outline-variant/30 h-2 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500 ${stockRemaining < 15 ? 'bg-error' : 'bg-primary'}" style="width: ${percentRemaining}%"></div>
            </div>
          </div>
          
          <button onclick="addToCart(${p.id}, 1)" class="w-full bg-primary text-white hover:bg-deep-forest py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-auto">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            ${TRANSLATIONS[lang].add_to_cart}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ========== BLOG ========== */
function renderBlogPage(data) {
  const posts = data.blogPosts;
  const grid = document.querySelector('.bento-grid, .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
  if (!grid || !posts.length) return;

  grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  grid.innerHTML = posts.map(p => `
    <article class="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden group hover:border-primary transition-all hover:shadow-lg">
      <div class="h-48 overflow-hidden">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
        `<div class="w-full h-full bg-surface-gray flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-outline">article</span></div>`}
      </div>
      <div class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="px-2 py-0.5 bg-primary-fixed text-deep-forest rounded text-xs font-bold">${p.category}</span>
          <span class="text-xs text-on-surface-variant">${p.date}</span>
        </div>
        <h3 class="font-bold text-lg text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">${p.title}</h3>
        <p class="font-body-md text-body-md text-on-surface-variant line-clamp-3">${p.excerpt}</p>
        <a href="#" class="inline-flex items-center gap-1 text-primary font-bold text-sm mt-4 hover:gap-2 transition-all">اقرأ المزيد <span class="material-symbols-outlined text-[16px]">arrow_back</span></a>
      </div>
    </article>
  `).join('');
}

/* ========== CONTACT ========== */
function renderContactPage(data) {
  const s = data.settings;

  // Render multi contacts lists
  const sidebar = document.querySelector('.lg\\:col-span-4 .space-y-8');
  if (sidebar) {
    const blocks = sidebar.children;
    if (blocks && blocks.length >= 4) {
      // 1. Addresses (blocks[0])
      const addrContent = blocks[0].querySelector('div:last-child');
      if (addrContent) {
        const title = addrContent.querySelector('h3');
        const addressesHtml = (s.addresses && s.addresses.length > 0) 
          ? s.addresses.map(a => `<p class="font-body-md text-body-md text-on-surface-variant">${a}</p>`).join('')
          : `<p class="font-body-md text-body-md text-on-surface-variant">${s.address}</p>`;
        addrContent.innerHTML = `<h3 class="font-label-lg text-label-lg text-on-surface">${title ? title.textContent : 'العناوين والفروع'}</h3>` + addressesHtml;
      }

      // 2. Phones (blocks[1])
      const phoneContent = blocks[1].querySelector('div:last-child');
      if (phoneContent) {
        const title = phoneContent.querySelector('h3');
        const phonesHtml = (s.phones && s.phones.length > 0)
          ? s.phones.map(p => `<p class="font-body-md text-body-md text-on-surface-variant" dir="ltr">${p}</p>`).join('')
          : `<p class="font-body-md text-body-md text-on-surface-variant" dir="ltr">${s.phone}</p>`;
        phoneContent.innerHTML = `<h3 class="font-label-lg text-label-lg text-on-surface">${title ? title.textContent : 'أرقام الهاتف'}</h3>` + phonesHtml;
      }

      // 3. Emails (blocks[2])
      const emailContent = blocks[2].querySelector('div:last-child');
      if (emailContent) {
        const title = emailContent.querySelector('h3');
        const emailsHtml = (s.emails && s.emails.length > 0)
          ? s.emails.map(e => `<p class="font-body-md text-body-md text-on-surface-variant">${e}</p>`).join('')
          : `<p class="font-body-md text-body-md text-on-surface-variant">${s.email}</p>`;
        emailContent.innerHTML = `<h3 class="font-label-lg text-label-lg text-on-surface">${title ? title.textContent : 'البريد الإلكتروني'}</h3>` + emailsHtml;
      }

      // 4. Working Hours (blocks[3])
      const hoursContent = blocks[3].querySelector('div:last-child');
      if (hoursContent) {
        const title = hoursContent.querySelector('h3');
        hoursContent.innerHTML = `
          <h3 class="font-label-lg text-label-lg text-on-surface">${title ? title.textContent : 'ساعات العمل'}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">${s.workingHoursWeekday}</p>
          <p class="font-body-md text-body-md text-on-surface-variant">${s.workingHoursWeekend}</p>
        `;
      }
    }
  }

  // Render social media icons
  const socialContainer = document.querySelector('.bg-deep-forest .flex.gap-4');
  if (socialContainer) {
    const PLATFORM_SVGS = {
      facebook: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>`,
      instagram: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
      twitter: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      linkedin: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      youtube: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
      tiktok: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.07 1.21 2.58 1.9 4.18 2.03v3.85c-1.89-.08-3.71-.84-5.12-2.12-.09-.08-.16-.17-.24-.25v6.52c.06 3.15-1.95 6.09-4.97 7.02-3.29 1.08-6.99-.45-8.49-3.56-1.57-3.14-.62-7.14 2.24-9.15 1.52-1.07 3.42-1.47 5.23-1.1v3.9c-1.35-.38-2.83-.02-3.85.93-1.06 1-1.4 2.63-.84 4.01.55 1.45 2.1 2.37 3.65 2.22 1.66-.09 3.02-1.46 3.05-3.12V.02z"/></svg>`,
      snapchat: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12.012 1.66c-3.18 0-6.19 2.06-6.19 6.27 0 1.25.43 2.15.81 2.87.23.44.41.87.11 1.24-.19.23-.55.45-.96.65-.67.33-1.41.69-1.41 1.45 0 .54.41.87.97.97.31.06.63.02.94-.02.5-.06.74.22.84.5.17.47-.19 1.13-.57 1.83-.34.62-.77 1.41-.33 1.9.23.25.68.39 1.34.39.46 0 .97-.07 1.44-.14.65-.1 1.03.21 1.18.52.27.53-.16 1.43-.65 2.45-.33.68-.74 1.52-.37 2.08.31.47 1.05.6 1.88.6.61 0 1.27-.07 1.83-.18.79-.15 1.13.25 1.25.55.22.56-.23 1.41-.72 2.37-.36.71-.82 1.6-.4 2.18.33.47 1.1.59 1.94.59 1.15 0 2.26-.2 3.12-.59.73-.33 1.12-.86 1.12-1.57 0-1.12-1.2-2.12-2.15-2.91-.45-.38-.85-.71-.85-1.18 0-.46.39-.77.85-1.12.96-.74 2.15-1.65 2.15-2.88 0-.75-.41-1.28-1.12-1.61-.86-.39-1.94-.78-1.94-1.5 0-.46.39-.78.85-1.14.96-.75 2.15-1.68 2.15-2.93 0-4.21-3.01-6.27-6.19-6.27z"/></svg>`,
      telegram: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 6.6 5.344 11.944 11.944 11.944 6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0zm5.833 8.361l-1.972 9.278c-.139.639-.528.806-1.056.514l-3.056-2.25-1.472 1.417c-.167.167-.306.306-.625.306l.222-3.125 5.694-5.139c.25-.222-.056-.347-.389-.125l-7.042 4.431-3.028-.944c-.667-.208-.681-.667.139-.986l11.833-4.556c.556-.208 1.042.125.861.986z"/></svg>`,
      pinterest: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 11.988-5.366 11.988-11.987C23.988 5.367 18.627 0 12.017 0z"/></svg>`,
      whatsapp: `<svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.117-2.875-6.974-1.858-1.857-4.339-2.876-6.979-2.877-5.442 0-9.868 4.42-9.873 9.869-.001 1.699.444 3.359 1.29 4.825L1.879 21.8l4.768-1.251zM17.43 14.33c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>`
    };
    const platforms = [
      { key: 'facebook', title: 'Facebook' },
      { key: 'instagram', title: 'Instagram' },
      { key: 'twitter', title: 'Twitter' },
      { key: 'linkedin', title: 'LinkedIn' },
      { key: 'youtube', title: 'YouTube' },
      { key: 'tiktok', title: 'TikTok' },
      { key: 'snapchat', title: 'Snapchat' },
      { key: 'telegram', title: 'Telegram' },
      { key: 'pinterest', title: 'Pinterest' },
      { key: 'whatsapp', title: 'WhatsApp' }
    ];
    let html = '';
    platforms.forEach(p => {
      if (s[p.key]) {
        const svgContent = PLATFORM_SVGS[p.key] || '';
        html += `
          <a class="w-8 h-8 flex items-center justify-center bg-white/10 rounded hover:bg-secondary transition-all duration-300 hover-swell text-white" href="${s[p.key]}" title="${p.title}" target="_blank">
            ${svgContent}
          </a>
        `;
      }
    });
    if (html) {
      socialContainer.innerHTML = html;
      socialContainer.classList.add('flex-wrap', 'gap-2');
      socialContainer.classList.remove('gap-4');
    }
  }

  // Google Maps Embed
  if (s.mapEmbedUrl) {
    const mapContainer = document.querySelector('.h-\\[450px\\], [class*="h-[450px]"]');
    if (mapContainer) {
      const iframe = mapContainer.querySelector('iframe');
      if (iframe) {
        iframe.src = s.mapEmbedUrl;
      }
    }
  }
}

/* ========== CART ========== */
function renderCartPage(data) {
  const s = data.settings;
  const products = data.products;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('electric_house_cart')) || [];
  } catch (e) {
    cart = [];
  }
  
  const container = document.querySelector('.lg\\:col-span-8.space-y-stack-md');
  const summaryContainer = document.querySelector('.lg\\:col-span-4');
  
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm border border-outline-variant p-12 text-center">
        <span class="material-symbols-outlined text-primary text-6xl mb-4">shopping_basket</span>
        <h3 class="font-headline-md text-headline-md text-on-surface mb-2">${isEn ? 'Your Cart is Empty' : 'عربة التسوق فارغة'}</h3>
        <p class="text-on-surface-variant font-body-md mb-6">${isEn ? "You haven't added any products to your cart yet." : 'لم تقم بإضافة أي منتجات إلى السلة بعد.'}</p>
        <a href="products.html" class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-deep-forest transition-colors">${isEn ? 'Browse Products' : 'تصفح المنتجات'}</a>
      </div>
    `;
    if (summaryContainer) {
      summaryContainer.style.display = 'none';
    }
    return;
  }
  
  if (summaryContainer) {
    summaryContainer.style.display = 'block';
  }
  
  let subtotal = 0;
  let hasHiddenPrice = false;
  let itemsCount = 0;
  const currency = isEn ? (s.currencyEn || s.currency || 'USD') : (s.currency || '$');
  
  let cartItemsHtml = '';
  cart.forEach((item, index) => {
    let p;
    if (typeof item.productId === 'string' && item.productId.startsWith('service_')) {
      const sIndex = parseInt(item.productId.split('_')[1]);
      const service = data.homepage.services[sIndex];
      if (service) {
        const sTitle = isEn ? (service.titleEn || service.title) : service.title;
        p = {
          id: item.productId,
          name: sTitle,
          nameEn: service.titleEn || service.title,
          brand: isEn ? 'Engineering Service' : 'خدمة هندسية',
          price: 0,
          showPrice: false,
          category: isEn ? 'Services' : 'خدمات',
          image: service.image || '',
          description: service.description,
          descriptionEn: service.descriptionEn || service.description
        };
      }
    } else {
      p = products.find(prod => prod.id === item.productId);
    }
    if (!p) return;
    
    itemsCount += item.qty;
    const isPriceVisible = p.showPrice !== false;
    let itemTotalText = '';
    
    if (isPriceVisible) {
      const itemTotal = p.price * item.qty;
      subtotal += itemTotal;
      itemTotalText = `${itemTotal} ${currency}`;
    } else {
      hasHiddenPrice = true;
      itemTotalText = isEn ? 'Request Quote' : 'طلب تسعير';
    }
    
    cartItemsHtml += `
      <div class="bg-white rounded-xl shadow-sm border border-outline-variant p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow">
        <div class="w-32 h-32 flex-shrink-0 bg-surface-gray rounded-lg overflow-hidden border border-outline-variant">
          <img class="w-full h-full object-cover" src="${p.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtV_B92R57OHsYyhkagOFqVoFphaz0nDtdVH7_jTVWYtVI1_C-siYoj8LIArD97HHH5vPlqN8gRUhPg2SgeqDPe-pSb4JEH7hU-Y0-GNo6tLzmfKd2VHZCKOwyoFGAjpPno5Vr3KnDasXEFztyHwL6NgAqaLoHgi_FG5ymA1OET2Y9zi0tso9CNCOLrYHZgv1ucAI1xK_VK774dCyfJ5DPj5cRLXvUX0_ecAgQahW-1Yh03Nj5BRJDAsMD7uB0R7ag2FvVF8pbSI4'}">
        </div>
        <div class="flex-grow text-center md:text-right">
          <span class="text-primary font-label-lg text-label-lg px-2 py-1 bg-secondary-container/30 rounded mb-2 inline-block">${isEn ? (p.brandEn || p.brand) : p.brand}</span>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-1">${isEn ? (p.nameEn || p.name) : p.name}</h3>
          <p class="text-on-surface-variant font-body-md">${isEn ? 'Category' : 'التصنيف'}: ${isEn ? (CATEGORY_TRANSLATIONS[p.category] || p.category) : p.category}</p>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center border border-outline-variant rounded-lg overflow-hidden">
            <button onclick="changeCartQty(${index}, 1)" class="px-3 py-1 hover:bg-surface-gray transition-colors border-l border-outline-variant text-primary font-bold">+</button>
            <span class="px-4 py-1 font-bold text-on-surface">${item.qty < 10 ? '0' + item.qty : item.qty}</span>
            <button onclick="changeCartQty(${index}, -1)" class="px-3 py-1 hover:bg-surface-gray transition-colors text-error font-bold">-</button>
          </div>
          <div class="text-left md:text-right min-w-[120px]">
            <p class="text-on-surface-variant font-label-sm text-label-sm">${isEn ? 'Total Price' : 'السعر الإجمالي'}</p>
            <p class="text-primary font-headline-md text-headline-md font-bold">${itemTotalText}</p>
          </div>
          <button onclick="removeFromCart(${index})" class="p-2 text-on-surface-variant hover:text-error transition-colors">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = cartItemsHtml;
  
  if (summaryContainer) {
    let subtotalHtml = '';
    let vatHtml = '';
    let totalHtml = '';
    
    if (hasHiddenPrice) {
      subtotalHtml = isEn ? 'Requires Quote' : 'يتطلب تسعير';
      vatHtml = isEn ? 'Requires Quote' : 'يتطلب تسعير';
      totalHtml = isEn ? 'Requires Quote' : 'يتطلب تسعير';
    } else {
      const vat = subtotal * 0.15;
      const total = subtotal + vat;
      
      subtotalHtml = `${subtotal.toFixed(2)} ${currency}`;
      vatHtml = `${vat.toFixed(2)} ${currency}`;
      totalHtml = `${total.toFixed(2)} ${currency}`;
    }
    
    const summaryCard = summaryContainer.querySelector('.bg-white');
    if (summaryCard) {
      summaryCard.innerHTML = `
        <h2 class="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant pb-4">${isEn ? 'Order Summary' : 'ملخص الطلب'}</h2>
        <div class="space-y-4 mb-8">
          <div class="flex justify-between items-center text-body-md">
            <span class="text-on-surface-variant">${isEn ? 'Items Count' : 'عدد الأصناف'}</span>
            <span class="font-bold text-on-surface">${itemsCount} ${isEn ? 'items' : 'منتجات'}</span>
          </div>
          <div class="flex justify-between items-center text-body-md">
            <span class="text-on-surface-variant">${isEn ? 'Subtotal' : 'المجموع الفرعي'}</span>
            <span class="font-bold text-on-surface">${subtotalHtml}</span>
          </div>
          <div class="flex justify-between items-center text-body-md">
            <span class="text-on-surface-variant">${isEn ? 'VAT (15%)' : 'ضريبة القيمة المضافة (15%)'}</span>
            <span class="font-bold text-on-surface">${vatHtml}</span>
          </div>
          <div class="pt-4 border-t border-outline-variant flex justify-between items-center">
            <span class="text-headline-md font-bold text-on-surface">${isEn ? 'Final Total' : 'الإجمالي النهائي'}</span>
            <span class="text-headline-md font-bold text-deep-forest">${totalHtml}</span>
          </div>
        </div>
        
        <div id="rfq-form-container" class="space-y-4">
          <p class="text-center text-on-surface-variant font-label-sm leading-relaxed mb-4">
            ${isEn ? 'To get a customized technical and financial quotation for your project, please fill in the details below. Our engineers will contact you shortly.' : 'للحصول على عرض سعر فني ومالي مخصص لمشروعك، يرجى ملء البيانات التالية وسيقوم مهندسونا بالتواصل معك فوراً.'}
          </p>
          <form id="rfq-checkout-form" class="space-y-4" onsubmit="window.handleRFQSubmit(event)">
            <div class="space-y-1">
              <label class="block font-label-sm text-label-sm text-on-surface-variant text-right ${isEn ? 'text-left' : 'text-right'}">${isEn ? 'Full Name' : 'الاسم الكامل'}</label>
              <input id="rfq-name" class="w-full bg-surface-gray border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none" required type="text">
            </div>
            <div class="space-y-1">
              <label class="block font-label-sm text-label-sm text-on-surface-variant text-right ${isEn ? 'text-left' : 'text-right'}">${isEn ? 'Company / Institution Name' : 'اسم الشركة / المؤسسة'}</label>
              <input id="rfq-company" class="w-full bg-surface-gray border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none" required type="text">
            </div>
            <div class="space-y-1">
              <label class="block font-label-sm text-label-sm text-on-surface-variant text-right ${isEn ? 'text-left' : 'text-right'}">${isEn ? 'Professional Email' : 'البريد الإلكتروني المهني'}</label>
              <input id="rfq-email" class="w-full bg-surface-gray border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none" required type="email">
            </div>
            <div class="space-y-1">
              <label class="block font-label-sm text-label-sm text-on-surface-variant text-right ${isEn ? 'text-left' : 'text-right'}">${isEn ? 'Phone Number / Mobile' : 'رقم الهاتف / الجوال'}</label>
              <input id="rfq-phone" class="w-full bg-surface-gray border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none" required type="tel">
            </div>
            <div class="space-y-1">
              <label class="block font-label-sm text-label-sm text-on-surface-variant text-right ${isEn ? 'text-left' : 'text-right'}">${isEn ? 'Bill of Quantities & Specs (BOQ) File' : 'ملف جدول الكميات والمواصفات (BOQ)'}</label>
              <input id="rfq-file" class="w-full bg-surface-gray border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none" type="file">
            </div>
            <div class="space-y-1">
              <label class="block font-label-sm text-label-sm text-on-surface-variant text-right ${isEn ? 'text-left' : 'text-right'}">${isEn ? 'Special Notes or Requirements' : 'ملاحظات أو متطلبات خاصة بالطلب'}</label>
              <textarea id="rfq-notes" class="w-full bg-surface-gray border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none" rows="3"></textarea>
            </div>
            <button type="submit" class="bg-primary text-white flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold hover:bg-deep-forest active:scale-95 transition-all shadow-lg hover:shadow-xl w-full">
              <span class="material-symbols-outlined">send</span>
              <span>${isEn ? 'Submit Quote Request' : 'إرسال طلب التسعير'}</span>
            </button>
          </form>
          <div class="flex items-center justify-center gap-2 text-on-surface-variant mt-4">
            <span class="material-symbols-outlined text-sm">lock</span>
            <span class="font-label-sm text-label-sm">${isEn ? 'Secure and direct contact with our sales team' : 'تواصل آمن ومباشر مع مبيعاتنا'}</span>
          </div>
        </div>
      `;
    }
  }
}

/* ========== THANK YOU PAGE ========== */
function renderThankYouPage(data) {
  const lastOrderId = sessionStorage.getItem('last_order_id') || '#EH-84930';
  const receiptCard = Array.from(document.querySelectorAll('.bg-white.p-6')).find(c => c.textContent.includes('رقم المرجع'));
  if (receiptCard) {
    const valEl = receiptCard.querySelector('p.text-deep-forest');
    if (valEl) valEl.textContent = lastOrderId;
  }
}

/* ========== SHARED: Product Cards ========== */
function renderProductCards(container, products, currency) {
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  const brandData = (typeof SiteData !== 'undefined') ? (SiteData.getData('brands') || []) : [];
  
  container.innerHTML = products.map(p => {
    const isPriceVisible = p.showPrice !== false;
    const pName = isEn ? (p.nameEn || p.name) : p.name;
    let pBrand = (isEn ? (p.brandEn || p.brand) : p.brand) || (isEn ? 'SEC' : 'شركة الكهرباء الذكية');
    if (isEn && p.brand) {
      const bObj = brandData.find(b => b.name === p.brand);
      if (bObj && bObj.nameEn) {
        pBrand = bObj.nameEn;
      }
    }
    
    let priceHtml = '';
    let discountBadgeHtml = '';
    
    if (isPriceVisible) {
      if (p.isOffer && p.originalPrice > p.price) {
        const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        priceHtml = `
          <div class="flex items-baseline gap-2">
            <span class="font-headline-md text-headline-md text-deep-forest font-bold">${p.price} ${currency}</span>
            <span class="text-xs text-on-surface-variant line-through">${p.originalPrice} ${currency}</span>
          </div>
        `;
        discountBadgeHtml = `<span class="absolute top-3 right-3 bg-error text-white text-[10px] rounded font-bold px-2 py-0.5 z-20">-${discountPercent}%</span>`;
      } else {
        priceHtml = `<span class="font-headline-md text-headline-md text-deep-forest font-bold">${p.price} ${currency}</span>`;
      }
    } else {
      priceHtml = `<span class="font-headline-md text-headline-md text-deep-forest font-bold">${isEn ? 'Request Price' : 'طلب السعر'}</span>`;
    }
    
    const featuredBadge = p.featured ? `<span class="absolute top-3 right-3 px-2 py-0.5 bg-primary text-white text-[10px] rounded font-bold">${isEn ? 'Featured' : 'مميز'}</span>` : '';
    
    return `
      <div class="bg-white rounded-xl border border-outline-variant shadow-sm group overflow-hidden flex flex-col hover:border-primary transition-all hover:shadow-lg relative">
        <div class="h-48 overflow-hidden relative">
          <a href="product-detail.html?id=${p.id}" class="block w-full h-full">
            ${p.image ? `<img src="${p.image}" alt="${pName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
            `<div class="w-full h-full bg-surface-gray flex items-center justify-center"><span class="material-symbols-outlined text-5xl text-outline">image</span></div>`}
          </a>
          <button onclick="window.toggleFavorite(this, ${p.id})" class="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-white transition-colors z-20">
            <span class="material-symbols-outlined text-[20px]">favorite</span>
          </button>
          ${discountBadgeHtml || featuredBadge}
        </div>
        <div class="p-4 flex flex-col flex-1">
          <span class="font-label-sm text-label-sm text-primary mb-1">${pBrand}</span>
          <h4 class="font-label-lg text-label-lg text-on-surface mb-2 line-clamp-1">
            <a href="product-detail.html?id=${p.id}" class="hover:text-primary transition-colors font-bold">${pName}</a>
          </h4>
          <div class="mt-auto flex items-center justify-between">
            ${priceHtml}
            <button onclick="addToCart(${p.id}, 1)" class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-container transition-colors" title="${isEn ? 'Add to Cart' : 'إضافة إلى السلة'}">
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderHorizontalProductCards(container, products, currency) {
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  const brandData = (typeof SiteData !== 'undefined') ? (SiteData.getData('brands') || []) : [];
  
  container.innerHTML = products.map(p => {
    const isPriceVisible = p.showPrice !== false;
    const pName = isEn ? (p.nameEn || p.name) : p.name;
    let pBrand = (isEn ? (p.brandEn || p.brand) : p.brand) || (isEn ? 'SEC' : 'شركة الكهرباء الذكية');
    if (isEn && p.brand) {
      const bObj = brandData.find(b => b.name === p.brand);
      if (bObj && bObj.nameEn) {
        pBrand = bObj.nameEn;
      }
    }
    
    let priceHtml = '';
    let discountBadgeHtml = '';
    
    if (isPriceVisible) {
      if (p.isOffer && p.originalPrice > p.price) {
        const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        priceHtml = `
          <div>
            <span class="block text-primary font-bold text-lg">${p.price} ${currency}</span>
            <span class="block text-outline line-through text-sm">${p.originalPrice} ${currency}</span>
          </div>
        `;
        discountBadgeHtml = `<span class="absolute top-2 right-2 bg-error text-white text-xs px-2 py-1 rounded font-bold">-${discountPercent}%</span>`;
      } else {
        priceHtml = `
          <div>
            <span class="block text-primary font-bold text-lg">${p.price} ${currency}</span>
          </div>
        `;
      }
    } else {
      priceHtml = `
        <div>
          <span class="block text-primary font-bold text-lg">${isEn ? 'Request Price' : 'طلب السعر'}</span>
        </div>
      `;
    }
    
    return `
      <div class="min-w-[280px] bg-white rounded-xl p-4 border border-outline-variant hover:shadow-lg transition-all group relative">
        <div class="relative mb-4 h-48 flex items-center justify-center overflow-hidden">
          <a href="product-detail.html?id=${p.id}" class="block w-full h-full">
            ${p.image ? `<img src="${p.image}" alt="${pName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
            `<div class="w-full h-full bg-surface-gray flex items-center justify-center"><span class="material-symbols-outlined text-5xl text-outline">image</span></div>`}
          </a>
          <button onclick="window.toggleFavorite(this, ${p.id})" class="absolute top-2 left-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-white transition-colors z-20">
            <span class="material-symbols-outlined text-[20px]">favorite</span>
          </button>
          ${discountBadgeHtml}
        </div>
        <span class="font-label-sm text-label-sm text-primary mb-1 block">${pBrand}</span>
        <h3 class="font-body-md text-body-md text-on-surface mb-2 h-12 line-clamp-2">
          <a href="product-detail.html?id=${p.id}" class="hover:text-primary transition-colors font-bold">${pName}</a>
        </h3>
        <div class="flex justify-between items-end mt-4">
          ${priceHtml}
          <button onclick="addToCart(${p.id}, 1)" class="bg-primary text-white p-2 rounded-lg hover:bg-deep-forest transition-colors" title="${isEn ? 'Add to Cart' : 'إضافة إلى السلة'}">
            <span class="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ========== SHARED: Service Cards ========== */
function renderServiceCards(container, services) {
  const grid = container.querySelector('.grid') || container;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  grid.innerHTML = services.map(s => {
    const title = getLocalized(s, 'title', lang);
    const description = getLocalized(s, 'description', lang);
    return `
      <div class="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden group hover:border-primary transition-all hover:shadow-lg flex flex-col text-right" dir="rtl">
        <div class="h-40 overflow-hidden">
          ${s.image ? `<img src="${s.image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` :
          `<div class="w-full h-full bg-surface-gray flex items-center justify-center"><span class="material-symbols-outlined text-5xl text-primary/30">${s.icon || 'engineering'}</span></div>`}
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-primary">${s.icon || 'engineering'}</span>
              <h3 class="font-bold text-lg text-deep-forest">${title}</h3>
            </div>
            <p class="text-sm text-on-surface-variant">${description}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ========== CART GLOBAL UTILITIES ========== */
function updateCartBadge() {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('electric_house_cart')) || [];
  } catch (e) {
    cart = [];
  }
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  document.querySelectorAll('a[href="cart.html"] span.bg-primary, a[href="cart.html"] .bg-primary').forEach(el => {
    el.textContent = totalQty;
    el.style.display = totalQty > 0 ? 'flex' : 'none';
  });
}

window.addToCart = function(productId, qty = 1) {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('electric_house_cart')) || [];
  } catch (e) {
    cart = [];
  }
  
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  
  localStorage.setItem('electric_house_cart', JSON.stringify(cart));
  updateCartBadge();
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  showToastNotification(lang === 'en' ? 'Product added to cart successfully ✓' : 'تم إضافة المنتج إلى السلة بنجاح ✓');
};

window.changeCartQty = function(index, delta) {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('electric_house_cart')) || [];
  } catch (e) {
    cart = [];
  }
  
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('electric_house_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartPage(SiteData.getData());
  }
};

window.removeFromCart = function(index) {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('electric_house_cart')) || [];
  } catch (e) {
    cart = [];
  }
  
  if (cart[index]) {
    cart.splice(index, 1);
    localStorage.setItem('electric_house_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartPage(SiteData.getData());
    const lang = localStorage.getItem('electric_house_lang') || 'ar';
    showToastNotification(lang === 'en' ? 'Product removed from cart' : 'تم إزالة المنتج من السلة');
  }
};

window.sendOrderWhatsApp = function() {
  const data = SiteData.getData();
  const s = data.settings;
  const products = data.products;
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';
  
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('electric_house_cart')) || [];
  } catch (e) {
    cart = [];
  }
  
  if (cart.length === 0) return;
  
  let msgText = isEn 
    ? 'Hello Smart Electricity Company (SEC), I would like to order the following items:\n\n'
    : 'مرحباً شركة الكهرباء الذكية، أريد طلب المنتجات التالية:\n\n';
    
  let total = 0;
  let hasHiddenPrice = false;
  const currency = isEn ? (s.currencyEn || s.currency || 'USD') : (s.currency || '$');
  
  cart.forEach((item, idx) => {
    let p;
    if (typeof item.productId === 'string' && item.productId.startsWith('service_')) {
      const sIndex = parseInt(item.productId.split('_')[1]);
      const service = data.homepage.services[sIndex];
      if (service) {
        p = {
          name: isEn ? (service.titleEn || service.title) : service.title,
          showPrice: false
        };
      }
    } else {
      p = products.find(prod => prod.id === item.productId);
    }
    if (!p) return;
    
    const pName = isEn ? (p.nameEn || p.name) : p.name;
    if (p.showPrice !== false) {
      const itemTotal = p.price * item.qty;
      total += itemTotal;
      msgText += `${idx+1}. ${pName} - ${isEn ? 'Qty' : 'الكمية'}: ${item.qty} - ${isEn ? 'Price' : 'السعر'}: ${itemTotal} ${currency}\n`;
    } else {
      hasHiddenPrice = true;
      msgText += `${idx+1}. ${pName} - ${isEn ? 'Qty' : 'الكمية'}: ${item.qty} - (${isEn ? 'Requires special project quotation' : 'مطلوب تسعير خاص للمشروع'})\n`;
    }
  });
  
  msgText += '\n';
  if (hasHiddenPrice) {
    msgText += isEn 
      ? 'Total Price: Requires special project quotation'
      : 'إجمالي السعر: يتطلب تسعير خاص للمشروع';
  } else {
    const vat = total * 0.15;
    const finalTotal = total + vat;
    msgText += isEn 
      ? `Subtotal: ${total} ${currency}\nVAT (15%): ${vat.toFixed(2)} ${currency}\nFinal Total: ${finalTotal.toFixed(2)} ${currency}`
      : `المجموع: ${total} ${currency}\nالضريبة (15%): ${vat.toFixed(2)} ${currency}\nالإجمالي النهائي: ${finalTotal.toFixed(2)} ${currency}`;
  }
  
  const whatsappUrl = s.whatsapp ? s.whatsapp : 'https://wa.me/966500000000';
  let baseUrl = whatsappUrl.split('?')[0];
  if (!baseUrl.startsWith('http')) {
    baseUrl = 'https://wa.me/' + baseUrl.replace('+', '').replace(/ /g, '');
  }
  
  // Create orders in dashboard database
  const orders = SiteData.getData('orders') || [];
  const newOrder = {
    id: 'EH-' + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toLocaleDateString('ar-SA'),
    product: cart.map(item => {
      let nameStr = '';
      if (typeof item.productId === 'string' && item.productId.startsWith('service_')) {
        const sIndex = parseInt(item.productId.split('_')[1]);
        const service = data.homepage.services[sIndex];
        if (service) nameStr = isEn ? (service.titleEn || service.title) : service.title;
      } else {
        const p = products.find(prod => prod.id === item.productId);
        if (p) nameStr = isEn ? (p.nameEn || p.name) : p.name;
      }
      return nameStr ? `${nameStr} (x${item.qty})` : '';
    }).filter(x => x).join('، '),
    total: hasHiddenPrice ? 0 : (total * 1.15),
    status: 'جديد',
    customer: isEn ? 'Website Customer' : 'عميل الموقع'
  };
  orders.push(newOrder);
  SiteData.saveData('orders', orders);
  
  sessionStorage.setItem('last_order_id', newOrder.id);
  localStorage.removeItem('electric_house_cart');
  updateCartBadge();
  
  const finalUrl = `${baseUrl}?text=${encodeURIComponent(msgText)}`;
  window.open(finalUrl, '_blank');
  
  window.location.href = 'thank-you.html';
};

window.handleRFQSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('rfq-name').value;
  const company = document.getElementById('rfq-company').value;
  const email = document.getElementById('rfq-email').value;
  const phone = document.getElementById('rfq-phone').value;
  const notes = document.getElementById('rfq-notes').value;
  const fileInput = document.getElementById('rfq-file');
  
  let fileName = "";
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    fileName = fileInput.files[0].name;
  }
  
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  const isEn = lang === 'en';

  const cart = JSON.parse(localStorage.getItem('electric_house_cart') || '[]');
  const products = SiteData.getData('products') || [];

  let total = 0;
  let hasHiddenPrice = false;
  
  const items = cart.map(item => {
    let p;
    if (typeof item.productId === 'string' && item.productId.startsWith('service_')) {
      const sIndex = parseInt(item.productId.split('_')[1]);
      const service = data.homepage.services[sIndex];
      if (service) {
        p = {
          name: isEn ? (service.titleEn || service.title) : service.title,
          nameEn: service.titleEn || service.title,
          showPrice: false
        };
      }
    } else {
      p = products.find(prod => prod.id === item.productId);
    }
    if (!p) return null;
    const pName = isEn ? (p.nameEn || p.name) : p.name;
    if (p.showPrice !== false) {
      total += p.price * item.qty;
    } else {
      hasHiddenPrice = true;
    }
    return {
      name: pName,
      qty: item.qty,
      price: p.showPrice !== false ? p.price : null
    };
  }).filter(Boolean);

  const rfqId = 'RFQ-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
  
  const rfqData = {
    rfqId: rfqId,
    name: name,
    company: company,
    email: email,
    phone: phone,
    notes: notes,
    boqFileName: fileName,
    date: new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-SA'),
    items: items,
    subtotal: total,
    vat: total * 0.15,
    finalTotal: total * 1.15,
    hasHiddenPrice: hasHiddenPrice
  };

  // Save the RFQ to localStorage for the thank you page
  localStorage.setItem('electric_house_latest_rfq', JSON.stringify(rfqData));

  // Save order to the dashboard database so admin can see it in orders tab
  const orders = SiteData.getData('orders') || [];
  const newOrder = {
    id: rfqId,
    date: rfqData.date,
    product: items.map(it => `${it.name} (x${it.qty})`).join('، '),
    total: hasHiddenPrice ? 0 : rfqData.finalTotal,
    status: isEn ? 'New RFQ' : 'طلب تسعير جديد',
    customer: company ? `${name} (${company})` : name
  };
  orders.push(newOrder);
  SiteData.saveData('orders', orders);

  // Clear cart and redirect
  localStorage.removeItem('electric_house_cart');
  if (typeof updateCartBadge === 'function') updateCartBadge();

  window.location.href = 'thank-you.html';
};

/* ========== PROJECTS INTERACTIVE MODAL ========== */
window.openProjectDetail = function(id) {
  const data = SiteData.getData();
  const p = data.projects.find(x => x.id === id);
  if (!p) return;
  
  let modalEl = document.getElementById('project-detail-modal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'project-detail-modal';
    modalEl.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
    modalEl.style.display = 'none';
    document.body.appendChild(modalEl);
  }
  
  const imgs = p.images && p.images.length > 0 ? p.images : [p.image];
  const activeImgs = imgs.filter(img => img);
  
  let galleryHtml = '';
  if (activeImgs.length > 0) {
    galleryHtml = `
      <div class="mb-4">
        <div class="h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-surface-gray border border-outline-variant">
          <img id="project-modal-main-img" src="${activeImgs[0]}" class="w-full h-full object-cover">
        </div>
        ${activeImgs.length > 1 ? `
          <div class="flex gap-2 mt-2 overflow-x-auto py-1">
            ${activeImgs.map((img, i) => `
              <button onclick="document.getElementById('project-modal-main-img').src='${img}'" class="w-16 h-16 rounded border border-outline-variant overflow-hidden flex-shrink-0 focus:border-primary">
                <img src="${img}" class="w-full h-full object-cover">
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  } else {
    galleryHtml = `
      <div class="h-64 w-full rounded-xl bg-surface-gray border border-outline-variant flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-6xl text-outline">engineering</span>
      </div>
    `;
  }
  
  modalEl.innerHTML = `
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-right shadow-2xl animate-fade-in" dir="rtl">
      <button onclick="document.getElementById('project-detail-modal').style.display='none'" class="absolute top-4 left-4 w-8 h-8 rounded-full bg-surface-gray hover:bg-outline-variant/30 flex items-center justify-center">
        <span class="material-symbols-outlined text-on-surface">close</span>
      </button>
      
      <span class="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full inline-block mb-3">${p.category}</span>
      <h2 class="font-headline-lg text-headline-lg text-deep-forest mb-4">${p.name}</h2>
      
      ${galleryHtml}
      
      <div class="flex gap-4 items-center mb-4 text-sm font-semibold text-on-surface-variant border-y border-outline-variant/30 py-3">
        <div>حالة المشروع: <span class="px-2 py-0.5 rounded text-xs ${p.status === 'مكتمل' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary text-white'}">${p.status}</span></div>
      </div>
      
      <h3 class="font-bold text-md text-deep-forest mb-2">عن المشروع</h3>
      <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">${p.description}</p>
    </div>
  `;
  
  modalEl.style.display = 'flex';
};

/* ========== TOAST NOTIFICATION ========== */
function showToastNotification(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 bg-deep-forest text-white px-6 py-3 rounded-lg shadow-xl font-bold text-sm z-[9999] transition-opacity duration-300 opacity-0 pointer-events-none';
    toast.style.fontFamily = 'Cairo, sans-serif';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
}

/* ========== DYNAMIC DOM TRANSLATOR ========== */
function initDynamicTranslator() {
  const lang = localStorage.getItem('electric_house_lang') || 'ar';
  if (lang !== 'en') return;

  const textMapping = {
    "ما الذي تبحث عنه؟": "What are you looking for?",
    "بريدك الإلكتروني": "Email Address",
    "ابحث عن علامة تجارية...": "Search for a brand...",
    "أدخل اسمك هنا": "Enter your name here",
    "كيف يمكننا مساعدتك اليوم؟": "How can we help you today?",
    "شركة الكهرباء الذكية": "Smart Electricity Company (SEC)",
    "الليره السورية": "SYP",
    "الأحد - الخميس: 8:00 ص - 5:30 م": "Sunday - Thursday: 8:00 AM - 5:30 PM",
    "الجمعة - السبت: مغلق": "Friday - Saturday: Closed",
    "الرقم | العنوان بالعربي | العنوان بالإنجليزي": "Number | Arabic Title | English Title",
    "الاسم بالعربي | الاسم بالإنجليزي | الحجم": "Arabic Name | English Name | Size",
    "مثال: نصائح فنية": "Example: Technical Tips",
    "السنة": "Year",
    "العنوان": "Title",
    "من نحن | شركة الكهرباء الذكية": "About Us | Smart Electricity Company (SEC)",
    "المدونة | شركة الكهرباء الذكية": "Blog | Smart Electricity Company (SEC)",
    "العلامات التجارية - شركة الكهرباء الذكية": "Brands - Smart Electricity Company (SEC)",
    "عربة التسوق | شركة الكهرباء الذكية": "Shopping Cart | Smart Electricity Company (SEC)",
    "اتصل بنا | شركة الكهرباء الذكية": "Contact Us | Smart Electricity Company (SEC)",
    "لوحة التحكم | شركة الكهرباء الذكية": "Dashboard | Smart Electricity Company (SEC)",
    "Smart Electricity Company (SEC) | شركة الكهرباء الذكية": "Smart Electricity Company (SEC)",
    "العروض الحصرية - شركة الكهرباء الذكية": "Exclusive Offers - Smart Electricity Company (SEC)",
    "تفاصيل المنتج | شركة الكهرباء الذكية": "Product Details - Smart Electricity Company (SEC)",
    "قائمة المنتجات | شركة الكهرباء الذكية": "Products List - Smart Electricity Company (SEC)",
    "تفاصيل المشروع - شركة الكهرباء الذكية": "Project Details - Smart Electricity Company (SEC)",
    "المشاريع - شركة الكهرباء الذكية": "Projects - Smart Electricity Company (SEC)",
    "الخدمات - شركة الكهرباء الذكية": "Services - Smart Electricity Company (SEC)",
    "شكراً لطلبك - شركة الكهرباء الذكية": "Thank You for Your Order - Smart Electricity Company (SEC)",
    "تصفح كتالوج المنتجات": "Browse products catalog",
    "نبذة عن شركة الكهرباء الذكية (SEC)": "About Smart Electricity Company (SEC)",
    "سنوات من التميز": "Years of Excellence",
    "مشروع صناعي منجز": "Completed Industrial Projects",
    "اقرأ المزيد عن الشركة": "Read More About the Company",
    "القطاعات التي نخدمها": "Sectors We Serve",
    "القطاعات الصناعية التي نخدمها": "Industrial Sectors We Serve",
    "مشاريعنا الهندسية الكبرى": "Our Major Engineering Projects",
    "عرض جميع المشاريع": "View All Projects",
    "لماذا تختار شركة الكهرباء الذكية (SEC)؟": "Why Choose Smart Electricity Company (SEC)?",
    "ماركات عالمية معتمدة": "Verified Global Brands",
    "نحن موزعون معتمدون لكبرى العلامات التجارية العالمية.": "We are authorized distributors for major global brands.",
    "مهندسون استشاريون خبراء": "Expert Consulting Engineers",
    "نقدم استشارات هندسية ودراسات متكاملة للمشاريع والمنشآت.": "We provide engineering consultations and complete studies for projects.",
    "أسعار خاصة بالجملة": "Special Wholesale Prices",
    "خصومات وعروض مميزة للمقاولين وأصحاب المنشآت الصناعية.": "Special discounts and offers for contractors and industrial owners.",
    "خدمات دعم ما بعد البيع": "After-Sales Support Services",
    "ضمان حقيقي للصيانة وقطع الغيار والزيارات الفنية الميدانية.": "Real warranty for maintenance, spare parts, and field technical visits.",
    "طلب عرض سعر مباشر": "Direct Quote Request",
    "يرجى ملء النموذج وسيتصل بك أحد مهندسينا الاستشاريين لمناقشة التفاصيل.": "Please fill the form and one of our consulting engineers will contact you.",
    "الاسم الكامل": "Full Name",
    "اسم الجهة أو الشركة": "Company Name",
    "رقم الهاتف / الجوال": "Phone / Mobile Number",
    "ملاحظات أو متمتطلبات خاصة": "Notes or Special Requirements",
    "إرسال الطلب": "Send Request",

"قاطع كهربائي شنايدر 40 أمبير ثلاثي الأطوار":"Schneider Circuit Breaker 40A 3-Phase","لوحة إضاءة ليد 60x60 سم بقوة 40 واط":"LED Panel Light 60x60cm 40W","مقبس ثنائي معدني ليجراند - ستانلس ستيل":"Legrand Metal Double Socket - Stainless Steel","كابل نحاس بحرة 4 مم - لفة 100 متر":"Bahra Copper Cable 4mm - 100m Roll","أجهزة القياس":"Measuring Devices","تفاصيل المنتج | شركة الكهرباء الذكية":"Product Details | Smart Electricity Company (SEC)","قاطع تيار كهربائي ذكي 3 أقطاب":"Smart 3-Pole Circuit Breaker","سلسلة الصناعات الثقيلة":"Heavy Industry Series","قاطع تيار كهربائي ذكي 3 أقطاب - 400 أمبير":"Smart 3-Pole Circuit Breaker - 400A","نظام حماية متطور مع تقنية المراقبة عن بُعد عبر بروتوكول Modbus، مصمم للمنشآت الصناعية الكبرى.":"Advanced protection system with remote monitoring via Modbus protocol, designed for major industrial facilities.","الجهد الكهربائي":"Voltage","عدد الأقطاب":"Number of Poles","الشهادات":"Certificates","درجة الحماية":"Protection Degree","الكمية:":"Quantity:","إضافة إلى السلة":"Add to Cart","شحن سريع":"Fast Shipping","ضمان سنتين":"2 Years Warranty","تبديل سهل":"Easy Return","الوصف الفني":"Technical Description","المواصفات الكاملة":"Full Specifications","كتيبات الاستخدام":"User Manuals","المراجعات (12)":"Reviews (12)","مميزات المنتج":"Product Features","قدرة قطع عالية تصل إلى 50 كيلو أمبير لحماية قصوى.":"High breaking capacity up to 50kA for maximum protection.","وحدة تحكم رقمية مدمجة لمراقبة الأحمال اللحظية.":"Built-in digital controller for real-time load monitoring.","سهولة التركيب على القضبان المعدنية المعيارية (DIN Rail).":"Easy installation on standard metal rails (DIN Rail).","توافق تام مع أنظمة إدارة المباني الذكية (BMS).":"Full compatibility with Building Management Systems (BMS).","الدعم الفني والخدمات":"Technical Support and Services","هل تحتاج إلى مساعدة في اختيار القاطع المناسب لمشروعك؟ مهندسونا جاهزون لتقديم الاستشارة الفنية المجانية.":"Need help choosing the right breaker for your project? Our engineers are ready to provide free technical consultation.","تحدث مع خبير":"Talk to an Expert","منتجات ذات صلة":"Related Products","اكتشف حلولاً متكاملة لنظام التوزيع الكهربائي لديك":"Discover integrated solutions for your electrical distribution system","قواطع فرعية":"Sub-Breakers","قاطع تيار مصغر 16 أمبير":"Miniature Circuit Breaker 16A","لوحات التوزيع":"Distribution Boards","لوحة توزيع كهربائية 36 خط":"Distribution Board 36 Way","جهاز قياس الطاقة الرقمي":"Digital Energy Meter","المحولات والمرحلات":"Transformers and Relays","مرحل حماية الجهد المتعدد":"Multi-Voltage Protection Relay","قائمة المنتجات | شركة الكهرباء الذكية":"Products List | Smart Electricity Company (SEC)","خصم 15%":"15% Discount","وصل حديثاً":"New Arrival","مفتاح كهربائي ثلاثي - موديل بلاتينيوم":"Triple Switch - Platinum Model","كابل طاقة نحاسي 16 ملم - عالي التحمل":"Copper Power Cable 16mm - Heavy Duty","كشاف ليد صناعي 200 واط - مقاوم للمياه":"Industrial LED Floodlight 200W - Waterproof","جهاز فحص وقياس رقمي احترافي":"Professional Digital Multimeter","لوحة توزيع كهربائية 12 خط - كاملة":"Distribution Board 12 Way - Complete","مفتاح ذكي - مجموعة آرتيور الذهبية":"Smart Switch - Arteor Gold Collection","تفاصيل المشروع - شركة الكهرباء الذكية":"Project Details - Smart Electricity Company (SEC)","تحميل...":"Loading...","تحميل تفاصيل المشروع...":"Loading project details...","نظرة عامة على المشروع":"Project Overview","معرض صور المشروع":"Project Gallery","بطاقة تفاصيل المشروع":"Project Detail Card","المالك":"Owner","الموقع":"Location","الفترة الزمنية":"Duration","قيمة المشروع":"Project Value","طلب عرض سعر للمشروع":"Request Project Quote","المشاريع - شركة الكهرباء الذكية":"Projects - Smart Electricity Company (SEC)","قصص نجاحنا":"Our Success Stories","نحن نفخر بكوننا الشريك الموثوق لأكبر المشاريع القومية والصناعية، حيث نقدم حلولاً كهربائية متكاملة تدفع عجلة التنمية.":"We are proud to be the trusted partner for major national and industrial projects, providing integrated electrical solutions that drive development.","هل لديك مشروع كبير قادم؟":"Have an upcoming large project?","نحن هنا لنزودك بأفضل المعدات والحلول الكهربائية المبتكرة. تواصل مع فريقنا الاستشاري اليوم.":"We are here to provide you with the best innovative electrical equipment and solutions. Contact our consulting team today.","اطلب عرض سعر":"Request a Quote","تحميل بروفايل الشركة":"Download Company Profile","الخدمات - شركة الكهرباء الذكية":"Services - Smart Electricity Company (SEC)","خدماتنا":"Our Services","حلول هندسية متكاملة":"Integrated Engineering Solutions","نوفر لعملائنا في قطاعات الإنشاءات، الطاقة، والصناعة خدمات متخصصة تفوق التوقعات بدعم من خبرائنا ومهندسينا.":"We provide our clients in the construction, energy, and industry sectors with specialized services that exceed expectations, backed by our experts and engineers.","شكراً لطلبك - شركة الكهرباء الذكية":"Thank You for Your Order - Smart Electricity Company (SEC)","المبيعات المباشرة: 966xxxxxxxxx+":"Direct Sales: +966xxxxxxxxx","تراث من التميز الكهربائي":"A Legacy of Electrical Excellence","منذ تأسيسها، التزمت شركة الكهرباء الذكية بتقديم أفضل وأحدث الحلول الكهربائية والصناعية لقطاعي الإنشاءات والصناعة في سوريا.":"Since its establishment, Smart Electricity Company has been committed to providing the best and latest electrical and industrial solutions to the construction and industrial sectors in Syria.","رسالتنا":"Our Mission","تمكين البنية التحتية من خلال منتجات موثوقة ومبتكرة، والمساهمة في تحقيق معايير الاستدامة وكفاءة الطاقة بما يتماشى مع رؤية المملكة.":"Empowering infrastructure through reliable and innovative products, and contributing to sustainability and energy efficiency standards in line with the Kingdom's vision.","الريادة في قطاع المعدات الكهربائية محلياً وإقليمياً، وأن نكون الخيار الأول للمهندسين والمقاولين والمستهلكين الباحثين عن الجودة والأمان.":"Leadership in the electrical equipment sector locally and regionally, and being the first choice for engineers, contractors, and consumers seeking quality and safety.","رحلة النجاح":"Journey of Success","رحلتنا نحو الريادة":"Our Journey to Leadership","تأسيس أول معرض":"Establishing the First Showroom","افتتاح الفرع الأول في مدينة الرياض لتوفير احتياجات السوق المحلي من المواد الكهربائية الأساسية.":"Opening the first branch in Riyadh to provide the local market with basic electrical materials.","عقد شراكات عالمية":"Global Partnerships","توقيع اتفاقيات توزيع حصرية مع كبرى الشركات العالمية مثل شنايدر إلكتريك وليجراند.":"Signing exclusive distribution agreements with major global companies like Schneider Electric and Legrand.","التوسع الإقليمي":"Regional Expansion","افتتاح مركز التوزيع الرئيسي وأكثر من 20 فرعاً حول المملكة لتغطية احتياجات المشاريع الكبرى.":"Opening the main distribution center and over 20 branches around the Kingdom to cover the needs of major projects.","التحول الرقمي":"Digital Transformation","إطلاق منصة التجارة الإلكترونية لتسهيل عمليات البيع المباشر لقطاع الأعمال والأفراد (B2B & B2C).":"Launching the e-commerce platform to facilitate direct sales for business and retail sectors (B2B & B2C).","نلتزم بأعلى معايير الجودة لضمان رضا عملائنا وتحقيق تطلعاتهم":"We commit to the highest quality standards to ensure customer satisfaction and achieve their aspirations","تأسست شركة الكهرباء الذكية بهدف أساسي وهو الارتقاء بقطاع التوريدات والحلول الكهربائية والصناعية. نحن نؤمن بأن كل سلك وقاطع ومفتاح يساهم في بناء مستقبل مشرق وآمن.":"Smart Electricity Company was established with the primary goal of elevating the electrical and industrial supplies and solutions sector. We believe that every wire, breaker, and switch contributes to building a bright and safe future.","فريق القيادة":"Leadership Team","شركاؤنا في النجاح":"Our Partners in Success","نعمل مع نخبة من أفضل العلامات التجارية العالمية لتوفير منتجات موثوقة وآمنة لعملائنا.":"We work with top global brands to provide reliable and safe products for our customers.","تصفح منتجات Schneider":"Browse Schneider Products","تصفح منتجات Philips":"Browse Philips Products","تصفح منتجات Legrand":"Browse Legrand Products","تصفح منتجات Bahra":"Browse Bahra Products","تصفح منتجات ABB":"Browse ABB Products","تصفح منتجات Panasonic":"Browse Panasonic Products","العلامات التجارية - Smart Electricity Company (SEC)":"Brands - Smart Electricity Company (SEC)","المعرفة والابتكار في مكان واحد":"Knowledge and Innovation in One Place","مقالات، نصائح فنية، وآخر الأخبار في عالم التقنيات والأنظمة الكهربائية.":"Articles, technical tips, and the latest news in the world of electrical technologies and systems.","جميع المقالات":"All Articles","نصائح المستهلك":"Consumer Tips","دليل المهندسين":"Engineers Guide","أخبار الشركة":"Company News","كيف تختار الإضاءة المناسبة لمنزلك؟":"How to choose the right lighting for your home?","الإضاءة تلعب دوراً حاسماً في إبراز جمالية المكان. تعرف على أهم المعايير لاختيار شدة ولون الإضاءة المناسبة لكل غرفة.":"Lighting plays a crucial role in highlighting the aesthetics of a place. Learn the most important criteria for choosing the right intensity and color of lighting for each room.","اقرأ المقال":"Read Article","الفرق بين قواطع MCB و MCCB واستخداماتها":"The difference between MCB and MCCB breakers and their uses","شرح مبسط ومقارنة فنية بين القواطع المصغرة والمقولبة وأين يجب استخدام كل منهما في المشاريع السكنية والصناعية.":"A simplified explanation and technical comparison between miniature and molded breakers and where to use each in residential and industrial projects.","أهمية التأريض الكهربائي في المنشآت الصناعية":"The importance of electrical earthing in industrial facilities","يعتبر نظام التأريض من أهم عوامل الأمان. نناقش في هذا المقال كيفية تصميمه ومعايير اختباره لضمان سلامة المعدات والأرواح.":"The earthing system is one of the most important safety factors. In this article, we discuss how to design and test it to ensure the safety of equipment and lives.","شركة الكهرباء الذكية تفتتح فرعها الجديد في مدينة حماة":"Smart Electricity Company opens its new branch in Hama","في إطار خطط التوسع الاستراتيجية، تم افتتاح أحدث فروع الشركة المجهز بأفضل صالات العرض التفاعلية.":"As part of strategic expansion plans, the company's newest branch, equipped with the best interactive showrooms, has been opened.","انضم إلى قائمتنا البريدية":"Join Our Mailing List","مدونة شركة الكهرباء الذكية":"Smart Electricity Company Blog","150.00 ريال":"150.00 SAR","180.00 ريال":"180.00 SAR","85.00 ريال":"85.00 SAR","45.00 ريال":"45.00 SAR","320.00 ريال":"320.00 SAR","العروض الحصرية - شركة الكهرباء الذكية":"Exclusive Offers - Smart Electricity Company (SEC)","العروض الحالية":"Current Offers","عرض لفترة محدودة":"Limited Time Offer","وفر حتى 25% على كافة المعدات الصناعية":"Save up to 25% on all industrial equipment","احصل على خصومات حصرية للمؤسسات والشركات على لوحات التوزيع، القواطع الكهربائية، وأنظمة الطاقة الذكية.":"Get exclusive discounts for institutions and companies on distribution boards, circuit breakers, and smart energy systems.","تسوق العروض الآن":"Shop Offers Now","المفاتيح الكهربائية الذكية":"Smart Electrical Switches","وفر حتى 15% على مفاتيح لوغراند ولوحات التحكم":"Save up to 15% on Legrand switches and control panels","أدوات ومعدات احترافية":"Professional Tools and Equipment","وفر حتى 20% على المفكات وأجهزة القياس المتقدمة":"Save up to 20% on screwdrivers and advanced measuring devices","العروض الحالية النشطة":"Active Current Offers","الأسعار المخفضة سارية حتى انتهاء الوقت الموضح أو نفاد الكمية المخصصة للعرض.":"Discounted prices are valid until the specified time ends or the quantity allocated for the offer runs out.","ينتهي العرض في:":"Offer ends in:","فلترة العروض":"Filter Offers","حسب الفئة":"By Category","شركاء النجاح والعلامات العالمية المعروضة":"Success Partners and Global Brands Displayed","اشترك لتصلك العروض الحصرية أولاً بأول":"Subscribe to get exclusive offers firsthand","عربة التسوق":"Shopping Cart","عربة التسوق فارغة":"Shopping Cart is Empty","لم تقم بإضافة أي منتجات إلى السلة بعد.":"You have not added any products to the cart yet.","تصفح المنتجات":"Browse Products","ملخص الطلب":"Order Summary","المجموع الفرعي":"Subtotal","الضريبة (15%)":"VAT (15%)","الإجمالي النهائي":"Final Total","تواصل آمن ومباشر مع مبيعاتنا":"Secure and direct communication with our sales","إكمال الطلب عبر واتساب":"Complete Order via WhatsApp","سيتم توجيهك إلى تطبيق واتساب لإرسال تفاصيل طلبك مباشرة إلى فريق المبيعات.":"You will be directed to WhatsApp to send your order details directly to the sales team.","عربة التسوق - Smart Electricity Company (SEC)":"Shopping Cart - Smart Electricity Company (SEC)","تواصل معنا":"Contact Us","نحن هنا لمساعدتك والإجابة على جميع استفساراتك":"We are here to help you and answer all your inquiries","تواصل عبر واتساب":"Contact via WhatsApp","طلب عرض سعر":"Request a Quote","الاسم الكامل":"Full Name","رقم الجوال":"Mobile Number","البريد الإلكتروني":"Email Address","نص الرسالة":"Message Text","إرسال الرسالة":"Send Message","جميع الحقوق محفوظة لشركة الكهرباء الذكية © 2026":"All rights reserved to Smart Electricity Company © 2026","جميع الحقوق محفوظة لشركة الكهرباء الذكية © 2024":"All rights reserved to Smart Electricity Company © 2024","عن الشركة":"About Us","لوحة التحكم | شركة الكهرباء الذكية":"Dashboard | Smart Electricity Company (SEC)","منتجات مميزة":"Featured Products",
    'روابط سريعة': 'Quick Links',
    'تسوق حسب القسم': 'Shop by Category',
    'اشترك في النشرة البريدية': 'Subscribe to Newsletter',
    'ابقَ على اطلاع بأحدث المنتجات والعروض الحصرية.': 'Stay updated with our latest products and exclusive offers.',
    'شكراً لطلبك!': 'Thank You for Your Order!',
    'تم استلام طلبك بنجاح عبر الواتساب. سيقوم أحد ممثلي المبيعات لدينا بالتواصل معك خلال وقت قصير لمراجعة تفاصيل الطلب وإكمال عملية الشحن.': 'Your order has been successfully received via WhatsApp. One of our sales representatives will contact you shortly to review the order details and complete the shipping process.',
    'حالة الطلب': 'Order Status',
    'قيد المعالجة': 'Processing',
    'سيتم الرد في غضون 15-30 دقيقة': 'Will reply within 15-30 minutes',
    'رقم المرجع': 'Reference Number',
    'يرجى الاحتفاظ بهذا الرقم للاستفسار': 'Please keep this number for inquiries',
    'قناة التواصل': 'Contact Channel',
    'واتساب': 'WhatsApp',
    'المبيعات المباشرة': 'Direct Sales',
    'نحن هنا لخدمتكم': 'We are here to serve you',
    'جودة نثق بها، توصيل نلتزم به.': 'Quality we trust, delivery we commit to.',
    'العودة للرئيسية': 'Return to Home',
    'طباعة ملخص الطلب': 'Print Order Summary',
    'المفاتيح والأفياش': 'Switches & Sockets',
    'القواطع الكهربائية': 'Circuit Breakers',
    'الأسلاك والكابلات': 'Wires & Cables',
    'الإضاءة المنزلية': 'Home Lighting',
    'أنظمة المراقبة': 'CCTV Systems',
    'جميع الحقوق محفوظة لشركة الكهرباء الذكية © 2026': 'All rights reserved to Smart Electricity Company © 2026',
    'جميع الحقوق محفوظة لشركة الكهرباء الذكية © 2024': 'All rights reserved to Smart Electricity Company © 2024',
    'عن الشركة': 'About Us',
    'حلول الطاقة المتكاملة': 'Integrated Energy Solutions',
    'نحن نوفر أفضل المنتجات الكهربائية من الماركات العالمية لضمان جودة وأمان مشاريعكم.': 'We provide the best electrical products from global brands to ensure the quality and safety of your projects.',
    'تسوق الآن': 'Shop Now',
    'الأقسام الرئيسية': 'Main Categories',
    'الإضاءة': 'Lighting',
    'العدد والأدوات': 'Tools & Equipment',
    'الأكثر مبيعاً': 'Best Sellers',
    'عرض الكل': 'View All',
    'عالم ليجراند | Legrand': 'Legrand World',
    'كابلات بحرة المتخصصة': 'Bahra Specialized Cables',
    'العدد والأدوات اليدوية': 'Hand Tools & Equipment',
    'أنظمة مراقبة ذكية': 'Smart Surveillance Systems',
    'احمِ ممتلكاتك بأحدث تقنيات التصوير الليلي والذكاء الاصطناعي من أفضل الماركات العالمية.': 'Protect your properties with the latest night vision and AI technologies from top global brands.',
    'اكتشف المزيد': 'Discover More',
    'مدونة شركة الكهرباء الذكية': 'Smart Electricity Company Blog',
    'نصائح فنية': 'Technical Tips',
    'كيف تختار الأسلاك المناسبة لمشروعك السكني؟': 'How to choose the right wires for your residential project?',
    'تعرف على الفرق بين أنواع العزل ومقاييس الأسلاك لضمان أعلى مستويات الأمان والفعالية في منزلك...': 'Learn the difference between insulation types and wire gauges to ensure highest safety and efficiency in your home...',
    'منتجات جديدة': 'New Products',
    'أحدث تقنيات الإضاءة الذكية من Philips': 'Latest smart lighting tech from Philips',
    'توفير الطاقة والتحكم الكامل في أجواء منزلك عبر هاتفك المحمول مع مجموعة Hue الجديدة والمبتكرة...': 'Save energy and fully control your home atmosphere via your mobile with the innovative Hue series...',
    'شركة رائدة في مجال تقديم الحلول الكهربائية والصناعية المتكاملة والأتمتة في سوريا.': 'A leading company in providing integrated electrical and industrial solutions and automation in Syria.',
    'عالم ليجراند': 'Legrand World',
    'اقرأ المزيد': 'Read More',
    'روابط سريعة': 'Quick Links',
    'تسوق حسب القسم': 'Shop by Category',
    'اشترك في النشرة البريدية': 'Subscribe to Newsletter',
    'ابقَ على اطلاع بأحدث المنتجات والعروض الحصرية.': 'Stay updated with our latest products and exclusive offers.',
    'الرئيسية': 'Home',
    'من نحن': 'About Us',
    'المنتجات': 'Products',
    'العلامات التجارية': 'Brands',
    'المشاريع': 'Projects',
    'العروض': 'Offers',
    'المدونة': 'Blog',
    'اتصل بنا': 'Contact Us',
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

    const translateNodes = () => {
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
  };

  translateNodes();

  const observer = new MutationObserver((mutations) => {
    let shouldTranslate = false;
    for (let m of mutations) {
      if (m.addedNodes.length > 0 || m.type === 'characterData') {
        shouldTranslate = true;
        break;
      }
    }
    if (shouldTranslate) {
      observer.disconnect();
      translateNodes();
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}
