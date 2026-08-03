import { Destination, Room, TourPackage, FoodItem, Testimonial, TranslationDict, Currency } from './types';

export const translations: { [key in 'en' | 'am' | 'fr' | 'ar']: TranslationDict } = {
  en: {
    heroTitle: "Experience Ethiopia's Timeless Beauty",
    heroSubtitle: "Discover luxury accommodations, cultural experiences, breathtaking landscapes, and unforgettable Ethiopian hospitality.",
    bookYourStay: "Book Your Stay",
    exploreEthiopia: "Explore Ethiopia",
    watchExperience: "Watch Experience",
    bookingWidget: {
      checkIn: "Check-In Date",
      checkOut: "Check-Out Date",
      guests: "Guests",
      roomType: "Room / Suite",
      tourPackage: "Tour Package",
      searchBtn: "Search Availability",
    },
    nav: {
      home: "Home",
      hotels: "Hotels",
      resorts: "Resorts",
      tours: "Tours",
      culture: "Culture",
      destinations: "Destinations",
      experiences: "Experiences",
      gallery: "Gallery",
      contact: "Contact",
      login: "Login",
      register: "Register",
    },
    titles: {
      destinations: "Featured Destinations",
      destinationsSub: "Embark on an extraordinary journey through centuries of rich history, majestic landscapes, and vibrant traditions.",
      rooms: "Luxury Accommodations",
      roomsSub: "Exquisite suites blending five-star international luxury standards with authentic traditional Habesha architecture.",
      culture: "The Cultural Essence",
      cultureSub: "Immerse yourself in authentic rituals, culinary artistry, and ancient celebrations that have defined the Land of Origins.",
      highlights: "Tourism Highlights",
      highlightsSub: "Uncover natural wonders, ancient spiritual monuments, and unforgettable safaris across the rift valleys.",
      food: "Habesha Culinary Artistry",
      foodSub: "Indulge in rich, aromatic spices and slow-cooked culinary masterpieces served on soft, sourdough Injera.",
      testimonials: "Traveler Stories",
      testimonialsSub: "Read heartfelt experiences and cherished memories shared by our distinguished guests from around the globe.",
      gallery: "Visual Heritage Gallery",
      gallerySub: "A luxury photographic collection celebrating the breathtaking landscapes, ancient architectures, and vivid colors of Ethiopia.",
      packages: "Exclusive Curated Packages",
      packagesSub: "Seamlessly organized premium itineraries, handling every detail of your flight, luxury transfers, and private guided excursions.",
      assistant: "AI Travel Companion",
      assistantSub: "Speak with our intelligent guide to curate custom itineraries, learn about local etiquette, or reserve luxury experiences.",
    }
  },
  am: {
    heroTitle: "የኢትዮጵያን ዘላለማዊ ውበት ይለማመዱ",
    heroSubtitle: "የቅንጦት ማረፊያዎችን፣ ባህላዊ ልምዶችን፣ አስደናቂ እይታዎችን እና የማይረሳ የኢትዮጵያዊያንን መስተንግዶ ያግኙ።",
    bookYourStay: "ክፍል ያስይዙ",
    exploreEthiopia: "ኢትዮጵያን ይጎብኙ",
    watchExperience: "ውበቷን ይመልከቱ",
    bookingWidget: {
      checkIn: "የመግቢያ ቀን",
      checkOut: "የመውጫ ቀን",
      guests: "የእንግዳ ብዛት",
      roomType: "የክፍል ዓይነት",
      tourPackage: "የጉዞ ጥቅል",
      searchBtn: "ክፍት ቦታዎችን ፈልግ",
    },
    nav: {
      home: "ዋና ገጽ",
      hotels: "ሆቴሎች",
      resorts: "ሪዞርቶች",
      tours: "ጉዞዎች",
      culture: "ባህል",
      destinations: "መዳረሻዎች",
      experiences: "ልምዶች",
      gallery: "ማዕከለ-ስዕላት",
      contact: "እውቂያ",
      login: "ግባ",
      register: "ተመዝገብ",
    },
    titles: {
      destinations: "ታዋቂ የጉዞ መዳረሻዎች",
      destinationsSub: "በዘመናት የበለፀገ ታሪክ፣ አስደናቂ መልክዓ ምድሮች እና ደማቅ ወጎች ውስጥ ያልተለመደ ጉዞ ያድርጉ።",
      rooms: "የቅንጦት ማረፊያዎች",
      roomsSub: "ባለ አምስት ኮከብ ዓለም አቀፍ የቅንጦት ደረጃዎችን ከእውነተኛ የሀበሻ ባህላዊ አርክቴክቸር ጋር የሚያዋህዱ ድንቅ ክፍሎች።",
      culture: "የባህል እምብርት",
      cultureSub: "የመነሻ ምድር በሆኑት ትክክለኛ የአምልኮ ሥርዓቶች፣ የምግብ አዘገጃጀት ጥበብ እና ጥንታዊ በዓላት ውስጥ እራስዎን ያስገቡ።",
      highlights: "የቱሪዝም ድምቀቶች",
      highlightsSub: "በስምጥ ሸለቆዎች ውስጥ ያሉ የተፈጥሮ ድንቆችን፣ ጥንታዊ መንፈሳዊ ሀውልቶችን እና የማይረሱ የዱር እንስሳት ጉብኝቶችን ያግኙ።",
      food: "የሀበሻ የምግብ ጥበብ",
      foodSub: "በለስላሳ እና በጣፋጭ እንጀራ ላይ የሚቀርቡትን የበለፀጉ፣ መዓዛ ያላቸው ቅመማ ቅመሞች እና ድንቅ ምግቦችን ያጣጥሙ።",
      testimonials: "የጎብኝዎች ምስክርነት",
      testimonialsSub: "ከዓለም ዙሪያ በመጡ ታዋቂ እንግዶቻችን የተጋሩ ልባዊ ልምዶችን እና የተከበሩ ትዝታዎችን ያንብቡ።",
      gallery: "የፎቶግራፍ ማዕከለ-ስዕላት",
      gallerySub: "የኢትዮጵያን አስደናቂ መልክዓ ምድሮች፣ ጥንታዊ አርክቴክቸር እና ደማቅ ቀለሞችን የሚያሳይ የቅንጦት የፎቶግራፍ ስብስብ።",
      packages: "ልዩ የጉዞ ጥቅሎች",
      packagesSub: "የበረራዎን፣ የቅንጦት ዝውውሮችን እና የግል አስጎብኝዎችን እያንዳንዱን ዝርዝር ሁኔታ የሚይዙ በጥንቃቄ የተዘጋጁ ፕሪሚየም የጉዞ እቅዶች።",
      assistant: "የማሰብ ችሎታ ያለው አስጎብኚ",
      assistantSub: "የጉዞ ዕቅዶችን ለማዘጋጀት፣ ስለአካባቢው ባህል ለመጠየቅ ወይም የቅንጦት አገልግሎቶችን ለማስያዝ ከረዳታችን ጋር ይነጋገሩ።",
    }
  },
  fr: {
    heroTitle: "Découvrez la Beauté Éternelle de l'Éthiopie",
    heroSubtitle: "Découvrez des hébergements de luxe, des expériences culturelles, des paysages à couper le souffle et l'hospitalité éthiopienne inoubliable.",
    bookYourStay: "Réserver Votre Séjour",
    exploreEthiopia: "Explorer l'Éthiopie",
    watchExperience: "Regarder l'Expérience",
    bookingWidget: {
      checkIn: "Date d'arrivée",
      checkOut: "Date de départ",
      guests: "Voyageurs",
      roomType: "Chambre / Suite",
      tourPackage: "Forfait Touristique",
      searchBtn: "Rechercher",
    },
    nav: {
      home: "Accueil",
      hotels: "Hôtels",
      resorts: "Resorts",
      tours: "Circuits",
      culture: "Culture",
      destinations: "Destinations",
      experiences: "Expériences",
      gallery: "Galerie",
      contact: "Contact",
      login: "Connexion",
      register: "S'enregistrer",
    },
    titles: {
      destinations: "Destinations Phares",
      destinationsSub: "Embarquez pour un voyage extraordinaire à travers des siècles d'histoire riche, des paysages majestueux et des traditions vibrantes.",
      rooms: "Hébergements de Prestige",
      roomsSub: "Des suites exquises mêlant les standards du luxe international cinq étoiles à l'architecture traditionnelle Habesha.",
      culture: "L'Essence Culturelle",
      cultureSub: "Plongez dans des rituels authentiques, l'art culinaire et des célébrations séculaires qui définissent la Terre des Origines.",
      highlights: "Points Forts du Tourisme",
      highlightsSub: "Découvrez des merveilles naturelles, des monuments spirituels anciens et des safaris inoubliables dans la vallée du Rift.",
      food: "Art Culinaire Habesha",
      foodSub: "Savourez des plats mijotés riches en épices aromatiques, servis sur une galette d'Injera moelleuse et fermentée.",
      testimonials: "Récits de Voyageurs",
      testimonialsSub: "Découvrez les expériences sincères et les précieux souvenirs partagés par nos hôtes distingués du monde entier.",
      gallery: "Galerie du Patrimoine",
      gallerySub: "Une collection photographique de prestige célébrant les paysages grandioses, l'architecture ancienne et les couleurs vives de l'Éthiopie.",
      packages: "Forfaits Exclusifs sur Mesure",
      packagesSub: "Des itinéraires haut de gamme parfaitement orchestrés, prenant soin de chaque détail de vos transferts et visites guidées.",
      assistant: "Compagnon de Voyage IA",
      assistantSub: "Échangez avec notre guide intelligent pour concevoir des itinéraires sur mesure, comprendre les coutumes locales ou réserver des tables.",
    }
  },
  ar: {
    heroTitle: "اختبر الجمال الأزلي لإثيوبيا",
    heroSubtitle: "اكتشف أماكن الإقامة الفاخرة، والتجارب الثقافية الأصيلة، والمناظر الطبيعية الخلابة، وكرم الضيافة الإثيوبية الذي لا يُنسى.",
    bookYourStay: "احجز إقامتك",
    exploreEthiopia: "استكشف إثيوبيا",
    watchExperience: "شاهد التجربة",
    bookingWidget: {
      checkIn: "تاريخ الوصول",
      checkOut: "تاريخ المغادرة",
      guests: "عدد الضيوف",
      roomType: "نوع الغرفة / الجناح",
      tourPackage: "باقة الرحلة",
      searchBtn: "البحث عن المتاح",
    },
    nav: {
      home: "الرئيسية",
      hotels: "الفنادق",
      resorts: "المنتجعات",
      tours: "الجولات",
      culture: "الثقافة",
      destinations: "الوجهات",
      experiences: "التجارب",
      gallery: "المعرض",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
    },
    titles: {
      destinations: "الوجهات المميزة",
      destinationsSub: "انطلق في رحلة استثنائية عبر قرون من التاريخ الغني، والمناظر الطبيعية المهيبة، والتقاليد الحية.",
      rooms: "الإقامة الفاخرة",
      roomsSub: "أجنحة رائعة تمزج بين معايير الفنادق العالمية ذات الخمس نجوم والجمال المعماري التقليدي للحبشة.",
      culture: "الجوهر الثقافي",
      cultureSub: "انغمس في الطقوس الأصيلة، وفنون الطهي، والاحتفالات القديمة التي تميزت بها أرض البدايات.",
      highlights: "أبرز المعالم السياحية",
      highlightsSub: "اكتشف العجائب الطبيعية، والمعالم الروحية القديمة، ورحلات السفاري التي لا تُنسى في الوديان المتصدعة.",
      food: "فن الطهي الحبشي الأصيل",
      foodSub: "تذوق التوابل العطرية الغنية والأطباق المطبوخة ببطء والتي تُقدم فوق خبز الإنجيرا المخمر اللين.",
      testimonials: "قصص المسافرين",
      testimonialsSub: "اقرأ تجارب صادقة وذكريات عزيزة شاركها ضيوفنا الكرام من جميع أنحاء العالم.",
      gallery: "معرض التراث البصري",
      gallerySub: "مجموعة فوتوغرافية فاخرة تحتفي بالمناظر الطبيعية الخلابة، والعمارة القديمة، والألوان الزاهية لإثيوبيا.",
      packages: "باقات سياحية حصرية",
      packagesSub: "مسارات رحلات متميزة ومنظمة بسلاسة، تهتم بكل تفاصيل رحلاتك الجوية، وتنقّلاتك الفاخرة، وجولاتك الإرشادية.",
      assistant: "مساعد السفر الذكي",
      assistantSub: "تحدث مع دليلنا الذكي لتصميم مسارات رحلات مخصصة، أو التعرف على العادات المحلية، أو حجز التجارب الفاخرة.",
    }
  }
};

