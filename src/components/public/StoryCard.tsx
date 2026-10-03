import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, AlertTriangle } from 'lucide-react';
import { ArticleItem, getRelativeDate } from '../../data/articles';
import { Badge } from '../ui/Badge';
import { useT, useLang } from '../../i18n/useT';

interface StoryCardProps {
  article: ArticleItem;
  variant?: 'lead' | 'compact' | 'row';
}

export const StoryCard: React.FC<StoryCardProps> = ({ article, variant = 'compact' }) => {
  const { lang } = useT();
  const dateInfo = getRelativeDate(article.publishedDaysAgo);

  const title = lang === 'ar' ? article.titleAr : article.titleEn;
  const excerpt = lang === 'ar' ? article.excerptAr : article.excerptEn;

  // CoverImage tile: real photo if available, styled monogram fallback otherwise
  const CoverTile = ({ className = 'h-full w-full' }: { className?: string }) => {
    if (article.coverImage) {
      return (
        <div className={`relative overflow-hidden ${className}`}>
          <img
            src={article.coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle tint overlay on hover for depth */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ backgroundColor: article.categoryColor || '#1F4D45' }}
          />
          {/* Category color bar */}
          <div
            className="absolute top-0 inset-x-0 h-1"
            style={{ backgroundColor: article.categoryColor || '#1F4D45' }}
          />
        </div>
      );
    }
    // Fallback: styled gradient + monogram
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center border border-[#E4DFD3] select-none ${className}`}
        style={{ background: `linear-gradient(135deg, ${article.categoryColor}22 0%, ${article.categoryColor}08 100%)` }}
      >
        <span
          className="font-headline font-bold text-3xl transition-transform group-hover:scale-105 duration-300"
          style={{ color: article.categoryColor || '#1F4D45' }}
        >
          {article.monogram}
        </span>
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ backgroundColor: article.categoryColor || '#1F4D45' }}
        />
      </div>
    );
  };

  // Variant: Lead Story (7 cols mosaic in Section 8.3)
  if (variant === 'lead') {
    return (
      <Link
        to={`/${lang}/news/${article.slug}`}
        className="group flex flex-col bg-white border border-[#E4DFD3] hover:border-[#CFC8B8] hover:shadow-md transition-all duration-200 rounded-md overflow-hidden text-start"
      >
        <div className="w-full aspect-[16/10] overflow-hidden">
          <CoverTile />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2.5">
            <Badge variant="category" categoryColor={article.categoryColor}>
              {article.topic.toUpperCase()}
            </Badge>
            {article.hasWarning && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#B7791F] font-medium bg-[#FAEFD9] px-2 py-0.5 rounded-xs">
                <AlertTriangle size={12} />
                <span>تحقق تحريري / Fact Check</span>
              </span>
            )}
          </div>

          <h2 className="font-headline font-semibold text-xl sm:text-2xl text-[#14201D] group-hover:text-[#1F4D45] transition-colors leading-snug mb-3">
            {title}
          </h2>

          <p className="text-sm text-[#42504C] line-clamp-2 leading-relaxed mb-4 font-arabic">
            {excerpt}
          </p>

          <div className="mt-auto pt-3 border-t border-[#E4DFD3] flex items-center justify-between text-xs text-[#76827E]">
            <span className="font-medium text-[#1F4D45]">{article.sourceName}</span>
            <div className="flex items-center gap-3">
              <span>{lang === 'ar' ? dateInfo.ar : dateInfo.en}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>{article.readTimeMin} د / min</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Variant: Row (Used in News Hub list)
  if (variant === 'row') {
    return (
      <Link
        to={`/${lang}/news/${article.slug}`}
        className="group flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-white border border-[#E4DFD3] hover:border-[#CFC8B8] hover:shadow-md rounded-md transition-all text-start"
      >
        <div className="w-full sm:w-48 aspect-[4/3] sm:aspect-square shrink-0 rounded overflow-hidden">
          <CoverTile />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="category" categoryColor={article.categoryColor}>
              {article.topic}
            </Badge>

            {article.isAiAssisted && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#1F4D45] bg-[#E5EEEB] px-2 py-0.5 rounded-xs font-mono">
                <Sparkles size={11} />
                <span>AI Drafted</span>
              </span>
            )}

            {article.hasWarning && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#B7791F] bg-[#FAEFD9] px-2 py-0.5 rounded-xs font-medium">
                <AlertTriangle size={11} />
                <span>⚠ Fact check needed</span>
              </span>
            )}
          </div>

          <h3 className="font-headline font-semibold text-lg text-[#14201D] group-hover:text-[#1F4D45] transition-colors leading-snug mb-2">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-[#42504C] line-clamp-2 leading-relaxed mb-3 font-arabic">
            {excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between text-xs text-[#76827E] pt-2 border-t border-[#F0ECE1]">
            <span className="font-medium text-[#1F4D45] truncate">{article.sourceName}</span>
            <div className="flex items-center gap-3 shrink-0">
              <span>{lang === 'ar' ? dateInfo.ar : dateInfo.en}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>{article.readTimeMin} د</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Variant: Compact (Mosaic stack)
  return (
    <Link
      to={`/${lang}/news/${article.slug}`}
      className="group flex gap-3.5 p-3.5 bg-white border border-[#E4DFD3] hover:border-[#CFC8B8] hover:shadow-xs rounded-md transition-all text-start"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-20 shrink-0 rounded overflow-hidden">
        <CoverTile />
      </div>

      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: article.categoryColor || '#1F4D45' }}
            />
            <span className="text-[11px] font-mono uppercase text-[#76827E]">
              {article.geo}
            </span>
          </div>
          <h4 className="font-headline font-semibold text-sm text-[#14201D] group-hover:text-[#1F4D45] transition-colors line-clamp-2 leading-snug">
            {title}
          </h4>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#76827E] mt-1 pt-1 border-t border-[#F0ECE1]">
          <span className="truncate max-w-[120px]">{article.sourceName}</span>
          <span>{lang === 'ar' ? dateInfo.ar : dateInfo.en}</span>
        </div>
      </div>
    </Link>
  );
};
