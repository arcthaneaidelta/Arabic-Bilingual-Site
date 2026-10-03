import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GEOGRAPHIES, TOPICS } from '../../data/taxonomy';
import { ARTICLES_DATA, ArticleItem } from '../../data/articles';
import { StoryCard } from '../../components/public/StoryCard';
import { AdSlot } from '../../components/public/AdSlot';
import { Button } from '../../components/ui/Button';
import { useT, useLang } from '../../i18n/useT';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export const NewsHubPage: React.FC = () => {
  const { t } = useT();
  const lang = useLang();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [extraItemsCount, setExtraItemsCount] = useState(0);

  const activeGeo = searchParams.get('geo') || 'all';
  const activeTopic = searchParams.get('topic') || 'all';

  const updateFilters = (geo: string, topic: string) => {
    const params = new URLSearchParams(searchParams);
    if (geo !== 'all') params.set('geo', geo);
    else params.delete('geo');

    if (topic !== 'all') params.set('topic', topic);
    else params.delete('topic');

    setSearchParams(params);
  };

  const filteredArticles = useMemo(() => {
    let list = ARTICLES_DATA.filter((item) => {
      const matchGeo = activeGeo === 'all' || item.geo === activeGeo;
      const matchTopic = activeTopic === 'all' || item.topic === activeTopic;
      return matchGeo && matchTopic;
    });

    if (sortBy === 'popular') {
      list = [...list].reverse();
    }

    return list;
  }, [activeGeo, activeTopic, sortBy]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, 6 + extraItemsCount);
  }, [filteredArticles, extraItemsCount]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setExtraItemsCount((prev) => prev + 4);
      setLoadingMore(false);
    }, 600);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12 text-start">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E4DFD3]">
        <div>
          <h1 className="font-headline font-semibold text-3xl sm:text-4xl text-[#14201D] mb-1">
            {t.newsHub.title}
          </h1>
          <p className="text-sm text-[#42504C] font-arabic">
            {t.newsHub.subtitle} · ({filteredArticles.length} {lang === 'ar' ? 'خبر موثق' : 'reports'})
          </p>
        </div>

        {/* Sort & Mobile Filter Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#CFC8B8] rounded px-3 py-1.5 text-xs text-[#14201D]">
            <ArrowUpDown size={14} className="text-[#76827E]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="latest">{t.newsHub.sortLatest}</option>
              <option value="popular">{t.newsHub.sortPopular}</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#1F4D45] text-white text-xs font-semibold rounded"
          >
            <Filter size={14} />
            <span>{t.newsHub.filters}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Rail (Desktop, 3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6 bg-white p-5 rounded-md border border-[#E4DFD3]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD3]">
            <span className="font-headline font-semibold text-sm text-[#14201D] flex items-center gap-1.5">
              <SlidersHorizontal size={14} />
              <span>{t.newsHub.filters}</span>
            </span>
            {(activeGeo !== 'all' || activeTopic !== 'all') && (
              <button
                onClick={() => updateFilters('all', 'all')}
                className="text-xs text-[#B5473A] hover:underline"
              >
                {t.newsHub.clearFilters}
              </button>
            )}
          </div>

          {/* Geography Radio List */}
          <div>
            <h4 className="text-xs font-bold uppercase text-[#76827E] mb-2.5 font-mono">
              {lang === 'ar' ? 'المناطق الجغرافية' : 'Geographies'}
            </h4>
            <div className="space-y-1">
              {GEOGRAPHIES.map((geo) => (
                <label
                  key={geo.id}
                  className={`flex items-center justify-between p-2 rounded text-xs cursor-pointer transition-colors ${
                    activeGeo === geo.id
                      ? 'bg-[#E5EEEB] font-semibold text-[#1F4D45]'
                      : 'hover:bg-[#FBF9F4] text-[#42504C]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="geoFilter"
                      checked={activeGeo === geo.id}
                      onChange={() => updateFilters(geo.id, activeTopic)}
                      className="text-[#1F4D45] focus:ring-[#1F4D45]"
                    />
                    <span>{lang === 'ar' ? geo.nameAr : geo.nameEn}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#76827E]">
                    {geo.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Topic Checkbox List */}
          <div className="pt-4 border-t border-[#E4DFD3]">
            <h4 className="text-xs font-bold uppercase text-[#76827E] mb-2.5 font-mono">
              {lang === 'ar' ? 'المواضيع والقطاعات' : 'Topics & Sectors'}
            </h4>
            <div className="space-y-1">
              {TOPICS.map((topic) => (
                <label
                  key={topic.id}
                  className={`flex items-center justify-between p-2 rounded text-xs cursor-pointer transition-colors ${
                    activeTopic === topic.id
                      ? 'bg-[#E5EEEB] font-semibold text-[#1F4D45]'
                      : 'hover:bg-[#FBF9F4] text-[#42504C]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="topicFilter"
                      checked={activeTopic === topic.id}
                      onChange={() => updateFilters(activeGeo, topic.id)}
                      className="text-[#1F4D45] focus:ring-[#1F4D45]"
                    />
                    <span>{lang === 'ar' ? topic.nameAr : topic.nameEn}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#76827E]">
                    {topic.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Main Stream (6 or 9 cols) */}
        <main className="lg:col-span-6 flex flex-col gap-4">
          {displayedArticles.length > 0 ? (
            displayedArticles.map((article, idx) => (
              <React.Fragment key={article.id}>
                <StoryCard article={article} variant="row" />
                {/* Insert Category ad after 3rd result */}
                {idx === 2 && <AdSlot zoneId="category" />}
              </React.Fragment>
            ))
          ) : (
            <div className="py-16 text-center bg-white border border-dashed border-[#CFC8B8] rounded-md p-8">
              <h3 className="font-headline font-semibold text-lg text-[#14201D] mb-1">
                {t.newsHub.emptyTitle}
              </h3>
              <p className="text-xs text-[#76827E] mb-4 font-arabic">
                {t.newsHub.emptySub}
              </p>
              <Button size="sm" variant="outline" onClick={() => updateFilters('all', 'all')}>
                {t.newsHub.clearFilters}
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > displayedArticles.length && (
            <div className="pt-6 flex justify-center">
              <Button
                variant="secondary"
                size="md"
                loading={loadingMore}
                onClick={handleLoadMore}
              >
                {t.newsHub.loadMore}
              </Button>
            </div>
          )}
        </main>

        {/* Sidebar Sticky Ad Column (3 cols on desktop >= 1280px) */}
        <aside className="hidden xl:block lg:col-span-3 sticky top-24">
          <div className="bg-white p-4 rounded-md border border-[#E4DFD3] text-start">
            <div className="text-[10px] font-mono text-[#76827E] uppercase mb-2">
              Advanced Ads · Sidebar 300×600 Half-Page
            </div>
            <AdSlot zoneId="sidebar" className="my-0" />
          </div>
        </aside>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50">
          <div className="bg-white rounded-t-lg p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD3] mb-4">
              <span className="font-headline font-bold text-base text-[#14201D]">
                {t.newsHub.filters}
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#76827E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#76827E] mb-2 font-mono">
                  {lang === 'ar' ? 'المناطق الجغرافية' : 'Geographies'}
                </h4>
                <div className="space-y-1">
                  {GEOGRAPHIES.map((geo) => (
                    <button
                      key={geo.id}
                      onClick={() => updateFilters(geo.id, activeTopic)}
                      className={`w-full text-start p-2.5 rounded text-xs flex justify-between ${
                        activeGeo === geo.id ? 'bg-[#1F4D45] text-white' : 'bg-[#FBF9F4]'
                      }`}
                    >
                      <span>{lang === 'ar' ? geo.nameAr : geo.nameEn}</span>
                      <span>{geo.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-[#76827E] mb-2 font-mono">
                  {lang === 'ar' ? 'المواضيع' : 'Topics'}
                </h4>
                <div className="space-y-1">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => updateFilters(activeGeo, topic.id)}
                      className={`w-full text-start p-2.5 rounded text-xs flex justify-between ${
                        activeTopic === topic.id ? 'bg-[#1F4D45] text-white' : 'bg-[#FBF9F4]'
                      }`}
                    >
                      <span>{lang === 'ar' ? topic.nameAr : topic.nameEn}</span>
                      <span>{topic.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button block variant="primary" onClick={() => setMobileFilterOpen(false)}>
                {t.common.apply}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
