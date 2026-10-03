import React from 'react';
import { StoryCard } from '../../components/public/StoryCard';
import { ARTICLES_DATA } from '../../data/articles';
import { useT, useLang } from '../../i18n/useT';

interface SectionPageProps {
  sectionKey: 'features' | 'interviews' | 'reports' | 'events' | 'video' | 'podcast';
}

export const SectionPage: React.FC<SectionPageProps> = ({ sectionKey }) => {
  const { t } = useT();
  const lang = useLang();

  const titleMap = {
    features: lang === 'ar' ? 'تحقيقات استقصائية' : 'In-Depth Features',
    interviews: lang === 'ar' ? 'حوارات الرؤساء التنفيذيين' : 'Executive Interviews',
    reports: lang === 'ar' ? 'تقارير وتحليلات السوق' : 'Market Research Reports',
    events: lang === 'ar' ? 'أجندة المؤتمرات والمعارض' : 'Industry Events & Summits',
    video: lang === 'ar' ? 'الإنتاج المرئي' : 'Video Investigations',
    podcast: lang === 'ar' ? 'بودكاست امتياز الصوتي' : 'Emtiaz Podcast Series',
  };

  const subtitleMap = {
    features: lang === 'ar' ? 'تغطيات معمقة لكواليس صفقات الامتياز ونماذج التوسع الناجحة' : 'Deep dives into regional franchise operations and expansion models',
    interviews: lang === 'ar' ? 'نقاشات مباشرة مع مانحي الامتياز وصناع القرار الاستثماري' : 'Direct dialogues with regional franchisors and master operators',
    reports: lang === 'ar' ? 'دراسات دورية لبيانات النمو والتشريعات في أسواق الخليج' : 'Quarterly benchmarks, growth metrics, and legal filings',
    events: lang === 'ar' ? 'ملتقيات ومعارض الامتياز التجاري القادمة في السعودية والخليج' : 'Upcoming exhibitions and deal-making symposiums in the GCC',
    video: lang === 'ar' ? 'تقارير مصورة وجولات ميدانية داخل منشآت ومصانع الامتياز' : 'On-site video dispatches exploring brand standard execution',
    podcast: lang === 'ar' ? 'حوارات أسبوعية متخصصة حول عقود الامتياز وحماية العلامات' : 'Weekly strategic audio discussions on franchise law and growth',
  };

  const stories = ARTICLES_DATA.slice(0, 6);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12 text-start">
      <div className="pb-6 mb-8 border-b border-[#E4DFD3]">
        <div className="text-xs font-mono uppercase text-[#1F4D45] mb-2 font-semibold">
          EMTIAZ EDITORIAL · {sectionKey.toUpperCase()}
        </div>
        <h1 className="font-headline font-semibold text-3xl sm:text-4xl text-[#14201D] mb-2">
          {titleMap[sectionKey]}
        </h1>
        <p className="text-sm text-[#42504C] font-arabic max-w-2xl">
          {subtitleMap[sectionKey]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} article={story} variant="compact" />
        ))}
      </div>
    </div>
  );
};
