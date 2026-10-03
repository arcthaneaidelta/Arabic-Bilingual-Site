import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, FileText, Calendar, ArrowLeft, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { Hero } from '../../components/public/Hero';
import { StoryCard } from '../../components/public/StoryCard';
import { TaxonomyExplorer } from '../../components/public/TaxonomyExplorer';
import { OpportunityCard } from '../../components/public/OpportunityCard';
import { NewsletterForm } from '../../components/public/NewsletterForm';
import { AdSlot } from '../../components/public/AdSlot';
import { Button } from '../../components/ui/Button';
import { ARTICLES_DATA } from '../../data/articles';
import { OPPORTUNITIES_DATA } from '../../data/opportunities';
import { EVENTS_DATA } from '../../data/events';
import { useT, useLang } from '../../i18n/useT';
import { useUiStore } from '../../store/uiStore';

export const HomePage: React.FC = () => {
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const { startTour, showToast } = useUiStore();

  // State for mock video/audio player facades (Section 8.8)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const leadStory = ARTICLES_DATA[0]; // Hala Coffee
  const compactStories = ARTICLES_DATA.slice(1, 5);
  const opportunityStories = OPPORTUNITIES_DATA.slice(0, 4);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-12">
      {/* 1. Hero with Network Map */}
      <Hero />

      {/* Guided Tour Banner Trigger */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-4 bg-[#F2E9D6] border border-[#B08A4A]/40 rounded-md flex flex-col sm:flex-row items-center justify-between gap-3 text-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#B08A4A] text-white flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="font-headline font-semibold text-sm text-[#14201D]">
                {lang === 'ar' ? 'عرض توضيحي لمقترح امتياز لايف' : 'EMTIAZ LIVE Proposal Interactive Demo'}
              </div>
              <div className="text-xs text-[#42504C] font-arabic">
                {lang === 'ar'
                  ? 'استكشف أهم 5 مميزات تفاعلية في 90 ثانية عبر الجولة الإرشادية.'
                  : 'Experience the 5 key proof points in ~90 seconds via our guided tour.'}
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={startTour}
            className="shrink-0"
          >
            <span>{lang === 'ar' ? 'بدء الجولة الإرشادية' : 'Start Guided Tour'}</span>
            <Sparkles size={14} />
          </Button>
        </div>
      </div>

      {/* 2. Top Story Editorial Mosaic (Section 8.3) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full text-start">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E4DFD3]">
          <div>
            <h2 className="font-headline font-semibold text-2xl text-[#14201D]">
              {t.sections.topStories}
            </h2>
            <p className="text-xs text-[#76827E] font-arabic mt-0.5">
              {t.sections.topStoriesSub}
            </p>
          </div>
          <Link
            to={`/${lang}/news`}
            className="text-xs font-semibold text-[#1F4D45] hover:text-[#B08A4A] flex items-center gap-1"
          >
            <span>{lang === 'ar' ? 'جميع الأخبار' : 'All News'}</span>
            {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Lead Story (7 cols) */}
          <div className="lg:col-span-7">
            <StoryCard article={leadStory} variant="lead" />
          </div>

          {/* Compact Stories Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {compactStories.map((art) => (
              <StoryCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Slot: Homepage Leaderboard */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        <AdSlot zoneId="home" />
      </div>

      {/* 3. Geography x Topic Explorer (Section 8.4) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full text-start">
        <div className="mb-6 pb-2 border-b border-[#E4DFD3]">
          <h2 className="font-headline font-semibold text-2xl text-[#14201D]">
            {t.sections.findMarket}
          </h2>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {lang === 'ar'
              ? 'تصفح الصفقات والتوسعات وفق النطاق الجغرافي والقطاع الاستثماري'
              : 'Filter deals and master franchise contracts by regional geography and industry sector'}
          </p>
        </div>
        <TaxonomyExplorer />
      </section>

      {/* 4. Franchise Opportunities Strip (Section 8.5) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full text-start">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E4DFD3]">
          <div>
            <h2 className="font-headline font-semibold text-2xl text-[#14201D]">
              {t.sections.opportunities}
            </h2>
            <p className="text-xs text-[#76827E] font-arabic mt-0.5">
              {t.sections.opportunitiesSub}
            </p>
          </div>
          <Link
            to={`/${lang}/opportunities`}
            className="text-xs font-semibold text-[#1F4D45] hover:text-[#B08A4A] flex items-center gap-1"
          >
            <span>{t.sections.viewAllOpportunities}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {opportunityStories.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 5. Reports & Interviews Two-Column Editorial (Section 8.6) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full text-start">
        <div className="mb-6 pb-2 border-b border-[#E4DFD3]">
          <h2 className="font-headline font-semibold text-2xl text-[#14201D]">
            {t.sections.reportsAndInterviews}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reports Column */}
          <div className="flex flex-col gap-4 p-6 bg-white border border-[#E4DFD3] rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1F4D45] font-mono uppercase tracking-wider">
                {lang === 'ar' ? 'تقارير وتحليلات السوق' : 'Market Research & PDF Reports'}
              </span>
              <span className="text-[11px] font-mono text-[#76827E] px-2 py-0.5 rounded bg-[#E5EEEB] text-[#1F4D45]">
                PDF · 24 pp
              </span>
            </div>

            <h3 className="font-headline font-semibold text-xl text-[#14201D]">
              {lang === 'ar'
                ? 'تقرير قطاع الامتياز في المملكة 2026: آفاق النمو بعد تنظيم وثائق الإفصاح'
                : 'Saudi Franchise Outlook 2026: Capitalizing on Updated Disclosure Mandates'}
            </h3>
            <p className="text-xs text-[#42504C] leading-relaxed font-arabic">
              {lang === 'ar'
                ? 'دراسة معمقة لتحولات استثمارات الأغذية والمشروبات والتجزئة مع بيانات تفصيلية لمعدلات البقاء ونمو الوحدات المرخصة.'
                : 'In-depth analytical assessment of F&B and retail franchising dynamics across the GCC.'}
            </p>

            <div className="pt-4 border-t border-[#E4DFD3] flex items-center justify-between">
              <span className="text-xs text-[#76827E]">October 2026</span>
              <button
                onClick={() =>
                  showToast(
                    lang === 'ar' ? 'تحميل التقرير' : 'Download Report',
                    lang === 'ar' ? 'تم بدء تحميل التقرير التوضيحي (PDF)' : 'Demo PDF download simulated',
                    'success'
                  )
                }
                className="text-xs font-semibold px-3 py-1.5 bg-[#E9E2D2] text-[#14201D] hover:bg-[#E0D8C4] rounded transition-colors flex items-center gap-1.5"
              >
                <FileText size={14} />
                <span>{lang === 'ar' ? 'تحميل التقرير' : 'Download PDF'}</span>
              </button>
            </div>
          </div>

          {/* Exclusive Interview Column */}
          <div className="flex flex-col gap-4 p-6 bg-white border border-[#E4DFD3] rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#B08A4A] font-mono uppercase tracking-wider">
                {lang === 'ar' ? 'حوار تنفيذي حصري' : 'Executive Leadership Interview'}
              </span>
              <span className="text-[11px] font-mono text-[#76827E]">Q4 Series</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-sm bg-[#16241F] text-[#B08A4A] flex items-center justify-center font-headline font-bold text-xl shrink-0">
                A
              </div>
              <div>
                <h4 className="font-headline font-semibold text-lg text-[#14201D]">
                  {lang === 'ar'
                    ? 'رئيس مجلس إدارة مجموعة الضو: "نستهدف 50 فرعاً للعلامات السعودية في الكويت"'
                    : 'Al-Dhow Chairman: "Targeting 50 Saudi Concept Locations in Kuwait"'}
                </h4>
                <p className="text-xs text-[#76827E] mt-1 font-arabic">
                  {lang === 'ar'
                    ? 'حول شروط اختيار العلامات الجاهزة للتصدير وكيفية إدارة سلاسل التوريد عبر الحدود.'
                    : 'Exploring criteria for cross-border brand readiness and cold-chain logistics.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4DFD3] mt-auto flex items-center justify-between">
              <span className="text-xs text-[#76827E]">10 min read</span>
              <Link
                to={`/${lang}/interviews`}
                className="text-xs font-semibold text-[#1F4D45] hover:text-[#B08A4A] flex items-center gap-1"
              >
                <span>{lang === 'ar' ? 'قراءة الحوار' : 'Read Interview'}</span>
                {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events Timeline (Section 8.7) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full text-start">
        <div className="mb-6 pb-2 border-b border-[#E4DFD3]">
          <h2 className="font-headline font-semibold text-2xl text-[#14201D]">
            {t.sections.events}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENTS_DATA.map((ev) => (
            <div
              key={ev.id}
              className="p-5 bg-white border border-[#E4DFD3] hover:border-[#1F4D45] rounded-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="px-2.5 py-1 bg-[#1F4D45] text-white rounded text-center">
                    <div className="font-bold text-base leading-none">{ev.day}</div>
                    <div className="text-[10px] uppercase font-mono mt-0.5">
                      {lang === 'ar' ? ev.monthAr : ev.monthEn}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#76827E]">
                    {lang === 'ar' ? ev.cityAr : ev.cityEn}
                  </span>
                </div>

                <h4 className="font-headline font-semibold text-base text-[#14201D] mb-1.5">
                  {lang === 'ar' ? ev.titleAr : ev.titleEn}
                </h4>
                <p className="text-xs text-[#76827E] font-arabic mb-3">
                  {lang === 'ar' ? ev.venueAr : ev.venueEn}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#1F4D45]">
                  {ev.attendeesCount} {lang === 'ar' ? 'مشارك' : 'attendees'}
                </span>
                <button
                  onClick={() =>
                    showToast(
                      lang === 'ar' ? 'تمت الإضافة للتقويم' : 'Added to Calendar',
                      `${lang === 'ar' ? ev.titleAr : ev.titleEn} (${ev.day} ${ev.monthEn})`,
                      'success'
                    )
                  }
                  className="text-xs text-[#76827E] hover:text-[#14201D] underline"
                >
                  {lang === 'ar' ? '+ إضافة للتقويم' : '+ Calendar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Video & Podcast Facades (Section 8.8) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full text-start">
        <div className="mb-6 pb-2 border-b border-[#E4DFD3]">
          <h2 className="font-headline font-semibold text-2xl text-[#14201D]">
            {t.sections.media}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Player Facade */}
          <div className="bg-white border border-[#E4DFD3] rounded-md overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-[#16241F] flex items-center justify-center overflow-hidden">
              {isVideoPlaying ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-[#0F1A18]">
                  <div className="w-12 h-12 rounded-full border-2 border-[#B08A4A] border-t-transparent animate-spin mb-3" />
                  <p className="text-xs font-mono text-[#B08A4A]">YouTube Embed Facade — Streaming Simulation</p>
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="mt-4 px-3 py-1 bg-[#1F4D45] text-xs rounded"
                  >
                    Pause
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="group flex flex-col items-center justify-center text-white"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1F4D45]/90 border-2 border-[#B08A4A] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Play size={24} className="text-[#B08A4A] ms-1" />
                  </div>
                  <span className="text-xs font-mono text-[#EAE6DB] mt-2">
                    {lang === 'ar' ? 'تشغيل التحقيق المرئي (8:14 دقيقة)' : 'Play Video Investigation (8:14 min)'}
                  </span>
                </button>
              )}
              <div className="absolute top-3 start-3 px-2 py-0.5 bg-black/60 text-[10px] font-mono text-white rounded">
                YouTube Embed (Facade)
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-headline font-semibold text-base text-[#14201D] mb-1">
                {lang === 'ar'
                  ? 'كيف تبني سلسلة امتياز ناجحة؟ نظرة داخلية على مصانع ومطابخ الامتياز'
                  : 'Inside Franchise Scale: Supply Chains, Commissary Kitchens & Brand Standards'}
              </h4>
              <p className="text-xs text-[#76827E] font-arabic">
                {lang === 'ar'
                  ? 'جولة ميدانية مع مسؤولي الجودة والتشغيل في كبرى العلامات الخليجية.'
                  : 'Field tour reviewing operational readiness and centralized commissary execution.'}
              </p>
            </div>
          </div>

          {/* Podcast Player Facade with 40-Bar Waveform */}
          <div className="bg-white border border-[#E4DFD3] rounded-md p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#1F4D45] font-mono uppercase">
                  {lang === 'ar' ? 'بودكاست امتياز الصوتي' : 'Emtiaz Podcast Series'}
                </span>
                <span className="text-[11px] font-mono text-[#76827E] px-2 py-0.5 rounded bg-[#E5EEEB] text-[#1F4D45]">
                  Spotify / Apple Podcasts
                </span>
              </div>

              <h4 className="font-headline font-semibold text-lg text-[#14201D] mb-2">
                {lang === 'ar'
                  ? 'الحلقة 14: أسرار صياغة عقود الامتياز وحماية العلامة في الأسواق الإقليمية'
                  : 'Episode 14: Drafting Bulletproof Master Franchise Contracts in GCC'}
              </h4>
              <p className="text-xs text-[#42504C] leading-relaxed font-arabic mb-6">
                {lang === 'ar'
                  ? 'نستضيف المحامي المتخصص في عقود الامتياز لمناقشة أخطاء الممنوحين الشائعة وكيفية احتساب رسوم الإتاوة العادلة.'
                  : 'Legal advisory on royalty fee negotiations, exclusivity covenants, and dispute settlement.'}
              </p>
            </div>

            {/* Simulated 40-bar CSS Waveform Audio Player */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E4DFD3] rounded-sm flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="w-12 h-12 rounded-full bg-[#1F4D45] text-white flex items-center justify-center shrink-0 hover:bg-[#183D37] transition-all"
                  aria-label="Play podcast"
                >
                  {isAudioPlaying ? <Pause size={18} /> : <Play size={18} className="ms-0.5" />}
                </button>

                {/* 40 Waveform Bars */}
                <div className="flex-1 flex items-center justify-between h-8 gap-[2px] overflow-hidden">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const heightPercent = 20 + ((i * 19) % 70);
                    return (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isAudioPlaying ? 'bg-[#1F4D45]' : 'bg-[#CFC8B8]'
                        }`}
                        style={{
                          height: isAudioPlaying
                            ? `${Math.max(15, (heightPercent + (i % 3) * 10) % 100)}%`
                            : `${heightPercent}%`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#76827E]">
                <span>{isAudioPlaying ? '04:12' : '00:00'}</span>
                <span>38:40</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Brevo Newsletter Form Band (Section 8.9) */}
      <NewsletterForm variant="band" />
    </div>
  );
};
