import React, { useState } from 'react';
import {
  Play,
  FastForward,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  ChevronLeft,
  FileCode,
  ShieldAlert,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { useNewsroomStore, PipelineToken } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { Drawer } from '../../components/ui/Drawer';
import { Button } from '../../components/ui/Button';
import { useT, useLang } from '../../i18n/useT';

export const PipelinePage: React.FC = () => {
  const {
    isPipelineRunning,
    pipelineSpeed,
    setPipelineSpeed,
    skipAnimation,
    toggleSkipAnimation,
    pipelineCurrentStage,
    pipelineActiveTokens,
    runPipelineSimulation,
    pipelineIntervalMinutes,
    drafts,
  } = useNewsroomStore();

  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';

  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState<PipelineToken | null>(null);

  const nodes = [
    {
      id: 1,
      title: 'Google Sheet',
      subtitle: 'Read sources (14 feeds)',
      metric: '14 Active Sources',
      desc: 'Fetches the live list of RSS feeds and publication settings directly from the client’s Google Sheet.',
      config: 'Interval: 45 min · Fallback: In-memory cache',
    },
    {
      id: 2,
      title: 'RSS Feeds',
      subtitle: 'Fetch feed XMLs',
      metric: '112 Scanned Items',
      desc: 'Retrieves standard RSS/Atom payloads concurrently across GCC and international media feeds.',
      config: 'User-Agent: EmtiazNewsBot/1.0 · Timeout: 12s',
    },
    {
      id: 3,
      title: 'New Items?',
      subtitle: 'Detect new articles',
      metric: '31 New Articles',
      desc: 'Compares publication GUID and published_at timestamps against previously logged articles.',
      config: 'Window: 48 hours · Database: n8n Key-Value Store',
    },
    {
      id: 4,
      title: 'Duplicate Check',
      subtitle: 'URL + Title vector',
      metric: '−4 Duplicates Filtered',
      desc: 'Identifies syndicated and duplicate releases across different feeds before calling the LLM to prevent wasteful cost.',
      config: 'Threshold: 0.92 Levenshtein string match · Cost saved: $0.18',
    },
    {
      id: 5,
      title: 'Content Check',
      subtitle: 'RSS depth evaluation',
      metric: '19 RSS OK · 6 Fetched',
      desc: 'Evaluates if RSS summary is sufficient (>150 words). If thin, cleanly fetches the public page and strips boilerplate. Paywalls are skipped.',
      config: 'Boilerplate parser: Readability.js · Paywall policy: Skip & Log (No bypass)',
    },
    {
      id: 6,
      title: 'LLM (1 Call)',
      subtitle: '5 Tasks unified',
      metric: '25 Prompt Invocations',
      desc: 'Executes all 5 tasks in a single LLM execution: Relevance validation, Taxonomy classification, Fact extraction, Arabic draft generation, and Rank Math SEO fields.',
      config: 'Model: OpenAI GPT-4o · Schema: Structured JSON Outputs · Temp: 0.2',
    },
    {
      id: 7,
      title: 'WordPress',
      subtitle: 'Create draft (WPML ar)',
      metric: '22 Drafts Created',
      desc: 'Submits the generated draft to WordPress REST API with mandatory WPML lang="ar" guard, Rank Math post meta, and editorial warning headers.',
      config: 'Auth: Application Passwords · Endpoint: /wp-json/wp/v2/posts · Guard: Active',
    },
    {
      id: 8,
      title: 'Sheet Log',
      subtitle: 'Write result row',
      metric: 'Audit Row Appended',
      desc: 'Appends full diagnostic record (Timestamp, Original URL, Result, Relevance, Warning, Error) back into Google Sheets.',
      config: 'Target: Sheet [Log] · Columns: 12 · Status: Verified',
    },
  ];

  const handleStartRun = () => {
    runPipelineSimulation();
    showToast(
      lang === 'ar' ? 'بدء تشغيل مسار n8n' : 'n8n Workflow Triggered',
      lang === 'ar' ? 'جارٍ مسح المصادر الـ 14 وتوليد المسودات...' : 'Scanning 14 sources and executing single-call LLMs...',
      'info'
    );
  };

  const selectedNodeData = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="space-y-6 text-start">
      {/* Control Bar */}
      <div className="p-4 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            loading={isPipelineRunning}
            onClick={handleStartRun}
          >
            <Play size={16} className="fill-current" />
            <span>{isPipelineRunning ? 'جارٍ تنفيذ المسار...' : t.newsroom.runNow}</span>
          </Button>

          <div className="flex items-center gap-1 bg-[#FBF9F4] p-1 border border-[#CFC8B8] rounded text-xs font-mono">
            <span className="text-[#76827E] px-1">{t.newsroom.pipeline.speed}:</span>
            {[1, 2, 10].map((s) => (
              <button
                key={s}
                onClick={() => setPipelineSpeed(s as 1 | 2 | 10)}
                className={`px-2 py-0.5 rounded font-bold transition-colors ${
                  pipelineSpeed === s ? 'bg-[#1F4D45] text-white' : 'text-[#42504C] hover:bg-[#E9E2D2]'
                }`}
              >
                {s === 10 ? 'Instant' : `${s}×`}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 text-xs text-[#76827E] cursor-pointer">
            <input
              type="checkbox"
              checked={skipAnimation}
              onChange={toggleSkipAnimation}
            />
            <span>{t.newsroom.pipeline.skipAnimation}</span>
          </label>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#42504C]">
            <Clock size={14} className="text-[#B08A4A]" />
            <span>Interval: {pipelineIntervalMinutes}m</span>
          </div>

          <span
            className={`px-2.5 py-1 rounded font-bold ${
              isPipelineRunning
                ? 'bg-[#B08A4A] text-white animate-pulse'
                : 'bg-[#E3F0E8] text-[#3F7D58]'
            }`}
          >
            {isPipelineRunning ? t.newsroom.pipeline.statusRunning : t.newsroom.pipeline.statusIdle}
          </span>
        </div>
      </div>

      {/* Hero Visual: 8-Node n8n Workflow Graph Canvas */}
      <div className="bg-[#FFFFFF] border border-[#E4DFD3] rounded-md p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E4DFD3]">
          <div>
            <h3 className="font-headline font-semibold text-lg text-[#14201D]">
              {t.newsroom.pipeline.title}
            </h3>
            <p className="text-xs text-[#76827E] font-arabic">
              {t.newsroom.pipeline.sub}
            </p>
          </div>
          <div className="text-[11px] font-mono text-[#76827E]">
            Click any node for operational config and logs
          </div>
        </div>

        {/* Node Graph Track */}
        <div className="min-w-[1080px] py-8 flex items-center justify-between relative">
          {/* Connecting Backbone Hairline */}
          <div className="absolute top-1/2 inset-x-12 h-[2px] bg-[#E4DFD3] -translate-y-1/2 z-0" />

          {nodes.map((node) => {
            const isActive = isPipelineRunning && pipelineCurrentStage === node.id;
            const isCompleted = pipelineCurrentStage > node.id;

            return (
              <div key={node.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setSelectedNode(node.id)}
                  className={`w-36 p-3 rounded-md border text-start transition-all transform hover:scale-105 ${
                    isActive
                      ? 'bg-[#1F4D45] text-white border-[#B08A4A] ring-4 ring-[#B08A4A]/30 shadow-md'
                      : isCompleted
                      ? 'bg-white border-[#1F4D45] text-[#14201D] shadow-xs'
                      : 'bg-[#FBF9F4] border-[#E4DFD3] text-[#76827E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        isActive
                          ? 'bg-[#B08A4A] text-white'
                          : isCompleted
                          ? 'bg-[#E5EEEB] text-[#1F4D45]'
                          : 'bg-[#E4DFD3] text-[#76827E]'
                      }`}
                    >
                      Node 0{node.id}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 size={13} className="text-[#3F7D58]" />
                    )}
                  </div>

                  <h5 className="font-headline font-bold text-xs truncate">
                    {node.title}
                  </h5>
                  <p className="text-[10px] truncate opacity-80 mt-0.5">
                    {node.subtitle}
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-current/20 text-[9px] font-mono truncate font-semibold">
                    {node.metric}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Stream & Outcome Traces */}
      <div className="bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E4DFD3]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1F4D45]" />
            <h4 className="font-headline font-semibold text-base text-[#14201D]">
              {t.newsroom.pipeline.itemStreamTitle}
            </h4>
          </div>
          <span className="text-xs font-mono text-[#76827E]">
            {pipelineActiveTokens.length > 0 ? `${pipelineActiveTokens.length} items evaluated` : 'Ready to ingest'}
          </span>
        </div>

        {pipelineActiveTokens.length > 0 ? (
          <div className="space-y-3">
            {pipelineActiveTokens.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedToken(item)}
                className={`p-3.5 rounded border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  item.outcome === 'warned'
                    ? 'bg-[#FAEFD9]/40 border-[#B7791F]'
                    : item.outcome === 'rejected'
                    ? 'bg-[#FBF9F4] border-[#E4DFD3] opacity-60'
                    : item.outcome === 'duplicate'
                    ? 'bg-[#E3ECF3]/40 border-[#3E6A8A]'
                    : 'bg-white border-[#E4DFD3] hover:border-[#1F4D45]'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        item.outcome === 'warned'
                          ? 'bg-[#B7791F] text-white'
                          : item.outcome === 'drafted'
                          ? 'bg-[#3F7D58] text-white'
                          : item.outcome === 'duplicate'
                          ? 'bg-[#3E6A8A] text-white'
                          : 'bg-[#76827E] text-white'
                      }`}
                    >
                      {item.outcome}
                    </span>
                    <span className="text-xs font-mono text-[#76827E]">
                      {item.source}
                    </span>
                  </div>
                  <h5 className="font-headline font-semibold text-sm text-[#14201D] truncate">
                    {item.title}
                  </h5>
                  <p className="text-xs text-[#42504C] mt-0.5 font-arabic">
                    {item.note}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <span className="text-xs font-mono text-[#1F4D45] underline">
                    Inspect LLM / Extraction ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#76827E] font-arabic">
            اضغط على "تشغيل المسار الآن" لبدء دورة المحاكاة ومشاهدة تدفق الأخبار وتطبيق قواعد الأمان.
          </div>
        )}
      </div>

      {/* Node Config Drawer */}
      <Drawer
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        title={selectedNodeData ? `Node 0${selectedNodeData.id}: ${selectedNodeData.title}` : ''}
        subtitle={selectedNodeData?.subtitle}
      >
        {selectedNodeData && (
          <div className="space-y-6 text-start">
            <div className="p-3 bg-[#FBF9F4] border border-[#E4DFD3] rounded text-xs text-[#42504C] leading-relaxed font-arabic">
              {selectedNodeData.desc}
            </div>

            <div>
              <div className="text-xs font-semibold uppercase text-[#76827E] font-mono mb-2">
                Node Configuration Parameters
              </div>
              <div className="p-3 bg-[#0F1A18] text-[#EAE6DB] rounded font-mono text-xs leading-relaxed">
                {selectedNodeData.config}
              </div>
            </div>

            <div className="p-4 bg-[#E5EEEB] border border-[#1F4D45]/30 rounded text-xs text-[#1F4D45]">
              <div className="font-bold mb-1">Fail-Safe Design:</div>
              Any error, timeout, or paywall encountered at this node is cleanly caught and logged to Google Sheets without interrupting the overall pipeline.
            </div>
          </div>
        )}
      </Drawer>

      {/* Single-Call LLM 5-Task Result Drawer (Section 13.3) */}
      <Drawer
        isOpen={selectedToken !== null}
        onClose={() => setSelectedToken(null)}
        title="Single-Call LLM Execution Payload"
        subtitle="5 Tasks Unified in 1 Call · Zero Cost Waste"
        width="max-w-[560px]"
      >
        {selectedToken && (
          <div className="space-y-6 text-start">
            {/* Stats Header */}
            <div className="p-3 bg-[#16241F] text-[#EAE6DB] rounded flex items-center justify-between text-xs font-mono">
              <span>Token: 2.1k in · 0.9k out</span>
              <span className="text-[#B08A4A]">1 Execution Call</span>
            </div>

            {/* Task 1: Relevance */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded">
              <div className="text-xs font-bold text-[#1F4D45] uppercase font-mono mb-1">
                1. Relevance Evaluation
              </div>
              <div className="text-xs text-[#42504C]">
                Result: <strong className="text-[#3F7D58]">FRANCHISE_RELEVANT (Score: 0.98)</strong>
              </div>
              <div className="text-[11px] text-[#76827E] mt-1 font-arabic">
                تم التحقق: الخبر يتضمن اتفاقية منح امتياز رئيسي في دول الخليج.
              </div>
            </div>

            {/* Task 2: Classification */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded">
              <div className="text-xs font-bold text-[#1F4D45] uppercase font-mono mb-1">
                2. Geography & Topic Classification
              </div>
              <div className="text-xs space-y-1 font-mono">
                <div>Geography: <span className="text-[#1F4D45] font-bold">GCC (Kuwait)</span></div>
                <div>Topic: <span className="text-[#1F4D45] font-bold">Franchise Agreements</span></div>
              </div>
            </div>

            {/* Task 3: Fact Extraction */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded">
              <div className="text-xs font-bold text-[#1F4D45] uppercase font-mono mb-2">
                3. Fact Extraction & Verification
              </div>
              <div className="space-y-1 text-xs">
                <div className="p-1.5 bg-[#FBF9F4] rounded flex justify-between">
                  <span>Brand:</span>
                  <span className="font-semibold">Hala Coffee Roasters</span>
                </div>
                <div className="p-1.5 bg-[#FBF9F4] rounded flex justify-between">
                  <span>Partner:</span>
                  <span className="font-semibold">Al-Dhow Hospitality</span>
                </div>
                <div className="p-1.5 bg-[#FAEFD9] rounded flex justify-between text-[#B7791F]">
                  <span>Investment:</span>
                  <span className="font-bold">Conflicting: 40M vs 4M (Flagged)</span>
                </div>
              </div>
            </div>

            {/* Task 4: Arabic Article Draft */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded">
              <div className="text-xs font-bold text-[#1F4D45] uppercase font-mono mb-2">
                4. Arabic Editorial Article ({selectedToken.wordsCount || 420} words)
              </div>
              <p className="text-xs text-[#14201D] font-arabic leading-relaxed">
                «هالة لتحميص القهوة» تبرم اتفاقية امتياز رئيسية للتوسع في الكويت، مستهدفة تدشين 25 موقعاً خلال 5 سنوات عبر شراكة مع مجموعة الضو للضيافة...
              </p>
            </div>

            {/* Task 5: Rank Math SEO Fields */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded">
              <div className="text-xs font-bold text-[#1F4D45] uppercase font-mono mb-2">
                5. Rank Math SEO Fields
              </div>
              <div className="text-xs font-mono space-y-1">
                <div className="text-[#1F4D45]">rank_math_title: 54 chars ✓</div>
                <div className="text-[#1F4D45]">rank_math_description: 148 chars ✓</div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
