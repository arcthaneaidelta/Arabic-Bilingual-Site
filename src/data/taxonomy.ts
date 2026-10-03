export interface Geography {
  id: string;
  nameAr: string;
  nameEn: string;
  count: number;
  color: string;
}

export interface Topic {
  id: string;
  nameAr: string;
  nameEn: string;
  count: number;
}

export const GEOGRAPHIES: Geography[] = [
  { id: 'all', nameAr: 'جميع المناطق', nameEn: 'All Markets', count: 48, color: '#1F4D45' },
  { id: 'saudi', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', count: 24, color: '#1F4D45' },
  { id: 'gcc', nameAr: 'دول مجلس التعاون', nameEn: 'GCC Countries', count: 14, color: '#2F6B74' },
  { id: 'mena', nameAr: 'الشرق الأوسط', nameEn: 'Middle East', count: 6, color: '#7A6A3A' },
  { id: 'intl', nameAr: 'دولي', nameEn: 'International', count: 4, color: '#4F5B7A' },
];

export const TOPICS: Topic[] = [
  { id: 'all', nameAr: 'جميع المواضيع', nameEn: 'All Topics', count: 48 },
  { id: 'expansion', nameAr: 'توسع العلامات', nameEn: 'Brand Expansion', count: 18 },
  { id: 'agreements', nameAr: 'اتفاقيات الوكالة', nameEn: 'Franchise Agreements', count: 12 },
  { id: 'investments', nameAr: 'استثمارات', nameEn: 'Investments', count: 8 },
  { id: 'fnb', nameAr: 'أغذية ومشروبات', nameEn: 'Food & Beverage', count: 15 },
  { id: 'retail', nameAr: 'تجزئة', nameEn: 'Retail', count: 7 },
  { id: 'services', nameAr: 'خدمات', nameEn: 'Services', count: 5 },
  { id: 'regulations', nameAr: 'أنظمة وتشريعات', nameEn: 'Regulations', count: 4 },
  { id: 'events', nameAr: 'فعاليات ومؤتمرات', nameEn: 'Events', count: 3 },
];

export interface AdZone {
  id: string;
  name: string;
  placement: string;
  dimensions: string;
  active: boolean;
}

export const AD_ZONES_CONFIG: AdZone[] = [
  { id: 'header', name: 'Header Leaderboard', placement: 'emtiaz_header_top', dimensions: '728×90 / 320×50', active: true },
  { id: 'home', name: 'Homepage Mid-Split', placement: 'emtiaz_home_mid', dimensions: '728×90 / 300×250', active: true },
  { id: 'sidebar', name: 'Article Sticky Rail', placement: 'emtiaz_article_sidebar', dimensions: '300×600 Half-Page', active: true },
  { id: 'in_article', name: 'In-Article Paragraph Break', placement: 'emtiaz_in_post_p3', dimensions: '300×250 / Fluid', active: true },
  { id: 'category', name: 'Category Feed Interstitial', placement: 'emtiaz_category_slot4', dimensions: '300×250 Grid Card', active: true },
];
