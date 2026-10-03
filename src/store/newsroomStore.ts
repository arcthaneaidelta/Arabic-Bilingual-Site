import { create } from 'zustand';
import { INITIAL_SOURCES, SourceItem } from '../data/sources';
import { ARTICLES_DATA, ArticleItem } from '../data/articles';
import { PROMPTS_DATA, PromptConfig } from '../data/prompts';

export type { SourceItem };

export interface LogEntry {
  id: string;
  timestamp: string;
  originalTitle: string;
  sourceName: string;
  originalUrl: string;
  result: 'Drafted' | 'Rejected' | 'Duplicate' | 'Skipped' | 'Error';
  relevance: string;
  geo: string;
  topic: string;
  wpPostId?: number;
  wpDraftUrl?: string;
  warningNote?: string;
  errorMessage?: string;
}

export interface PipelineToken {
  id: string;
  title: string;
  source: string;
  stage: number;
  outcome: 'pending' | 'drafted' | 'warned' | 'rejected' | 'duplicate' | 'paywall' | 'error';
  wordsCount?: number;
  rssWords?: number;
  note?: string;
}

export interface DraftItem extends ArticleItem {
  status: 'draft' | 'needs_review' | 'published';
  wpPostId: number;
  wpmlLang: 'ar';
  isAutoPublished?: boolean;
}

const INITIAL_DRAFTS: DraftItem[] = [
  {
    ...ARTICLES_DATA[0], // Hala Coffee (warning conflict 40M vs 4M)
    status: 'needs_review',
    wpPostId: 4182,
    wpmlLang: 'ar',
  },
  {
    ...ARTICLES_DATA[1], // Nakheel
    status: 'published',
    wpPostId: 4183,
    wpmlLang: 'ar',
    isAutoPublished: true,
  },
  {
    ...ARTICLES_DATA[2], // Sahab
    status: 'draft',
    wpPostId: 4184,
    wpmlLang: 'ar',
  },
  {
    ...ARTICLES_DATA[3], // Mizan
    status: 'draft',
    wpPostId: 4185,
    wpmlLang: 'ar',
  },
  {
    ...ARTICLES_DATA[4], // Dar burger
    status: 'draft',
    wpPostId: 4186,
    wpmlLang: 'ar',
  },
  {
    ...ARTICLES_DATA[6], // Qalam
    status: 'draft',
    wpPostId: 4187,
    wpmlLang: 'ar',
  },
  {
    ...ARTICLES_DATA[7], // Global retail
    status: 'draft',
    wpPostId: 4188,
    wpmlLang: 'ar',
  },
  {
    ...ARTICLES_DATA[8], // US fast casual
    status: 'draft',
    wpPostId: 4189,
    wpmlLang: 'ar',
  },
  // Additional items to reach exactly 23 drafts in initial state
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `draft-extra-${i + 1}`,
    slug: `franchise-deal-dispatch-${i + 1}`,
    titleAr: `صفقة تطوير وتوسع تجاري جديدة رقم ${i + 1} لقطاع التجزئة والضيافة`,
    titleEn: `Commercial Expansion & Franchise Development Deal #${i + 1}`,
    excerptAr: `ملخص مسودة إخبارية تم استخلاصها ومراجعتها آلياً لحركة الامتياز في المنطقة.`,
    excerptEn: `Automated franchise intelligence draft dispatch for regional market expansion.`,
    bodyAr: `تم رصد هذا التوسع التجاري عبر تغذيات الأخبار الشريكة، وتتضمن الاتفاقية تدشين وحدات امتياز جديدة.`,
    bodyEn: `Commercial expansion captured via certified partner feeds covering multi-unit rollout.`,
    geo: (['saudi', 'gcc', 'mena', 'intl'] as const)[i % 4],
    topic: (['expansion', 'agreements', 'fnb', 'retail'] as const)[i % 4],
    sourceName: i % 2 === 0 ? 'Gulf Franchise Review' : 'Saudi Business Brief',
    sourceUrl: 'https://example.com/source',
    publishedDaysAgo: 0,
    readTimeMin: 2,
    wordCount: 320 + i * 15,
    isAiAssisted: true,
    facts: [
      { key: 'deal', labelAr: 'نوع الصفقة', labelEn: 'Deal', valueAr: 'توسع امتياز تجاري', valueEn: 'Franchise Expansion', supported: true }
    ],
    monogram: 'F',
    categoryColor: '#1F4D45',
    status: (i === 0 || i === 1 ? 'needs_review' : i === 2 ? 'published' : 'draft') as 'draft' | 'needs_review' | 'published',
    hasWarning: i === 0 || i === 1,
    warningNoteAr: i === 0 ? 'ملاحظة تحريرية — الشريك المانح لم يحدد تاريخ بدء العمليات بوضوح.' : undefined,
    warningNoteEn: i === 0 ? 'Editorial note — Start date unconfirmed in source.' : undefined,
    wpPostId: 4190 + i,
    wpmlLang: 'ar' as const,
  }))
];