export const conversionRates: { [key in Currency]: number } = {
  USD: 1,
  ETB: 120, // 1 USD = 120 ETB (Simulated luxury standard rate)
  EUR: 0.92, // 1 USD = 0.92 EUR
};

export const currencySymbols: { [key in Currency]: string } = {
  USD: "$",
  ETB: "Br ",
  EUR: "€",
};

export const destinations: Destination[] = [
  {
    id: "lalibela",
    name: {
      en: "Lalibela",
      am: "ላሊበላ",
      fr: "Lalibela",
      ar: "لاليبيلا",
    },
    region: {
      en: "Amhara Region",
      am: "አማራ ክልል",
      fr: "Région d'Amhara",
      ar: "إقليم أمهرة",
    },
    rating: 5.0,
    description: {
      en: "Renowned for its breathtaking rock-hewn churches carved out of solid monolithic stone in the 12th century.",
      am: "በ12ኛው ክፍለ ዘመን ከአንድ ወጥ ድንጋይ ተፈልፍለው በተሰሩት አስደናቂ አብያተ ክርስቲያናት ይታወቃል።",
      fr: "Célèbre pour ses magnifiques églises taillées dans la roche d'un seul bloc de pierre monolithique au XIIe siècle.",
      ar: "مشهورة بكنائسها المنحوتة في الصخور الصلبة ككتلة واحدة في القرن الثاني عشر.",
    },
    priceUsd: 250,
    image: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=800&auto=format&fit=crop", // placeholder or fallback but we also have generated
    highlights: [
      {
        en: "Biete Ghiorgis (Church of St. George)",
        am: "ቤተ ጊዮርጊስ",
        fr: "Biete Ghiorgis (Église Saint-Georges)",
        ar: "بيت جيورجيس (كنيسة القديس جرجس)"
      },
      {
        en: "Sacred Spiritual Sunrise chanting",
        am: "የማለዳ የቅዳሴ ዜማ እና ጸሎት",
        fr: "Chants spirituels au lever du soleil",
        ar: "التراتيل الروحية عند شروق الشمس"
      }
    ],
    coordinates: { x: 55, y: 35 } // Central/North
  },
  {
    id: "simien-mountains",
    name: {
      en: "Simien Mountains",
      am: "ሰሜን ተራሮች",
      fr: "Monts Simien",
      ar: "جبال سيميان",
    },
    region: {
      en: "North Gondar",
      am: "ሰሜን ጎንደር",
      fr: "Gondar Nord",
      ar: "شمال غوندار",
    },
    rating: 4.9,
    description: {
      en: "A majestic UNESCO World Heritage site featuring jagged peaks, deep valleys, and rare endemic wildlife.",
      am: "ሹል ጫፎችን፣ ጥልቅ ሸለቆዎችን እና ብርቅዬ ተወላጅ የዱር እንስሳትን የያዘው አስደናቂው የዩኔስኮ የዓለም ቅርስ።",
      fr: "Un site majestueux du patrimoine mondial de l'UNESCO caractérisé par des pics acérés et une faune endémique rare.",
      ar: "موقع مهيب مدرج على قائمة التراث العالمي لليونسكو يتميز بقممه الوعرة وحياته البرية الفريدة.",
    },
    priceUsd: 320,
    image: "https://images.unsplash.com/photo-1622141571731-0cf24cf6dcbe?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "Encountering majestic Gelada Baboons",
        am: "የጭላዳ ዝንጀሮዎችን መመልከት",
        fr: "Rencontre avec les babouins Gélada",
        ar: "مشاهدة قرود الجلادة المهيبة"
      },
      {
        en: "Trekking to Ras Dashen Peak",
        am: "ወደ ራስ ዳሽን ተራራ ጉዞ ማድረግ",
        fr: "Randonnée vers le sommet du Ras Dashen",
        ar: "تسلق قمة رأس داشين"
      }
    ],
    coordinates: { x: 48, y: 22 }
  },
  {
    id: "gondar",
    name: {
      en: "Gondar",
      am: "ጎንደር",
      fr: "Gondar",
      ar: "غوندار",
    },
    region: {
      en: "Amhara Region",
      am: "አማራ ክልል",
      fr: "Région d'Amhara",
      ar: "إقليم أمهرة",
    },
    rating: 4.8,
    description: {
      en: "Often called the Camelot of Africa, Gondar is famous for its majestic 17th-century stone castles.",
      am: "ብዙውን ጊዜ የአፍሪካ ካሜሎት እየተባለ የሚጠራው ጎንደር፣ በ17ኛው ክፍለ ዘመን በነበሩት አስደናቂ ግንቦች ይታወቃል።",
      fr: "Souvent appelée le Camelot de l'Afrique, Gondar est célèbre pour ses majestueux châteaux en pierre du XVIIe siècle.",
      ar: "تُعرف غالباً بـ كاستيل أفريقيا، غوندار مشهورة بقلاعها الحجرية المهيبة من القرن السابع عشر.",
    },
    priceUsd: 210,
    image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "Fasil Ghebbi Royal Enclosure",
        am: "የፋሲል ግቢ ታሪካዊ ግንቦች",
        fr: "Cité royale de Fasil Ghebbi",
        ar: "قلعة فاسيل غيبي الملكية"
      },
      {
        en: "Debre Birhan Selassie angelic ceiling",
        am: "የደብረ ብርሃን ሥላሴ መላእክት ስዕሎች",
        fr: "Plafond d'anges de Debre Birhan Selassie",
        ar: "سقف كنيسة دبر برهان سلاسي الملائكي"
      }
    ],
    coordinates: { x: 45, y: 30 }
  },
  {
    id: "bahir-dar",
    name: {
      en: "Bahir Dar",
      am: "ባህር ዳር",
      fr: "Bahir Dar",
      ar: "بحر دار",
    },
    region: {
      en: "Lake Tana",
      am: "ጣና ሐይቅ",
      fr: "Lac Tana",
      ar: "بحيرة تانا",
    },
    rating: 4.8,
    description: {
      en: "A beautiful lakeside city gateway to the Blue Nile Falls and ancient island monasteries on Lake Tana.",
      am: "ለዓባይ ፏፏቴ እና በጣና ሐይቅ ላይ ላሉት ጥንታዊ ገዳማት መግቢያ የሆነችው ውብ የሐይቅ ዳርቻ ከተማ።",
      fr: "Une belle ville au bord du lac, porte d'entrée des chutes du Nil Bleu et des anciens monastères du lac Tana.",
      ar: "مدينة جميلة على ضفاف بحيرة تانا وهي بوابة شلالات النيل الأزرق والأديرة الأثرية في الجزر.",
    },
    priceUsd: 180,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "Sailing to Lake Tana Monasteries",
        am: "በጀልባ ወደ ጣና ገዳማት መጓዝ",
        fr: "Navigation vers les monastères du lac Tana",
        ar: "الإبحار إلى أديرة بحيرة تانا"
      },
      {
        en: "Hiking to majestic Blue Nile Falls",
        am: "ወደ ታላቁ ዓባይ ፏፏቴ የእግር ጉዞ",
        fr: "Randonnée aux majestueuses chutes du Nil Bleu",
        ar: "المشي لمسافات طويلة إلى شلالات النيل الأزرق"
      }
    ],
    coordinates: { x: 40, y: 38 }
  },
  {
    id: "axum",
    name: {
      en: "Axum",
      am: "አክሱም",
      fr: "Aksoum",
      ar: "أكسوم",
    },
    region: {
      en: "Tigray Region",
      am: "ትግራይ ክልል",
      fr: "Région du Tigré",
      ar: "إقليم تيغراي",
    },
    rating: 4.7,
    description: {
      en: "The ancient cradle of Ethiopian civilization, home to giant monolithic obelisks and the Queen of Sheba legacy.",
      am: "የኢትዮጵያ ስልጣኔ ጥንታዊ መገኛ፣ የግዙፍ አውልቶች እና የንግስት ሳባ ታሪክ ማዕከል።",
      fr: "Berceau antique de la civilisation éthiopienne, abritant d'immenses obélisques monolithiques et l'héritage de la reine de Saba.",
      ar: "مهد الحضارة الإثيوبية القديمة، موطن المسلات الضخمة وإرث ملكة سبأ.",
    },
    priceUsd: 220,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "The Giant Obelisks of Axum",
        am: "የአክሱም ግዙፍ የድንጋይ ሐውልቶች",
        fr: "Les obélisques géants d'Aksoum",
        ar: "مسلات أكسوم الضخمة"
      },
      {
        en: "Chapel of the Ark of the Covenant",
        am: "የታቦተ ጽዮን ማረፊያ ቤተ መቅደስ",
        fr: "Chapelle de l'Arche d'Alliance",
        ar: "كنيسة تابوت العهد"
      }
    ],
    coordinates: { x: 50, y: 12 }
  },
  {
    id: "arba-minch",
    name: {
      en: "Arba Minch",
      am: "አርባ ምንጭ",
      fr: "Arba Minch",
      ar: "أربا مينش",
    },
    region: {
      en: "Southern Ethiopia",
      am: "ደቡብ ኢትዮጵያ",
      fr: "Sud de l'Éthiopie",
      ar: "جنوب إثيوبيا",
    },
    rating: 4.9,
    description: {
      en: "Meaning 'Forty Springs', Arba Minch is surrounded by lush forests, two great lakes, and stunning rift valley views.",
      am: "አርባ ምንጮች በተከበቡ ለምለም ደኖች፣ ሁለት ታላላቅ ሐይቆች እና አስደናቂ የስምጥ ሸለቆ እይታዎች የታወቀች።",
      fr: "Signifiant 'Quarante Sources', Arba Minch est entourée de forêts luxuriantes, de deux grands lacs et d'une vue sur le Rift.",
      ar: "تعني 'أربعين ينبوعاً'، وهي محاطة بالغابات الخضراء وبحيرتين عظيمتين ومناظر الوادي المتصدع الخلابة.",
    },
    priceUsd: 260,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "Lake Chamo Crocodile Market boat cruise",
        am: "በጫሞ ሐይቅ ላይ የአዞ ገበያ የጀልባ ጉዞ",
        fr: "Croisière sur le lac Chamo et marché aux crocodiles",
        ar: "رحلة بحرية في بحيرة تشامو لمشاهدة التماسيح"
      },
      {
        en: "Nechisar National Park Plains",
        am: "የነጭ ሳር ብሔራዊ ፓርክ አስደናቂ እይታ",
        fr: "Plaines du parc national de Nechisar",
        ar: "سهول متنزه نيجيسار الوطني"
      }
    ],
    coordinates: { x: 38, y: 75 }
  },
  {
    id: "danakil-depression",
    name: {
      en: "Danakil & Erta Ale",
      am: "ዳናኪል እና ኤርታ አሌ",
      fr: "Dépression du Danakil",
      ar: "منخفض الدناكل وإرتا ألي",
    },
    region: {
      en: "Afar Triangle",
      am: "አፋር ክልል",
      fr: "Triangle de l'Afar",
      ar: "إقليم عفر",
    },
    rating: 5.0,
    description: {
      en: "One of the lowest and hottest places on Earth, a hypnotic surreal landscape of sulfur springs and active lava lakes.",
      am: "በምድር ላይ በጣም ዝቅተኛና ሞቃታማ ከሆኑ ስፍራዎች አንዱ፣ አስደናቂ የሰልፈር ምንጮች እና እሳተ ገሞራዎች ያሉበት።",
      fr: "L'un des endroits les plus bas et les plus chauds sur Terre, offrant un paysage surréaliste de sources de soufre et de lave.",
      ar: "واحدة من أكثر المناطق انخفاضاً وحرارة على وجه الأرض، وتتميز بمناظرها السريالية من ينابيع الكبريت وبحيرات الحمم النشطة.",
    },
    priceUsd: 450,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "Dallol colorful sulfur hot springs",
        am: "የዳሎል አስደናቂ ባለቀለም የሰልፈር ምንጮች",
        fr: "Sources de soufre colorées de Dallol",
        ar: "ينابيع دالول الكبريتية الملونة"
      },
      {
        en: "Hiking to Erta Ale boiling lava lake",
        am: "ወደ ኤርታ አሌ ቀልጣፋ እሳተ ገሞራ ጉዞ",
        fr: "Randonnée vers le lac de lave d'Erta Ale",
        ar: "تسلق فوهة بركان إرتا ألي الثائر"
      }
    ],
    coordinates: { x: 72, y: 22 }
  },
  {
    id: "harar",
    name: {
      en: "Harar Jugol",
      am: "ሐረር ጀጎል",
      fr: "Harar Jugol",
      ar: "هرر جوجول",
    },
    region: {
      en: "Eastern Ethiopia",
      am: "ምስራቅ ኢትዮጵያ",
      fr: "Est de l'Éthiopie",
      ar: "شرق إثيوبيا",
    },
    rating: 4.8,
    description: {
      en: "An ancient walled city with 82 mosques, narrow labyrinth alleys, and the historic nightly hyena feeding ritual.",
      am: "82 መስጊዶችን የያዘችው ጥንታዊት ግንብ ከተማ፣ ጠባብ መንገዶች እና ታሪካዊው የጅብ መመገብ ሥነ-ስርዓት።",
      fr: "Une ancienne ville fortifiée abritant 82 mosquées, des ruelles labyrinthiques et le rituel nocturne des hyènes.",
      ar: "مدينة تاريخية مسورة تحتوي على 82 مسجداً وممرات ضيقة، وتشتهر بطقوس إطعام الضباع ليلاً.",
    },
    priceUsd: 190,
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=800&auto=format&fit=crop",
    highlights: [
      {
        en: "Feeding wild Hyenas by hand at night",
        am: "ማታ የዱር ጅቦችን በእጅ የመመገብ ልምድ",
        fr: "Nourrir les hyènes sauvages à la main la nuit",
        ar: "إطعام الضباع البرية يدوياً في الليل"
      },
      {
        en: "Walking through colorful narrow alleys",
        am: "በባለብዙ ቀለማት የጀጎል ጠባብ መንገዶች መጓዝ",
        fr: "Promenade dans les ruelles colorées de Jugol",
        ar: "التجول في الأزقة الملونة الضيقة للبلدة القديمة"
      }
    ],
    coordinates: { x: 78, y: 48 }
  }
];

