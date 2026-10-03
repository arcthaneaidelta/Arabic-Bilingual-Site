export interface EventItem {
  id: string;
  titleAr: string;
  titleEn: string;
  cityAr: string;
  cityEn: string;
  venueAr: string;
  venueEn: string;
  day: string;
  monthAr: string;
  monthEn: string;
  year: string;
  descriptionAr: string;
  descriptionEn: string;
  attendeesCount: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'ev-1',
    titleAr: 'منتدى الامتياز التجاري الخليجي السنوي',
    titleEn: 'Annual Gulf Franchise Forum',
    cityAr: 'الرياض',
    cityEn: 'Riyadh',
    venueAr: 'مركز الملك عبدالله المالي (KAFD)',
    venueEn: 'King Abdullah Financial District (KAFD)',
    day: '18',
    monthAr: 'نوفمبر',
    monthEn: 'NOV',
    year: '2026',
    descriptionAr: 'الملتقى الأبرز لمانحي حقوق الامتياز وصناديق الاستثمار الجريء ورواد الأعمال في الشرق الأوسط.',
    descriptionEn: 'The flagship assembly for franchisors, sovereign funds, and master operators shaping regional expansion.',
    attendeesCount: '1,500+',
  },
  {
    id: 'ev-2',
    titleAr: 'قمة توسع العلامات والضيافة',
    titleEn: 'Brand Expansion & Hospitality Summit',
    cityAr: 'دبي',
    cityEn: 'Dubai',
    venueAr: 'مركز دبي التجاري العالمي',
    venueEn: 'Dubai World Trade Centre',
    day: '04',
    monthAr: 'ديسمبر',
    monthEn: 'DEC',
    year: '2026',
    descriptionAr: 'بحث استراتيجيات عقود الوكالات الرئيسية وسلاسل الإمداد لقطاع الأغذية والمشروبات الفاخرة.',
    descriptionEn: 'Examining master franchise frameworks, supply chain sovereignty, and luxury F&B licensing models.',
    attendeesCount: '800+',
  },
  {
    id: 'ev-3',
    titleAr: 'معرض التجزئة والامتياز الدولي',
    titleEn: 'Retail & Franchise International Expo',
    cityAr: 'الدوحة',
    cityEn: 'Doha',
    venueAr: 'مركز الدوحة للمعارض والمؤتمرات',
    venueEn: 'Doha Exhibition and Convention Center',
    day: '22',
    monthAr: 'يناير',
    monthEn: 'JAN',
    year: '2027',
    descriptionAr: 'معرض متخصص يجمع أكثر من 200 علامة تجارية عالمية تبحث عن وكلاء محليين في منطقة الخليج.',
    descriptionEn: 'Trade expo featuring 200+ global brands seeking vetted master development partners in the GCC.',
    attendeesCount: '3,000+',
  },
  {
    id: 'ev-4',
    titleAr: 'طاولة حوار أنظمة وتشريعات الامتياز التجاري',
    titleEn: 'Franchise Regulations & Legal Roundtable',
    cityAr: 'المنامة',
    cityEn: 'Manama',
    venueAr: 'فندق فورسيزونز خليج البحرين',
    venueEn: 'Four Seasons Hotel Bahrain Bay',
    day: '15',
    monthAr: 'فبراير',
    monthEn: 'FEB',
    year: '2027',
    descriptionAr: 'جلسات نقاش مغلقة مع مستشارين قانونيين حول حماية العلامات وتحديثات وثائق الإفصاح.',
    descriptionEn: 'Closed-door legal exchange on cross-border IP protection and updated disclosure enforcement.',
    attendeesCount: '250',
  },
];
