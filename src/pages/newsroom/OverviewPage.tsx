import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Play,
  Clock,
  ArrowRight,
  ArrowLeft,
  Flame,
  Activity,
  Layers,
} from 'lucide-react';
import { useNewsroomStore } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';
import { Button } from '../../components/ui/Button';

export const OverviewPage: React.FC = () => {
  const {
    drafts,
    pipelineIntervalMinutes,
    setIntervalMinutes,
    runPipelineSimulation,
    logEntries,
  } = useNewsroomStore();
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const navigate = useNavigate();

  const warnedDrafts = drafts.filter((d) => d.status === 'needs_review' || d.hasWarning);
  const scannedCount = 214;
  const draftsCount = drafts.length;
  const needsReviewCount = warnedDrafts.length;
  const skippedCount = 188;

  const handleIntervalChange = (val: 30 | 45 | 60) => {
    setIntervalMinutes(val);
    showToast(
      lang === 'ar' ? 'تم تحديث دورة الفحص' : 'Interval Updated',
      lang === 'ar' ? `سيتم فحص التغذيات كل ${val} دقيقة.` : `Feeds will be checked every ${val} minutes.`,
      'info'
    );
  };

  const handleRunNow = () => {
    navigate('/newsroom/pipeline');
    setTimeout(() => {
      runPipelineSimulation();
    }, 200);
  };

  return (
    <div className="space-y-8 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DFD3]">
        <div>
          <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
            {t.newsroom.title}
          </h1>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {t.newsroom.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={handleRunNow}>
            <Play size={14} className="fill-current" />
            <span>{t.newsroom.runNow}</span>
          </Button>
        </div>
      </div>

      {/* Row 1: KPI Cards (4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Scanned */}
        <div className="p-4 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#76827E] mb-2">
            <span>{t.newsroom.overview.scannedToday}</span>
            <span className="text-[#3F7D58] font-mono font-bold">+18%</span>
          </div>
          <div className="font-headline font-bold text-3xl text-[#14201D] mb-2">
            {scannedCount}
          </div>
          {/* Static SVG sparkline */}
          <svg className="w-full h-6 text-[#1F4D45]/30 stroke-current fill-none" viewBox="0 0 100 24">
            <polyline points="0,18 20,14 40,20 60,8 80,12 100,4" strokeWidth="2" />
          </svg>
        </div>

        {/* Drafts Created */}
        <div className="p-4 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#76827E] mb-2">
            <span>{t.newsroom.overview.draftsCreated}</span>
            <span className="text-[#1F4D45] font-mono font-bold">100% AR</span>
          </div>
          <div className="font-headline font-bold text-3xl text-[#1F4D45] mb-2">
            {draftsCount}
          </div>
          <svg className="w-full h-6 text-[#1F4D45] stroke-current fill-none" viewBox="0 0 100 24">
            <polyline points="0,20 25,18 50,12 75,9 100,5" strokeWidth="2" />
          </svg>
        </div>

        {/* Needs Review */}
        <div className="p-4 bg-white border border-[#B7791F]/40 bg-[#FAEFD9]/20 rounded-md shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#B7791F] font-semibold mb-2">
            <span>{t.newsroom.overview.needsReview}</span>
            <AlertTriangle size={14} />
          </div>
          <div className="font-headline font-bold text-3xl text-[#B7791F] mb-2">
            {needsReviewCount}
          </div>
          <span className="text-[11px] text-[#76827E] font-arabic">
            أرقام متضاربة أو مصادر غير مكتملة
          </span>
        </div>

        {/* Skipped */}
        <div className="p-4 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#76827E] mb-2">
            <span>{t.newsroom.overview.skipped}</span>
            <span className="font-mono text-[11px]">Saved LLM cost</span>
          </div>
          <div className="font-headline font-bold text-3xl text-[#76827E] mb-2">
            {skippedCount}
          </div>
          <div className="text-[10px] text-[#76827E] font-mono">
            42 Duplicates · 112 Irrelevant · 34 Paywall
          </div>
        </div>
      </div>

      {/* Row 2: Needs Action (Left 7 cols) & Pipeline Control (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Action Needed List */}
        <div className="lg:col-span-7 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E4DFD3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B7791F] animate-pulse" />
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {t.newsroom.overview.actionNeeded} ({warnedDrafts.length})
              </h3>
            </div>
            <Link
              to="/newsroom/drafts"
              className="text-xs text-[#1F4D45] hover:underline font-semibold"
            >
              عرض صندوق المسودات ←
            </Link>
          </div>

          <div className="space-y-3">
            {warnedDrafts.slice(0, 3).map((draft) => (
              <div
                key={draft.id}
                className="p-3.5 bg-[#FBF9F4] border border-[#E4DFD3] rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 bg-[#FAEFD9] text-[#B7791F] rounded font-bold">
                      ⚠ Conflict Flagged
                    </span>
                    <span className="text-xs font-mono text-[#76827E] truncate">
                      {draft.sourceName}
                    </span>
                  </div>
                  <h4 className="font-headline font-semibold text-sm text-[#14201D] truncate">
                    {lang === 'ar' ? draft.titleAr : draft.titleEn}
                  </h4>
                  <p className="text-[11px] text-[#B7791F] font-arabic mt-1">
                    {draft.warningNoteAr || 'تناقض في أرقام الاستثمار أو حجم الفروع المعروضة.'}
                  </p>
                </div>

                <Link
                  to={`/newsroom/drafts/${draft.id}`}
                  className="shrink-0 px-3 py-1.5 bg-[#1F4D45] text-white hover:bg-[#183D37] text-xs font-semibold rounded transition-colors"
                >
                  مراجعة المسودة / Review
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Pipeline Status & Interval Control */}
        <div className="lg:col-span-5 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#E4DFD3] flex items-center justify-between">
            <h3 className="font-headline font-semibold text-base text-[#14201D]">
              حالة محرك الأتمتة (Pipeline Status)
            </h3>
            <span className="text-[11px] font-mono text-[#3F7D58] bg-[#E3F0E8] px-2 py-0.5 rounded font-bold">
              IDLE · READY
            </span>
          </div>

          {/* Interval Selector */}
          <div>
            <label className="text-xs font-semibold text-[#14201D] block mb-2 font-arabic">
              الفاصل الزمني للفحص التلقائي (Cron Interval):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[30, 45, 60].map((interval) => (
                <button
                  key={interval}
                  type="button"
                  onClick={() => handleIntervalChange(interval as 30 | 45 | 60)}
                  className={`py-2 px-3 rounded text-xs font-mono border transition-all ${
                    pipelineIntervalMinutes === interval
                      ? 'bg-[#1F4D45] text-white border-[#1F4D45] font-bold shadow-xs'
                      : 'bg-[#FBF9F4] text-[#42504C] border-[#CFC8B8] hover:bg-[#E9E2D2]'
                  }`}
                >
                  {interval} دقيقة / min
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#76827E] mt-2 font-arabic">
              * يُطبق التعديل على الدورة البرمجية القادمة فوراً دون تعديل n8n.
            </p>
          </div>

          <div className="p-3 bg-[#0F1A18] text-[#EAE6DB] rounded text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#B08A4A]" />
              <span>Next execution in:</span>
            </div>
            <span className="text-[#B08A4A] font-bold">23:41</span>
          </div>

          <Button block variant="primary" onClick={handleRunNow}>
            <Play size={14} className="fill-current" />
            <span>تشغيل فوري يدوي (Run Now)</span>
          </Button>
        </div>
      </div>

      {/* Row 3: Activity Feed & 7-Day Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Activity Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs">
          <div className="pb-3 mb-4 border-b border-[#E4DFD3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#1F4D45]" />
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {t.newsroom.overview.recentActivity}
              </h3>
            </div>
            <Link to="/newsroom/log" className="text-xs text-[#1F4D45] hover:underline font-semibold">
              سجل العمليات بالكامل (Log) ←
            </Link>
          </div>

          <div className="space-y-2.5">
            {logEntries.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded bg-[#FBF9F4] border border-[#E4DFD3] text-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      log.result === 'Drafted'
                        ? 'bg-[#3F7D58]'
                        : log.result === 'Duplicate'
                        ? 'bg-[#3E6A8A]'
                        : log.result === 'Rejected'
                        ? 'bg-[#76827E]'
                        : log.result === 'Error'
                        ? 'bg-[#B5473A]'
                        : 'bg-[#B7791F]'
                    }`}
                  />
                  <span className="font-medium text-[#14201D] truncate">
                    {log.originalTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[10px] text-[#76827E]">
                    {log.timestamp}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      log.result === 'Drafted'
                        ? 'bg-[#E3F0E8] text-[#3F7D58]'
                        : log.result === 'Error'
                        ? 'bg-[#F8E4E0] text-[#B5473A]'
                        : 'bg-[#F0ECE1] text-[#76827E]'
                    }`}
                  >
                    {log.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Stacked Bar Chart (5 cols, hand-built SVG, no external chart lib) */}
        <div className="lg:col-span-5 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs">
          <div className="pb-3 mb-4 border-b border-[#E4DFD3]">
            <h3 className="font-headline font-semibold text-base text-[#14201D]">
              {t.newsroom.overview.weeklyDistribution}
            </h3>
            <p className="text-[11px] text-[#76827E] font-arabic">
              توزيع نتائج المعالجة اليومية عبر 4 نتائج رئيسية
            </p>
          </div>

          {/* Hand-built SVG Stacked Bars */}
          <div className="space-y-3">
            {[
              { day: 'السبت / Sat', drafted: 24, skipped: 18, rejected: 12 },
              { day: 'الأحد / Sun', drafted: 31, skipped: 22, rejected: 15 },
              { day: 'الإثنين / Mon', drafted: 28, skipped: 19, rejected: 9 },
              { day: 'الثلاثاء / Tue', drafted: 35, skipped: 25, rejected: 14 },
              { day: 'الأربعاء / Wed', drafted: 29, skipped: 20, rejected: 11 },
              { day: 'الخميس / Thu', drafted: 33, skipped: 21, rejected: 13 },
              { day: 'اليوم / Today', drafted: 23, skipped: 26, rejected: 10 },
            ].map((row, i) => {
              const total = row.drafted + row.skipped + row.rejected;
              const pDraft = (row.drafted / total) * 100;
              const pSkip = (row.skipped / total) * 100;
              const pRej = (row.rejected / total) * 100;

              return (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="w-24 text-[11px] text-[#76827E] shrink-0 font-arabic">
                    {row.day}
                  </span>
                  <div className="flex-1 h-4 bg-[#F0ECE1] rounded-sm overflow-hidden flex">
                    <div
                      style={{ width: `${pDraft}%` }}
                      className="bg-[#3F7D58] h-full"
                      title={`Drafted: ${row.drafted}`}
                    />
                    <div
                      style={{ width: `${pSkip}%` }}
                      className="bg-[#3E6A8A] h-full"
                      title={`Skipped/Duplicate: ${row.skipped}`}
                    />
                    <div
                      style={{ width: `${pRej}%` }}
                      className="bg-[#76827E] h-full"
                      title={`Rejected: ${row.rejected}`}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[#14201D] w-8 text-end">
                    {total}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E4DFD3] mt-4 flex items-center justify-between text-[11px] font-arabic text-[#76827E]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#3F7D58]" />
              <span>مسودة (Drafted)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#3E6A8A]" />
              <span>مستبعد/مكرر</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#76827E]" />
              <span>غير مرتبط</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