export const rooms: Room[] = [
  {
    id: "presidential-suite",
    name: {
      en: "Entoto Presidential Suite",
      am: "የእንቶቶ ፕሬዝዳንታዊ ስብስብ",
      fr: "Suite Présidentielle Entoto",
      ar: "جناح إنتوتو الرئاسي الفاخر",
    },
    type: "Presidential Suite",
    description: {
      en: "An expansive mountain-view sanctuary with a private deck, plunge pool, wood-burning fireplace, and dedicated personal butler.",
      am: "የግል እርከን፣ የመዋኛ ገንዳ፣ የምድጃ እሳት እና የግል ረዳት ያለው ሰፊ የተራራ እይታ ማረፊያ።",
      fr: "Un vaste sanctuaire avec vue sur la montagne, terrasse privée, piscine plongeante, cheminée et majordome dédié.",
      ar: "ملاذ واسع مطل على الجبل مع شرفة خاصة، ومسبح صغير، ومدفأة حطب، وخادم شخصي مخصص.",
    },
    sizeSqM: 120,
    priceUsd: 650,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop", // placeholder
    amenities: [
      { en: "Private Heated Plunge Pool", am: "የግል ሙቅ ውሃ ገንዳ", fr: "Piscine chauffée privée", ar: "مسبح دافئ خاص" },
      { en: "24/7 Personal Butler Service", am: "የ24 ሰዓት የግል ረዳት", fr: "Service de majordome 24h/24", ar: "خدمة الخادم الشخصي على مدار الساعة" },
      { en: "Traditional Fireplace Lounge", am: "ባህላዊ የምድጃ እሳት", fr: "Salon avec cheminée", ar: "صالة بمدفأة تقليدية" },
      { en: "Premium Champagne & Fruits on arrival", am: "ፕሪሚየም መጠጥ እና ፍራፍሬዎች", fr: "Champagne de prestige et fruits", ar: "مشروب ترحيبي فاخر وفواكه عند الوصول" }
    ]
  },
  {
    id: "habesha-suite",
    name: {
      en: "Traditional Habesha Royal Suite",
      am: "ባህላዊ የሀበሻ ንጉሳዊ ስብስብ",
      fr: "Suite Royale Traditionnelle Habesha",
      ar: "الجناح الملكي الحبشي التقليدي",
    },
    type: "Habesha Suite",
    description: {
      en: "Beautifully adorned with hand-carved stone pillars and luxurious woven Habesha patterns, overlooking pristine natural landscapes.",
      am: "በእጅ በተቀረጹ የድንጋይ ምሰሶዎች እና ውብ የሀበሻ በሽመና ጥበቦች ያጌጠ፣ አስደናቂ የተፈጥሮ እይታ ያለው ክፍል።",
      fr: "Magnifiquement ornée de piliers en pierre sculptés à la main et de motifs Habesha tissés, avec vue sur la nature.",
      ar: "مزين بأعمدة حجرية منحوتة يدوياً ونقوش حبشية منسوجة يدوياً، مع إطلالة على المناظر الطبيعية الخلابة.",
    },
    sizeSqM: 95,
    priceUsd: 480,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
    amenities: [
      { en: "Hand-crafted Local Stone Architecture", am: "የሀገር በቀል የድንጋይ ስነ-ህንፃ", fr: "Architecture en pierre locale", ar: "تصميم معماري من الأحجار المحلية المنحوتة" },
      { en: "Premium Habesha Hand-woven Linen", am: "ፕሪሚየም ባህላዊ የሀበሻ ጨርቆች", fr: "Linge de lit Habesha fait main", ar: "مفروشات قطنية حبشية فاخرة منسوجة يدوياً" },
      { en: "In-suite Traditional Coffee Setup", am: "ባህላዊ የቡና ማፍያ ማዕዘን", fr: "Espace cérémonie du café en suite", ar: "ركن مخصص لإعداد القهوة التقليدية داخل الجناح" },
      { en: "Luxury Herbal Spa Baths", am: "የቅንጦት የተፈጥሮ እጽዋት ስፓ", fr: "Bains de spa aux herbes locales", ar: "حمام سبا عشبي فاخر" }
    ]
  },
  {
    id: "family-villa",
    name: {
      en: "Rift Valley Family Villa",
      am: "የስምጥ ሸለቆ የቤተሰብ ቪላ",
      fr: "Villa Familiale de la Vallée du Rift",
      ar: "فيلا وادي الصدع العائلية",
    },
    type: "Family Villa",
    description: {
      en: "A spacious 2-bedroom villa with high thatched ceilings, private garden, campfire area, and exquisite locally inspired interior design.",
      am: "ከፍተኛ የሳር ክዳን ጣሪያ፣ የግል የአትክልት ስፍራ፣ የውጭ እሳት ማገዶ እና አስደናቂ ባህላዊ የውስጥ ማስጌጫ ያለው ባለ ሁለት ክፍል ቪላ።",
      fr: "Une villa spacieuse de 2 chambres avec hauts plafonds en chaume, jardin privé, espace feu de camp et design d'inspiration locale.",
      ar: "فيلا واسعة من غرفتي نوم مع أسقف عالية من القش، وحديقة خاصة، ومنطقة لإشعال النار، وتصميم داخلي رائع مستوحى من التراث المحلي.",
    },
    sizeSqM: 140,
    priceUsd: 550,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop",
    amenities: [
      { en: "Private Campfire & Dining Area", am: "የግል የመጫሪያ እሳት እና መመገቢያ", fr: "Espace feu de camp et dîner privé", ar: "منطقة عائلية خاصة لإشعال النار وتناول الطعام" },
      { en: "Panoramic Valley Views", am: "የሸለቆው አስደናቂ እይታ", fr: "Vue panoramique sur la vallée", ar: "إطلالة بانورامية ساحرة على الوادي" },
      { en: "Luxury Eco-Friendly Materials", am: "የቅንጦት ለአካባቢ ተስማሚ ቁሶች", fr: "Matériaux écologiques de luxe", ar: "مواد بناء صديقة للبيئة وصحية" },
      { en: "Kitchenette with Private Chef options", am: "ወጥ ቤት ከግል ሼፍ ምርጫ ጋር", fr: "Kitchenette avec option chef privé", ar: "مطبخ صغير مجهز بالكامل مع توفير طاهٍ خاص عند الطلب" }
    ]
  },
  {
    id: "mountain-view",
    name: {
      en: "Simien Cliffside Suite",
      am: "የሰሜን ተራራ ቋጥኝ እይታ ክፍል",
      fr: "Suite Simien Falaise",
      ar: "جناح جرف سيميان الجبلي",
    },
    type: "Mountain View Room",
    description: {
      en: "悬崖崖壁设计, Perched dramatically on the cliff edge with a glass balcony providing absolute views of the Simien Mountain peaks.",
      am: "በቋጥኙ ጫፍ ላይ የተንጠለጠለ፣ የተራራ ጫፎችን በቅርብ የሚያሳይ የመስታወት በረንዳ ያለው ልዩ ክፍል።",
      fr: "Perchée de façon spectaculaire au bord de la falaise avec un balcon en verre offrant une vue absolue sur les sommets.",
      ar: "معلق بشكل درامي على حافة المنحدر الصخري مع شرفة زجاجية توفر إطلالة كاملة ومفتوحة على قمم جبال سيميان.",
    },
    sizeSqM: 65,
    priceUsd: 380,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
    amenities: [
      { en: "Heated Glass-Framed Balcony", am: "ሙቅ የመስታወት በረንዳ", fr: "Balcon en verre chauffé", ar: "شرفة زجاجية مدفأة ذات إطلالة واسعة" },
      { en: "High-Altitude Heating & AC", am: "ከፍተኛ ደረጃ ማሞቂያ እና አየር ማቀዝቀዣ", fr: "Chauffage haute altitude", ar: "نظام تدفئة وتكييف متطور للمرتفعات" },
      { en: "Over-Bed Skylight for Stargazing", am: "ኮከብ ለመመልከት የሚያስችል ጣሪያ", fr: "Lucarne au-dessus du lit pour les étoiles", ar: "نافذة سقفية زجاجية فوق السرير لمشاهدة النجوم ليلاً" }
    ]
  },
  {
    id: "lake-view",
    name: {
      en: "Lake Tana Shoreline Pavilion",
      am: "የጣና ሐይቅ ዳርቻ ድንኳን",
      fr: "Pavillon Rive du Lac Tana",
      ar: "جناح ضفاف بحيرة تانا الهادئ",
    },
    type: "Lake View Suite",
    description: {
      en: "Floating luxury pavilion situated directly over the peaceful waters of Lake Tana with a private boat dock.",
      am: "በጣና ሐይቅ ጸጥተኛ ውሃዎች ላይ የተሰራ የቅንጦት ድንኳን ከግል ጀልባ ማቆሚያ ጋር።",
      fr: "Pavillon de luxe flottant situé directement au-dessus des eaux paisibles du lac Tana avec un quai privé.",
      ar: "جناح فاخر عائم يقع مباشرة فوق مياه بحيرة تانا الهادئة مع رصيف خاص لرسو القوارب واليخوت.",
    },
    sizeSqM: 80,
    priceUsd: 420,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800&auto=format&fit=crop",
    amenities: [
      { en: "Private Boat Dock & Kayaks", am: "የግል ጀልባ ማቆሚያ እና ካያክ", fr: "Ponton privé et kayaks", ar: "رصيف قوارب خاص وتوفير قوارب الكاياك" },
      { en: "Waterfront Sundeck with Hammock", am: "የሐይቅ ዳርቻ መዝናኛ በረንዳ", fr: "Terrasse au bord de l'eau avec hamac", ar: "شرفة استجمام مباشرة على الماء مجهزة بأرجوحة شبكية" },
      { en: "Floor-to-Ceiling Sliding Glass", am: "ግድግዳ-እስከ-ጣሪያ ተንሸራታች መስታወት", fr: "Baies vitrées coulissantes", ar: "أبواب زجاجية منزلقة من الأرض حتى السقف" }
    ]
  }
];

