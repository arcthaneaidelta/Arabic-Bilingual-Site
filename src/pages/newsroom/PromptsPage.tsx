import React, { useState } from 'react';
import {
  Cpu,
  ShieldAlert,
  Save,
  RotateCcw,
  Sparkles,
  KeyRound,
  Calculator,
  CheckCircle2,
  FileCode,
} from 'lucide-react';
import { useNewsroomStore } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { AI_PROVIDERS } from '../../data/prompts';
import { Button } from '../../components/ui/Button';
import { useT, useLang } from '../../i18n/useT';

export const PromptsPage: React.FC = () => {
  const {
    prompts,
    updatePrompt,
    selectedProvider,
    selectedModel,
    setProvider,
  } = useNewsroomStore();
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [activePromptId, setActivePromptId] = useState(prompts[0].id);
  const [editorContent, setEditorContent] = useState(prompts[0].content);
  const [safetyUnlocked, setSafetyUnlocked] = useState(false);
  const [articlesPerDay, setArticlesPerDay] = useState(20);

  const activePrompt = prompts.find((p) => p.id === activePromptId) || prompts[0];

  const handleSelectPrompt = (id: string) => {
    setActivePromptId(id);
    const p = prompts.find((item) => item.id === id);
    if (p) setEditorContent(p.content);
  };

  const handleSave = () => {
    updatePrompt(activePromptId, editorContent);
    showToast(
      lang === 'ar' ? 'تم حفظ التعديلات' : 'Prompt Saved',
      lang === 'ar' ? `تم تحديث ${activePrompt.name} بنجاح.` : `${activePrompt.name} configuration saved.`,
      'success'
    );
  };

  const handleProviderChange = (providerId: string, modelId: string) => {
    setProvider(providerId, modelId);
    showToast(
      'Provider Swapped',
      `Swapped to ${providerId.toUpperCase()} (${modelId}). Prompts remain 100% portable.`,
      'info'
    );
  };

  // Cost estimation formula: 20 drafts/day * 30 days = 600 calls * 3k tokens = ~1.8M tokens ($3.6 - $6.5 / month)
  const monthlyCostMin = Math.round(articlesPerDay * 30 * 0.0055);
  const monthlyCostMax = Math.round(articlesPerDay * 30 * 0.0095);

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="pb-4 border-b border-[#E4DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
            {t.newsroom.prompts.title}
          </h1>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {t.newsroom.prompts.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Prompt Files List (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#E4DFD3] rounded-md p-4 shadow-xs space-y-2">
          <div className="text-xs font-bold uppercase text-[#76827E] font-mono mb-2">
            Prompt Modules
          </div>
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPrompt(p.id)}
              className={`w-full text-start p-3 rounded text-xs transition-colors flex items-center justify-between ${
                activePromptId === p.id
                  ? 'bg-[#1F4D45] text-white font-semibold'
                  : 'hover:bg-[#FBF9F4] text-[#42504C]'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  {p.isSafety && <ShieldAlert size={13} className="text-[#B08A4A]" />}
                  <span>{p.name}</span>
                </div>
                <div className="text-[10px] opacity-75 font-mono mt-0.5">
                  {p.version}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Center: Editor Canvas (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD3]">
            <div>
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {activePrompt.name}
              </h3>
              <span className="text-[11px] font-mono text-[#76827E]">
                {activePrompt.version}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="primary" onClick={handleSave}>
                <Save size={14} />
                <span>حفظ التعديل / Save</span>
              </Button>
            </div>
          </div>

          {activePrompt.isSafety && !safetyUnlocked ? (
            <div className="p-4 bg-[#FAEFD9] border border-[#B7791F] rounded text-xs space-y-3">
              <div className="font-bold text-[#B7791F] flex items-center gap-1.5">
                <ShieldAlert size={16} />
                <span>Fact-Safety Guard Directives are Locked</span>
              </div>
              <p className="text-[#14201D] font-arabic leading-relaxed">
                هذه القواعد تحظر اختلاق الحقائق والأسماء وتجبر النموذج على تتبع المصدر بدقة. لفك قفل التعديل يرجى التأكيد.
              </p>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setSafetyUnlocked(true)}
              >
                تأكيد فك القفل للتعديل
              </Button>
            </div>
          ) : (
            <textarea
              rows={16}
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="w-full p-4 bg-[#0F1A18] text-[#EAE6DB] font-mono text-xs leading-relaxed rounded border border-[#1F4D45] focus:outline-none focus:ring-1 focus:ring-[#B08A4A]"
            />
          )}
        </div>

        {/* Right: Model Selector & Cost Estimator (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Provider Swap Card */}
          <div className="bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs space-y-3">
            <h4 className="font-headline font-semibold text-sm text-[#14201D] pb-2 border-b border-[#E4DFD3]">
              {t.newsroom.prompts.provider}
            </h4>

            <div className="space-y-2">
              {AI_PROVIDERS.map((prov) => (
                <div
                  key={prov.id}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    selectedProvider === prov.id
                      ? 'border-[#1F4D45] bg-[#E5EEEB]/40'
                      : 'border-[#E4DFD3] hover:bg-[#FBF9F4]'
                  }`}
                  onClick={() => handleProviderChange(prov.id, prov.models[0].id)}
                >
                  <div className="flex items-center justify-between font-semibold text-xs text-[#14201D]">
                    <span>{prov.name}</span>
                    {selectedProvider === prov.id && (
                      <CheckCircle2 size={14} className="text-[#3F7D58]" />
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-[#76827E] mt-0.5">
                    Model: {prov.models[0].name}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#FBF9F4] rounded border border-[#E4DFD3] text-[11px] text-[#76827E] flex items-start gap-2">
              <KeyRound size={15} className="text-[#B08A4A] shrink-0 mt-0.5" />
              <span>{t.newsroom.prompts.credentialsNote}</span>
            </div>
          </div>

          {/* Monthly Cost Estimator Card */}
          <div className="bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#E4DFD3]">
              <Calculator size={15} className="text-[#1F4D45]" />
              <h4 className="font-headline font-semibold text-sm text-[#14201D]">
                {t.newsroom.prompts.costEstimator}
              </h4>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#76827E]">Target Drafts/Day:</span>
                <span className="font-mono font-bold text-[#1F4D45]">
                  {articlesPerDay} مقال / day
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={articlesPerDay}
                onChange={(e) => setArticlesPerDay(Number(e.target.value))}
                className="w-full accent-[#1F4D45] cursor-pointer"
              />
            </div>

            <div className="p-3 bg-[#E5EEEB] rounded text-center">
              <div className="text-[10px] uppercase font-mono text-[#76827E]">
                Estimated Monthly API Cost
              </div>
              <div className="font-headline font-bold text-lg text-[#1F4D45]">
                ${monthlyCostMin} – ${monthlyCostMax} / month
              </div>
              <div className="text-[10px] text-[#76827E] mt-0.5 font-mono">
                (~{articlesPerDay * 30} single-call executions)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
