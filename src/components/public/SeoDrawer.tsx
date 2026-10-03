import React from 'react';
import { Drawer } from '../ui/Drawer';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';
import { Globe, Search, Code, CheckCircle, ExternalLink } from 'lucide-react';

export const SeoDrawer: React.FC = () => {
  const { seoDrawerOpen, closeSeoDrawer, selectedArticleForSeo } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  if (!selectedArticleForSeo) return null;

  const article = selectedArticleForSeo;
  const title = lang === 'ar' ? article.titleAr : article.titleEn;
  const excerpt = lang === 'ar' ? article.excerptAr : article.excerptEn;

  const seoTitle = `${title} | EMTIAZ LIVE`;
  const canonicalUrl = `https://emtiaz.live/${lang}/news/${article.slug}`;
  const alternateAr = `https://emtiaz.live/ar/news/${article.slug}`;
  const alternateEn = `https://emtiaz.live/en/news/${article.slug}`;

  // JSON-LD NewsArticle structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: excerpt,
    inLanguage: lang === 'ar' ? 'ar-SA' : 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'EMTIAZ LIVE',
      url: 'https://emtiaz.live',
    },
    author: {
      '@type': 'Organization',
      name: 'EMTIAZ Editorial Desk',
    },
    datePublished: '2026-10-01T08:00:00+03:00',
    dateModified: '2026-10-01T09:30:00+03:00',
  };

  return (
    <Drawer
      isOpen={seoDrawerOpen}
      onClose={closeSeoDrawer}
      title="Rank Math SEO & Hreflang Inspector"
      subtitle={`WP REST Schema: ${article.slug}`}
      width="max-w-[520px]"
    >
      <div className="flex flex-col gap-6 text-start">
        {/* Banner */}
        <div className="p-3 bg-[#E5EEEB] border border-[#1F4D45]/30 rounded-sm text-xs text-[#1F4D45] flex items-center gap-2">
          <CheckCircle size={16} className="text-[#3F7D58] shrink-0" />
          <span>
            Rank Math SEO metadata and WPML hreflang canonical headers active.
          </span>
        </div>

        {/* Google SERP Preview */}
        <div className="p-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded-sm shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#76827E] mb-2 font-mono">
            <Search size={14} />
            <span>Google Search Result Snippet Preview</span>
          </div>

          <div className="text-[12px] text-[#202124] mb-0.5 truncate font-sans">
            https://emtiaz.live › {lang} › news › {article.slug}
          </div>
          <h4 className="text-[#1a0dab] hover:underline font-medium text-base leading-snug cursor-pointer mb-1 line-clamp-1">
            {seoTitle}
          </h4>
          <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>

        {/* SEO Title Field */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-[#14201D] mb-1">
            <span>Rank Math SEO Title</span>
            <span className="font-mono text-[11px] text-[#76827E]">
              {seoTitle.length} / 60 chars
            </span>
          </div>
          <div className="p-2.5 bg-[#FBF9F4] border border-[#CFC8B8] rounded text-xs font-mono text-[#14201D] truncate">
            {seoTitle}
          </div>
          <div className="w-full bg-[#E4DFD3] h-1 rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full ${
                seoTitle.length > 60 ? 'bg-[#B5473A]' : 'bg-[#3F7D58]'
              }`}
              style={{ width: `${Math.min(100, (seoTitle.length / 60) * 100)}%` }}
            />
          </div>
        </div>

        {/* Meta Description Field */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-[#14201D] mb-1">
            <span>Rank Math Meta Description</span>
            <span className="font-mono text-[11px] text-[#76827E]">
              {excerpt.length} / 160 chars
            </span>
          </div>
          <div className="p-2.5 bg-[#FBF9F4] border border-[#CFC8B8] rounded text-xs text-[#42504C] font-arabic leading-relaxed">
            {excerpt}
          </div>
          <div className="w-full bg-[#E4DFD3] h-1 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-[#3F7D58]"
              style={{ width: `${Math.min(100, (excerpt.length / 160) * 100)}%` }}
            />
          </div>
        </div>

        {/* Hreflang Canonical Pair */}
        <div className="p-4 bg-[#FBF9F4] border border-[#E4DFD3] rounded-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#14201D] mb-2 font-mono">
            <Globe size={14} />
            <span>WPML Hreflang Multi-Language Headers</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-white border border-[#E4DFD3] rounded">
              <span className="text-[#1F4D45] font-bold">hreflang="ar":</span>{' '}
              <span className="text-[#42504C]">{alternateAr}</span>
            </div>
            <div className="p-2 bg-white border border-[#E4DFD3] rounded">
              <span className="text-[#1F4D45] font-bold">hreflang="en":</span>{' '}
              <span className="text-[#42504C]">{alternateEn}</span>
            </div>
            <div className="p-2 bg-white border border-[#E4DFD3] rounded">
              <span className="text-[#B08A4A] font-bold">canonical:</span>{' '}
              <span className="text-[#42504C]">{canonicalUrl}</span>
            </div>
          </div>
        </div>

        {/* JSON-LD Structured Data */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#14201D] mb-2 font-mono">
            <Code size={14} />
            <span>JSON-LD Schema (NewsArticle)</span>
          </div>
          <pre className="p-3 bg-[#0F1A18] text-[#EAE6DB] rounded-sm text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed">
            {JSON.stringify(jsonLd, null, 2)}
          </pre>
        </div>
      </div>
    </Drawer>
  );
};
