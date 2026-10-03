import React, { useState, useMemo } from 'react';
import { OPPORTUNITIES_DATA, OpportunityItem } from '../../data/opportunities';
import { OpportunityCard } from '../../components/public/OpportunityCard';
import { Button } from '../../components/ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';
import { Search, Filter, Sliders, Database, AlertCircle } from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { acfVisible, toggleAcf } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES_DATA.filter((item) => {
      const matchSearch =
        !searchQuery.trim() ||
        item.brand_name.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand_name.en.toLowerCase().includes(searchQuery.toLowerCase());

      const matchIndustry =
        selectedIndustry === 'all' || item.industry.id === selectedIndustry;

      const matchCountry =
        selectedCountry === 'all' || item.country.code === selectedCountry;

      const matchTier =
        selectedTier === 'all' || item.investment_range_tier === selectedTier;

      return matchSearch && matchIndustry && matchCountry && matchTier;
    });
  }, [searchQuery, selectedIndustry, selectedCountry, selectedTier]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('all');
    setSelectedCountry('all');
    setSelectedTier('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedIndustry !== 'all' ||
    selectedCountry !== 'all' ||
    selectedTier !== 'all';

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12 text-start">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E4DFD3]">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4D45] font-mono">
              CPT · wp_opportunities
            </span>
          </div>
          <h1 className="font-headline font-semibold text-3xl sm:text-4xl text-[#14201D] mb-1">
            {t.opportunitiesPage.title}
          </h1>
          <p className="text-sm text-[#42504C] font-arabic max-w-2xl">
            {t.opportunitiesPage.subtitle}
          </p>
        </div>

        {/* ACF Fields Toggle Button (Proof of Clean Architecture) */}
        <button
          onClick={toggleAcf}
          className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-xs font-mono transition-all self-start md:self-auto ${
            acfVisible
              ? 'bg-[#B08A4A] text-white border-[#B08A4A] shadow-xs'
              : 'bg-white text-[#76827E] border-[#CFC8B8] hover:border-[#1F4D45] hover:text-[#14201D]'
          }`}
        >
          <Database size={15} />
          <span>{t.opportunitiesPage.showAcf}</span>
          <span
            className={`w-2 h-2 rounded-full ${
              acfVisible ? 'bg-white' : 'bg-[#CFC8B8]'
            }`}
          />
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#E4DFD3] rounded-md p-4 sm:p-5 mb-8 shadow-xs flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Brand Search Input */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#76827E] absolute start-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.opportunitiesPage.searchPlaceholder}
              className="w-full ps-9 pe-3 py-2 text-xs bg-[#FBF9F4] border border-[#CFC8B8] rounded focus:outline-none focus:border-[#1F4D45]"
            />
          </div>

          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#CFC8B8] rounded focus:outline-none focus:border-[#1F4D45] cursor-pointer"
          >
            <option value="all">
              {lang === 'ar' ? 'جميع القطاعات' : 'All Industries'}
            </option>
            <option value="fnb">
              {lang === 'ar' ? 'أغذية ومشروبات (F&B)' : 'Food & Beverage'}
            </option>
            <option value="retail">
              {lang === 'ar' ? 'تجزئة (Retail)' : 'Retail'}
            </option>
            <option value="services">
              {lang === 'ar' ? 'خدمات (Services)' : 'Services'}
            </option>
          </select>

          {/* Country of Origin Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#CFC8B8] rounded focus:outline-none focus:border-[#1F4D45] cursor-pointer"
          >
            <option value="all">
              {lang === 'ar' ? 'كافة دول المنشأ' : 'All Origin Countries'}
            </option>
            <option value="sa">
              {lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
            </option>
            <option value="ae">
              {lang === 'ar' ? 'دولة الإمارات' : 'UAE'}
            </option>
            <option value="qa">
              {lang === 'ar' ? 'دولة قطر' : 'Qatar'}
            </option>
            <option value="kw">
              {lang === 'ar' ? 'دولة الكويت' : 'Kuwait'}
            </option>
          </select>

          {/* Investment Range Segment */}
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FBF9F4] border border-[#CFC8B8] rounded focus:outline-none focus:border-[#1F4D45] cursor-pointer"
          >
            <option value="all">
              {lang === 'ar' ? 'كافة نطاقات الاستثمار' : 'All Investment Tiers'}
            </option>
            <option value="under_1m">
              {lang === 'ar' ? 'أقل من مليون ريال (< SAR 1M)' : 'Under SAR 1M'}
            </option>
            <option value="1m_to_5m">
              {lang === 'ar' ? '1 – 5 ملايين ريال (SAR 1M–5M)' : 'SAR 1M – 5M'}
            </option>
            <option value="above_5m">
              {lang === 'ar' ? 'أكثر من 5 ملايين ريال (> SAR 5M)' : 'Above SAR 5M'}
            </option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE1] text-xs">
            <span className="text-[#76827E]">
              {filteredOpportunities.length} {lang === 'ar' ? 'فرصة مطابقة' : 'matching opportunities'}
            </span>
            <button
              onClick={clearAllFilters}
              className="text-[#B5473A] hover:underline"
            >
              {lang === 'ar' ? 'إعادة ضبط التصفية' : 'Reset filters'}
            </button>
          </div>
        )}
      </div>

      {/* Grid of Opportunities (3 cols desktop / 2 tablet / 1 mobile) */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-dashed border-[#CFC8B8] rounded-md p-8">
          <AlertCircle className="w-10 h-10 text-[#B08A4A] mx-auto mb-3" />
          <h3 className="font-headline font-semibold text-lg text-[#14201D] mb-1">
            {lang === 'ar' ? 'لم يتم العثور على فرص مطابقة' : 'No opportunities matched criteria'}
          </h3>
          <p className="text-xs text-[#76827E] mb-4 font-arabic">
            {lang === 'ar'
              ? 'يرجى تجربة تخفيف معايير التصفية أو مسح حقل البحث.'
              : 'Try adjusting your sector or investment filters.'}
          </p>
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            {lang === 'ar' ? 'مسح التصفية' : 'Clear Filters'}
          </Button>
        </div>
      )}
    </div>
  );
};