export const foodItems: FoodItem[] = [
  {
    id: "injera",
    name: {
      en: "Traditional Injera Platter",
      am: "ባህላዊ የእንጀራ ማዕድ",
      fr: "Plateau d'Injera Traditionnelle",
      ar: "مائدة الإنجيرا التقليدية",
    },
    type: "dish",
    description: {
      en: "A soft, spongy sourdough flatbread made from ancient Teff grain, serving as the essential foundation of every meal.",
      am: "ከጥንታዊው የጤፍ እህል የተዘጋጀ፣ ለስላሳ እና ጣፋጭ ባህላዊ እንጀራ።",
      fr: "Une galette de pain au levain moelleuse à base de teff, servant de base essentielle à chaque repas éthiopien.",
      ar: "خبز مفرود إسفنجي لين مصنوع من حبوب التيف القديمة، يمثل الأساس لكل وجبة إثيوبية.",
    },
    priceUsd: 15,
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop", // placeholder
    isVegetarian: true
  },
  {
    id: "doro-wat",
    name: {
      en: "Royal Doro Wat",
      am: "ንጉሳዊ የዶሮ ወጥ",
      fr: "Doro Wat Royal",
      ar: "طبق دورو وات الملكي",
    },
    type: "dish",
    description: {
      en: "The king of Ethiopian feasts: slow-simmered tender chicken in rich, spicy Berbere pepper sauce, garnished with boiled eggs.",
      am: "የእንጀራ ማዕድ ንጉስ፡ በበለጸገ የበርበሬ ወጥ ውስጥ ተቀቅሎ የተሰራ ጣፋጭ የዶሮ ወጥ ከቀቀል እንቁላል ጋር።",
      fr: "Le roi des fêtes éthiopiennes: poulet tendre mijoté dans une sauce épicée au Berbéré, garni d'œufs durs.",
      ar: "سيد المائدة الإثيوبية: دجاج طري مطبوخ ببطء في صلصة فلفل البربري الحارة والغنية، مزين بالبيض المسلوق.",
    },
    priceUsd: 28,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800&auto=format&fit=crop",
    isSpicy: true
  },
  {
    id: "kitfo",
    name: {
      en: "Gourmet Kitfo",
      am: "ልዩ ክትፎ",
      fr: "Kitfo Gourmet",
      ar: "طبق كيتفو الفاخر",
    },
    type: "dish",
    description: {
      en: "Finely minced premium beef seasoned with warm, aromatic Mitmita chili and purified herbed butter (Niter Kibbeh).",
      am: "በሚጥሚጣ እና በቅመም በተንጠረረ ንጥር ቅቤ የተዘጋጀ ልዩ የክትፎ ስጋ ከጎመን እና አይብ ጋር።",
      fr: "Bœuf haché de première qualité assaisonné de piment Mitmita et de beurre clarifié aux herbes (Niter Kibbeh).",
      ar: "لحم بقري مفروم ناعم ومتبل بفلفل الميتميتا العطري والزبدة المصفاة بالأعشاب (نيتير كيبه).",
    },
    priceUsd: 25,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    isSpicy: true
  },
  {
    id: "tibs",
    name: {
      en: "Sizzling Sela Tibs",
      am: "የሚያቃጭል የሸክላ ጥብስ",
      fr: "Sela Tibs Crépitant",
      ar: "لحم تيبس المقلي الساخن",
    },
    type: "dish",
    description: {
      en: "Sizzling cubes of tender lamb or beef sautéed with onions, rosemary, and green chilies, served on a clay burner.",
      am: "በሽንኩርት፣ በሮዝመሪ እና በቃሪያ የተጠበሰ ጣፋጭ የሸክላ በግ ወይም የበሬ ስጋ ጥብስ።",
      fr: "Cubes de viande d'agneau sautés avec oignons, romarin et piments verts, servis sur un brûleur en argile.",
      ar: "مكعبات ساخنة من لحم الغنم أو البقر الطري المقلي مع البصل، والروزماري، والفلفل الأخضر، تُقدم في وعاء فخاري.",
    },
    priceUsd: 22,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "shiro",
    name: {
      en: "Clay-pot Shiro Tegabino",
      am: "የሸክላ ሽሮ ተጋቢኖ",
      fr: "Shiro Tegabino en Marmite d'Argile",
      ar: "شيرو تيجابينو الفخاري",
    },
    type: "dish",
    description: {
      en: "A rich, velvety puree of seasoned chickpea flour cooked with onions, garlic, and Berbere, served bubbling in a hot clay pot.",
      am: "በሽንኩርት፣ በነጭ ሽንኩርት እና በበርበሬ ተዘጋጅቶ በሸክላ የሚንተከተክ ጣፋጭ የሽሮ ተጋቢኖ።",
      fr: "Une purée onctueuse de farine de pois chiches assaisonnée, cuite avec ail, oignons et Berbéré, servie bouillonnante.",
      ar: "حساء غني وناعم من دقيق الحمص المتبل المطبوخ مع البصل، والثوم، وفلفل البربري، يُقدم يغلي في وعاء فخاري ساخن.",
    },
    priceUsd: 14,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    isVegetarian: true,
    isSpicy: true
  },
  {
    id: "tej",
    name: {
      en: "Traditional Tej Honey Wine",
      am: "ባህላዊ የጠጅ መጠጥ",
      fr: "Vin de Miel Traditionnel Tej",
      ar: "شراب تيج (نبيذ العسل التقليدي)",
    },
    type: "drink",
    description: {
      en: "An ancient, sweet and aromatic honey wine fermented with wild hops (Gesho), served in authentic bulbous glass flasks (Berele).",
      am: "ከማር እና ከጌሾ የሚዘጋጅ፣ በባህላዊ የጠጅ ብርሌ የሚቀርብ ጣፋጭ የአልኮል መጠጥ።",
      fr: "Un vin de miel ancien, doux et aromatique fermenté avec du Gesho, servi dans des flacons en verre traditionnels (Berele).",
      ar: "شراب عسل قديم وحلو وعطري مخمر بأوراق الجيشو البرية، يُقدم في قوارير زجاجية تقليدية دائرية (بريلي).",
    },
    priceUsd: 10,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
  }
];

