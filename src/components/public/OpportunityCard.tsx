import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { OpportunityItem } from '../../data/opportunities';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

interface OpportunityCardProps {
  item: OpportunityItem;
  onEnquire?: (opp: OpportunityItem) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ item, onEnquire }) => {
  const { acfVisible, openEnquire } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';

  const brandName = lang === 'ar' ? item.brand_name.ar : item.brand_name.en;
  const industryName = lang === 'ar' ? item.industry.ar : item.industry.en;
  const countryName = lang === 'ar' ? item.country.ar : item.country.en;
  const desc = lang === 'ar' ? item.description.ar : item.description.en;
  const investment = lang === 'ar' ? item.investment_information.ar : item.investment_information.en;
  const markets = lang === 'ar' ? item.available_markets.ar : item.available_markets.en;

  // ACF Label Tag Helper
  const AcfBadge = ({ name }: { name: string }) => {
    if (!acfVisible) return null;
    return (
      <span className="font-mono text-[9px] text-[#B08A4A] bg-[#F2E9D6] px-1.5 py-0.2 rounded border border-[#B08A4A]/30 self-start">
        acf:{name}
      </span>
    );
  };

  return (
    <div
      className={`group relative flex flex-col bg-white border rounded-md transition-all text-start overflow-hidden ${
        acfVisible
          ? 'border-2 border-[#B08A4A] bg-[#FBF9F4]'
          : 'border-[#E4DFD3] hover:border-[#1F4D45] hover:shadow-md'
      }`}
    >
      {/* Cover Image Banner */}
      {item.coverImage ? (
        <div className="relative w-full h-36 overflow-hidden shrink-0">
          <img
            src={item.coverImage}
            alt={brandName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Bottom gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Floating logo monogram badge over image */}
          <div className="absolute bottom-3 start-4 w-11 h-11 rounded-sm bg-white/90 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center font-headline font-bold text-xl text-[#1F4D45] select-none">
            {item.logo_monogram}
          </div>
          {/* Industry pill top-right */}
          <span className="absolute top-3 end-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-xs">
            {industryName}
          </span>
        </div>
      ) : null}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Top Header — only show monogram tile if no cover image */}
        {!item.coverImage && (
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-sm bg-[#E5EEEB] border border-[#1F4D45]/20 flex items-center justify-center font-headline font-bold text-2xl text-[#1F4D45] select-none">
                {item.logo_monogram}
              </div>
              <AcfBadge name="logo" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] font-semibold text-[#1F4D45] bg-[#E5EEEB] px-2.5 py-1 rounded-xs">
                {industryName}
              </span>
              <span className="text-[11px] text-[#76827E] font-medium">{countryName}</span>
              <AcfBadge name="industry / country" />
            </div>
          </div>
        )}

        {/* When cover is shown, display country below the image */}
        {item.coverImage && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-[#76827E] font-medium font-arabic">{countryName}</span>
            <AcfBadge name="industry / country" />
          </div>
        )}

        {/* Brand Title */}
        <div className="mb-2">
          <h3 className="font-headline font-semibold text-lg text-[#14201D] group-hover:text-[#1F4D45] transition-colors">
            {brandName}
          </h3>
          <AcfBadge name="brand_name" />
        </div>

        {/* Description */}
        <div className="mb-4 flex-1">
          <p className="text-xs text-[#42504C] line-clamp-2 leading-relaxed font-arabic">
            {desc}
          </p>
          <AcfBadge name="description" />
        </div>

        {/* Investment Information */}
        <div className="p-3 bg-[#FBF9F4] border border-[#E4DFD3] rounded-sm mb-4">
          <div className="text-[10px] uppercase font-mono text-[#76827E] mb-0.5">
            {lang === 'ar' ? 'نطاق الاستثمار التقديري' : 'Estimated Investment'}
          </div>
          <div className="font-headline font-bold text-sm text-[#1F4D45]">
            {investment}
          </div>
          <AcfBadge name="investment_information" />
        </div>

        {/* Available Markets Tags */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#76827E] font-arabic">
              {t.opportunitiesPage.availableMarkets}
            </span>
            <AcfBadge name="available_markets" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {markets.slice(0, 3).map((m, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 bg-[#FFFFFF] border border-[#E4DFD3] rounded-xs text-[#42504C]"
              >
                {m}
              </span>
            ))}
            {markets.length > 3 && (
              <span className="text-[11px] font-mono text-[#76827E] px-1.5 py-0.5">
                +{markets.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-[#E4DFD3] flex items-center justify-between gap-2 mt-auto">
          <button
            type="button"
            onClick={() => {
              if (onEnquire) onEnquire(item);
              else openEnquire(item);
            }}
            className="text-xs font-semibold px-3 py-1.5 bg-[#1F4D45] text-white hover:bg-[#183D37] rounded-sm transition-colors"
          >
            {t.opportunitiesPage.enquireCta}
          </button>

          <Link
            to={`/${lang}/opportunities/${item.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F4D45] hover:text-[#B08A4A] transition-colors"
          >
            <span>{lang === 'ar' ? 'التفاصيل' : 'Details'}</span>
            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
      </div>
    </div>
  );
};