const INITIAL_LOG_ENTRIES: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '11:20:14',
    originalTitle: 'Hala Coffee Roasters inks master franchise deal for Kuwait',
    sourceName: 'Gulf Franchise Review',
    originalUrl: 'https://gulffranchisereview.example.com/articles/hala-coffee-kuwait-deal',
    result: 'Drafted',
    relevance: 'Franchise Deal (Score: 0.96)',
    geo: 'GCC',
    topic: 'Franchise Agreements',
    wpPostId: 4182,
    wpDraftUrl: 'https://emtiaz.live/wp-admin/post.php?post=4182&action=edit',
    warningNote: 'Financial conflict: SAR 40M in title vs SAR 4M in body',
  },
  {
    id: 'log-2',
    timestamp: '11:18:45',
    originalTitle: 'Nakheel Fresh Market announces community store franchising Western Province',
    sourceName: 'Saudi Business Brief',
    originalUrl: 'https://saudibrief.example.sa/rss/nakheel-fresh-deals',
    result: 'Drafted',
    relevance: 'Brand Expansion (Score: 0.94)',
    geo: 'Saudi Arabia',
    topic: 'Retail',
    wpPostId: 4183,
    wpDraftUrl: 'https://emtiaz.live/wp-admin/post.php?post=4183&action=edit',
  },
  {
    id: 'log-3',
    timestamp: '11:15:22',
    originalTitle: 'Crude Oil Benchmarks Rise Following OPEC+ Ministerial Briefing',
    sourceName: 'Retail Middle East Digest',
    originalUrl: 'https://retailmedigest.example.com/macro/oil-update',
    result: 'Rejected',
    relevance: 'Irrelevant — Macro commodities; zero franchise context',
    geo: 'International',
    topic: 'Macroeconomics',
  },
  {
    id: 'log-4',
    timestamp: '11:12:05',
    originalTitle: 'Hala Coffee Roasters to enter Kuwait retail market',
    sourceName: 'Franchise Wire International',
    originalUrl: 'https://franchisewire.example.org/mena/hala-kuwait',
    result: 'Duplicate',
    relevance: 'Duplicate detected against log-1 (similarity 0.98)',
    geo: 'GCC',
    topic: 'Franchise Agreements',
  },
  {
    id: 'log-5',
    timestamp: '11:08:40',
    originalTitle: 'Exclusive: GCC Luxury Brands Investor Quarterly Premium Intelligence',
    sourceName: 'MENA Hospitality Report',
    originalUrl: 'https://menahospitality.example.com/premium/luxury-q3',
    result: 'Skipped',
    relevance: 'Paywall marker / HTTP 402 detected; skipped without bypass',
    geo: 'GCC',
    topic: 'Hospitality',
  },
  {
    id: 'log-6',
    timestamp: '10:55:10',
    originalTitle: 'Retail Gateway feed error during socket read',
    sourceName: 'Investors\' Gulf Bulletin',
    originalUrl: 'https://gulfbulletin.example.com/feed.rss',
    result: 'Error',
    relevance: 'Connection failure: 403 Forbidden from target server',
    geo: 'GCC',
    topic: 'System',
    errorMessage: 'HTTP 403 Forbidden',
  },
];

interface NewsroomState {
  sources: SourceItem[];
  drafts: DraftItem[];
  logEntries: LogEntry[];
  pipelineIntervalMinutes: 30 | 45 | 60;
  isPipelineRunning: boolean;
  pipelineSpeed: 1 | 2 | 10;
  skipAnimation: boolean;
  pipelineCurrentStage: number; // 0 to 8
  pipelineActiveTokens: PipelineToken[];
  pipelineSelectedNode: number | null;
  pipelineSelectedItem: PipelineToken | null;
  selectedProvider: string;
  selectedModel: string;
  prompts: PromptConfig[];
  