export const tourPackages: TourPackage[] = [
  {
    id: "historical-north",
    name: {
      en: "Ancient Northern Kingdoms Circuit",
      am: "ጥንታዊ የሰሜን ስልጣኔ ጉዞ",
      fr: "Circuit des Anciens Royaumes du Nord",
      ar: "جولة ممالك الشمال الأثرية",
    },
    duration: {
      en: "8 Days / 7 Nights",
      am: "8 ቀን / 7 ምሽት",
      fr: "8 Jours / 7 Nuits",
      ar: "٨ أيام / ٧ ليالٍ",
    },
    description: {
      en: "An elite private journey covering Axum stelae, Gondar castles, Lake Tana island monasteries, and Lalibela's stone churches.",
      am: "የአክሱም ሃውልቶችን፣ የጎንደር ግንቦችን፣ የጣና ገዳማትን እና የላሊበላ ፍልፍል አብያተ ክርስቲያናትን የሚያጠቃልል ልዩ የጉዞ ጥቅል።",
      fr: "Un voyage privé d'élite couvrant les obélisques d'Aksoum, les châteaux de Gondar, le lac Tana et les églises de Lalibela.",
      ar: "جولة خاصة فاخرة تشمل مسلات أكسوم، وقلاع غوندار، وأديرة بحيرة تانا، وكنائس لاليبيلا الصخرية.",
    },
    priceUsd: 1850,
    highlights: [
      { en: "VIP Helicopter transfer to Lalibela", am: "በቪአይፒ ሄሊኮፕተር ወደ ላሊበላ ጉዞ", fr: "Transfert VIP en hélicoptère", ar: "نقل خاص بالطائرة المروحية إلى لاليبيلا" },
      { en: "Private historians for guided walks", am: "ታዋቂ የታሪክ ምሁራን የግል አስጎብኚ", fr: "Historiens privés comme guides", ar: "مرافقة باحثين ومؤرخين محليين للشرح" },
      { en: "Luxury stay at Lalibela Lodge", am: "በቅንጦት ላሊበላ ሎጅ ማረፍ", fr: "Séjour de luxe au Lalibela Lodge", ar: "إقامة فاخرة في نزل لاليبيلا" }
    ],
    image: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "adventure-depression",
    name: {
      en: "Danakil & Volcano Expedition",
      am: "የዳናኪል እና የኤርታ አሌ ጉዞ",
      fr: "Expédition Danakil & Volcan",
      ar: "بعثة منخفض الدناكل والبركان",
    },
    duration: {
      en: "5 Days / 4 Nights",
      am: "5 ቀን / 4 ምሽት",
      fr: "5 Jours / 4 Nuits",
      ar: "٥ أيام / ٤ ليالٍ",
    },
    description: {
      en: "High-end secure adventure to the sulfuric geysers of Dallol and camping under the red fire of Erta Ale volcanic crater.",
      am: "ደህንነቱ የተጠበቀ እና አስደሳች ጉዞ ወደ ዳሎል የሰልፈር ምንጮች እና በኤርታ አሌ ቀልጣፋ እሳተ ገሞራ ዳርቻ ካምፕ ማድረግ።",
      fr: "Une aventure sécurisée haut de gamme vers Dallol et camping sous les lueurs rouges du volcan Erta Ale.",
      ar: "مغامرة آمنة ومجهزة بالكامل إلى ينابيع دالول الكبريتية والتخييم تحت أضواء فوهة بركان إرتا ألي الثائر.",
    },
    priceUsd: 2200,
    highlights: [
      { en: "4x4 Luxury Land Cruisers with escorts", am: "የቅንጦት 4x4 ላንድክሩዘር መኪናዎች", fr: "Land Cruisers 4x4 de luxe escortés", ar: "سيارات دفع رباعي لاندكروزر فاخرة ومرافقة مخصصة" },
      { en: "Glamping under the desert stars", am: "በበረሃው ስር ልዩ ካምፕ ማድረግ", fr: "Glamping sous les étoiles du désert", ar: "تخييم فاخر (جلامبينج) تحت نجوم الصحراء" },
      { en: "Thermal hot spring therapy sessions", am: "የሙቅ ውሃ ፍል ውሃ ሕክምና", fr: "Séance de thérapie aux sources thermales", ar: "جلسات علاجية بمياه الينابيع الحارة" }
    ],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "cultural-coffee",
    name: {
      en: "The Coffee & Cultural Immersion",
      am: "የቡና ምርት እና የባህል ጉብኝት",
      fr: "Immersion Café & Culture",
      ar: "رحلة القهوة والاندماج الثقافي الأصيل",
    },
    duration: {
      en: "6 Days / 5 Nights",
      am: "6 ቀን / 5 ምሽት",
      fr: "6 Jours / 5 Nuits",
      ar: "٦ أيام / ٥ ليالٍ",
    },
    description: {
      en: "Travel deep into Kaffa, the birthplace of Arabica coffee, and participate in local organic harvesting and traditional royalty banquets.",
      am: "የአረቢካ ቡና መገኛ ወደሆነችው ከፋ በመጓዝ በቡና አሰባሰብ እና በንጉሳዊ የባህል መስተንግዶ ላይ መሳተፍ።",
      fr: "Voyagez à Kaffa, berceau du café Arabica, participez à la récolte bio et à des banquets traditionnels.",
      ar: "سافر إلى أعماق منطقة كافا، الموطن الأصلي لقهوة أرابيكا، وشارك في الحصاد العضوي وحفلات العشاء الملكية.",
    },
    priceUsd: 1450,
    highlights: [
      { en: "Coffee Tasting with Champion Baristas", am: "የቡና ቅምሻ ከታዋቂ ባለሙያዎች ጋር", fr: "Dégustation avec des baristas champions", ar: "تذوق قهوة فاخرة مع أمهر خبراء القهوة الباريتسا" },
      { en: "Tribal custom welcoming ceremonies", am: "የባህላዊ ጎሳዎች ልዩ አቀባበል", fr: "Cérémonies d'accueil tribales", ar: "مراسم استقبال وقبائل ترحيبية تقليدية" },
      { en: "Stay at Luxury Forest Eco-Resorts", am: "በጫካ ውስጥ ባሉ የቅንጦት ሪዞርቶች ማረፍ", fr: "Séjour en éco-resort de luxe en forêt", ar: "إقامة في منتجعات بيئية فاخرة وسط الغابات" }
    ],
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=800&auto=format&fit=crop"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Catherine Dupont",
    country: "France",
    flag: "🇫🇷",
    rating: 5,
    story: {
      en: "Our stay in the Traditional Habesha Suite was magical. The hand-woven linen, the scent of burning frankincense in the lobby, and the view of Lalibela were beyond spectacular.",
      am: "በባህላዊ የሀበሻ ንጉሳዊ ስብስብ ውስጥ ያደረግነው ቆይታ ድንቅ ነበር። በእጅ የተሰራው ጨርቅ፣ በሎቢው ውስጥ ያለው የዕጣን መዓዛ እና የላሊበላ እይታ በጣም ልዩ ነበር።",
      fr: "Notre séjour dans la suite traditionnelle Habesha était magique. Les lins faits main, le parfum de l'encens dans le hall et la vue sur Lalibela étaient incomparables.",
      ar: "كانت إقامتنا في الجناح الحبشي التقليدي ساحرة. المفروشات المنسوجة يدوياً، ورائحة البخور المتصاعدة في اللوبي، وإطلالة لاليبيلا كانت تفوق الخيال.",
    },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test-2",
    name: "Marcus Sterling",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    story: {
      en: "Ethiopia is a treasure of origins. The northern circuit arranged by the hotel VIP team was perfectly seamless. The AI Travel assistant helped us with local dining tips!",
      am: "ኢትዮጵያ የሰው ዘር መገኛ ድንቅ ሀገር ናት። በሆቴሉ ቪአይፒ ቡድን የተዘጋጀው የሰሜኑ ጉዞ እጅግ ምቹ ነበር። የማሰብ ችሎታ ያለው ረዳትም የአካባቢውን ምግብ ለመምረጥ ረድቶናል።",
      fr: "L'Éthiopie est un trésor d'origines. Le circuit nord organisé par l'équipe VIP était impeccable. L'assistant IA nous a beaucoup aidés pour trouver les meilleurs restaurants !",
      ar: "إثيوبيا كنز حقيقي وأرض البدايات. كانت جولة الشمال التي نظمها فريق كبار الشخصيات بالفندق مثالية وسلسة. كما ساعدنا المساعد الذكي كثيراً في معرفة نصائح الطعام المحلية!",
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test-3",
    name: "Amina Al-Mansoor",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    rating: 5,
    story: {
      en: "Five-star international standards wrapped in majestic cultural pride. The Doro Wat at the fine dining restaurant is exquisite, and the sunrise overlooking the rift valley was unforgettable.",
      am: "ባለ አምስት ኮከብ ዓለም አቀፍ ደረጃዎች በታላቅ ባህላዊ ኩራት የታጀበበት ስፍራ። በሬስቶራንቱ ውስጥ ያለው የዶሮ ወጥ በጣም ጣፋጭ ነበር፣ እና የስምጥ ሸለቆው ማለዳ እይታ ፈጽሞ የማይረሳ ነው።",
      fr: "Des normes internationales cinq étoiles enveloppées d'une fierté culturelle majestueuse. Le Doro Wat du restaurant est exquis, et le lever de soleil sur le Rift inoubliable.",
      ar: "معايير عالمية ذات خمس نجوم مغلفة بفخر ثقافي مهيب. طبق دورو وات في المطعم الفاخر رائع للغاية، وشروق الشمس المطل على الوادي المتصدع لا يُنسى.",
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  }
];
