import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export const GuidedTour: React.FC = () => {
  const { tourActive, tourStep, nextTourStep, prevTourStep, skipTour, toggleAcf } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const navigate = useNavigate();

  if (!tourActive) return null;

  const tourSteps = [
    {
      step: 1,
      titleAr: '① انقلاب الاتجاه الفوري (RTL / LTR)',
      titleEn: '① Instant RTL / LTR Mirroring',
      descAr: 'الموقع مصمم أساساً باللغة العربية مع مراعاة دقيقة للخطوط والاتجاه، مع إمكانية التبديل الفوري للإنجليزية دون إعادة تحميل.',
      descEn: 'Arabic is the primary native experience with tailored typography, flipping seamlessly to English on demand.',
      actionLabelAr: 'جرب التبديل الآن',
      actionLabelEn: 'Try language toggle',
      onAction: () => {
        navigate(lang === 'ar' ? '/en' : '/ar');
      },
    },
    {
      step: 2,
      titleAr: '② دليل فرص الامتياز وحقول ACF',
      titleEn: '② Franchise Directory & ACF Fields',
      descAr: 'بنية محتوى مخصصة CPT منظمة بدقة. انقر على زر "إظهار حقول ACF" لمشاهدة ربط الحقول التقنية.',
      descEn: 'Structured Custom Post Type without marketplace bloat. Toggle "Show ACF fields" to inspect fields.',
      actionLabelAr: 'انتقل لدليل الفرص',
      actionLabelEn: 'View Opportunities',
      onAction: () => {
        navigate(`/${lang}/opportunities`);
        toggleAcf();
      },
    },
    {
      step: 3,
      titleAr: '③ تشغيل مسار الأتمتة (n8n)',
      titleEn: '③ Run Automated n8n Pipeline',
      descAr: 'شاهد مسار تدفق الأخبار الحقيقي عبر 8 مراحل: من قراءة جدول Google Sheets وحتى توليد المسودة العربية.',
      descEn: 'Watch articles flow across all 8 nodes: RSS detection, duplicate filtration, and single-call LLM generation.',
      actionLabelAr: 'انتقل للمسار وشغّله',
      actionLabelEn: 'Go to Pipeline & Run',
      onAction: () => {
        navigate('/newsroom/pipeline');
      },
    },
    {
      step: 4,
      titleAr: '④ لحظة الثقة: كشف تباين الأرقام',
      titleEn: '④ The Trust Moment: Hallucination Caught',
      descAr: 'في مراجعة المسودة، يلتقط الذكاء الاصطناعي تعارضاً في أرقام الاستثمار (40 مليون مقابل 4 ملايين) ويضع تنبيهاً تحريرياً فورياً مع تتبع المصدر.',
      descEn: 'Review the split-view draft where conflicting investment figures triggered an editorial warning banner with source highlight.',
      actionLabelAr: 'معاينة المسودة المنبهة',
      actionLabelEn: 'Inspect Warned Draft',
      onAction: () => {
        navigate('/newsroom/drafts/art-1');
      },
    },
    {
      step: 5,
      titleAr: '⑤ فاحص WPML و REST API',
      titleEn: '⑤ WPML & WordPress REST Inspector',
      descAr: 'تأكد من إسناد lang="ar" وحفظ حقول Rank Math SEO ومحاكاة حاجز الأمان عند غياب اللغة.',
      descEn: 'Examine the POST payload ensuring lang: "ar", Rank Math custom fields, and missing-language safeguards.',
      actionLabelAr: 'فحص REST API',
      actionLabelEn: 'Open API Inspector',
      onAction: () => {
        navigate('/newsroom/api');
      },
    },
  ];

  const current = tourSteps[tourStep - 1];

  return (
    <div
      className={`fixed bottom-6 ${
        isRtl ? 'left-6' : 'right-6'
      } z-50 max-w-md w-full bg-[#FFFFFF] rounded-md border-2 border-[#B08A4A] shadow-lg p-5 animate-in fade-in slide-in-from-bottom-3 duration-300 text-start`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E4DFD3]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#B08A4A] text-white flex items-center justify-center font-bold text-xs">
            <Sparkles size={14} />
          </div>
          <span className="font-headline font-semibold text-sm text-[#14201D]">
            {t.common.guidedTourTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#76827E]">
            {tourStep} / 5
          </span>
          <button
            onClick={skipTour}
            className="text-xs text-[#76827E] hover:text-[#14201D] underline"
          >
            {t.common.skip}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-headline font-semibold text-base text-[#1F4D45] mb-1">
          {lang === 'ar' ? current.titleAr : current.titleEn}
        </h4>
        <p className="text-xs text-[#42504C] leading-relaxed font-arabic">
          {lang === 'ar' ? current.descAr : current.descEn}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={current.onAction}
          className="text-xs font-semibold px-3 py-1.5 bg-[#E5EEEB] text-[#1F4D45] hover:bg-[#D0E2DC] rounded-sm transition-colors border border-[#1F4D45]/30"
        >
          {lang === 'ar' ? current.actionLabelAr : current.actionLabelEn}
        </button>

        <div className="flex items-center gap-2">
          {tourStep > 1 && (
            <button
              onClick={prevTourStep}
              className="p-1.5 rounded-sm border border-[#CFC8B8] hover:bg-[#FBF9F4] text-[#42504C]"
              aria-label={t.common.prev}
            >
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            </button>
          )}

          {tourStep < 5 ? (
            <button
              onClick={nextTourStep}
              className="px-3 py-1.5 text-xs font-medium bg-[#1F4D45] text-white hover:bg-[#183D37] rounded-sm flex items-center gap-1"
            >
              <span>{t.common.next}</span>
              {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
            </button>
          ) : (
            <button
              onClick={skipTour}
              className="px-3 py-1.5 text-xs font-medium bg-[#3F7D58] text-white hover:bg-[#346647] rounded-sm flex items-center gap-1"
            >
              <Check size={12} />
              <span>{t.common.finish}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
