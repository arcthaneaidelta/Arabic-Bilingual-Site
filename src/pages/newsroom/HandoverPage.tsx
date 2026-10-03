import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  Video,
  Play,
  ShieldCheck,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

export const HandoverPage: React.FC = () => {
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [selectedVideo, setSelectedVideo] = useState<{ title: string; duration: string } | null>(null);

  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Complete n8n Workflow JSON Export (Production-ready)', checked: true },
    { id: 'c2', label: 'Master Prompts & Fact-Safety Directives Repository', checked: true },
    { id: 'c3', label: 'Comprehensive Technical Documentation (Setup, Backup & Maintenance)', checked: true },
    { id: 'c4', label: 'Three Screen-Recorded Step-by-Step Video Walkthroughs', checked: true },
    { id: 'c5', label: 'All API Credentials, Server Keys & Webhooks Transferred', checked: true },
    { id: 'c6', label: '100% Client Ownership Guarantee without Vendor Lock-in', checked: true },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const videos = [
    {
      id: 'v1',
      title: 'فيديو 01: كيفية إضافة وإدارة مصادر الأخبار وتفعيل النشر التلقائي في Google Sheets',
      titleEn: 'Video 01: Managing Feeds & Auto-Publish Toggles in Google Sheets',
      duration: '08:12',
    },
    {
      id: 'v2',
      title: 'فيديو 02: مراجعة المسودات المولدة، التعامل مع التنبيهات التحريرية، والاعتماد في ووردبريس',
      titleEn: 'Video 02: Editorial Review, Resolving Amber Warnings & Publishing',
      duration: '06:40',
    },
    {
      id: 'v3',
      title: 'فيديو 03: تعديل التعليمات (Prompts) واستبدال مزود الذكاء الاصطناعي في n8n',
      titleEn: 'Video 03: Customizing Prompts & Swapping AI Models in n8n Vault',
      duration: '07:05',
    },
  ];

  return (
    <div className="space-y-8 text-start">
      {/* Header */}
      <div className="pb-4 border-b border-[#E4DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#1F4D45] mb-1">
            <FileCheck size={15} />
            <span>Deliverables & Transfer of Ownership</span>
          </div>
          <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
            {t.newsroom.handover.title}
          </h1>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {t.newsroom.handover.sub}
          </p>
        </div>
      </div>

      {/* 100% Ownership Statement Tile (Section 13.10) */}
      <div className="p-6 bg-[#16241F] text-[#EAE6DB] rounded-md border border-[#B08A4A]/50 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1F4D45] border border-[#B08A4A] flex items-center justify-center shrink-0">
            <ShieldCheck size={24} className="text-[#B08A4A]" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg text-white mb-1">
              ضمان الملكية التامة 100% لشركة امتياز
            </h3>
            <p className="text-xs sm:text-sm text-[#CFC8B8] leading-relaxed font-arabic">
              {t.newsroom.handover.ownershipStatement}
              <span className="block mt-1 text-[#B08A4A]">
                لا توجد أي خدمات وسيطة خاصة، لا رسوم خفية، ولا احتكار للكود أو إعدادات n8n.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Deliverables Checklist (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD3]">
            <h3 className="font-headline font-semibold text-base text-[#14201D]">
              {t.newsroom.handover.checklistTitle}
            </h3>
            <span className="text-xs font-mono font-bold text-[#3F7D58] bg-[#E3F0E8] px-2 py-0.5 rounded">
              6 of 6 Completed
            </span>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-start gap-3 p-3 bg-[#FBF9F4] rounded border border-[#E4DFD3] cursor-pointer hover:bg-[#F2E9D6]/40 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="mt-0.5 text-[#1F4D45] focus:ring-[#1F4D45]"
                />
                <span className={`text-xs ${item.checked ? 'text-[#14201D] font-medium' : 'text-[#76827E]'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              block
              onClick={() =>
                showToast(
                  lang === 'ar' ? 'تنزيل حزمة n8n' : 'n8n Package Download',
                  'emtiaz-n8n-workflow-v3.json',
                  'success'
                )
              }
            >
              <Download size={14} />
              <span>تنزيل ملف سير عمل n8n (JSON Export)</span>
            </Button>
          </div>
        </div>

        {/* Video Guides (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E4DFD3]">
            <h3 className="font-headline font-semibold text-base text-[#14201D]">
              {t.newsroom.handover.videosTitle}
            </h3>
            <p className="text-xs text-[#76827E] font-arabic mt-0.5">
              فيديوهات مسجلة لشرح كافة تفاصيل التشغيل والصيانة التحريرية
            </p>
          </div>

          <div className="space-y-3">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="p-3.5 bg-[#FBF9F4] border border-[#E4DFD3] rounded hover:border-[#1F4D45] cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1F4D45] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Play size={16} className="text-[#B08A4A] fill-current" />
                  </div>
                  <div>
                    <h5 className="font-headline font-semibold text-xs text-[#14201D] group-hover:text-[#1F4D45]">
                      {lang === 'ar' ? vid.title : vid.titleEn}
                    </h5>
                    <span className="text-[11px] font-mono text-[#76827E]">
                      Duration: {vid.duration}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#1F4D45] underline shrink-0">
                  Play ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scope Discipline Matrix (Section 13.10) */}
      <div className="bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#E4DFD3]">
          <h3 className="font-headline font-semibold text-base text-[#14201D]">
            انضباط نطاق العمل: مخرجات المرحلة الأولى مقابل المراحل المستقبلية
          </h3>
          <p className="text-xs text-[#76827E] font-arabic">
            التزام واضح بنطاق المرحلة الأولى لمنع تشتت المشروع أو تضخم التكاليف
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Phase 1 Built & Tested */}
          <div className="p-4 bg-[#E3F0E8]/40 border border-[#3F7D58]/30 rounded space-y-2">
            <div className="font-bold text-[#3F7D58] flex items-center gap-1.5 uppercase font-mono">
              <CheckCircle2 size={15} />
              <span>Phase 1 Scope (Delivered in Proposal Demo)</span>
            </div>
            <ul className="space-y-1.5 text-[#14201D] font-arabic list-disc ps-4">
              <li>موقع ثنائي اللغة (عربي رئيسي RTL + إنجليزي WPML).</li>
              <li>مسار n8n لرصد 10-20 تغذية RSS عبر Google Sheets.</li>
              <li>فحص التكرار واسترجاع الصفحات العامة عند قصر التغذية.</li>
              <li>استدعاء واحد للذكاء الاصطناعي لتنفيذ 5 مهام دفعة واحدة.</li>
              <li>ضوابط أمان الحقائق وكشف تضارب الأرقام تلقائياً.</li>
              <li>توليد مسودات ووردبريس مع وسوم WPML وحقول Rank Math.</li>
            </ul>
          </div>

          {/* Phase 2 Future Modules */}
          <div className="p-4 bg-[#FBF9F4] border border-[#E4DFD3] rounded space-y-2 opacity-75">
            <div className="font-bold text-[#76827E] flex items-center gap-1.5 uppercase font-mono">
              <Layers size={15} />
              <span>Future Phases (Not In Phase 1 Scope)</span>
            </div>
            <ul className="space-y-1.5 text-[#76827E] font-arabic list-disc ps-4">
              <li>النشر التلقائي على منصات التواصل الاجتماعي (X, LinkedIn).</li>
              <li>توليد الصور التوضيحية بالذكاء الاصطناعي (DALL-E / Midjourney).</li>
              <li>الترجمة والتحرير الآلي للأخبار الإنجليزية.</li>
              <li>منصة سوق إلكتروني لبيع الفرص والمدفوعات الإلكترونية.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Video Modal Placeholder */}
      <Modal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
        subtitle={`Demo Video Walkthrough (Duration: ${selectedVideo?.duration})`}
      >
        <div className="space-y-4 text-start">
          <div className="aspect-video bg-[#0F1A18] rounded flex flex-col items-center justify-center p-6 text-center text-[#EAE6DB]">
            <Video size={40} className="text-[#B08A4A] mb-3" />
            <h4 className="font-headline font-semibold text-base">
              تسجيل تدريبي عالي الدقة (Full HD Walkthrough)
            </h4>
            <p className="text-xs text-[#76827E] mt-1 max-w-sm font-arabic">
              سيتم تسجيل هذا الفيديو باللغة العربية مع تسليم المشروع الفعلي لإرشاد فريق التحرير خطوة بخطوة.
            </p>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setSelectedVideo(null)}>
              إغلاق / Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
