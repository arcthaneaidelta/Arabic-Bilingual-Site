import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Globe2, Sparkles, ChevronDown } from 'lucide-react';
import { NetworkMap } from './NetworkMap';
import { Button } from '../ui/Button';
import { useT, useLang } from '../../i18n/useT';

export const Hero: React.FC = () => {
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';

  return (
    <section className="relative pt-6 pb-12 md:py-14 border-b border-[#E4DFD3] bg-[#F7F4EE]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col text-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08A4A]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4D45] font-headline">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-headline font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[44px] text-[#14201D] leading-[1.2] mb-4">
              {t.hero.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#42504C] leading-relaxed mb-6 font-arabic">
              {t.brandSub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              <Link to={`/${lang}/news`} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" block>
                  <span>{t.hero.ctaPrimary}</span>
                  {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Button>
              </Link>
              <Link to={`/${lang}/opportunities`} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" block>
                  <span>{t.hero.ctaSecondary}</span>
                </Button>
              </Link>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E4DFD3]">
              <div>
                <div className="font-headline font-bold text-2xl text-[#1F4D45]">
                  {t.hero.stat1Count}
                </div>
                <div className="text-xs text-[#76827E] font-arabic mt-0.5 leading-tight">
                  {t.hero.stat1Label}
                </div>
              </div>

              <div>
                <div className="font-headline font-bold text-2xl text-[#2F6B74]">
                  {t.hero.stat2Count}
                </div>
                <div className="text-xs text-[#76827E] font-arabic mt-0.5 leading-tight">
                  {t.hero.stat2Label}
                </div>
              </div>

              <div>
                <div className="font-headline font-bold text-2xl text-[#B08A4A]">
                  {t.hero.stat3Count}
                </div>
                <div className="text-xs text-[#76827E] font-arabic mt-0.5 leading-tight">
                  {t.hero.stat3Label}
                </div>
              </div>
            </div>
          </div>

          {/* Network Visual Map Column (7 cols) */}
          <div className="lg:col-span-7 w-full">
            <NetworkMap />
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="hidden sm:flex flex-col items-center justify-center mt-10 text-[#76827E] text-xs">
          <span className="font-arabic mb-1">{t.hero.scrollCue}</span>
          <div className="w-[1px] h-6 bg-[#CFC8B8] relative overflow-hidden">
            <div className="w-full h-2.5 bg-[#B08A4A] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
