export const products = [
  // =========================================================================
  // 1. كاميرات هيكفجن (Hikvision) - العلامة الأولى والأكثر انتشاراً في مصر
  // =========================================================================
  {
    id: 201,
    name: "كاميرا مراقبة خارجية Hikvision 2MP HD مع مايك مدمج (DS-2CE16D0T-ITPFS)",
    price: 750,
    originalPrice: 950,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات خارجية",
    brand: "Hikvision",
    image: "/products/hikvision-bullet.jpg",
    rating: 4.9,
    reviewsCount: 142,
    badge: "الأكثر مبيعاً في مصر",
    description: "دقة 2 ميجابكسل 1080P Full HD، نقل الصوت والصورة معاً عبر نفس كابل الإشارة (Audio over Coaxial)، رؤية ليلية ذكية Smart IR حتى 25 متراً، هيكل متين مقاوم للعوامل الجوية والحرارة والأتربة بمعيار IP67."
  },
  {
    id: 202,
    name: "كاميرا مراقبة داخلية Hikvision Dome 2MP زاوية عريضة (DS-2CE56D0T-IRPF)",
    price: 590,
    originalPrice: 720,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات داخلية",
    brand: "Hikvision",
    image: "/products/hikvision-dome.jpg",
    rating: 4.85,
    reviewsCount: 98,
    badge: "الأكثر طلباً",
    description: "عدسة 2.8 مم بزاوية رؤية عريضة 103 درجات للمنازل والمحلات والمكاتب، رؤية ليلية واضحة بالأشعة تحت الحمراء حتى 20 متراً، صورة نقية بتقنية DNR لمنع التشويش الليلي."
  },
  {
    id: 203,
    name: "كاميرا مراقبة ليلية ألوان Hikvision 5MP ColorVu فائقة الوضوح (DS-2CE10KF0T-FS)",
    price: 1480,
    originalPrice: 1850,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات ألوان ليلية",
    brand: "Hikvision",
    image: "/products/hikvision-colorvu.jpg",
    rating: 4.95,
    reviewsCount: 76,
    badge: "تصوير ألوان 24/7",
    description: "تصوير ملون فائق النقاء على مدار 24 ساعة بدقة 3K/5MP حتى في الظلام الدامس بفضل فتحة عدسة عملاقة F1.0 وكشاف إضاءة دافئ 20 متراً، مايك صوتي مدمج فائق الحساسية، متوافقة مع أجهزة DVR الحديثة."
  },
  {
    id: 204,
    name: "جهاز تسجيل Hikvision DVR 8 قنوات AcuSense ذكي (iDS-7208HQHI-M1/S)",
    price: 3450,
    originalPrice: 4100,
    category: "كاميرات المراقبة",
    subCategory: "أجهزة تسجيل DVR",
    brand: "Hikvision",
    image: "/products/hikvision-dvr.jpg",
    rating: 4.9,
    reviewsCount: 63,
    badge: "ذكاء اصطناعي AcuSense",
    description: "يدعم 8 كاميرات بدقة حتى 5MP وتسجيل الصوت عبر الكابل، تقنية الذكاء الاصطناعي AcuSense لتمييز حركة البشر والسيارات ومنع الإنذارات الخاطئة، ضغط H.265 Pro+ وربط سحابي مجاني عبر تطبيق Hik-Connect."
  },

  // =========================================================================
  // 2. كاميرات هاي لوك (HiLook by Hikvision) - الخيار الاقتصادي الأكثر توفيراً
  // =========================================================================
  {
    id: 205,
    name: "كاميرا مراقبة خارجية HiLook 2MP Bullet اقتصادية (THC-B120-P)",
    price: 520,
    originalPrice: 650,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات خارجية",
    brand: "HiLook",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 115,
    badge: "أفضل سعر اقتصادي",
    description: "الكاميرا الاقتصادية الأكثر رواجاً في السوق المصري من تصنيع هيكفجن، دقة 1080P Full HD، عدسة 3.6 مم، رؤية ليلية EXIR 20 متراً، مقاومة للعوامل الجوية والحرارة IP66."
  },
  {
    id: 206,
    name: "كاميرا مراقبة داخلية HiLook Dome 2MP سقفية (THC-T120-P)",
    price: 480,
    originalPrice: 600,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات داخلية",
    brand: "HiLook",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&auto=format&fit=crop&q=80",
    rating: 4.75,
    reviewsCount: 84,
    badge: "اقتصادي موثوق",
    description: "تصميم مدمج وأنيق يثبت بالسقف أو الحائط للمحلات والمكاتب، دقة 2 ميجابكسل، رؤية ليلية 20 متراً بدون انعكاس، متوافقة مع أنظمة TVI/AHD/CVI/CVBS."
  },
  {
    id: 207,
    name: "جهاز تسجيل HiLook DVR 4 قنوات 1080P اقتصادي (DVR-204G-M1)",
    price: 1650,
    originalPrice: 2100,
    category: "كاميرات المراقبة",
    subCategory: "أجهزة تسجيل DVR",
    brand: "HiLook",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 52,
    badge: "قيمة ممتازة مقابل السعر",
    description: "يدعم 4 كاميرات HD بالإضافة لكاميرا شبكية IP، ضغط متقدم H.265 Pro+ لتوفير مساحة التخزين، ربط سهل وسريع بالهاتف عبر تطبيق HiLookVision لمتابعة البث المباشر بدون اشتراكات."
  },

  // =========================================================================
  // 3. كاميرات داهوا (Dahua) - عملاق المراقبة المنافس لهيكفجن في مصر
  // =========================================================================
  {
    id: 208,
    name: "كاميرا مراقبة خارجية Dahua 2MP HDCVI هيكل معدني (HAC-HFW1200THP)",
    price: 720,
    originalPrice: 900,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات خارجية",
    brand: "Dahua",
    image: "/products/dahua-bullet.jpg",
    rating: 4.88,
    reviewsCount: 129,
    badge: "هيكل معدني قوي",
    description: "هيكل معدني قوي مقاوم للحرارة الشديدة والصدمات IP67، دقة 2 ميجابكسل 1080P، رؤية ليلية قوية تصل إلى 30 متراً Smart IR، زاوية رؤية واسعة ووضوح عالي لأدق التفاصيل."
  },
  {
    id: 209,
    name: "كاميرا مراقبة داخلية Dahua 2MP مايك مدمج معدن (HAC-HDW1200EM-A)",
    price: 790,
    originalPrice: 980,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات داخلية",
    brand: "Dahua",
    image: "/products/dahua-dome.jpg",
    rating: 4.9,
    reviewsCount: 91,
    badge: "مايك مدمج عالي النقاء",
    description: "مزودة بميكروفون مدمج عالي الحساسية لنقل الصوت بوضوح عبر نفس كابل الفيديو، هيكل Eyeball معدني، رؤية ليلية مذهلة تصل إلى 50 متراً لتغطية مساحات واسعة."
  },
  {
    id: 210,
    name: "كاميرا داهوا Full-Color ليلية ملونة 5MP مع كشاف ومايك (HAC-HFW1500TL-A-LED)",
    price: 1550,
    originalPrice: 1900,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات ألوان ليلية",
    brand: "Dahua",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80",
    rating: 4.92,
    reviewsCount: 67,
    badge: "ألوان كاملة 24/7",
    description: "تصوير ألوان نهارية كاملة على مدار 24 ساعة بدقة 5 ميجابكسل، كشاف LED دافئ مدمج لمسافة 20 متراً، ميكروفون مدمج صوت وصورة، مقاومة للماء والطقس بمعيار IP67."
  },
  {
    id: 211,
    name: "جهاز تسجيل داهوا XVR 4 قنوات WizSense ذكي (DH-XVR1B04-I)",
    price: 1950,
    originalPrice: 2400,
    category: "كاميرات المراقبة",
    subCategory: "أجهزة تسجيل DVR",
    brand: "Dahua",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    rating: 4.86,
    reviewsCount: 58,
    badge: "WizSense الذكي",
    description: "مدعوم بتقنية الذكاء الاصطناعي WizSense لفلترة الإنذارات والتعرف على حركة الأشخاص، يدعم تسجيل الصوت من الكاميرات، ضغط فيديو H.265+، وربط مجاني بتطبيق DMSS الشهير."
  },

  // =========================================================================
  // 4. كاميرات يونيفيو (Uniview / UNV) - رائدة كاميرات الشبكات والـ IP الاحترافية
  // =========================================================================
  {
    id: 212,
    name: "كاميرا شبكية UNV ColorHunter IP بدقة 4MP خارجية (IPC2124LE-ADF28KM-G)",
    price: 2850,
    originalPrice: 3400,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات شبكية IP",
    brand: "Uniview",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80",
    rating: 4.94,
    reviewsCount: 45,
    badge: "احترافية IP PoE",
    description: "كاميرا شبكية احترافية تعمل عبر كابل الشبكة PoE، تكنولوجيا ColorHunter لتصوير ألوان ناصعة ليلاً، كشف ذكي وتحديد مناطق الحركة، ميكروفون مدمج ومدخل لكارت ميموري SD حتى 256GB."
  },
  {
    id: 213,
    name: "كاميرا مراقبة يونيفيو واي فاي متحركة 360° UNV Pan & Tilt 2MP (Uho-S2E)",
    price: 1350,
    originalPrice: 1650,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات ذكية Wi-Fi",
    brand: "Uniview",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&auto=format&fit=crop&q=80",
    rating: 4.88,
    reviewsCount: 63,
    badge: "متحركة 360 درجة",
    description: "دوران 360 درجة، صوت اتجاهين للتحدث والاستماع، كشف بكاء الأطفال وتتبع الحركة الذكي، رؤية ليلية 10 أمتار، اتصال Wi-Fi وتطبيق EZView سريع وسهل الاستخدام."
  },
  {
    id: 214,
    name: "جهاز تسجيل شبكي UNV NVR 8 قنوات 4K Ultra 265 (NVR301-08S3)",
    price: 3950,
    originalPrice: 4800,
    category: "كاميرات المراقبة",
    subCategory: "أجهزة تسجيل NVR",
    brand: "Uniview",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    rating: 4.92,
    reviewsCount: 38,
    badge: "دقة 4K Ultra 265",
    description: "يدعم 8 كاميرات IP حتى دقة 8MP Ultra HD 4K، خوارزمية ضغط Ultra 265 لتوفير 75% من مساحة التخزين، متوافق مع جميع كاميرات ONVIF ومخرج شاشة HDMI بدقة 4K."
  },

  // =========================================================================
  // 5. كاميرات يس أوريجينال (Yes Original) - ملكة الكاميرات اللاسلكية والـ 4G والطاقة الشمسية
  // =========================================================================
  {
    id: 215,
    name: "كاميرا يس أوريجينال متحركة خارجية Yes Original PTZ Wi-Fi 3MP كشافات وإنذار",
    price: 1450,
    originalPrice: 1800,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات ذكية Wi-Fi",
    brand: "Yes Original",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&auto=format&fit=crop&q=80",
    rating: 4.91,
    reviewsCount: 168,
    badge: "الأكثر طلباً للبيوت والمحلات",
    description: "متحركة 360° أفقياً و90° رأسياً، تتبع ذكي للإنسان مع صفارة إنذار وكشافات فلاش طاردة للمتطفلين، رؤية ليلية ملونة، صوت اتجاهين (تحدث واستماع)، تدعم كارت ميموري حتى 128GB، تطبيق عربي متكامل وسريع."
  },
  {
    id: 216,
    name: "كاميرا يس أوريجينال طاقة شمسية وشريحة 4G SIM بدقة 5MP (بدون كهرباء أو أسلاك)",
    price: 3950,
    originalPrice: 4700,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات 4G وطاقة شمسية",
    brand: "Yes Original",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80",
    rating: 4.95,
    reviewsCount: 89,
    badge: "طاقة شمسية + شريحة 4G",
    description: "تعمل بشريحة اتصال 4G لجميع شبكات مصر (فودافون/أورنج/اتصالات/وي) مع لوح طاقة شمسية مدمج وبطاريات ليثيوم قابلة للشحن، دقة 5MP ومستشعر حركة PIR، مثالية للمزارع والعقارات والمواقع المفتوحة."
  },
  {
    id: 217,
    name: "كاميرا يس أوريجينال بعدستين مزدوجة Yes Original Dual-Lens 4K Wi-Fi",
    price: 1950,
    originalPrice: 2400,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات ذكية Wi-Fi",
    brand: "Yes Original",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    rating: 4.89,
    reviewsCount: 74,
    badge: "عدستان في جهاز واحد",
    description: "كاميرتان مدمجتان في جهاز واحد: عدسة علوية ثابتة تغطي زاوية الشارع بالكامل، وعدسة سفلية متحركة 360° تتبع الأشخاص تلقائياً، رؤية ليلية ملونة وكشافات إنذار ذكية."
  },
  {
    id: 218,
    name: "كاميرا مراقبة منزلية وأطفال Yes Original Baby Wi-Fi 2MP صوت وصورة",
    price: 890,
    originalPrice: 1100,
    category: "كاميرات المراقبة",
    subCategory: "كاميرات داخلية",
    brand: "Yes Original",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80",
    rating: 4.87,
    reviewsCount: 95,
    badge: "مثالية للمنازل والأطفال",
    description: "كاميرا داخلية أنيقة لمراقبة الأطفال وكبار السن، كشف ذكي للحركة وبكاء الأطفال مع إشعار فوري على الهاتف، محادثة صوتية واضحة اتجاهين ورؤية ليلية هادئة بدون إزعاج."
  },

  // =========================================================================
  // 6. باقات وعروض المراقبة الكاملة (Complete Security Kits)
  // =========================================================================
  {
    id: 219,
    name: "عرض سيستم كامل Hikvision: عدد 4 كاميرات (2 خارجي + 2 داخلي) + DVR + هارد 1TB + باور + كابلات",
    price: 6950,
    originalPrice: 8200,
    category: "كاميرات المراقبة",
    subCategory: "باقات وعروض كاملة",
    brand: "Hikvision",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    rating: 4.96,
    reviewsCount: 184,
    badge: "باقة كاملة شاملة التركيب",
    description: "منظومة مراقبة متكاملة وجاهزة للتشغيل: 4 كاميرات 2MP مع مايك مدمج، جهاز تسجيل هيكفجن 4 قنوات، هارد ديسك ويسترن بيربل 1 تيرابايت، باور سبلاي مركزي، لفة كابل وجميع الوصلات والفيش."
  },
  {
    id: 220,
    name: "عرض سيستم اقتصادي HiLook: عدد 4 كاميرات 2MP + DVR 4CH + باور + وصلات",
    price: 4750,
    originalPrice: 5600,
    category: "كاميرات المراقبة",
    subCategory: "باقات وعروض كاملة",
    brand: "HiLook",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&auto=format&fit=crop&q=80",
    rating: 4.84,
    reviewsCount: 132,
    badge: "العرض الاقتصادي الأول",
    description: "الباقة الأكثر توفيراً في السوق المصري: 4 كاميرات هاي لوك HD 1080P وجهاز تسجيل وجميع مستلزمات الباور والتوصيل، تناسب المحلات والمخازن والمكاتب بضمان كامل لمدة عام."
  },

  // =========================================================================
  // 7. إكسسوارات ومستلزمات أنظمة المراقبة (Surveillance Accessories)
  // =========================================================================
  {
    id: 221,
    name: "هارد ديسك Western Digital Purple 1TB مخصص للمراقبة 24/7",
    price: 2450,
    originalPrice: 2850,
    category: "كاميرات المراقبة",
    subCategory: "وحدات تخزين",
    brand: "Western Digital",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80",
    rating: 4.93,
    reviewsCount: 177,
    badge: "أصلي معتمد 100%",
    description: "هارد ديسك أصلي مخصص لأنظمة المراقبة بالفيديو، يتحمل درجات الحرارة العالية والتشغيل المتواصل 24/7 طوال العام، تقنية AllFrame لتقليل تقطيع الإطارات وضمان عدم ضياع أي ثانية تسجيل."
  },
  {
    id: 222,
    name: "هارد ديسك Western Digital Purple 2TB للمراقبة 24/7",
    price: 3450,
    originalPrice: 3950,
    category: "كاميرات المراقبة",
    subCategory: "وحدات تخزين",
    brand: "Western Digital",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80",
    rating: 4.95,
    reviewsCount: 119,
    badge: "سعة مضاعفة 2TB",
    description: "سعة 2 تيرابايت لتخزين تسجيلات الكاميرات لمدة شهر كامل بجودة فائقة، سرعة دوران 5400RPM وكاش 64MB، أداء مستقر وعمر افتراضي طويل بدون أعطال."
  },
  {
    id: 223,
    name: "باور سبلاي مركزي 12V 10A لـ 9 كاميرات بفيوزات حماية مستقلة",
    price: 650,
    originalPrice: 800,
    category: "كاميرات المراقبة",
    subCategory: "باور سبلاي ومحولات",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    rating: 4.82,
    reviewsCount: 88,
    badge: "حماية من تذبذب الكهرباء",
    description: "صندوق معدني مركزي بقفل ومفتاح ومؤشرات تشغيل LED، يغذي حتى 9 كاميرات مع فيوزات حماية مستقلة لكل مخرج لمنع احتراق الكاميرات عند حدوث قفلة أو صدمة كهربائية."
  },
  {
    id: 224,
    name: "لفة كابل شيلد شاش ونحاس RG59 مع سلك باور 100 متر",
    price: 1350,
    originalPrice: 1600,
    category: "كاميرات المراقبة",
    subCategory: "كابلات وتوصيلات",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80",
    rating: 4.85,
    reviewsCount: 71,
    badge: "نحاس نقي 100%",
    description: "كابل كوكسيال نحاسي محمي بطبقة شيلد قوية مانعة للتشويش لنقل إشارة الفيديو بجودة نقية مع خطين باور مدمجين لتوصيل الكهرباء للكاميرا بكل أمان وسهولة لمسافات طويلة."
  },
  {
    id: 225,
    name: "طقم وصلات BNC نحاس + سوكيت باور Jack (10 أزواج)",
    price: 190,
    originalPrice: 260,
    category: "كاميرات المراقبة",
    subCategory: "كابلات وتوصيلات",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&auto=format&fit=crop&q=80",
    rating: 4.79,
    reviewsCount: 104,
    badge: "نحاس عالي التوصيل",
    description: "10 وصلات BNC نحاس ذكر عالية الجودة + 10 وصلات باور نتاية/ذكر لربط الكاميرات بجهاز الـ DVR والباور سبلاي دون فقدان إشارة أو تشويش على الإطلاق."
  },

  // =========================================================================
  // 8. المنتجات الإلكترونية المميزة المكملة للمتجر
  // =========================================================================
  {
    id: 1,
    name: "سماعات رأس لاسلكية عازلة للضوضاء Pro",
    price: 499,
    originalPrice: 650,
    category: "الإلكترونيات",
    subCategory: "صوتيات",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 128,
    badge: "الأكثر مبيعاً",
    description: "صوت نقي فائق الدقة مع تقنية إلغاء الضوضاء النشطة وعمر بطارية يدوم حتى 40 ساعة."
  },
  {
    id: 2,
    name: "ساعة ذكية رياضية Ultra بإطار تيتانيوم",
    price: 899,
    originalPrice: 1100,
    category: "ساعات ذكية",
    subCategory: "ساعات ذكية",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 95,
    badge: "جديد",
    description: "شاشة AMOLED شديدة السطوع ومقاومة للماء حتى عمق 50 متراً مع مستشعرات صحية متقدمة."
  },
  {
    id: 3,
    name: "حقيبة ظهر عصرية مقاومة للماء والسرقة",
    price: 240,
    originalPrice: 320,
    category: "إكسسوارات",
    subCategory: "حقائب",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 64,
    badge: "خصم 25%",
    description: "تصميم مريح مع منفذ شحن USB مدمج وجيوب سرية ومساحة لابتوب مقاس 15.6 بوصة."
  },
  {
    id: 5,
    name: "حذاء رياضي مريح للجري والتمارين اليومية",
    price: 345,
    originalPrice: 420,
    category: "أحذية ورياضة",
    subCategory: "أحذية رياضية",
    brand: "Generic",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 210,
    badge: "الأعلى تقييماً",
    description: "نعل مرن ممتص للصدمات يوفر أقصى درجات الراحة أثناء الركض والأنشطة اليومية."
  },

  // =========================================================================
  // 9. سوق المستعمل المعتمد (Certified Used Marketplace)
  // =========================================================================
  {
    id: 101,
    name: "هاتف iPhone 14 Pro Max سعة 256GB كحلي",
    price: 32000,
    originalPrice: 46000,
    category: "الإلكترونيات",
    subCategory: "هواتف ذكية",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 14,
    badge: "مستعمل - كالجديد",
    description: "جهاز آيفون 14 برو ماكس بحالة استثنائية بدون أي خدوش إطلاقاً، صحة البطارية 96% واستخدام نظيف جداً مع حماية شاشة وكفر أصلي.",
    isUsed: true,
    condition: "كالجديد",
    usageDuration: "مستعمل لمدة شهرين ونصف",
    reasonForSelling: "الترقية إلى آيفون 15 برو",
    accessories: ["العلبة الأصلية بالكامل", "كابل الشحن الأصلي", "فاتورة الشراء المحلية", "ضمان ساري لمدة 10 أشهر"],
    sellerName: "م. سلطان العتيبي",
    sellerCity: "القاهرة",
    realPhotos: [
      "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 102,
    name: "لابتوب MacBook Pro M2 شاشة 14 بوصة رمادي فلكي",
    price: 54000,
    originalPrice: 75000,
    category: "الإلكترونيات",
    subCategory: "أجهزة كمبيوتر",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    rating: 5.0,
    reviewsCount: 8,
    badge: "مستعمل - استعمال خفيف",
    description: "ماك بوك برو M2 بمعالج 10 أنوية ورام 16GB وتخزين 512GB SSD. عدد دورات البطارية 28 دورة فقط، استخدام مكتبي محدود للتصميم.",
    isUsed: true,
    condition: "استعمال خفيف",
    usageDuration: "مستعمل لمدة 3 أشهر",
    reasonForSelling: "توفير جهاز عمل مكتبي من جهة العمل",
    accessories: ["الشاحن السريع 67W الأصلي", "كابل MagSafe الأصلي", "الكرتون وكتيبات أبل", "حقيبة جلدية فاخرة هدية"],
    sellerName: "عبدالرحمن الشمري",
    sellerCity: "الجيزة",
    realPhotos: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
    ]
  }
];

export { categories } from "./categories.js";
export const surveillanceProducts = products.filter(p => p.category === "كاميرات المراقبة");
