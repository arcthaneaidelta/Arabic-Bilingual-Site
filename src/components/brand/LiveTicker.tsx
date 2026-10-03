import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../../i18n/useT';
import { ARTICLES_DATA } from '../../data/articles';

export const LiveTicker: React.FC = () => {
  const { t, lang } = useT();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const tickerArticles = ARTICLES_DATA.slice(0, 6);

  useEffect(() => {
    if (isPaused) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tickerArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, tickerArticles.length]);

  const currentArticle = tickerArticles[index];

  return (
    <div
      className="h-9 bg-[#0F1A18] text-[#EAE6DB] border-b border-[#1F4D45]/40 text-xs px-4 flex items-center justify-between z-30 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3 w-full max-w-[1240px] mx-auto overflow-hidden">
        {/* Live badge */}
        <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded bg-[#16241F] border border-[#B08A4A]/40 text-[#B08A4A] font-semibold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08A4A] pulse-brass" />
          <span>{t.ticker.live}</span>
        </div>

        {/* Hairline divider */}
        <div className="w-[1px] h-3.5 bg-[#1F4D45] shrink-0" />

        {/* Rotating Headline */}
        <div className="overflow-hidden flex-1 relative h-5 flex items-center">
          <Link
            key={currentArticle.id}
            to={`/${lang}/news/${currentArticle.slug}`}
            className="text-[#EAE6DB] hover:text-[#B08A4A] transition-colors truncate text-xs font-arabic block transition-opacity duration-300"
          >
            <span className="text-[#B08A4A] me-2 font-mono text-[10px]">
              [{currentArticle.sourceName}]
            </span>
            <span>{lang === 'ar' ? currentArticle.titleAr : currentArticle.titleEn}</span>
          </Link>
        </div>

        {/* Counter indicator */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#76827E] shrink-0">
          <span>{index + 1}</span>
          <span>/</span>
          <span>{tickerArticles.length}</span>
        </div>
      </div>
    </div>
  );
};
