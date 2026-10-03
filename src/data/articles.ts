export interface FactItem {
  key: string;
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
  supported: boolean;
  conflict?: boolean;
}

export interface ArticleItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  bodyAr: string;
  bodyEn: string;
  geo: 'saudi' | 'gcc' | 'mena' | 'intl';
  topic: 'expansion' | 'agreements' | 'investments' | 'fnb' | 'retail' | 'services' | 'regulations' | 'events';
  sourceName: string;
  sourceUrl: string;
  publishedDaysAgo: number;
  readTimeMin: number;
  wordCount: number;
  isAiAssisted: boolean;
  hasWarning?: boolean;
  warningNoteAr?: string;
  warningNoteEn?: string;
  facts: FactItem[];
  sourceOriginalText?: string;
  monogram: string;
  categoryColor: string;
  coverImage?: string;
  lead?: boolean;
  isShortArticle?: boolean;
}

export function getRelativeDate(daysAgo: number): { ar: string; en: string; iso: string } {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  if (daysAgo === 0) {
    return {
      ar: 'اليوم، 11:20 ص',
      en: 'Today, 11:20 AM',
      iso: date.toISOString(),
    };
  }
  if (daysAgo === 1) {
    return {
      ar: 'أمس، 04:15 م',
      en: 'Yesterday, 4:15 PM',
      iso: date.toISOString(),
    };
  }
  return {
    ar: `منذ ${daysAgo} أيام`,
    en: `${daysAgo} days ago`,
    iso: date.toISOString(),
  };
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'hala-coffee-kuwait-master-franchise',
    lead: true,
    titleAr: '«هالة لتحميص القهوة» تبرم اتفاقية امتياز رئيسية للتوسع في الكويت',
    titleEn: 'Hala Coffee Roasters Inks Master Franchise Agreement for Kuwait Expansion',
    excerptAr: 'وقعت علامة هالة اتفاقية امتياز تجاري رئيسية مع مجموعة الضو للضيافة لافتتاح 25 فرعاً جديداً خلال 5 سنوات.',
    excerptEn: 'Specialty roaster Hala Coffee has signed a master franchise agreement with Al-Dhow Hospitality to launch 25 outlets across Kuwait over the next 5 years.',
    bodyAr: `أعلنت علامة «هالة لتحميص القهوة» المتخصصة في قطاع المقاهي المختصة بالمملكة العربية السعودية، عن إبرام اتفاقية امتياز تجاري رئيسية مع شركة «مجموعة الضو للضيافة» الكويتية، تقضي بنقل العلامة التجارية وتوسيع انتشارها في السوق الكويتي عبر خطة استراتيجية تمتد لخمس سنوات.

وبموجب بنود الاتفاقية، ستتولى مجموعة الضو للضيافة تطوير وإدارة سلسلة فروع العلامة، حيث يستهدف الطرفان افتتاح 25 موقعاً في محافظات الكويت المختلفة، مع التركيز على مراكز التسوق الكبرى والمجمعات التجارية الحيوية.

وتشمل المرحلة الأولى افتتاح أول ثلاثة مواقع في العاصمة الكويتية قبل نهاية الربع الأول من العام المقبل، في حين ستوفر «هالة» الدعم اللوجستي وتوريد حبوب البن المحمصة من مقرها الرئيسي بالرياض لضمان أعلى معايير الجودة المعتمدة.

وأوضح ممثل الامتياز لدى علامة هالة أن التوسع الخارجي يمثل مرحلة نوعية تعكس تنامي تنافسية العلامات السعودية في قطاع التجزئة والضيافة بدول مجلس التعاون الخليجي، مشيراً إلى أن الاتفاقية تمنح الشريك الكويتي حقوق الامتياز الحصري لتطوير وتشغيل علامة هالة للسنوات الخمس المقبلة.`,
    bodyEn: `Saudi-founded specialty brand Hala Coffee Roasters has formally signed a master franchise agreement with Kuwait-based Al-Dhow Hospitality Group, outlining a five-year strategic development plan to expand its brand presence across Kuwait.

Under the agreed terms, Al-Dhow Hospitality will develop and operate an initial footprint of 25 outlets, targeting premier shopping malls and commercial hubs across key Kuwaiti governorates.

Phase one includes the opening of three flagship stores in Kuwait City before the close of Q1 next year. Hala Coffee will provide central logistics, training infrastructure, and roasted bean supply directly from its Riyadh roasting facility to maintain stringent brand standards.

Brand leadership noted that international expansion into Kuwait represents a landmark validation of Saudi homegrown hospitality concepts scaling across the wider GCC region.`,
    geo: 'gcc',
    topic: 'agreements',
    sourceName: 'Gulf Franchise Review',
    sourceUrl: 'https://gulffranchisereview.example.com/articles/hala-coffee-kuwait-deal',
    publishedDaysAgo: 0,
    readTimeMin: 3,
    wordCount: 420,
    isAiAssisted: true,
    hasWarning: true,
    warningNoteAr: 'ملاحظة تحريرية — تباين في أرقام الاستثمار بين العنوان (40 مليون ريال) ومتن المصدر (4 ملايين ريال). لم يثبت النص الرقمين كحقيقة قطعية. يرجى التحقق من الشريك المانح قبل النشر النهائي.',
    warningNoteEn: 'Editorial Note — Conflicting investment figures between headline (SAR 40M) and article body (SAR 4M). Draft deliberately avoids asserting either. Verify with primary source before publishing.',
    sourceOriginalText: `RIYADH/KUWAIT CITY — Hala Coffee Roasters, a fast-growing Saudi specialty coffee brand, has officially concluded a landmark master franchise agreement with Al-Dhow Hospitality Group to introduce the brand to the Kuwaiti retail market.

The partnership targets the rollout of 25 specialty coffee shops across key Kuwaiti districts over the next 5 years, starting with three initial flagships in Kuwait City before the end of Q1 2027.

While the preliminary press header suggested an initial capital outlay of SAR 40 million, secondary disclosures in the financial memorandum cited a phased project investment cap of SAR 4 million for the pilot cluster of three venues.

Al-Dhow Hospitality Group will handle day-to-day operations and real estate acquisitions, while Hala Coffee Roasters maintains oversight of roast supply, barista training curricula, and brand experience guidelines.`,
    facts: [
      { key: 'brand', labelAr: 'العلامة التجارية', labelEn: 'Brand', valueAr: 'هالة لتحميص القهوة', valueEn: 'Hala Coffee Roasters', supported: true },
      { key: 'partner', labelAr: 'الشريك المشغل', labelEn: 'Franchise Partner', valueAr: 'مجموعة الضو للضيافة', valueEn: 'Al-Dhow Hospitality Group', supported: true },
      { key: 'market', labelAr: 'السوق المستهدف', labelEn: 'Target Market', valueAr: 'الكويت', valueEn: 'Kuwait', supported: true },
      { key: 'locations', labelAr: 'عدد الفروع المخططة', labelEn: 'Planned Outlets', valueAr: '25 فرعاً خلال 5 سنوات', valueEn: '25 outlets over 5 years', supported: true },
      { key: 'type', labelAr: 'نوع الاتفاقية', labelEn: 'Agreement Type', valueAr: 'امتياز رئيسي (Master Franchise)', valueEn: 'Master Franchise', supported: true },
      { key: 'investment', labelAr: 'قيمة الاستثمار', labelEn: 'Investment Value', valueAr: 'غير مؤكد — تباين بين 4 و 40 مليون ريال', valueEn: 'Unconfirmed — Conflict between SAR 4M & 40M', supported: false, conflict: true },
    ],
    monogram: 'H',
    categoryColor: '#2F6B74',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&fit=crop',
  },
  {
    id: 'art-2',
    slug: 'nakheel-fresh-market-expansion',
    titleAr: '«أسواق النخيل الطازجة» تمنح 14 وحدة امتياز فرعية بالمنطقة الغربية',
    titleEn: 'Nakheel Fresh Market Grants 14 Sub-Franchise Units in Western Province',
    excerptAr: 'تسريع وتيرة التوسع عبر نموذج التجزئة المجتمعية المصغرة في جدة ومكة المكرمة والمدينة المنورة.',
    excerptEn: 'Accelerating expansion through community grocery franchise formats across Jeddah, Makkah, and Madinah.',
    bodyAr: `أعلنت سلسلة أسواق النخيل الطازجة عن توقيع 14 عقد امتياز فرعي مع مستثمرين محليين لتغطية أحياء سكنية جديدة في المنطقة الغربية بالمملكة. يستهدف النموذج تقليص تكاليف التأسيس للممنوحين وتوفير سلاسل توريد مركزية للمنتجات الطازجة.`,
    bodyEn: `Nakheel Fresh Market has announced 14 sub-franchise agreements with regional investors to deploy neighborhood convenience grocery models across the Western Province of Saudi Arabia.`,
    geo: 'saudi',
    topic: 'retail',
    sourceName: 'Saudi Business Brief',
    sourceUrl: 'https://saudibrief.example.sa/rss/nakheel-fresh-deals',
    publishedDaysAgo: 1,
    readTimeMin: 2,
    wordCount: 280,
    isAiAssisted: true,
    facts: [
      { key: 'brand', labelAr: 'العلامة', labelEn: 'Brand', valueAr: 'أسواق النخيل الطازجة', valueEn: 'Nakheel Fresh Market', supported: true },
      { key: 'market', labelAr: 'السوق', labelEn: 'Market', valueAr: 'المنطقة الغربية، السعودية', valueEn: 'Western Province, KSA', supported: true },
      { key: 'units', labelAr: 'الوحدات', labelEn: 'Units', valueAr: '14 وحدة فرعية', valueEn: '14 Sub-units', supported: true },
    ],
    monogram: 'N',
    categoryColor: '#1F4D45',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&fit=crop',
  },
  {
    id: 'art-3',
    slug: 'sahab-kitchen-cloud-expansion-uae-qatar',
    titleAr: '«سحاب كيتشن» توقع اتفاقية رخصة رئيسية للمطابخ السحابية في الإمارات وقطر',
    titleEn: 'Sahab Kitchen Signs Master Cloud Kitchen Franchise for UAE & Qatar',
    excerptAr: 'استثمار استراتيجي لتمكين أكثر من 30 علامة طعام افتراضية عبر مراكز طبخ مركزية.',
    excerptEn: 'Strategic deal enabling over 30 virtual food brands through shared cloud kitchen infrastructure.',
    bodyAr: `أبرمت شركة «سحاب كيتشن» المتخصصة في البنية التحتية للمطابخ السحابية اتفاقية امتياز رئيسية مع تحالف استثماري خليجي للتوسع في أسواق دبي والدوحة. تتيح الاتفاقية للممنوحين تشغيل مطابخ مجهزة بالكامل لخدمة تطبيقات التوصيل.`,
    bodyEn: `Sahab Kitchen, a leading regional cloud kitchen operator, has inked a master franchise arrangement with a GCC investment syndicate covering expansion across Dubai and Doha.`,
    geo: 'gcc',
    topic: 'fnb',
    sourceName: 'Emirates Commerce Journal',
    sourceUrl: 'https://ecj.example.ae/rss/sahab-kitchen-expansion',
    publishedDaysAgo: 1,
    readTimeMin: 3,
    wordCount: 310,
    isAiAssisted: true,
    facts: [
      { key: 'brand', labelAr: 'العلامة', labelEn: 'Brand', valueAr: 'سحاب كيتشن', valueEn: 'Sahab Kitchen', supported: true },
      { key: 'market', labelAr: 'الأسواق', labelEn: 'Markets', valueAr: 'الإمارات وقطر', valueEn: 'UAE & Qatar', supported: true },
    ],
    monogram: 'S',
    categoryColor: '#2F6B74',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop',
  },
  {
    id: 'art-4',
    slug: 'mizan-fitness-riyadh-launch',
    titleAr: '«ميزان فيتنس» تفتتح أول أنديتها بنموذج الامتياز في الرياض',
    titleEn: 'Mizan Fitness Launches Flagship Franchise Club in Riyadh',
    excerptAr: 'تقديم نموذج النوادي الصحية المدمجة ذات الكفاءة التشغيلية العالية مع باقة امتياز متكاملة.',
    excerptEn: 'Introducing compact high-efficiency boutique health clubs with turnkey franchise operational systems.',
    bodyAr: `دشنت علامة ميزان فيتنس أول مراكزها الرياضية بنموذج الامتياز التجاري في شمال الرياض، ضمن خطة لافتتاح 10 مراكز في المدن الرئيسية بالمملكة خلال 3 سنوات.`,
    bodyEn: `Mizan Fitness has opened its inaugural franchise fitness studio in North Riyadh, marking the beginning of a 10-club expansion trajectory over 36 months.`,
    geo: 'saudi',
    topic: 'services',
    sourceName: 'Saudi Business Brief',
    sourceUrl: 'https://saudibrief.example.sa/fitness-franchise-riyadh',
    publishedDaysAgo: 2,
    readTimeMin: 2,
    wordCount: 240,
    isAiAssisted: true,
    isShortArticle: true,
    facts: [
      { key: 'brand', labelAr: 'العلامة', labelEn: 'Brand', valueAr: 'ميزان فيتنس', valueEn: 'Mizan Fitness', supported: true },
      { key: 'market', labelAr: 'السوق', labelEn: 'Market', valueAr: 'الرياض، السعودية', valueEn: 'Riyadh, KSA', supported: true },
    ],
    monogram: 'M',
    categoryColor: '#1F4D45',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop',
  },
  {
    id: 'art-5',
    slug: 'dar-burger-oman-bahrain-rights',
    titleAr: '«دار برجر» تمنح حقوق الامتياز لأسواق سلطنة عُمان والبحرين',
    titleEn: 'Dar Burger Co. Awards Franchise Rights for Oman and Bahrain',
    excerptAr: 'شراكة إقليمية تستهدف تدشين 12 مطعماً لتقديم البرجر الفاخر بأسلوب الخدمة السريعة.',
    excerptEn: 'Regional partnership aiming to launch 12 fast-casual smash burger locations across Muscat and Manama.',
    bodyAr: `أعلنت علامة دار برجر عن اتفاقية امتياز دولية مع مجموعة الاستثمار الخليجية لمنح حقوق التطوير الحصرية في مسقط والمنامة، مع التركيز على مواقع القيادة السريعة ومراكز الأنشطة التجارية.`,
    bodyEn: `Dar Burger Co. has finalized an exclusive development agreement with Gulf Investment Group to open 12 fast-casual restaurants across Muscat and Manama.`,
    geo: 'gcc',
    topic: 'expansion',
    sourceName: 'Kuwait Brand Watch',
    sourceUrl: 'https://kuwaitbrands.example.com/dar-burger-deal',
    publishedDaysAgo: 2,
    readTimeMin: 3,
    wordCount: 350,
    isAiAssisted: true,
    facts: [
      { key: 'brand', labelAr: 'العلامة', labelEn: 'Brand', valueAr: 'دار برجر', valueEn: 'Dar Burger Co.', supported: true },
      { key: 'market', labelAr: 'الأسواق', labelEn: 'Markets', valueAr: 'عُمان والبحرين', valueEn: 'Oman & Bahrain', supported: true },
    ],
    monogram: 'D',
    categoryColor: '#2F6B74',
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&fit=crop',
  },
  {
    id: 'art-6',
    slug: 'franchise-regulations-update-monshaat',
    titleAr: 'تحديثات تنظيمية جديدة لتعزيز الشفافية في وثائق الإفصاح للامتياز التجاري',
    titleEn: 'Regulatory Updates Enhance Disclosure Document Transparency for GCC Franchisees',
    excerptAr: 'إرشادات تفصيلية للحد من النزاعات التعاقدية وضمان صحة البيانات الاستثمارية بين المانح والممنوح.',
    excerptEn: 'New guidelines aim to minimize contractual disputes and mandate verified financial representations.',
    bodyAr: `أصدرت الجهات المعنية بتنظيم قطاع المنشآت الصغيرة والمتوسطة دليلاً استرشادياً محدثاً يتضمن اشتراطات مشددة لبيانات الإفصاح المالي وحقوق الإنهاء المبكر في عقود الامتياز التجاري.`,
    bodyEn: `Regulatory authorities overseeing SME development have published an updated disclosure framework introducing stricter verification for earnings claims in commercial franchise contracts.`,
    geo: 'saudi',
    topic: 'regulations',
    sourceName: 'Saudi Business Brief',
    sourceUrl: 'https://saudibrief.example.sa/regulations-update-2026',
    publishedDaysAgo: 3,
    readTimeMin: 4,
    wordCount: 480,
    isAiAssisted: false,
    facts: [
      { key: 'topic', labelAr: 'الموضوع', labelEn: 'Topic', valueAr: 'وثائق الإفصاح المالي', valueEn: 'Disclosure Documents', supported: true },
    ],
    monogram: 'R',
    categoryColor: '#1F4D45',
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&fit=crop',
  },
  {
    id: 'art-7',
    slug: 'qalam-kids-learning-centers',
    titleAr: '«قلم للتعليم المبكر» تتوسع بنموذج الامتياز التعليمي في المنطقة الشرقية',
    titleEn: 'Qalam Kids Learning Centers Expand STEM Franchise in Eastern Province',
    excerptAr: 'افتتاح 6 مراكز متخصصة في تنمية المهارات الإبداعية والعلوم بالدمام والخبر والأحساء.',
    excerptEn: 'Opening 6 centers specialized in early childhood STEM and robotics in Dammam, Khobar, and Al-Ahsa.',
    bodyAr: `وقعت مراكز قلم للتعليم المبكر اتفاقيات امتياز لست وحدات تعليمية جديدة في المنطقة الشرقية، مدعومة بمنهج تدريبي معتمد وبرامج إشراف دورية للممنوحين لضمان المعايير الأكاديمية.`,
    bodyEn: `Qalam Early Learning Centers has completed agreements for 6 new educational franchise units across the Eastern Province of Saudi Arabia.`,
    geo: 'saudi',
    topic: 'services',
    sourceName: 'Retail Middle East Digest',
    sourceUrl: 'https://retailmedigest.example.com/qalam-franchise',
    publishedDaysAgo: 4,
    readTimeMin: 3,
    wordCount: 320,
    isAiAssisted: true,
    facts: [
      { key: 'brand', labelAr: 'العلامة', labelEn: 'Brand', valueAr: 'قلم للتعليم المبكر', valueEn: 'Qalam Kids Learning', supported: true },
    ],
    monogram: 'Q',
    categoryColor: '#1F4D45',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fit=crop',
  },
  {
    id: 'art-8',
    slug: 'global-retail-brand-enters-cairo-franchise',
    titleAr: 'مجموعة تجزئة عالمية تدخل السوق المصري عبر وكالة امتياز حصرية',
    titleEn: 'Global Retail Group Enters Egyptian Market via Exclusive Master Franchise',
    excerptAr: 'خطة تشغيلية تتضمن تدشين 18 متجراً للأزياء والمستلزمات العائلية في القاهرة والإسكندرية.',
    excerptEn: 'Operational roadmap encompasses 18 lifestyle retail stores across Cairo and Alexandria.',
    bodyAr: `أبرم تكتل تجزئة عالمي اتفاقية شراكة امتياز رئيسية مع مجموعة تجارية مصرية لافتتاح 18 متجراً للملابس والمنتجات المنزلية على مدى أربع سنوات.`,
    bodyEn: `An international retail powerhouse has partnered with an Egyptian conglomerate to roll out 18 family apparel and home lifestyle venues over four years.`,
    geo: 'mena',
    topic: 'retail',
    sourceName: 'Retail Middle East Digest',
    sourceUrl: 'https://retailmedigest.example.com/cairo-retail-deal',
    publishedDaysAgo: 5,
    readTimeMin: 3,
    wordCount: 390,
    isAiAssisted: true,
    facts: [
      { key: 'market', labelAr: 'السوق', labelEn: 'Market', valueAr: 'مصر', valueEn: 'Egypt', supported: true },
    ],
    monogram: 'G',
    categoryColor: '#7A6A3A',
    coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80&fit=crop',
  },
  {
    id: 'art-9',
    slug: 'us-fast-casual-brand-gcc-expansion',
    titleAr: 'سلسلة مطاعم أمريكية تبحث عن شركاء امتياز رئيسيين لأسواق الخليج',
    titleEn: 'North American Fast-Casual Chain Seeks Master Franchise Partners for GCC',
    excerptAr: 'جولة استثمارية للبحث عن مستثمرين مؤهلين لتطوير أكثر من 50 فرعاً في السعودية والإمارات.',
    excerptEn: 'Investment roadshow seeks qualified operators to develop over 50 fast-casual chicken units across KSA and UAE.',
    bodyAr: `أعلنت علامة أمريكية متخصصة في وجبات الدجاج المقرمش عن بدء استقبال طلبات التأهيل للمستثمرين الراغبين في نيل حقوق الامتياز الرئيسي لأسواق الخليج العربي، متوقعة إبرام الصفقات خلال الربع القادم.`,
    bodyEn: `A US-headquartered fast-casual chicken franchise has officially initiated partner screening for master territorial development across Saudi Arabia and the UAE.`,
    geo: 'intl',
    topic: 'expansion',
    sourceName: 'Global Franchise Insider',
    sourceUrl: 'https://globalfranchise.example.net/us-brand-gcc-search',
    publishedDaysAgo: 6,
    readTimeMin: 4,
    wordCount: 440,
    isAiAssisted: true,
    facts: [
      { key: 'scope', labelAr: 'النطاق', labelEn: 'Scope', valueAr: 'دول الخليج', valueEn: 'GCC Markets', supported: true },
    ],
    monogram: 'U',
    categoryColor: '#4F5B7A',
    coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80&fit=crop',
  },
  {
    id: 'art-10',
    slug: 'gulf-franchise-expo-announcement',
    titleAr: 'انطلاق فعاليات ملتقى الامتياز التجاري الخليجي بمشاركة 120 علامة تجارية',
    titleEn: 'Gulf Franchise Expo Kicks Off with 120 Exhibiting Brands in Riyadh',
    excerptAr: 'فرص تواصل واستثمار واعدة تجمع المانحين بالمستثمرين ورواد الأعمال من مختلف دول الخليج.',
    excerptEn: 'Premier networking platform bringing together regional franchisors, investors, and prospective franchisees.',
    bodyAr: `انطلقت اليوم في الرياض فعاليات ملتقى الامتياز التجاري الخليجي السنوي بمشاركة واسعة من قادة الصناعة وخبراء الامتياز، لمناقشة سبل تسهيل التوسع العابر للحدود وتمويل صفقات الامتياز الجديدة.`,
    bodyEn: `The annual Gulf Franchise Expo inaugurated today in Riyadh with over 120 participating brands showcasing investment packages to regional business operators.`,
    geo: 'saudi',
    topic: 'events',
    sourceName: 'Saudi Business Brief',
    sourceUrl: 'https://saudibrief.example.sa/gulf-expo-2026',
    publishedDaysAgo: 7,
    readTimeMin: 2,
    wordCount: 260,
    isAiAssisted: false,
    facts: [
      { key: 'event', labelAr: 'الحدث', labelEn: 'Event', valueAr: 'ملتقى الامتياز الخليجي', valueEn: 'Gulf Franchise Expo', supported: true },
    ],
    monogram: 'E',
    categoryColor: '#1F4D45',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&fit=crop',
  }
];
