import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { OPPORTUNITIES_DATA, OpportunityItem } from '../../data/opportunities';
import { Button } from '../../components/ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe2,
  Calendar,
  Layers,
  Database,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export const OpportunityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { acfVisible, toggleAcf, openEnquire } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';

  const item =
    OPPORTUNITIES_DATA.find((o) => o.slug === slug) || OPPORTUNITIES_DATA[0];

  const brandName = lang === 'ar' ? item.brand_name.ar : item.brand_name.en;
  const industryName = lang === 'ar' ? item.industry.ar : item.industry.en;
  const countryName = lang === 'ar' ? item.country.ar : item.country.en;
  const desc = lang === 'ar' ? item.description.ar : item.description.en;
  const investment =
    lang === 'ar' ? item.investment_information.ar : item.investment_information.en;
  const franchiseFee = lang === 'ar' ? item.franchise_fee.ar : item.franchise_fee.en;
  const royaltyFee = lang === 'ar' ? item.royalty_fee.ar : item.royalty_fee.en;
  const unitsPlanned = lang === 'ar' ? item.units_planned.ar : item.units_planned.en;
  const markets = lang === 'ar' ? item.available_markets.ar : item.available_markets.en;

  const AcfBadge = ({ name }: { name: string }) => {
    if (!acfVisible) return null;
    return (
      <span className="font-mono text-[10px] text-[#B08A4A] bg-[#F2E9D6] px-2 py-0.5 rounded border border-[#B08A4A]/30 ms-2 inline-block">
        acf:{name}
      </span>
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12 text-start">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#76827E] mb-6 font-arabic">
        <Link to={`/${lang}`} className="hover:text-[#1F4D45]">
          {lang === 'ar' ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <Link to={`/${lang}/opportunities`} className="hover:text-[#1F4D45]">
          {t.nav.opportunities}
        </Link>
        <span>/</span>
        <span className="text-[#1F4D45] font-medium">{brandName}</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#E4DFD3] rounded-md mb-8 overflow-hidden relative">
        {/* Cover image strip when available */}
        {item.coverImage && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={item.coverImage}
              alt={brandName}
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
          </div>
        )}
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-md bg-[#E5EEEB] border border-[#1F4D45]/20 flex items-center justify-center font-headline font-bold text-3xl text-[#1F4D45] select-none shrink-0 shadow-sm">
            {item.logo_monogram}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
                {brandName}
              </h1>
              <AcfBadge name="brand_name" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#76827E] mt-1 font-arabic">
              <span className="text-[#1F4D45] font-semibold">{industryName}</span>
              <span>·</span>
              <span>{countryName}</span>
              <span>·</span>
              <span>تأسست عام {item.established_year}</span>
              <span>·</span>
              <span>{item.current_units} فرعاً قائماً</span>
            </div>
          </div>
        </div>

        <button
          onClick={toggleAcf}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-mono transition-all self-start sm:self-auto relative ${
            acfVisible
              ? 'bg-[#B08A4A] text-white border-[#B08A4A]'
              : 'bg-white text-[#76827E] border-[#CFC8B8]'
          }`}
        >
          <Database size={14} />
          <span>{t.opportunitiesPage.showAcf}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Brand Profile & Expansion Scope */}
          <div className="p-6 bg-white border border-[#E4DFD3] rounded-md">
            <div className="flex items-center mb-3">
              <h3 className="font-headline font-semibold text-lg text-[#14201D]">
                {lang === 'ar' ? 'نبذة عن العلامة التجارية' : 'Brand Overview'}
              </h3>
              <AcfBadge name="description" />
            </div>
            <p className="text-sm text-[#42504C] leading-relaxed font-arabic mb-6">
              {desc}
            </p>

            <div className="pt-6 border-t border-[#E4DFD3]">
              <div className="flex items-center mb-3">
                <h4 className="font-headline font-semibold text-base text-[#14201D]">
                  {t.opportunitiesPage.availableMarkets}
                </h4>
                <AcfBadge name="available_markets" />
              </div>
              <div className="flex flex-wrap gap-2">
                {markets.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#FBF9F4] border border-[#E4DFD3] text-[#14201D] text-xs font-medium rounded-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Framework Table */}
          <div className="p-6 bg-white border border-[#E4DFD3] rounded-md">
            <div className="flex items-center mb-4">
              <h3 className="font-headline font-semibold text-lg text-[#14201D]">
                {lang === 'ar' ? 'المحددات المالية ونموذج الاستثمار' : 'Investment Framework'}
              </h3>
              <AcfBadge name="investment_information" />
            </div>

            <div className="divide-y divide-[#E4DFD3] text-sm">
              <div className="py-3 flex items-center justify-between">
                <span className="text-[#76827E] font-arabic">
                  {lang === 'ar' ? 'إجمالي الاستثمار التقديري للوحدة' : 'Estimated Unit Investment'}
                </span>
                <span className="font-headline font-bold text-[#1F4D45]">{investment}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-[#76827E] font-arabic">
                  {lang === 'ar' ? 'رسوم الامتياز الأولية (Franchise Fee)' : 'Initial Franchise Fee'}
                </span>
                <span className="font-semibold text-[#14201D]">{franchiseFee}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-[#76827E] font-arabic">
                  {lang === 'ar' ? 'رسوم الإتاوة المستمرة (Royalty Fee)' : 'Royalty Fee'}
                </span>
                <span className="font-semibold text-[#14201D]">{royaltyFee}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-[#76827E] font-arabic">
                  {lang === 'ar' ? 'عدد الفروع المخططة بالاتفاقية' : 'Target Unit Rollout'}
                </span>
                <span className="font-semibold text-[#14201D]">{unitsPlanned}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Enquire & Action Card (4 cols) */}
        <aside className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="p-6 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-col gap-4 text-start">
            <div className="pb-4 border-b border-[#E4DFD3]">
              <span className="text-xs font-mono uppercase text-[#76827E]">
                Direct Brand Contact
              </span>
              <h4 className="font-headline font-semibold text-lg text-[#14201D] mt-1">
                {lang === 'ar' ? 'طلب ملف الامتياز والتواصل' : 'Request Prospectus'}
              </h4>
            </div>

            <Button
              variant="primary"
              size="lg"
              block
              onClick={() => openEnquire(item)}
            >
              <span>{t.opportunitiesPage.enquireCta}</span>
            </Button>

            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#FBF9F4] text-[#1F4D45] hover:bg-[#E9E2D2] border border-[#CFC8B8] rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t.opportunitiesPage.website}</span>
              <ExternalLink size={14} />
            </a>

            <div className="pt-2 text-[11px] text-[#76827E] font-arabic leading-relaxed">
              * هذا العرض هو تمثيل لنوع المحتوى المخصص (CPT) وحقول (ACF) دون أي عمليات دفع إلكتروني أو متجر.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
