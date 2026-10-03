import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Edit3,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { useNewsroomStore } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useT, useLang } from '../../i18n/useT';

export const DraftReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { drafts, approveDraft, keepDraft, updateDraftContent } = useNewsroomStore();
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const navigate = useNavigate();

  const draft = drafts.find((d) => d.id === id) || drafts[0];

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'source' | 'draft'>('draft');

  // Fact-tracing highlight state
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableBody, setEditableBody] = useState(draft.bodyAr);

  // Pre-publish checklist state
  const [checklist, setChecklist] = useState({
    factsVerified: false,
    warningRemoved: false,
    categoryConfirmed: false,
    imageVerified: false,
  });

  const allChecked =
    checklist.factsVerified &&
    checklist.categoryConfirmed &&
    checklist.imageVerified &&
    (!draft.hasWarning || checklist.warningRemoved);

  const handleApprove = () => {
    approveDraft(draft.id);
    showToast(
      lang === 'ar' ? 'تم اعتماد ونشر الخبر' : 'Draft Approved & Published',
      lang === 'ar'
        ? `تم تحديث حالة المقال #${draft.wpPostId} إلى منشورة (Publish) في ووردبريس.`
        : `Post #${draft.wpPostId} published to WordPress via REST API.`,
      'success'
    );
  };

  const handleKeepDraft = () => {
    keepDraft(draft.id);
    showToast(
      lang === 'ar' ? 'تم الحفظ كمسودة' : 'Saved as Draft',
      lang === 'ar' ? 'المقال محفوظ في ووردبريس كمسودة بانتظار استكمال التدقيق.' : 'Post stays in draft status.',
      'info'
    );
  };

  const handleSaveEdit = () => {
    updateDraftContent(draft.id, editableBody);
    setIsEditing(false);
    showToast(
      lang === 'ar' ? 'تم حفظ التعديلات' : 'Edits Saved',
      lang === 'ar' ? 'تم تحديث مسودة المحرر بنجاح.' : 'Editorial draft updated.',
      'success'
    );
  };

  return (
    <div className="space-y-6 text-start">
      {/* Top Strip */}
      <div className="p-4 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/newsroom/drafts"
            className="text-xs font-semibold text-[#1F4D45] hover:underline flex items-center gap-1"
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>صندوق المسودات / Inbox</span>
          </Link>

          <span className="text-[#CFC8B8]">|</span>

          <Badge variant="wpml">WPML: AR ✓</Badge>

          <span
            className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
              draft.status === 'published'
                ? 'bg-[#E3F0E8] text-[#3F7D58]'
                : draft.hasWarning
                ? 'bg-[#FAEFD9] text-[#B7791F]'
                : 'bg-[#E5EEEB] text-[#1F4D45]'
            }`}
          >
            Status: {draft.status.toUpperCase()}
          </span>

          <a
            href={draft.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#1F4D45] hover:underline flex items-center gap-1 font-mono"
          >
            <span>{draft.sourceName}</span>
            <ExternalLink size={12} />
          </a>

          <span className="text-xs font-mono text-[#76827E]">Auto Publish: OFF</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleKeepDraft}>
            {t.newsroom.review.keepDraft}
          </Button>

          <div
            title={
              !allChecked && draft.hasWarning
                ? 'Complete checklist and verify conflicting numbers to publish'
                : ''
            }
          >
            <Button
              variant="primary"
              size="sm"
              disabled={draft.hasWarning && !allChecked}
              onClick={handleApprove}
            >
              <Check size={14} />
              <span>{t.newsroom.review.approvePublish}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Prominent Editorial Warning Banner (Section 13.5 Key Trust Moment) */}
      {draft.hasWarning && (
        <div className="p-4 bg-[#FAEFD9] border-2 border-[#B7791F] rounded-md shadow-xs flex items-start gap-3 animate-in fade-in duration-200">
          <AlertTriangle className="w-5 h-5 text-[#B7791F] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-headline font-semibold text-sm text-[#B7791F]">
              {t.newsroom.review.warningBannerTitle}
            </h4>
            <p className="text-xs text-[#14201D] font-arabic mt-1 leading-relaxed">
              {draft.warningNoteAr ||
                'المصدر يقدم رقمين مختلفين للاستثمار (40 مليون ريال في العنوان، و4 ملايين ريال في المتن). لم يذكر النص أياً منهما كحقيقة قطعية. تحقق مع المصدر الأصلي قبل الاعتماد.'}
            </p>
          </div>
        </div>
      )}

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center bg-white border border-[#E4DFD3] rounded p-1 text-xs font-semibold">
        <button
          onClick={() => setMobileTab('source')}
          className={`flex-1 py-2 rounded text-center ${
            mobileTab === 'source' ? 'bg-[#1F4D45] text-white' : 'text-[#76827E]'
          }`}
        >
          {t.newsroom.review.sourcePanelTitle}
        </button>
        <button
          onClick={() => setMobileTab('draft')}
          className={`flex-1 py-2 rounded text-center ${
            mobileTab === 'draft' ? 'bg-[#1F4D45] text-white' : 'text-[#76827E]'
          }`}
        >
          {t.newsroom.review.draftPanelTitle}
        </button>
      </div>

      {/* Split-View Container (50/50 Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Source Panel */}
        <div
          className={`bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs ${
            mobileTab === 'source' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#76827E]" />
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {t.newsroom.review.sourcePanelTitle}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#76827E]">English (Original)</span>
          </div>

          <div className="font-sans text-xs sm:text-sm text-[#42504C] leading-relaxed space-y-4">
            <h4 className="font-headline font-semibold text-base text-[#14201D] pb-2 border-b border-[#F0ECE1]">
              Hala Coffee Roasters Inks Master Franchise Agreement for Kuwait
            </h4>

            <p>
              RIYADH/KUWAIT CITY — Hala Coffee Roasters, a fast-growing Saudi specialty coffee brand, has officially concluded a landmark master franchise agreement with Al-Dhow Hospitality Group to introduce the brand to the Kuwaiti retail market.
            </p>

            {/* Target highlight for 25 locations */}
            <p
              className={`p-1.5 rounded transition-colors ${
                activeHighlight === 'locations' ? 'bg-[#F2E9D6] border border-[#B08A4A]' : ''
              }`}
            >
              The partnership targets the rollout of <span className="font-bold underline decoration-[#B08A4A]">25 specialty coffee shops</span> across key Kuwaiti districts over the next 5 years, starting with three initial flagships in Kuwait City before the end of Q1.
            </p>

            {/* Target highlight for conflicting figures */}
            <p
              className={`p-2 rounded border transition-colors ${
                activeHighlight === 'investment'
                  ? 'bg-[#FAEFD9] border-[#B7791F] font-semibold'
                  : 'bg-[#FBF9F4] border-[#E4DFD3]'
              }`}
            >
              While the preliminary press header suggested an initial capital outlay of <span className="text-[#B7791F] font-bold">SAR 40 million</span>, secondary disclosures in the financial memorandum cited a phased project investment cap of <span className="text-[#B7791F] font-bold">SAR 4 million</span> for the pilot cluster of three venues.
            </p>

            <p>
              Al-Dhow Hospitality Group will handle day-to-day operations and real estate acquisitions, while Hala Coffee Roasters maintains oversight of roast supply, barista training curricula, and brand experience guidelines.
            </p>
          </div>
        </div>

        {/* Right: Arabic Draft Panel */}
        <div
          className={`bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs ${
            mobileTab === 'draft' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1F4D45]" />
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {t.newsroom.review.draftPanelTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <Button size="sm" variant="primary" onClick={handleSaveEdit}>
                  حفظ التعديل / Save
                </Button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs text-[#1F4D45] hover:underline font-semibold"
                >
                  <Edit3 size={13} />
                  <span>تعديل الصياغة / Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* Embedded First Block Warning Note (Section 13.5 Job Spec requirement) */}
          {draft.hasWarning && (
            <div className="p-3 bg-[#FAEFD9]/60 border border-dashed border-[#B7791F] rounded text-xs text-[#B7791F] mb-4 font-arabic">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <AlertTriangle size={14} />
                <span>[ملاحظة تحريرية مدمجة بالمسودة — قم بحذف هذا المربع قبل النشر]</span>
              </div>
              تباين في أرقام الاستثمار بين العنوان (40 مليون) والمتن (4 ملايين). تأكد من صحة الرقم قبل الاعتماد النهائي.
            </div>
          )}

          <div className="font-arabic space-y-4">
            <h2 className="font-headline font-semibold text-xl text-[#14201D] leading-snug">
              {draft.titleAr}
            </h2>

            <p className="text-xs sm:text-sm text-[#42504C] leading-relaxed p-2.5 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
              {draft.excerptAr}
            </p>

            {isEditing ? (
              <textarea
                rows={10}
                value={editableBody}
                onChange={(e) => setEditableBody(e.target.value)}
                className="w-full p-3 text-sm border border-[#1F4D45] rounded focus:outline-none leading-relaxed font-arabic"
              />
            ) : (
              <div className="text-xs sm:text-sm text-[#14201D] leading-relaxed space-y-3">
                <p>
                  أعلنت علامة «هالة لتحميص القهوة» المتخصصة في قطاع المقاهي المختصة بالمملكة العربية السعودية، عن إبرام اتفاقية امتياز تجاري رئيسية مع شركة «مجموعة الضو للضيافة» الكويتية، تقضي بتوسيع انتشار العلامة في السوق الكويتي عبر خطة تمتد لخمس سنوات.
                </p>

                {/* Interactive Traceable Fact: 25 locations */}
                <p>
                  وبموجب بنود الاتفاقية، يستهدف الطرفان افتتاح{' '}
                  <span
                    onMouseEnter={() => setActiveHighlight('locations')}
                    onMouseLeave={() => setActiveHighlight(null)}
                    className="underline decoration-dotted decoration-[#B08A4A] bg-[#F2E9D6] px-1 rounded cursor-pointer font-bold"
                  >
                    25 موقعاً
                  </span>{' '}
                  في محافظات الكويت المختلفة، مع التركيز على مراكز التسوق الكبرى.
                </p>

                {/* Interactive Traceable Fact: Investment Conflict */}
                <p>
                  وقد أشارت البيانات الأولية إلى{' '}
                  <span
                    onMouseEnter={() => setActiveHighlight('investment')}
                    onMouseLeave={() => setActiveHighlight(null)}
                    className="underline decoration-dotted decoration-[#B7791F] bg-[#FAEFD9] px-1 rounded cursor-pointer font-bold text-[#B7791F]"
                  >
                    تباين بين 4 و 40 مليون ريال
                  </span>{' '}
                  في خطط التمويل الأولية دون الجزم برقم محدد، في حين ستتولى هالة تزويد المقاهي بحبوب البن المحمصة من مقرها بالرياض.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Facts Table & Pre-publish Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Facts Table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs">
          <h4 className="font-headline font-semibold text-sm text-[#14201D] mb-3 pb-2 border-b border-[#E4DFD3]">
            {t.newsroom.review.factsTitle}
          </h4>

          <div className="divide-y divide-[#E4DFD3] text-xs">
            {draft.facts.map((fact) => (
              <div
                key={fact.key}
                onMouseEnter={() => {
                  if (fact.key === 'locations') setActiveHighlight('locations');
                  if (fact.key === 'investment') setActiveHighlight('investment');
                }}
                onMouseLeave={() => setActiveHighlight(null)}
                className={`py-2.5 px-3 flex items-center justify-between rounded transition-colors ${
                  fact.conflict ? 'bg-[#FAEFD9]/40' : 'hover:bg-[#FBF9F4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#14201D]">{fact.labelAr}:</span>
                  <span className="text-[#42504C]">{fact.valueAr}</span>
                </div>

                <div className="flex items-center gap-2">
                  {fact.supported ? (
                    <span className="text-[10px] font-mono font-bold text-[#3F7D58] bg-[#E3F0E8] px-2 py-0.5 rounded">
                      Supported by source ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-[#B7791F] bg-[#FAEFD9] px-2 py-0.5 rounded">
                      Uncertain / Conflict ⚠
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-publish Checklist (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs space-y-3">
          <h4 className="font-headline font-semibold text-sm text-[#14201D] pb-2 border-b border-[#E4DFD3]">
            {t.newsroom.review.checklistTitle}
          </h4>

          <div className="space-y-2 text-xs font-arabic">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.factsVerified}
                onChange={(e) =>
                  setChecklist({ ...checklist, factsVerified: e.target.checked })
                }
                className="text-[#1F4D45]"
              />
              <span>{t.newsroom.review.checkFacts}</span>
            </label>

            {draft.hasWarning && (
              <label className="flex items-center gap-2 cursor-pointer text-[#B7791F]">
                <input
                  type="checkbox"
                  checked={checklist.warningRemoved}
                  onChange={(e) =>
                    setChecklist({ ...checklist, warningRemoved: e.target.checked })
                  }
                  className="text-[#B7791F]"
                />
                <span className="font-bold">{t.newsroom.review.checkWarning}</span>
              </label>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.categoryConfirmed}
                onChange={(e) =>
                  setChecklist({ ...checklist, categoryConfirmed: e.target.checked })
                }
                className="text-[#1F4D45]"
              />
              <span>{t.newsroom.review.checkCategory}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.imageVerified}
                onChange={(e) =>
                  setChecklist({ ...checklist, imageVerified: e.target.checked })
                }
                className="text-[#1F4D45]"
              />
              <span>{t.newsroom.review.checkImage}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