  // Actions
  toggleSourceEnabled: (id: string) => void;
  toggleSourceTrusted: (id: string) => void;
  toggleSourceAutoPublish: (id: string) => void;
  addSource: (source: Omit<SourceItem, 'id' | 'itemsToday' | 'status' | 'lastChecked'>) => void;
  deleteSource: (id: string) => void;
  testFeedSource: (id: string) => Promise<{ success: boolean; message: string }>;
  setIntervalMinutes: (val: 30 | 45 | 60) => void;
  setPipelineSpeed: (speed: 1 | 2 | 10) => void;
  toggleSkipAnimation: () => void;
  selectPipelineNode: (node: number | null) => void;
  selectPipelineItem: (item: PipelineToken | null) => void;
  runPipelineSimulation: () => void;
  approveDraft: (id: string) => void;
  keepDraft: (id: string) => void;
  updateDraftContent: (id: string, newBody: string) => void;
  setProvider: (providerId: string, modelId: string) => void;
  updatePrompt: (id: string, content: string) => void;
  resetAllDemoData: () => void;
  retryLogError: (id: string) => Promise<void>;
}

export const useNewsroomStore = create<NewsroomState>((set, get) => ({
  sources: INITIAL_SOURCES,
  drafts: INITIAL_DRAFTS,
  logEntries: INITIAL_LOG_ENTRIES,
  pipelineIntervalMinutes: 45,
  isPipelineRunning: false,
  pipelineSpeed: 1,
  skipAnimation: false,
  pipelineCurrentStage: 0,
  pipelineActiveTokens: [],
  pipelineSelectedNode: null,
  pipelineSelectedItem: null,
  selectedProvider: 'openai',
  selectedModel: 'gpt-4o',
  prompts: PROMPTS_DATA,

  toggleSourceEnabled: (id) =>
    set((s) => ({
      sources: s.sources.map((src) =>
        src.id === id
          ? {
              ...src,
              enabled: !src.enabled,
              status: !src.enabled ? 'active' : 'paused',
              lastChecked: !src.enabled ? 'منذ دقيقة / 1m ago' : 'متوقف مؤقتاً / Paused',
            }
          : src
      ),
    })),

  toggleSourceTrusted: (id) =>
    set((s) => ({
      sources: s.sources.map((src) =>
        src.id === id ? { ...src, trusted: !src.trusted } : src
      ),
    })),

  toggleSourceAutoPublish: (id) =>
    set((s) => ({
      sources: s.sources.map((src) =>
        src.id === id ? { ...src, autoPublish: !src.autoPublish } : src
      ),
    })),

  addSource: (newSrc) =>
    set((s) => ({
      sources: [
        {
          ...newSrc,
          id: `src-${Date.now()}`,
          itemsToday: 0,
          status: 'active',
          lastChecked: 'تمت الإضافة للتو / Just added',
        },
        ...s.sources,
      ],
    })),

  deleteSource: (id) =>
    set((s) => ({
      sources: s.sources.filter((src) => src.id !== id),
    })),

  testFeedSource: async (id) => {
    const src = get().sources.find((s) => s.id === id);
    await new Promise((r) => setTimeout(r, 800));
    if (src && (src.url.includes('403') || src.name.includes('Investors'))) {
      return { success: false, message: '403 Forbidden — check feed URL' };
    }
    return { success: true, message: 'Found 12 items · 3 new' };
  },

  setIntervalMinutes: (val) => set({ pipelineIntervalMinutes: val }),
  setPipelineSpeed: (speed) => set({ pipelineSpeed: speed }),
  toggleSkipAnimation: () => set((s) => ({ skipAnimation: !s.skipAnimation })),
  selectPipelineNode: (node) => set({ pipelineSelectedNode: node }),
  selectPipelineItem: (item) => set({ pipelineSelectedItem: item }),

  runPipelineSimulation: () => {
    if (get().isPipelineRunning) return;
    set({
      isPipelineRunning: true,
      pipelineCurrentStage: 1,
      pipelineActiveTokens: [],
    });

    const isFast = get().skipAnimation;
    const speed = get().pipelineSpeed;
    const baseDelay = isFast ? 100 : Math.round(1100 / speed);

    const tokensSequence: PipelineToken[] = [
      {
        id: 'tok-1',
        title: 'Hala Coffee Roasters Kuwait Master Franchise',
        source: 'Gulf Franchise Review',
        stage: 1,
        outcome: 'warned',
        wordsCount: 420,
        rssWords: 41,
        note: 'RSS gave 41 words. Fetched full page (1,140 words). Ambiguity caught: 40M vs 4M.',
      },
      {
        id: 'tok-2',
        title: 'Nakheel Fresh Market Western Province Sub-Franchise',
        source: 'Saudi Business Brief',
        stage: 1,
        outcome: 'drafted',
        wordsCount: 280,
        rssWords: 240,
        note: 'RSS was sufficient (240 words). Full draft generated cleanly.',
      },
      {
        id: 'tok-3',
        title: 'Crude Oil OPEC+ Production Targets Announcement',
        source: 'Retail Middle East Digest',
        stage: 1,
        outcome: 'rejected',
        note: 'Rejected at LLM stage — Macroeconomics / Zero franchise relevance.',
      },
      {
        id: 'tok-4',
        title: 'Hala Coffee Kuwait Expansion Duplicate Feed',
        source: 'Franchise Wire International',
        stage: 1,
        outcome: 'duplicate',
        note: 'Duplicate URL and title match against tok-1. Filtered before LLM.',
      },
      {
        id: 'tok-5',
        title: 'Premium Hospitality GCC Quarterly Closed Dossier',
        source: 'MENA Hospitality Report',
        stage: 1,
        outcome: 'paywall',
        note: 'HTTP 402 Paywall marker detected. Safely skipped without bypass.',
      },
      {
        id: 'tok-6',
        title: 'Sahab Kitchen Virtual Hubs UAE & Qatar Expansion',
        source: 'Emirates Commerce Journal',
        stage: 1,
        outcome: 'drafted',
        wordsCount: 310,
        rssWords: 52,
        note: 'RSS thin (52 words). Public page fetched. Extracted 890 words.',
      },
    ];

    let currentStage = 1;
    const timer = setInterval(() => {
      currentStage += 1;
      if (currentStage > 8) {
        clearInterval(timer);
        // Complete the run
        set((s) => ({
          isPipelineRunning: false,
          pipelineCurrentStage: 8,
          pipelineActiveTokens: tokensSequence.map((t) => ({ ...t, stage: 8 })),
          logEntries: [
            {
              id: `log-live-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
              originalTitle: 'Hala Coffee Roasters Kuwait Master Franchise',
              sourceName: 'Gulf Franchise Review',
              originalUrl: 'https://gulffranchisereview.example.com/articles/hala-coffee-kuwait-deal',
              result: 'Drafted',
              relevance: 'Franchise Expansion (0.97)',
              geo: 'GCC',
              topic: 'Franchise Agreements',
              wpPostId: 4201,
              warningNote: 'Financial conflict: SAR 40M vs SAR 4M',
            },
            ...s.logEntries,
          ],
        }));
      } else {
        set({
          pipelineCurrentStage: currentStage,
          pipelineActiveTokens: tokensSequence.map((t) => ({
            ...t,
            stage: Math.min(currentStage, t.outcome === 'duplicate' ? 4 : t.outcome === 'paywall' ? 5 : t.outcome === 'rejected' ? 6 : currentStage),
          })),
        });
      }
    }, baseDelay);
  },

  approveDraft: (id) =>
    set((s) => ({
      drafts: s.drafts.map((d) =>
        d.id === id ? { ...d, status: 'published', hasWarning: false } : d
      ),
    })),

  keepDraft: (id) =>
    set((s) => ({
      drafts: s.drafts.map((d) =>
        d.id === id ? { ...d, status: 'draft' } : d
      ),
    })),

  updateDraftContent: (id, newBody) =>
    set((s) => ({
      drafts: s.drafts.map((d) =>
        d.id === id ? { ...d, bodyAr: newBody } : d
      ),
    })),

  setProvider: (providerId, modelId) =>
    set({ selectedProvider: providerId, selectedModel: modelId }),

  updatePrompt: (id, content) =>
    set((s) => ({
      prompts: s.prompts.map((p) =>
        p.id === id ? { ...p, content, version: `${p.version.split('·')[0]}· مُعدلة` } : p
      ),
    })),

  resetAllDemoData: () =>
    set({
      sources: INITIAL_SOURCES,
      drafts: INITIAL_DRAFTS,
      logEntries: INITIAL_LOG_ENTRIES,
      pipelineIntervalMinutes: 45,
      isPipelineRunning: false,
      pipelineCurrentStage: 0,
      pipelineActiveTokens: [],
      prompts: PROMPTS_DATA,
    }),

  retryLogError: async (id) => {
    await new Promise((r) => setTimeout(r, 700));
    set((s) => ({
      logEntries: s.logEntries.map((l) =>
        l.id === id
          ? {
              ...l,
              result: 'Drafted',
              relevance: 'Franchise News (Recovered on retry)',
              errorMessage: undefined,
              wpPostId: 4210,
            }
          : l
      ),
    }));
  },
}));
