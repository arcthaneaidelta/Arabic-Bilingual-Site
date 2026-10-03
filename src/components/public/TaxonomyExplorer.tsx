import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GEOGRAPHIES, TOPICS } from '../../data/taxonomy';
import { ARTICLES_DATA, ArticleItem } from '../../data/articles';
import { StoryCard } from './StoryCard';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { useT, useLang } from '../../i18n/useT';
import { Filter, Layers, AlertCircle } from 'lucide-react';

export const TaxonomyExplorer: React.FC = () => {
  const { t } = useT();
  const lang = useLang();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeGeo = searchParams.get('geo') || 'all';
  const activeTopic = searchParams.get('topic') || 'all';

  const setFilter = (geo: string, topic: string) => {
    const params = new URLSearchParams(searchParams);
    if (geo !== 'all') params.set('geo', geo);
    else params.delete('geo');

    if (topic !== 'all') params.set('topic', topic);
    else params.delete('topic');

    setSearchParams(params, { replace: true });
  };

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((item) => {
      const matchGeo = activeGeo === 'all' || item.geo === activeGeo;
      const matchTopic = activeTopic === 'all' || item.topic === activeTopic;
      return matchGeo && matchTopic;
    }).slice(0, 6);
  }, [activeGeo, activeTopic]);

  return (
    <div className="bg-[#FFFFFF] border border-[#E4DFD3] rounded-md p-6 sm:p-8 shadow-sm">
      {/* Top Topic Filter Chips */}
      <div className="mb-6 pb-6 border-b border-[#E4DFD3]">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#76827E]">
          <Filter size={14} />
          <span>{lang === 'ar' ? 'تصفية حسب الموضوع والقطاع' : 'Filter by Industry Topic'}</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TOPICS.map((topic) => (
            <Chip
              key={topic.id}
              label={lang === 'ar' ? topic.nameAr : topic.nameEn}
              selected={activeTopic === topic.id}
              count={topic.id === 'all' ? 48 : topic.count}
              onClick={() => setFilter(activeGeo, topic.id)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (Vertical Geography Tabs) */}
        <div className="lg:col-span-3 flex flex-col gap-1 border-b lg:border-b-0 lg:border-e border-[#E4DFD3] pb-6 lg:pb-0 lg:pe-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#76827E]">
            <Layers size={14} />
            <span>{lang === 'ar' ? 'النطاق الجغرافي' : 'Market Geography'}</span>
          </div>

          {GEOGRAPHIES.map((geo) => {
            const isSelected = activeGeo === geo.id;
            return (
              <button
                key={geo.id}
                onClick={() => setFilter(geo.id, activeTopic)}
                className={`w-full flex items-center justify-between p-3 rounded-sm text-sm font-medium text-start transition-all ${
                  isSelected
                    ? 'bg-[#1F4D45] text-white shadow-xs'
                    : 'text-[#42504C] hover:bg-[#FBF9F4] hover:text-[#14201D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isSelected ? '#FFFFFF' : geo.color }}
                  />
                  <span>{lang === 'ar' ? geo.nameAr : geo.nameEn}</span>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#E5EEEB] text-[#1F4D45]'
                  }`}
                >
                  {geo.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Story Results */}
        <div className="lg:col-span-9">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-200">
              {filteredArticles.map((article) => (
                <StoryCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center bg-[#FBF9F4] rounded-md border border-dashed border-[#CFC8B8]">
              <AlertCircle className="w-10 h-10 text-[#B08A4A] mb-3" />
              <h4 className="font-headline font-semibold text-base text-[#14201D] mb-1">
                {t.newsHub.emptyTitle}
              </h4>
              <p className="text-xs text-[#76827E] max-w-sm mb-4 font-arabic">
                {t.newsHub.emptySub}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter('all', 'all')}
              >
                {t.newsHub.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
