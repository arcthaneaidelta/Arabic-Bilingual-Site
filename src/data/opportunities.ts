export interface OpportunityItem {
  id: string;
  slug: string;
  // ACF fields representation
  brand_name: { ar: string; en: string };
  logo_monogram: string;
  country: { ar: string; en: string; code: string };
  industry: { ar: string; en: string; id: 'fnb' | 'retail' | 'services' };
  description: { ar: string; en: string };
  investment_range_tier: 'under_1m' | '1m_to_5m' | 'above_5m';
  investment_information: { ar: string; en: string };
  franchise_fee: { ar: string; en: string };
  royalty_fee: { ar: string; en: string };
  available_markets: { ar: string[]; en: string[] };
  units_planned: { ar: string; en: string };
  website: string;
  contact_link: string;
  established_year: number;
  current_units: number;
  coverImage?: string;
}

export const OPPORTUNITIES_DATA: OpportunityItem[] = [
  {
    id: 'opp-1',
    slug: 'hala-coffee-roasters',
    brand_name: { ar: 'هالة لتحميص القهوة', en: 'Hala Coffee Roasters' },
    logo_monogram: 'H',
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', code: 'sa' },
    industry: { ar: 'أغذية ومشروبات', en: 'Food & Beverage', id: 'fnb' },
    description: {
      ar: 'سلسلة مقاهٍ مختصة رائدة تقدم تجربة قهوة استثنائية مع تحميص محلي وتصميم عصري يواكب روح الضيافة الخليجية.',
      en: 'Leading specialty coffee chain delivering curated single-origin roasts in contemporary lifestyle spaces.'
    },
    investment_range_tier: '1m_to_5m',
    investment_information: { ar: '1.2 مليون – 2.5 مليون ريال', en: 'SAR 1.2M – 2.5M' },
    franchise_fee: { ar: '120,000 ريال', en: 'SAR 120,000' },
    royalty_fee: { ar: '6% من إجمالي المبيعات', en: '6% of gross sales' },
    available_markets: {
      ar: ['الكويت', 'الإمارات', 'قطر', 'سلطنة عُمان'],
      en: ['Kuwait', 'UAE', 'Qatar', 'Oman']
    },
    units_planned: { ar: '25 فرعاً خلال 5 سنوات', en: '25 outlets over 5 years' },
    website: 'https://halacoffee.example.sa',
    contact_link: '#enquire',
    established_year: 2019,
    current_units: 18,
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-2',
    slug: 'nakheel-fresh-market',
    brand_name: { ar: 'أسواق النخيل الطازجة', en: 'Nakheel Fresh Market' },
    logo_monogram: 'N',
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', code: 'sa' },
    industry: { ar: 'تجزئة', en: 'Retail', id: 'retail' },
    description: {
      ar: 'سلسلة متاجر تجزئة مجتمعية للأغذية الطازجة والمستلزمات اليومية بنظام سلاسل توريد لوجستية مبرمجة.',
      en: 'Neighborhood fresh grocery and market convenience network with automated inventory logistics.'
    },
    investment_range_tier: 'under_1m',
    investment_information: { ar: '650,000 – 950,000 ريال', en: 'SAR 650K – 950K' },
    franchise_fee: { ar: '80,000 ريال', en: 'SAR 80,000' },
    royalty_fee: { ar: '4.5% شهرياً', en: '4.5% monthly' },
    available_markets: {
      ar: ['الرياض', 'جدة', 'الدمام', 'المدينة المنورة'],
      en: ['Riyadh', 'Jeddah', 'Dammam', 'Madinah']
    },
    units_planned: { ar: '40 متجراً مجتمعياً', en: '40 neighborhood units' },
    website: 'https://nakheelfresh.example.sa',
    contact_link: '#enquire',
    established_year: 2021,
    current_units: 24,
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-3',
    slug: 'sahab-kitchen',
    brand_name: { ar: 'سحاب كيتشن', en: 'Sahab Kitchen' },
    logo_monogram: 'S',
    country: { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates', code: 'ae' },
    industry: { ar: 'أغذية ومشروبات', en: 'Food & Beverage', id: 'fnb' },
    description: {
      ar: 'بنية تحتية متطورة لتشغيل المطابخ السحابية والعلامات الافتراضية مع تقنيات توزيع ذكية لطلبات التوصيل.',
      en: 'Cloud kitchen operational franchise platform managing virtual brands with delivery tech.'
    },
    investment_range_tier: 'above_5m',
    investment_information: { ar: '5.5 مليون – 8 ملايين ريال', en: 'SAR 5.5M – 8M' },
    franchise_fee: { ar: '350,000 ريال (رخصة رئيسية)', en: 'SAR 350,000 (Master License)' },
    royalty_fee: { ar: '5% مع دعم تسويقي مركزي', en: '5% plus centralized marketing' },
    available_markets: {
      ar: ['السعودية', 'البحرين', 'قطر'],
      en: ['Saudi Arabia', 'Bahrain', 'Qatar']
    },
    units_planned: { ar: '12 مجمع مطابخ سحابية', en: '12 cloud kitchen hubs' },
    website: 'https://sahabkitchen.example.ae',
    contact_link: '#enquire',
    established_year: 2020,
    current_units: 9,
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-4',
    slug: 'mizan-fitness',
    brand_name: { ar: 'ميزان فيتنس', en: 'Mizan Fitness' },
    logo_monogram: 'M',
    country: { ar: 'قطر', en: 'Qatar', code: 'qa' },
    industry: { ar: 'خدمات', en: 'Services', id: 'services' },
    description: {
      ar: 'نوادٍ رياضية متطورة بتكنولوجيا إنترنت الأشياء والتدريب الموجه، مصممة لكفاءة استغلال المساحات الحضرية.',
      en: 'Smart boutique fitness clubs utilizing IoT equipment and targeted functional fitness modules.'
    },
    investment_range_tier: '1m_to_5m',
    investment_information: { ar: '2.8 مليون – 4.2 مليون ريال', en: 'SAR 2.8M – 4.2M' },
    franchise_fee: { ar: '150,000 ريال', en: 'SAR 150,000' },
    royalty_fee: { ar: '7% شاملة أنظمة البرمجيات', en: '7% including software systems' },
    available_markets: {
      ar: ['السعودية', 'الإمارات', 'الكويت'],
      en: ['Saudi Arabia', 'UAE', 'Kuwait']
    },
    units_planned: { ar: '15 مركزاً إقليمياً', en: '15 regional clubs' },
    website: 'https://mizanfitness.example.qa',
    contact_link: '#enquire',
    established_year: 2022,
    current_units: 7,
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-5',
    slug: 'qalam-kids-learning',
    brand_name: { ar: 'قلم للتعليم المبكر', en: 'Qalam Kids Learning' },
    logo_monogram: 'Q',
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', code: 'sa' },
    industry: { ar: 'خدمات', en: 'Services', id: 'services' },
    description: {
      ar: 'مراكز تعليمية مسائية متخصصة في العلوم والتكنولوجيا والبرمجة للأطفال وفق مناهج تفاعلية حديثة.',
      en: 'Bilingual early learning STEM and robotics centers fostering analytical youth development.'
    },
    investment_range_tier: 'under_1m',
    investment_information: { ar: '450,000 – 780,000 ريال', en: 'SAR 450K – 780K' },
    franchise_fee: { ar: '60,000 ريال', en: 'SAR 60,000' },
    royalty_fee: { ar: '5% شهرياً', en: '5% monthly' },
    available_markets: {
      ar: ['كافة مناطق المملكة', 'الكويت', 'البحرين'],
      en: ['All KSA Regions', 'Kuwait', 'Bahrain']
    },
    units_planned: { ar: '20 مركزاً تعليمياً', en: '20 learning hubs' },
    website: 'https://qalamkids.example.sa',
    contact_link: '#enquire',
    established_year: 2020,
    current_units: 14,
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-6',
    slug: 'dar-burger-co',
    brand_name: { ar: 'دار برجر', en: 'Dar Burger Co.' },
    logo_monogram: 'D',
    country: { ar: 'الكويت', en: 'Kuwait', code: 'kw' },
    industry: { ar: 'أغذية ومشروبات', en: 'Food & Beverage', id: 'fnb' },
    description: {
      ar: 'مفهوم برجر مبتكر يعتمد على لحوم واغيو الفاخرة المهروسة مع تقديم سريع وأطباق جانبية متجددة.',
      en: 'Fast-casual artisan smash burger concept with high throughput operations and premium ingredients.'
    },
    investment_range_tier: '1m_to_5m',
    investment_information: { ar: '1.5 مليون – 3 ملايين ريال', en: 'SAR 1.5M – 3M' },
    franchise_fee: { ar: '130,000 ريال', en: 'SAR 130,000' },
    royalty_fee: { ar: '6% من الإيرادات', en: '6% of revenue' },
    available_markets: {
      ar: ['السعودية', 'الإمارات', 'عُمان'],
      en: ['Saudi Arabia', 'UAE', 'Oman']
    },
    units_planned: { ar: '18 مطعماً جديداً', en: '18 new locations' },
    website: 'https://darburger.example.com',
    contact_link: '#enquire',
    established_year: 2018,
    current_units: 11,
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-7',
    slug: 'wasl-express-laundry',
    brand_name: { ar: 'وصل إكسبريس للمغاسل', en: 'Wasl Express Laundry' },
    logo_monogram: 'W',
    country: { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates', code: 'ae' },
    industry: { ar: 'خدمات', en: 'Services', id: 'services' },
    description: {
      ar: 'محطات غسيل وعناية بالملابس ذاتية ومؤتمتة تقدم خدمة فورية بتقنيات بخار صديقة للبيئة.',
      en: 'Eco-conscious automated laundry stations operating 24/7 with mobile app tracking.'
    },
    investment_range_tier: 'under_1m',
    investment_information: { ar: '500,000 – 850,000 ريال', en: 'SAR 500K – 850K' },
    franchise_fee: { ar: '70,000 ريال', en: 'SAR 70,000' },
    royalty_fee: { ar: '4% دورية', en: '4% periodic' },
    available_markets: {
      ar: ['السعودية', 'قطر', 'سلطنة عُمان'],
      en: ['Saudi Arabia', 'Qatar', 'Oman']
    },
    units_planned: { ar: '30 محطة خدمة', en: '30 express pods' },
    website: 'https://wasllaundry.example.ae',
    contact_link: '#enquire',
    established_year: 2021,
    current_units: 16,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
  },
  {
    id: 'opp-8',
    slug: 'rawabi-pharmacy-plus',
    brand_name: { ar: 'صيدليات روابي بلس', en: 'Rawabi Pharmacy Plus' },
    logo_monogram: 'R',
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', code: 'sa' },
    industry: { ar: 'تجزئة', en: 'Retail', id: 'retail' },
    description: {
      ar: 'سلسلة صيدليات ومراكز عناية صحية تجمع بين الأدوية، مستحضرات التجميل، والخدمات الاستشارية الرقمية.',
      en: 'Community wellness pharmacy and skincare network with integrated digital consultation.'
    },
    investment_range_tier: 'above_5m',
    investment_information: { ar: '5.2 مليون – 7.5 مليون ريال', en: 'SAR 5.2M – 7.5M' },
    franchise_fee: { ar: '250,000 ريال', en: 'SAR 250,000' },
    royalty_fee: { ar: '5% شهرية', en: '5% monthly' },
    available_markets: {
      ar: ['الخليج عموماً', 'الأردن', 'مصر'],
      en: ['GCC Wide', 'Jordan', 'Egypt']
    },
    units_planned: { ar: '25 صيدلية مجهزة', en: '25 integrated pharmacies' },
    website: 'https://rawabipharmacy.example.sa',
    contact_link: '#enquire',
    established_year: 2017,
    current_units: 32,
    coverImage: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80&fit=crop',
  },
];
