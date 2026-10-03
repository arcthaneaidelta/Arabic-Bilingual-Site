import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Share2,
  ExternalLink,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ARTICLES_DATA, ArticleItem, getRelativeDate } from '../../data/articles';
import { StoryCard } from '../../components/public/StoryCard';
import { NewsletterForm } from '../../components/public/NewsletterForm';
import { AdSlot } from '../../components/public/AdSlot';
import { Badge } from '../../components/ui/Badge';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const { openSeoDrawer, showToast } = useUiStore();

  const [scrollProgress, setScrollProgress] = useState(0);

  // Throttled scroll progress for reading progress bar
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = Math.max(0, Math.min(100, (window.scrollY / totalHeight) * 100));
          setScrollProgress(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];
  const dateInfo = getRelativeDate(article.publishedDaysAgo);

  const title = lang === 'ar' ? article.titleAr : article.titleEn;
  const excerpt = lang === 'ar' ? article.excerptAr : article.excerptEn;
  const body = lang === 'ar' ? article.bodyAr : article.bodyEn;

  const paragraphs = body.split('\n\n').filter((p) => p.trim().length > 0);
  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast(t.article.share, t.article.copiedLink, 'success');
  };

  return (
    <article className="min-h-screen bg-[#F7F4EE] pb-16 text-start">
      {/* 2px Brass Reading Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-[2px] bg-[#E4DFD3] z-50">
        <div
          className={`h-full bg-[#B08A4A] transition-all duration-75 ${
            isRtl ? 'right-0 float-right' : 'left-0 float-left'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating SEO Inspector Demo Tool Chip */}
      <div
        className={`fixed bottom-6 ${
          isRtl ? 'left-6' : 'right-6'
        } z-40`}
      >
        <button
          onClick={() => openSeoDrawer(article)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#16241F] text-[#B08A4A] hover:bg-[#1F4D45] hover:text-white rounded-pill shadow-md border border-[#B08A4A]/50 text-xs font-mono transition-all transform hover:scale-105"
        >
          <Sliders size={14} />
          <span>SEO & Hreflang Inspector</span>
        </button>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#76827E] mb-6 font-arabic">
          <Link to={`/${lang}`} className="hover:text-[#1F4D45]">
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link to={`/${lang}/news`} className="hover:text-[#1F4D45]">
            {t.nav.news}
          </Link>
          <span>/</span>
          <span className="text-[#1F4D45] font-medium">{article.topic}</span>
        </nav>

        {/* Article Header (680px-centered layout) */}
        <header className="max-w-[760px] mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <Badge variant="category" categoryColor={article.categoryColor}>
              {article.topic.toUpperCase()}
            </Badge>
            <span className="font-mono text-xs text-[#76827E] uppercase">
              {article.geo}
            </span>
            {article.hasWarning && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#B7791F] bg-[#FAEFD9] px-2 py-0.5 rounded-xs font-medium">
                <AlertTriangle size={12} />
                <span>تحقق تحريري / Fact Check Notice</span>
              </span>
            )}
          </div>

          <h1 className="font-headline font-semibold text-2xl sm:text-3xl md:text-4xl text-[#14201D] leading-tight mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[#42504C] leading-relaxed mb-6 font-arabic">
            {excerpt}
          </p>

          {/* Metadata Byline & Sharing */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[#E4DFD3] text-xs text-[#76827E]">
            <div className="flex items-center gap-3">
              <span className="font-medium text-[#14201D]">{t.article.editorialDesk}</span>
              <span>·</span>
              <span>{lang === 'ar' ? dateInfo.ar : dateInfo.en}</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock size={12} />
                <span>{article.readTimeMin} {t.newsHub.readTime}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#CFC8B8] hover:border-[#1F4D45] text-[#14201D] rounded text-xs transition-colors"
              >
                <Share2 size={13} />
                <span>{t.article.share}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Source Attribution Box (Section 9.2 Key Requirement) */}
        <div className="max-w-[760px] mx-auto mb-8 p-4 bg-[#FBF9F4] border border-[#E4DFD3] rounded-md">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F4D45]">
              <CheckCircle2 size={15} className="text-[#3F7D58]" />
              <span>{t.article.sourceAttributionTitle}</span>
            </div>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#1F4D45] hover:text-[#B08A4A] flex items-center gap-1 font-mono"
            >
              <span>{t.article.readOriginal}</span>
              <ExternalLink size={12} />
            </a>
          </div>
          <p className="text-xs text-[#42504C] font-arabic leading-relaxed">
            {t.article.sourceAttributionBody} — <strong className="text-[#14201D]">{article.sourceName}</strong>
          </p>
        </div>

        {/* Article Hero Cover Image */}
        {article.coverImage && (
          <div className="max-w-[760px] mx-auto mb-8 rounded-md overflow-hidden relative">
            <img
              src={article.coverImage}
              alt={title}
              className="w-full aspect-[16/7] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 60%, ${article.categoryColor}30 100%)`
              }}
            />
          </div>
        )}

        {/* Article Body Content (680px Measure) */}
        <main className="max-w-[680px] mx-auto space-y-6 text-[#14201D] font-arabic text-base sm:text-lg leading-[1.85]">
          {/* Paragraphs with In-Article Ad after 3rd paragraph */}
          {paragraphs.map((p, idx) => (
            <React.Fragment key={idx}>
              <p className="leading-relaxed">{p}</p>
              {idx === 2 && (
                <div className="my-8">
                  <AdSlot zoneId="in_article" />
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Structured Key Facts Box (Definition List) */}
          {article.facts && article.facts.length > 0 && (
            <div className="my-10 p-6 bg-white border border-[#E4DFD3] rounded-md shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F4D45] mb-4 font-headline">
                <BookOpen size={16} />
                <span>{t.article.keyFacts}</span>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-arabic">
                {article.facts.map((fact) => (
                  <div
                    key={fact.key}
                    className={`p-3 rounded border ${
                      fact.conflict
                        ? 'bg-[#FAEFD9]/50 border-[#B7791F]/40'
                        : 'bg-[#FBF9F4] border-[#E4DFD3]'
                    }`}
                  >
                    <dt className="text-[#76827E] text-[11px] mb-0.5">
                      {lang === 'ar' ? fact.labelAr : fact.labelEn}
                    </dt>
                    <dd className="font-semibold text-sm text-[#14201D]">
                      {lang === 'ar' ? fact.valueAr : fact.valueEn}
                    </dd>
                    {fact.conflict && (
                      <span className="text-[10px] text-[#B7791F] font-mono mt-1 block">
                        ⚠ Unconfirmed / Conflicting in source
                      </span>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Inline Brevo Newsletter Form #2 */}
          <div className="my-10 p-6 bg-[#16241F] text-[#EAE6DB] rounded-md border border-[#1F4D45]">
            <NewsletterForm variant="compact" />
          </div>
        </main>

        {/* Related Stories Section */}
        <section className="max-w-[1240px] mx-auto mt-16 pt-10 border-t border-[#E4DFD3]">
          <h3 className="font-headline font-semibold text-xl text-[#14201D] mb-6">
            {t.article.relatedStories}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <StoryCard key={rel.id} article={rel} variant="compact" />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};
