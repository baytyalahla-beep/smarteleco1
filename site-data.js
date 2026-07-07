/**
 * site-data.js - Data Layer for Smart Electricity Company (SEC) CMS
 * Shared between dashboard (write) and public pages (read)
 */

const SiteData = (() => {
  const STORAGE_KEY = 'electric_house_cms';

  const DEFAULT_DATA = {
    settings: {
      siteName: "Smart Electricity Company (SEC)",
      siteNameAr: "شركة الكهرباء الذكية",
      siteNameEn: "Smart Electricity Company (SEC)",
      phone: "+963 13 251 0480",
      email: "info@smarteleco.com",
      salesEmail: "sales@smarteleco.com",
      address: "ساحة العاصي، مقابل بنك سوريا الدولي الإسلامي، حماة، سوريا",
      addressEn: "Al-Assi Square, Opposite Syria International Islamic Bank, Hama, Syria",
      workingHoursWeekday: "الأحد - الخميس: 8:00 ص - 5:30 م",
      workingHoursWeekdayEn: "Sunday - Thursday: 8:00 AM - 5:30 PM",
      workingHoursWeekend: "الجمعة - السبت: مغلق",
      workingHoursWeekendEn: "Friday - Saturday: Closed",
      currency: "$",
      currencyEn: "USD",
      phoneIntl: "+963 13 251 0480",
      phoneMobile: "+963 986 001 965",
      logoUrl: "images/logo.png",
      username: "admin",
      password: "admin123",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
      tiktok: "https://tiktok.com",
      snapchat: "https://snapchat.com",
      telegram: "https://telegram.org",
      pinterest: "https://pinterest.com",
      whatsapp: "https://wa.me/963986001965",
      mapEmbedUrl: "",
      phones: ["+963 986 001 965", "+963 13 251 0480"],
      emails: ["info@smarteleco.com", "sales@smarteleco.com"],
      addresses: ["ساحة العاصي، مقابل بنك سوريا الدولي الإسلامي، حماة، سوريا"],
      addressesEn: ["Al-Assi Square, Opposite Syria International Islamic Bank, Hama, Syria"]
    },

    sectors: [
      {
        id: 1,
        title: "قطاع الطاقة المتجددة",
        titleEn: "Renewable Energy Sector",
        icon: "solar_power",
        image: "images/solar_energy_station.png",
        description: "حلول متكاملة لتوليد الطاقة الشمسية، تشمل الألواح والأنظمة والتحكم للمنشآت والمزارع.",
        descriptionEn: "Integrated solutions for solar power generation, including panels, systems, and controls for facilities and farms."
      },
      {
        id: 2,
        title: "قطاع الصناعة والأتمتة",
        titleEn: "Industry & Automation Sector",
        icon: "precision_manufacturing",
        image: "images/industrial_substation_aramco.png",
        description: "أنظمة التحكم والأتمتة الصناعية، لوحات التحكم بالمحركات، وحماية خطوط الإنتاج والآليات.",
        descriptionEn: "Industrial control and automation systems, motor control centers, and production line protection."
      },
      {
        id: 3,
        title: "قطاع المقاولات والإنشاءات",
        titleEn: "Construction & Buildings Sector",
        icon: "apartment",
        image: "images/industrial_substation_aramco.png",
        description: "توريد التجهيزات والشبكات الكهربائية والمفاتيح وأنظمة التوزيع والأمان للمباني السكنية والتجارية.",
        descriptionEn: "Supply of electrical equipment, network installations, switches, and distribution systems for buildings."
      }
    ],

    faqs: [
      {
        id: 1,
        question: "ما هي العلامات التجارية التي تتعامل معها الشركة؟",
        questionEn: "What brands does the company deal with?",
        answer: "نتعامل مع أبرز الماركات العالمية في قطاع الكهرباء والصناعة، من بينها: Schneider Electric، Siemens، ABB، Legrand، Bahra Cables، Philips، وغيرها. جميع منتجاتنا أصلية ومعتمدة.",
        answerEn: "We deal with leading global brands in the electrical and industrial sector, including: Schneider Electric, Siemens, ABB, Legrand, Bahra Cables, Philips, and others. All our products are original and certified.",
        category: "products"
      },
      {
        id: 2,
        question: "هل المنتجات تأتي مع شهادات الاعتماد؟",
        questionEn: "Do the products come with certificates of approval?",
        answer: "نعم، جميع منتجاتنا مرفقة بشهادات الاعتماد الدولية مثل IEC، CE، ISO. يمكنك طلب نسخ من الشهادات والكتيبات الفنية (Datasheets) مع كل طلب.",
        answerEn: "Yes, all our products are accompanied by international approval certificates such as IEC, CE, ISO. You can request copies of certificates and technical datasheets with every order.",
        category: "products"
      },
      {
        id: 3,
        question: "كيف أعرف أن المنتج متوفر في المخزون؟",
        questionEn: "How do I know if a product is in stock?",
        answer: "تجد في صفحة كل منتج مؤشر توفر يُظهر الكمية المتاحة. يمكنك أيضاً الاتصال بنا مباشرة للتحقق من التوفر الفوري وإمكانية التوريد السريع للمنتجات غير المخزنة.",
        answerEn: "You will find on each product page an availability indicator showing the available quantity. You can also contact us directly to check immediate availability and the possibility of rapid supply for non-stocked products.",
        category: "products"
      },
      {
        id: 4,
        question: "ما مناطق التوصيل التي تغطونها؟",
        questionEn: "What delivery areas do you cover?",
        answer: "نوفر التوصيل إلى جميع محافظات سوريا. نتمركز في حماة ونستطيع التوصيل خلال 1-3 أيام عمل داخل المحافظة، و3-7 أيام للمحافظات الأخرى. للمشاريع الكبيرة نُنسق الشحن مباشرة مع الموقع.",
        answerEn: "We provide delivery to all provinces of Syria. We are based in Hama and can deliver within 1-3 working days within the province, and 3-7 days to other provinces. For large projects, we coordinate shipping directly to the site.",
        category: "delivery"
      },
      {
        id: 5,
        question: "هل تقدمون خدمة التركيب مع التوصيل؟",
        questionEn: "Do you provide installation service with delivery?",
        answer: "نعم، نوفر خدمة التوريد والتركيب للمشاريع. يتضمن ذلك فريقاً هندسياً متخصصاً لتركيب لوحات التوزيع، أنظمة الأتمتة، وأنظمة الطاقة الشمسية. تواصل معنا لطلب هذه الخدمة ضمن عرض السعر.",
        answerEn: "Yes, we provide supply and installation service for projects. This includes a specialized engineering team to install distribution boards, automation systems, and solar energy systems. Contact us to request this service within the price quote.",
        category: "delivery"
      },
      {
        id: 6,
        question: "هل تقدمون استشارات هندسية قبل الشراء؟",
        questionEn: "Do you provide engineering consultations before purchase?",
        answer: "نعم، لدينا فريق من المهندسين المتخصصين يمكنهم مساعدتك في اختيار المواصفات الصحيحة، مراجعة المخططات الكهربائية، وتقديم التوصيات التقنية المناسبة لمشروعك قبل الشراء — دون تكلفة إضافية.",
        answerEn: "Yes, we have a team of specialized engineers who can help you choose the right specifications, review electrical drawings, and provide appropriate technical recommendations for your project before purchasing — at no additional cost.",
        category: "technical"
      },
      {
        id: 7,
        question: "ما سياسة الضمان والإرجاع؟",
        questionEn: "What is the warranty and return policy?",
        answer: "جميع منتجاتنا تتمتع بضمان المصنّع الأصلي. فترة الضمان تتراوح بين سنة وخمس سنوات حسب المنتج. في حال وجود عيب مصنعي، نلتزم بالاستبدال أو الإصلاح خلال 7 أيام عمل من تاريخ الإبلاغ.",
        answerEn: "All our products have the original manufacturer's warranty. The warranty period ranges between one and five years depending on the product. In the event of a manufacturing defect, we commit to replacement or repair within 7 working days from the date of reporting.",
        category: "technical"
      },
      {
        id: 8,
        question: "ما طرق الدفع المتاحة؟",
        questionEn: "What payment methods are available?",
        answer: "نوفر خيارات دفع مرنة تشمل الدفع نقداً عند الاستلام، التحويل المصرفي عبر البنوك السورية المعتمدة، والدفع عبر شركات التحويل المحلية. للمشاريع والمؤسسات، نوفر تسهيلات دفع وتسهيلات ائتمانية خاضعة للاتفاق وشروط العقد.",
        answerEn: "We provide flexible payment options including cash on delivery, bank transfer through approved Syrian banks, and payment through local transfer companies. For projects and institutions, we provide payment and credit facilities subject to agreement and contract terms.",
        category: "payment"
      }
    ],

    messages: [],

    banners: {
      secondaryBanner1: "images/secondary_banner_1.png",
      secondaryBanner2: "images/secondary_banner_1.png",
      legrand1: "images/legrand_1.png",
      legrand2: "images/legrand_2.png",
      legrand3: "images/legrand_3.png",
      legrand4: "images/legrand_4.png",
      philipsBanner: "images/philips_banner.png",
      bahraLogo: "",
      bahra1: "images/bahra_1.png",
      bahra2: "images/bahra_2.png",
      bahra3: "images/bahra_3.png",
      bahra4: "images/bahra_4.png",
      toolsBanner: "images/tools_banner.png",
      cctvBanner: "images/cctv_banner.png"
    },

    homepage: {
      heroTitle: "حلول كهربائية وصناعية ذكية متكاملة",
      heroTitleEn: "Integrated Smart Electrical & Industrial Solutions",
      heroSubtitle: "شركة الكهرباء الذكية (SEC)",
      heroSubtitleEn: "Smart Electricity Company (SEC)",
      heroDescription: "شركة هندسية رائدة متخصصة في تقديم الحلول الكهربائية والصناعية المتكاملة، تشمل التوريد والتصميم والاستشارات والأتمتة الصناعية، لدعم المشاريع بأنظمة موثوقة وعالية الكفاءة.",
      heroDescriptionEn: "Smart Electricity Company (SEC) is a leading engineering company specialized in providing integrated electrical and industrial solutions, including supply, design, consultancy, and automation.",
      heroImage: "images/solar_energy_station.png",
      heroImages: [
        "images/solar_energy_station.png",
        "images/solar_energy_station.png",
        "images/industrial_substation_aramco.png"
      ],
      stats: [
        { number: "+10", label: "عاماً من الخبرة", labelEn: "Years of Experience" },
        { number: "+15", label: "ماركة عالمية", labelEn: "Global Brands" },
        { number: "+30", label: "مهندساً خبيراً", labelEn: "Expert Engineers" },
        { number: "+1000", label: "مشروع منجز", labelEn: "Completed Projects" }
      ],
      services: [
        { 
          icon: "precision_manufacturing", 
          title: "حلول صناعية متكاملة", 
          titleEn: "Integrated Industrial Solutions", 
          description: "حلول صناعية متكاملة تشمل تصميم خطوط الإنتاج، أنظمة الأتمتة، والتحكم الصناعي.", 
          descriptionEn: "Integrated industrial solutions including production line design, automation systems, and industrial control.",
          image: "images/industrial_substation_aramco.png",
          style: "dark",
          features: ["تصميم خطوط الإنتاج المتطورة", "تطوير الأنظمة الصناعية وإعادة التأهيل"],
          featuresEn: ["Advanced production lines design", "Industrial systems development & rehabilitation"]
        },
        { 
          icon: "engineering", 
          title: "أنظمة كهربائية صناعية", 
          titleEn: "Industrial Electrical Systems", 
          description: "تصميم وتوريد لوحات التوزيع، أنظمة الجهد المنخفض والمتوسط، وحماية الأنظمة.", 
          descriptionEn: "Low and Medium Voltage Systems, Power Distribution, Control Panels, Protection Systems.",
          image: "images/electrical_support_team.png",
          style: "light",
          features: ["لوحات التحكم والتوزيع الكهربائي", "أنظمة الحماية والجهد المنخفض والمتوسط"],
          featuresEn: ["Control & distribution panels", "Protection systems, Low & Medium voltage"]
        },
        { 
          icon: "solar_power", 
          title: "حلول الطاقة الشمسية", 
          titleEn: "Solar Energy Solutions", 
          description: "تصميم وتركيب أنظمة الطاقة الشمسية المتكاملة وتوفير الطاقة للمنشآت.", 
          descriptionEn: "Solar System Design, Installation, Electrical Integration, Energy Saving.",
          image: "images/solar_energy_station.png",
          style: "image",
          features: ["تصميم الأنظمة الكهروضوئية المخصصة", "التكامل الكهربائي وتقنيات توفير الطاقة"],
          featuresEn: ["Custom photovoltaic system designs", "Electrical integration and energy saving"]
        },
        { 
          icon: "agriculture", 
          title: "حلول زراعية ذكية", 
          titleEn: "Smart Agricultural Solutions", 
          description: "أنظمة الري الذكية، الضخ الشمسي، والمراقبة والتحكم عن بعد للمزارع والمشاريع الزراعية.", 
          descriptionEn: "Smart Irrigation, Solar Pumping, Remote Monitoring and Control.",
          image: "images/electrical_support_team.png",
          style: "stats",
          stats: [{ number: "24/7", label: "مراقبة عن بعد", labelEn: "Remote Monitoring" }, { number: "+100", label: "مشروع ري ذكي", labelEn: "Smart Irrigation Projects" }],
          features: ["أنظمة الري والتسميد الآلي", "مضخات طاقة شمسية ذكية"],
          featuresEn: ["Automated irrigation & fertigation", "Smart solar pumping systems"]
        }
      ]
    },

    products: [
      {
        id: 1,
        name: "قاطع تيار كهربائي صناعي مقولب MCCB 160 أمبير",
        nameEn: "Industrial MCCB Circuit Breaker 160A",
        brand: "شنايدر إليكتريك",
        brandEn: "Schneider Electric",
        price: 1850000,
        originalPrice: 2100000,
        isOffer: true,
        stockTotal: 100,
        stockSold: 45,
        category: "أنظمة الحماية الكهربائية",
        image: "images/product_mccb_breaker.png",
        description: "قاطع تيار كهربائي صناعي ذو كفاءة عالية لحماية الموتورات والشبكات الصناعية.",
        descriptionEn: "High quality industrial molded case circuit breaker for motor and power distribution protection.",
        featured: true
      },
      {
        id: 2,
        name: "مرحل حماية المحرك من الأعطال الحرارية والمغناطيسية",
        nameEn: "Thermal Magnetic Motor Protection Relay",
        brand: "سيمنز",
        brandEn: "Siemens",
        price: 850000,
        originalPrice: 850000,
        isOffer: false,
        stockTotal: 80,
        stockSold: 12,
        category: "أنظمة الحماية الكهربائية",
        image: "images/product_protection_relay.png",
        description: "مرحل حماية متكامل ذكي لحماية المحركات الكهربائية ثلاثية الأطوار من الحمل الزائد وسقوط الفاز.",
        descriptionEn: "Smart integrated protection relay to protect three-phase electric motors from overload and phase loss.",
        featured: true
      },
      {
        id: 3,
        name: "مغير تردد VFD ذكي للمحركات 15 كيلوواط",
        nameEn: "Smart Variable Frequency Drive VFD 15kW",
        brand: "إيه بي بي",
        brandEn: "ABB",
        price: 4500000,
        originalPrice: 5200000,
        isOffer: true,
        stockTotal: 50,
        stockSold: 20,
        category: "أنظمة القيادة والتحكم",
        image: "images/product_vfd_drive.png",
        description: "مغير تردد ذكي للتحكم في سرعة المحركات وتوفير الطاقة مع دعم بروتوكول Modbus.",
        descriptionEn: "Smart variable frequency drive to control motor speed, optimize energy consumption with Modbus support.",
        featured: true
      },
      {
        id: 4,
        name: "كونتاكتور مغناطيسي صناعي 40 أمبير ثلاثي الأطوار",
        nameEn: "Industrial Magnetic Contactor 40A 3-Phase",
        brand: "شنايدر إليكتريك",
        brandEn: "Schneider Electric",
        price: 420000,
        originalPrice: 490000,
        isOffer: true,
        stockTotal: 150,
        stockSold: 62,
        category: "أنظمة التحكم الصناعي",
        image: "images/product_mccb_breaker.png",
        description: "كونتاكتور موثوق مع نقاط تلامس مساعدة للتحكم في الأحمال الكهربائية الكبيرة.",
        descriptionEn: "Highly reliable contactor with auxiliary contacts for industrial load switching and control.",
        featured: true
      },
      {
        id: 5,
        name: "وحدة تحكم منطقي مبرمج PLC مدمجة S7-1200",
        nameEn: "Compact PLC Controller S7-1200",
        brand: "سيمنز",
        brandEn: "Siemens",
        price: 6800000,
        originalPrice: 7500000,
        isOffer: true,
        stockTotal: 30,
        stockSold: 18,
        category: "الأتمتة الصناعية",
        image: "images/solar_energy_station.png",
        description: "جهاز التحكم المنطقي المبرمج S7-1200 للتحكم التلقائي في الآلات الصناعية وخطوط الإنتاج.",
        descriptionEn: "Siemens S7-1200 programmable logic controller for automatic machine and assembly line automation.",
        featured: true
      },
      {
        id: 6,
        name: "محرك كهربائي صناعي ثلاثي الأطوار 7.5 حصان",
        nameEn: "Industrial 3-Phase Electric Motor 7.5HP",
        brand: "سيمنز",
        brandEn: "Siemens",
        price: 5400000,
        originalPrice: 5400000,
        isOffer: false,
        stockTotal: 40,
        stockSold: 5,
        category: "الأنظمة الكهروميكانيكية والحركة",
        image: "images/industrial_substation_aramco.png",
        description: "محرك كهربائي عالي الجودة للخدمات الصناعية الشاقة والمضخات ومراوح التهوية.",
        descriptionEn: "Premium high efficiency electric motor for heavy-duty industrial tasks, pumping, and ventilation.",
        featured: false
      },
      {
        id: 7,
        name: "محلل طاقة كهربائي ذكي للشبكة ثلاثية الطور",
        nameEn: "Smart 3-Phase Network Power Analyzer",
        brand: "إيه بي بي",
        brandEn: "ABB",
        price: 1950000,
        originalPrice: 2200000,
        isOffer: true,
        stockTotal: 70,
        stockSold: 22,
        category: "أجهزة القياس والتحكم الفني",
        image: "images/product_vfd_drive.png",
        description: "جهاز قياس وتحليل متكامل لمعامل القدرة، الجهد، والتيار، ومراقبة استهلاك الطاقة الكلي.",
        descriptionEn: "Complete measurement and analysis of power factor, voltage, current and total energy consumption monitoring.",
        featured: false
      },
      {
        id: 8,
        name: "حقيبة أدوات كهربائية يدوية معزولة 1000 فولت",
        nameEn: "Insulated Electrical Hand Tools Set 1000V",
        brand: "لوغراند",
        brandEn: "Legrand",
        price: 650000,
        originalPrice: 720000,
        isOffer: true,
        stockTotal: 90,
        stockSold: 35,
        category: "المعدات والأدوات والسلامة المهنية",
        image: "images/double_wall_switch.png",
        description: "مجموعة أدوات كهربائية كاملة يدوية معزولة ضد الجهد العالي لسلامة الفنيين والمهندسين.",
        descriptionEn: "Full professional insulated tool set designed for safe work up to 1000V AC.",
        featured: false
      }
    ],

    categories: [
      "أنظمة الحماية الكهربائية",
      "أنظمة القيادة والتحكم",
      "أنظمة التحكم الصناعي",
      "الأتمتة الصناعية",
      "الأنظمة الكهروميكانيكية والحركة",
      "أجهزة القياس والتحكم الفني",
      "المعدات والأدوات والسلامة المهنية"
    ],

    brands: [
      { id: 1, name: "شنايدر إليكتريك", nameEn: "Schneider Electric", logo: "", description: "شركة فرنسية رائدة في إدارة الطاقة والأتمتة", country: "فرنسا" },
      { id: 2, name: "سيمنز", nameEn: "Siemens", logo: "", description: "شركة ألمانية متعددة الجنسيات للهندسة الكهربائية", country: "ألمانيا" },
      { id: 3, name: "إيه بي بي", nameEn: "ABB", logo: "", description: "شركة سويسرية-سويدية متخصصة في تقنيات الطاقة", country: "سويسرا" },
      { id: 4, name: "لوغراند", nameEn: "Legrand", logo: "", description: "شركة فرنسية متخصصة في البنية التحتية الكهربائية", country: "فرنسا" },
      { id: 5, name: "فيليبس", nameEn: "Philips", logo: "", description: "شركة هولندية رائدة في تقنيات الإضاءة", country: "هولندا" }
    ],

    projects: [
      { 
        id: 1, 
        name: "مشروع محطة الطاقة الشمسية الزراعية - ريف حماة", 
        nameEn: "Agricultural Solar Station Project - Hama Countryside",
        description: "تصميم وتوريد وتركيب كافة المحولات واللوحات الكهربائية ومولدات الطاقة الشمسية لإنشاء أول محطة زراعية ذكية متكاملة لتوليد الطاقة النظيفة.", 
        descriptionEn: "Designing, supplying, and installing all transformers, electrical panels, and solar generators to establish the first integrated smart agricultural clean energy station.",
        image: "images/solar_energy_station.png", 
        images: [
          "images/solar_energy_station.png"
        ],
        status: "مكتمل", 
        statusEn: "Completed",
        category: "زراعي",
        categoryEn: "Agricultural",
        owner: "شركة الكهرباء الذكية (SEC)",
        ownerEn: "Smart Electricity Company (SEC)",
        location: "حماة، سوريا",
        locationEn: "Hama, Syria",
        duration: "120 يوم",
        durationEn: "120 Days",
        value: "1,200,000,000 ل.س",
        valueEn: "1,200,000,000 SYP",
        techFiles: [
          { nameAr: "مواصفات الملف الفني", nameEn: "Technical Specifications Sheet", size: "2.4 MB" },
          { nameAr: "رسومات هندسية ومخططات", nameEn: "Engineering Design Drawings", size: "8.1 MB" }
        ]
      },
      { 
        id: 2, 
        name: "أتمتة خطوط إنتاج الشركة الأهلية للغزل والنسيج - حلب", 
        nameEn: "Automation of Al-Ahlia Spinning and Weaving Production Lines - Aleppo",
        description: "توريد وتركيب أنظمة تحكم مبرمج PLC وشاشات HMI متكاملة لتحديث وتطوير أنظمة القيادة وخطوط الغزل والنسيج القديمة.", 
        descriptionEn: "Supplying and installing integrated PLC control systems and HMI screens to modernize and upgrade driver systems and old spinning/weaving lines.",
        image: "images/product_irrigation.png", 
        images: [
          "images/product_irrigation.png"
        ],
        status: "مكتمل", 
        statusEn: "Completed",
        category: "صناعي", 
        categoryEn: "Industrial",
        owner: "الشركة الأهلية للغزل والنسيج",
        ownerEn: "Al-Ahlia Spinning and Weaving Co.",
        location: "حلب، سوريا",
        locationEn: "Aleppo, Syria",
        duration: "180 يوم",
        durationEn: "180 Days",
        value: "3,500,000,000 ل.س",
        valueEn: "3,500,000,000 SYP",
        techFiles: [
          { nameAr: "مواصفات الملف الفني", nameEn: "Technical Specifications Sheet", size: "4.5 MB" }
        ]
      },
      { 
        id: 3, 
        name: "تجهيز لوحات التحكم والمراقبة SCADA لمحطة معالجة المياه - حمص", 
        nameEn: "SCADA Control Panels for Homs Water Treatment Plant",
        description: "توريد لوحات توزيع كهربائية ومحولات ونظام مراقبة SCADA متكامل للتحكم عن بعد في مضخات وصمامات محطة المياه.", 
        descriptionEn: "Supplying electrical distribution boards, transformers, and an integrated SCADA monitoring system for remote control of water plant pumps and valves.",
        image: "images/industrial_substation_aramco.png", 
        images: ["images/industrial_substation_aramco.png"],
        status: "مكتمل", 
        statusEn: "Completed",
        category: "بنية تحتية", 
        categoryEn: "Infrastructure",
        owner: "المؤسسة العامة لمياه الشرب",
        ownerEn: "General Establishment for Drinking Water",
        location: "حمص، سوريا",
        locationEn: "Homs, Syria",
        duration: "150 يوم",
        durationEn: "150 Days",
        value: "2,100,000,000 ل.س",
        valueEn: "2,100,000,000 SYP",
        techFiles: [
          { nameAr: "مواصفات الملف الفني", nameEn: "Technical Specifications Sheet", size: "3.2 MB" }
        ]
      }
    ],

    blogPosts: [
      { id: 1, title: "كيف تختار القاطع الكهربائي الصناعي المناسب لمشروعك", excerpt: "دليل شامل لاختيار القواطع الكهربائية الصناعية ونظم الحماية مع نصائح من مهندسينا لضمان السلامة والتشغيل المستمر.", image: "images/product_mccb_breaker.png", date: "2026-03-15", category: "نصائح فنية", content: "محتوى المقال الكامل هنا..." },
      { id: 2, title: "مستقبل الطاقة الشمسية وأنظمة الري الذكي في سوريا", excerpt: "نظرة معمقة على تطور قطاع الطاقة الشمسية والضخ الشمسي ودور شركة الكهرباء الذكية في دعم مشاريع ري الأراضي الزراعية.", image: "", date: "2026-02-28", category: "طاقة متجددة", content: "محتوى المقال الكامل هنا..." },
      { id: 3, title: "دور الأتمتة الصناعية ونظم SCADA في زيادة الكفاءة التشغيلية للآلات", excerpt: "استعراض عملي لكيفية تحويل الأنظمة التقليدية إلى منظومة ذكية مبنية على PLC وتوفير استهلاك الطاقة.", image: "", date: "2026-01-10", category: "تقنية", content: "محتوى المقال الكامل هنا..." }
    ],


    about: {
      description: "تعتبر شركة الكهرباء الذكية (SEC) الشريك الاستراتيجي الهندسي الرائد في حماة وسوريا لتوريد وتصميم الأنظمة الكهربائية المتكاملة والأتمتة الصناعية ومشاريع الطاقة المتجددة، بما يضمن أعلى معايير الكفاءة والوثوقية.",
      descriptionEn: "Smart Electricity Company (SEC) is the leading strategic engineering partner in Hama and Syria for supplying and designing integrated electrical systems, industrial automation, and renewable energy projects.",
      image: "images/electrical_support_team.png",
      mission: "تمكين الصناعة من خلال تقديم حلول هندسية متكاملة تساعد العملاء على تحقيق أعلى مستويات الكفاءة التشغيلية والاستدامة.",
      missionEn: "Empowering industries through integrated engineering solutions that rebuild and develop electrical and industrial systems while improving operational efficiency and sustainability.",
      vision: "أن نكون من الشركات الرائدة في مجال الحلول الكهربائية والصناعية الذكية، والمساهمين في تطوير البنية التحتية الصناعية في المنطقة.",
      visionEn: "To be one of the leading companies in smart electrical and industrial solutions by developing industrial infrastructure using efficient, sustainable, and intelligent technologies.",
      quote: "نعمل على تحويل المفهوم التقليدي للطاقة والصناعة إلى منظومة ذكية تعتمد على الأتمتة والتكامل الهندسي.",
      quoteEn: "We transform traditional energy and industry into intelligent systems based on automation and engineering integration.",
      timeline: [
        { year: "2015", title: "تأسيس شركة الكهرباء الذكية (SEC)", titleEn: "Establishment of SEC", description: "تأسست الشركة لتقديم حلول متكاملة في الهندسة الكهربائية والأتمتة الصناعية في سوريا.", descriptionEn: "SEC was established to provide integrated solutions in electrical engineering and industrial automation in Syria." },
        { year: "2020", title: "التوسع نحو الأنظمة الذكية", titleEn: "Expanding to Smart Systems", description: "إطلاق قسم حلول الطاقة الشمسية وأنظمة الري الذكية والأتمتة الكاملة للمصانع.", descriptionEn: "Launching solar solutions, smart irrigation systems, and full factory automation division." },
        { year: "2026", title: "الريادة الإقليمية", titleEn: "Regional Leadership", description: "التوسع في تقديم الحلول البرمجية والهندسية المتكاملة SCADA و PLC و VFD لكبرى المصانع والمنشآت.", descriptionEn: "Expanding the supply of SCADA, PLC, and VFD integrated software and engineering solutions to major factories." }
      ]
    },

    orders: [
      { id: "EH-98421", date: "24 أكتوبر 2023", product: "قاطع كهربائي (3 قطع)", total: 450, status: "تم الشحن", customer: "أحمد محمد" },
      { id: "EH-98315", date: "20 أكتوبر 2023", product: "طقم إضاءة ذكية", total: 1200, status: "قيد المعالجة", customer: "خالد علي" },
      { id: "EH-97992", date: "15 أكتوبر 2023", product: "موصلات كابلات نحاسية", total: 85, status: "مكتمل", customer: "سعيد عمر" }
    ]
  };

  /** Sanitize data with defaults */
  function sanitizeData(data) {
    // Merge with defaults for any missing keys
    const merged = deepMerge(DEFAULT_DATA, data);
    
    // Sanitize products
    if (merged.products) {
      merged.products.forEach(p => {
        if (!p.images || !Array.isArray(p.images)) {
          p.images = [p.image || "", "", "", ""];
        }
        if (p.showPrice === undefined) {
          p.showPrice = true;
        }
        if (p.originalPrice === undefined) {
          p.originalPrice = p.price;
        }
        if (p.isOffer === undefined) {
          p.isOffer = false;
        }
        if (p.stockTotal === undefined) {
          p.stockTotal = 100;
        }
        if (p.stockSold === undefined) {
          p.stockSold = 0;
        }
        if (p.nameEn === undefined) {
          p.nameEn = p.name;
        }
        if (p.descriptionEn === undefined) {
          p.descriptionEn = p.description || "";
        }
      });
    }
    
    // Sanitize projects
    if (merged.projects) {
      merged.projects.forEach(p => {
        if (!p.images || !Array.isArray(p.images)) {
          p.images = [p.image || ""];
        }
        if (p.techFiles === undefined) {
          p.techFiles = [
            { nameAr: "مواصفات الملف الفني", nameEn: "Technical Specifications Sheet", size: "2.4 MB" },
            { nameAr: "رسومات هندسية ومخططات", nameEn: "Engineering Design Drawings", size: "8.1 MB" },
            { nameAr: "العقود والمستندات الرسمية", nameEn: "Contracts & Official Approvals", size: "1.5 MB" }
          ];
        }
        if (p.owner === undefined) p.owner = "الشركة العامة للكهرباء";
        if (p.ownerEn === undefined) p.ownerEn = "General Electricity Company";
        if (p.location === undefined) p.location = "حماة، سوريا";
        if (p.locationEn === undefined) p.locationEn = "Hama, Syria";
        if (p.duration === undefined) p.duration = "120 يوم";
        if (p.durationEn === undefined) p.durationEn = "120 Days";
        if (p.value === undefined) p.value = "غير محدد";
        if (p.valueEn === undefined) p.valueEn = "Not Specified";
        if (p.nameEn === undefined) p.nameEn = p.name;
        if (p.descriptionEn === undefined) p.descriptionEn = p.description || "";
        if (p.categoryEn === undefined) p.categoryEn = p.category;
        if (p.statusEn === undefined) p.statusEn = p.status;
      });
    }
    
    // Sanitize services
    if (merged.homepage && merged.homepage.services) {
      merged.homepage.services.forEach(s => {
        if (s.style === undefined) s.style = "light";
        if (s.features === undefined) s.features = [];
        if (s.featuresEn === undefined) s.featuresEn = [];
        if (s.titleEn === undefined) s.titleEn = s.title;
        if (s.descriptionEn === undefined) s.descriptionEn = s.description;
        if (s.stats === undefined) s.stats = [];
      });
    }

    // Sanitize homepage hero images
    if (merged.homepage) {
      if (!merged.homepage.heroImages || !Array.isArray(merged.homepage.heroImages) || merged.homepage.heroImages.length === 0) {
        merged.homepage.heroImages = [merged.homepage.heroImage || "images/solar_energy_station.png"];
      }
    }
    
    return merged;
  }

  /** Get all data or a specific section */
  function getData(section) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : { ...DEFAULT_DATA };
      const merged = sanitizeData(data);
      return section ? merged[section] : merged;
    } catch (e) {
      console.error('SiteData.getData error:', e);
      return section ? DEFAULT_DATA[section] : DEFAULT_DATA;
    }
  }

  /** Save a section or full data */
  function saveData(sectionOrData, data) {
    try {
      const current = getData();
      if (typeof sectionOrData === 'string' && data !== undefined) {
        current[sectionOrData] = data;
      } else if (typeof sectionOrData === 'object') {
        Object.assign(current, sectionOrData);
      }
      const rawString = JSON.stringify(current);
      localStorage.setItem(STORAGE_KEY, rawString);
      
      // Save to server
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: rawString
        }).then(r => r.json())
          .then(res => console.log('Server save response:', res))
          .catch(err => console.error('Failed to save to server:', err));
      }
      return true;
    } catch (e) {
      console.error('SiteData.saveData error:', e);
      return false;
    }
  }

  /** Reset all data to defaults */
  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEFAULT_DATA)
      }).catch(err => console.error('Failed to reset on server:', err));
    }
  }

  // Deep equality helper to prevent reload loops
  function isDeepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!isDeepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
  }

  // Auto-sync data from server in browser environment
  if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    fetch('/api/data')
      .then(r => r.json())
      .then(serverData => {
        const localData = getData();
        const sanitizedServerData = sanitizeData(serverData);
        if (!isDeepEqual(localData, sanitizedServerData)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          if (localData && Object.keys(localData).length > 0) {
            console.log('Site data updated from server, reloading page to reflect changes...');
            location.reload();
          }
        }
      })
      .catch(err => console.log('Error fetching server data:', err));
  }

  /** Generate a new unique ID for items */
  function newId(items) {
    if (!items || items.length === 0) return 1;
    return Math.max(...items.map(i => i.id || 0)) + 1;
  }

  /** Deep merge helper */
  function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else if (source[key] !== undefined) {
        result[key] = source[key];
      }
    }
    return result;
  }

  /** Format price with currency */
  function formatPrice(price) {
    const settings = getData('settings');
    return `${price} ${settings.currency}`;
  }

  return { getData, saveData, resetData, newId, formatPrice, DEFAULT_DATA };
})();
