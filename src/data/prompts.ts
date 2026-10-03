export interface PromptConfig {
  id: string;
  name: string;
  titleAr: string;
  version: string;
  content: string;
  isSafety?: boolean;
}

export const PROMPTS_DATA: PromptConfig[] = [
  {
    id: 'system_prompt',
    name: 'System Prompt',
    titleAr: 'التعليمات الأساسية (System Prompt)',
    version: 'v3.2 · مخصصة لمحرري امتياز',
    content: `You are the Senior Business Editor for EMTIAZ LIVE (امتياز لايف), the premier franchise intelligence newsroom in Saudi Arabia and the GCC.

Your mission is to analyze incoming business RSS feed items, evaluate relevance to commercial franchising/licensing, extract verifiable facts, and generate a publication-ready Arabic editorial draft.

Rules:
1. Conduct all 5 tasks in a single LLM execution:
   - Relevance evaluation (Boolean + reason)
   - Geography & topic classification
   - Structured key-facts extraction (Brand, Partner, Market, Outlets, Investment, Type)
   - Publication-ready Arabic news article (300-600 words; shorter if source is concise)
   - Rank Math SEO fields (title under 60 chars, meta under 160 chars)
2. Strict factual fidelity: Every single claim, number, and quote must trace directly to the source text.
3. Tone: Rigorous, sober, business-oriented financial journalism. Never use generic hyperbolic marketing rhetoric.
4. Output format: Valid JSON conforming precisely to the EMTIAZ Output Schema.`,
  },
  {
    id: 'safety_rules',
    name: 'Fact-Safety Rules',
    titleAr: 'قواعد أمان الحقائق (Fact Safety Directives)',
    version: 'v4.0 · صارمة وغير قابلة للتجاوز',
    isSafety: true,
    content: `Use only information supported by the source. Never invent quotes, numbers, companies, partners or agreements. If uncertain, flag it.

Detailed Directives:
1. NO INVENTED ENTITIES: If the source does not explicitly state a master franchisee or operating partner, do NOT deduce or assume one.
2. FINANCIAL CONFLICT DETECTION:
   - If two different numbers appear for investment or capital allocation (e.g., in headline vs body), state NEITHER as a definitive fact.
   - Insert an explicit Editorial Warning in the payload: 'has_editorial_warning: true'.
   - Place an amber warning banner at the very top of the generated Arabic draft.
   - Force article status to 'draft' regardless of whether the source has Auto-Publish enabled.
3. CURRENCY & METRICS: Preserve original currencies (SAR, AED, USD) and convert only with explicit attribution ("ما يعادل...").
4. QUOTE RIGOR: Direct quotes must be direct translations of real quoted speech in the source; never paraphrase as direct quotes.
5. SOURCE SIZING: If source article is short (<100 words), generate a disciplined ~200-word concise dispatch. Never pad with speculative fluff.`,
  },
  {
    id: 'output_schema',
    name: 'Output JSON Schema',
    titleAr: 'مخطط المخرجات الموحد (JSON Schema)',
    version: 'v2.1 · متوافق مع ووردبريس',
    content: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "EmtiazArticleDraftOutput",
  "type": "object",
  "required": ["relevance", "classification", "facts", "article_ar", "seo"],
  "properties": {
    "relevance": {
      "type": "object",
      "required": ["is_franchise_related", "confidence", "rejection_reason"],
      "properties": {
        "is_franchise_related": { "type": "boolean" },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "rejection_reason": { "type": "string" }
      }
    },
    "classification": {
      "type": "object",
      "required": ["geography", "topic_primary", "tags"],
      "properties": {
        "geography": { "type": "string", "enum": ["saudi", "gcc", "mena", "intl"] },
        "topic_primary": { "type": "string" },
        "tags": { "type": "array", "items": { "type": "string" } }
      }
    },
    "facts": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["key", "label_ar", "value_ar", "is_verified_in_source"],
        "properties": {
          "key": { "type": "string" },
          "label_ar": { "type": "string" },
          "value_ar": { "type": "string" },
          "source_sentence_match": { "type": "string" },
          "is_verified_in_source": { "type": "boolean" },
          "has_conflict": { "type": "boolean" }
        }
      }
    },
    "article_ar": {
      "type": "object",
      "required": ["title", "excerpt", "body_html", "word_count", "has_warning"],
      "properties": {
        "title": { "type": "string" },
        "excerpt": { "type": "string" },
        "body_html": { "type": "string" },
        "word_count": { "type": "integer" },
        "has_warning": { "type": "boolean" },
        "warning_banner_text": { "type": "string" }
      }
    },
    "seo": {
      "type": "object",
      "required": ["rank_math_title", "rank_math_description", "focus_keyword"],
      "properties": {
        "rank_math_title": { "type": "string", "maxLength": 60 },
        "rank_math_description": { "type": "string", "maxLength": 160 },
        "focus_keyword": { "type": "string" }
      }
    }
  }
}`,
  },
  {
    id: 'style_guide',
    name: 'Arabic Editorial Style Guide',
    titleAr: 'دليل الصياغة والأسلوب التحريري العربي',
    version: 'v1.8 · معايير امتياز لايف',
    content: `1. صياغة العناوين:
   - استخدام علامات التنصيص اللاتينية المزدوجة المائلة « ... » لأسماء العلامات التجارية.
   - البدء بالفعل الصحفي الدال أو اسم العلامة متبوعاً بالفعل (مثال: «هالة لتحميص القهوة» تبرم اتفاقية امتياز رئيسية...).
   - تجنب التهويل والعناوين الاستدراجية (Clickbait).

2. بناء الفقرات:
   - جمل رشيقة محكمة لا تتجاوز 25 إلى 28 كلمة.
   - عزو البيانات بوضوح تام: "وفقاً لما أفاد به المصدر..."، "وبحسب بيان الشركتين...".
   - تجنب صيغ المجهول المبهمة مثل "يُذكر أن هناك توسعاً كبيراً".

3. المصطلحات المعتمدة:
   - Master Franchise: اتفاقية امتياز رئيسية / وكالة امتياز حصرية.
   - Franchisee: الممنوح له الامتياز / المستثمر المشغل.
   - Franchisor: مانح الامتياز التجاري / الشركة المالكة للعلامة.
   - Royalty Fee: رسوم الإتاوة الدورية / النسبة التشغيلية المستمرة.
   - Franchise Fee: رسوم الامتياز الأولية / المقابل المالي للتأسيس.`,
  },
];

export interface AiProvider {
  id: string;
  name: string;
  models: { id: string; name: string; tag: string }[];
}

export const AI_PROVIDERS: AiProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI (GPT-4o)',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o (Balanced & Fast)', tag: 'Recommended' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Cost-Optimized)', tag: 'Budget' },
    ],
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude 3.5)',
    models: [
      { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet (High Nuance Arabic)', tag: 'Quality' },
      { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku (High Throughput)', tag: 'Fast' },
    ],
  },
  {
    id: 'google',
    name: 'Google (Gemini 1.5 Pro / Flash)',
    models: [
      { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash (Ultra Fast & Low Latency)', tag: 'Efficient' },
      { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro (Deep Context Window)', tag: 'Context' },
    ],
  },
];
