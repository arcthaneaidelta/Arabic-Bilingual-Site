import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { ARTICLES_DATA } from '../../data/articles';
import { OPPORTUNITIES_DATA } from '../../data/opportunities';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, closeSearch } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { articles: [], opportunities: [] };
    const q = query.toLowerCase();

    const articles = ARTICLES_DATA.filter(
      (a) =>
        a.titleAr.toLowerCase().includes(q) ||
        a.titleEn.toLowerCase().includes(q) ||
        a.sourceName.toLowerCase().includes(q) ||
        a.topic.toLowerCase().includes(q)
    ).slice(0, 4);

    const opportunities = OPPORTUNITIES_DATA.filter(
      (o) =>
        o.brand_name.ar.toLowerCase().includes(q) ||
        o.brand_name.en.toLowerCase().includes(q) ||
        o.industry.ar.toLowerCase().includes(q)
    ).slice(0, 3);

    return { articles, opportunities };
  }, [query]);

  if (!searchModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#14201D]/60 backdrop-blur-xs"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-md shadow-lg border border-[#E4DFD3] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E4DFD3] gap-3">
          <Search className="w-5 h-5 text-[#76827E] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'ابحث عن صفقات الامتياز، العلامات، التقارير...'
                : 'Search franchise deals, brands, reports...'
            }
            className="w-full text-base bg-transparent text-[#14201D] placeholder:text-[#76827E] focus:outline-none"
          />
          <button
            onClick={closeSearch}
            className="p-1 text-[#76827E] hover:text-[#14201D] rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto text-start">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-[#76827E]">
              {lang === 'ar'
                ? 'اكتب اسم علامة (مثل: هالة، النخيل) أو قطاعاً (أغذية، تجزئة)'
                : 'Type a brand name (e.g. Hala, Nakheel) or sector (F&B, Retail)'}
            </div>
          ) : searchResults.articles.length === 0 && searchResults.opportunities.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#76827E]">
              {lang === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching results found'}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Articles Group */}
              {searchResults.articles.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-[#76827E] uppercase mb-2">
                    {lang === 'ar' ? 'الأخبار والصفقات' : 'News & Deals'}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {searchResults.articles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          closeSearch();
                          navigate(`/${lang}/news/${art.slug}`);
                        }}
                        className="w-full text-start p-2.5 rounded hover:bg-[#FBF9F4] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1F4D45]" />
                          <span className="text-sm font-medium text-[#14201D] group-hover:text-[#1F4D45]">
                            {lang === 'ar' ? art.titleAr : art.titleEn}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#76827E]">
                          {art.sourceName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Opportunities Group */}
              {searchResults.opportunities.length > 0 && (
                <div className="pt-2 border-t border-[#E4DFD3]">
                  <div className="text-[11px] font-mono text-[#76827E] uppercase mb-2">
                    {lang === 'ar' ? 'فرص الامتياز' : 'Franchise Opportunities'}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {searchResults.opportunities.map((opp) => (
                      <button
                        key={opp.id}
                        onClick={() => {
                          closeSearch();
                          navigate(`/${lang}/opportunities/${opp.slug}`);
                        }}
                        className="w-full text-start p-2.5 rounded hover:bg-[#FBF9F4] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded bg-[#E5EEEB] text-[#1F4D45] flex items-center justify-center font-bold text-xs">
                            {opp.logo_monogram}
                          </div>
                          <span className="text-sm font-medium text-[#14201D] group-hover:text-[#1F4D45]">
                            {lang === 'ar' ? opp.brand_name.ar : opp.brand_name.en}
                          </span>
                        </div>
                        <span className="text-xs text-[#1F4D45] font-semibold">
                          {lang === 'ar' ? opp.investment_information.ar : opp.investment_information.en}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
