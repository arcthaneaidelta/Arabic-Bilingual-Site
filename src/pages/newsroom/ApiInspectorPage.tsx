import React, { useState } from 'react';
import {
  Terminal,
  Send,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Code,
  Layers,
  FileCode2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

export const ApiInspectorPage: React.FC = () => {
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [activeTab, setActiveTab] = useState<'payload' | 'fields'>('payload');
  const [autoPublishEnabled, setAutoPublishEnabled] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResponse, setSimulationResponse] = useState<any | null>(null);

  const requestPayload = {
    title: '«هالة لتحميص القهوة» تبرم اتفاقية امتياز رئيسية للتوسع في الكويت',
    status: autoPublishEnabled ? 'publish' : 'draft',
    lang: 'ar', // Critical WPML parameter
    content:
      '<!-- wp:paragraph -->\n<p>أعلنت علامة هالة لتحميص القهوة عن إبرام اتفاقية امتياز رئيسية مع مجموعة الضو للضيافة...</p>\n<!-- /wp:paragraph -->',
    excerpt:
      'وقعت علامة هالة اتفاقية امتياز تجاري رئيسية مع مجموعة الضو للضيافة لافتتاح 25 فرعاً جديداً خلال 5 سنوات.',
    categories: [14, 22],
    tags: [89, 104],
    meta: {
      source_name: 'Gulf Franchise Review',
      source_url: 'https://gulffranchisereview.example.com/articles/hala-coffee-kuwait-deal',
      rank_math_title: '«هالة لتحميص القهوة» تبرم اتفاقية امتياز للتوسع في الكويت | امتياز لايف',
      rank_math_description: 'وقعت علامة هالة اتفاقية امتياز تجاري رئيسية مع مجموعة الضو للضيافة لافتتاح 25 فرعاً جديداً.',
      is_ai_draft: true,
      has_editorial_warning: true,
    },
  };

  const handleSimulateSend = () => {
    setIsSimulating(true);
    setSimulationResponse(null);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResponse({
        status: 201,
        statusText: 'Created',
        data: {
          id: 4218,
          slug: 'hala-coffee-kuwait-deal',
          status: autoPublishEnabled ? 'publish' : 'draft',
          lang: 'ar',
          meta: {
            rank_math_saved: true,
            source_attribution_verified: true,
          },
        },
        checks: [
          'WPML language parameter = ar ✓',
          'Rank Math SEO fields saved via REST ✓',
          'Source attribution custom meta persisted ✓',
          'Warning header banner appended to post body ✓',
        ],
      });
      showToast('201 Created', 'Simulated WordPress post successfully injected with lang=ar.', 'success');
    }, 700);
  };

  const handleSimulateMissingLang = () => {
    setIsSimulating(true);
    setSimulationResponse(null);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResponse({
        status: 400,
        statusText: 'Bad Request — Guard Active',
        error: 'GUARD_BLOCKED_UNASSIGNED_LANGUAGE',
        message:
          'Security Guard Intercept: Attempted post creation without explicit WPML lang="ar" payload. Creation blocked to prevent unindexed orphan posts.',
        actionTaken: 'Blocked & Logged to Sheets with Severity: WARN',
      });
      showToast('Guard Intercepted', 'Missing language guard prevented orphan post.', 'error');
    }, 600);
  };

  const registeredMetaKeys = [
    {
      key: 'source_name',
      type: 'string',
      showInRest: true,
      sanitize: 'sanitize_text_field',
      purpose: 'Source media outlet label',
    },
    {
      key: 'source_url',
      type: 'string',
      showInRest: true,
      sanitize: 'esc_url_raw',
      purpose: 'Original verification hyperlink',
    },
    {
      key: 'rank_math_title',
      type: 'string',
      showInRest: true,
      sanitize: 'sanitize_text_field',
      purpose: 'Rank Math custom SEO meta title',
    },
    {
      key: 'rank_math_description',
      type: 'string',
      showInRest: true,
      sanitize: 'sanitize_textarea_field',
      purpose: 'Rank Math meta description snippet',
    },
    {
      key: 'is_ai_draft',
      type: 'boolean',
      showInRest: true,
      sanitize: 'rest_sanitize_boolean',
      purpose: 'Newsroom automation tag',
    },
  ];

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="pb-4 border-b border-[#E4DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#1F4D45] mb-1">
            <Terminal size={15} />
            <span>POST /wp-json/wp/v2/posts</span>
          </div>
          <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
            {t.newsroom.api.title}
          </h1>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {t.newsroom.api.sub}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-[#E4DFD3] rounded p-1">
          <button
            onClick={() => setActiveTab('payload')}
            className={`px-3 py-1 text-xs font-mono rounded ${
              activeTab === 'payload' ? 'bg-[#1F4D45] text-white' : 'text-[#42504C]'
            }`}
          >
            {t.newsroom.api.tabPayload}
          </button>
          <button
            onClick={() => setActiveTab('fields')}
            className={`px-3 py-1 text-xs font-mono rounded ${
              activeTab === 'fields' ? 'bg-[#1F4D45] text-white' : 'text-[#42504C]'
            }`}
          >
            {t.newsroom.api.tabRegistered}
          </button>
        </div>
      </div>

      {activeTab === 'payload' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Request Payload Editor / Preview (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD3]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#3F7D58] text-white font-mono text-xs font-bold rounded">
                  POST
                </span>
                <span className="font-mono text-xs text-[#14201D]">/wp-json/wp/v2/posts</span>
              </div>

              <label className="flex items-center gap-1.5 text-xs text-[#76827E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoPublishEnabled}
                  onChange={(e) => setAutoPublishEnabled(e.target.checked)}
                />
                <span>Auto-Publish Toggle (status: publish)</span>
              </label>
            </div>

            <pre className="p-4 bg-[#0F1A18] text-[#EAE6DB] font-mono text-xs rounded overflow-x-auto max-h-[460px] leading-relaxed">
              {JSON.stringify(requestPayload, null, 2)}
            </pre>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                loading={isSimulating}
                onClick={handleSimulateSend}
              >
                <Send size={14} />
                <span>{t.newsroom.api.sendSimulate}</span>
              </Button>

              <Button
                variant="danger"
                size="sm"
                loading={isSimulating}
                onClick={handleSimulateMissingLang}
              >
                <ShieldAlert size={14} />
                <span>{t.newsroom.api.simulateMissingLang}</span>
              </Button>
            </div>
          </div>

          {/* Response Inspector (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E4DFD3] rounded-md p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#E4DFD3] flex items-center justify-between">
              <h4 className="font-headline font-semibold text-sm text-[#14201D]">
                Response Diagnostic
              </h4>
              {simulationResponse && (
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                    simulationResponse.status === 201
                      ? 'bg-[#E3F0E8] text-[#3F7D58]'
                      : 'bg-[#F8E4E0] text-[#B5473A]'
                  }`}
                >
                  HTTP {simulationResponse.status}
                </span>
              )}
            </div>

            {simulationResponse ? (
              <div className="space-y-4 animate-in fade-in duration-150">
                {simulationResponse.status === 201 ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#E3F0E8] border border-[#3F7D58]/30 rounded text-xs text-[#3F7D58] font-bold">
                      201 Created · WordPress Accepted Post
                    </div>

                    <div className="space-y-1.5">
                      {simulationResponse.checks.map((c: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-mono text-[#1F4D45] p-2 bg-[#FBF9F4] rounded border border-[#E4DFD3]"
                        >
                          <CheckCircle2 size={14} className="text-[#3F7D58] shrink-0" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>

                    <pre className="p-3 bg-[#0F1A18] text-[#EAE6DB] font-mono text-[11px] rounded overflow-x-auto">
                      {JSON.stringify(simulationResponse.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#F8E4E0] border border-[#B5473A]/40 rounded text-xs text-[#B5473A] font-bold flex items-center gap-2">
                      <ShieldAlert size={16} />
                      <span>{simulationResponse.statusText}</span>
                    </div>

                    <p className="text-xs text-[#42504C] leading-relaxed font-arabic p-3 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
                      {simulationResponse.message}
                    </p>

                    <div className="p-2.5 bg-[#FAEFD9] text-[#B7791F] font-mono text-[11px] rounded">
                      Action: {simulationResponse.actionTaken}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-[#76827E] font-arabic">
                اضغط على "محاكاة إرسال الطلب" لاختبار سلامة حقول WPML أو "محاكاة إسقاط اللغة" لتجربة كاشف الحماية.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Registered Fields Tab (Section 13.8) */
        <div className="bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-6">
          <div>
            <h3 className="font-headline font-semibold text-lg text-[#14201D] mb-1">
              Registered Post Meta Fields (`show_in_rest`)
            </h3>
            <p className="text-xs text-[#76827E] font-arabic">
              يتم تسجيل هذه الحقول عبر إضافة برمجية مخصصة (Must-Use Plugin: `wp-content/mu-plugins/emtiaz-rest.php`) لتكون متاحة للقراءة والكتابة عبر REST API مع التحقق والتعقيم.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start border-collapse">
              <thead>
                <tr className="bg-[#FBF9F4] border-b border-[#E4DFD3] text-[#76827E] font-mono">
                  <th className="py-2.5 px-3">Meta Key</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3 text-center">show_in_rest</th>
                  <th className="py-2.5 px-3">Sanitize Callback</th>
                  <th className="py-2.5 px-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD3]">
                {registeredMetaKeys.map((k) => (
                  <tr key={k.key} className="hover:bg-[#FBF9F4]">
                    <td className="py-3 px-3 font-mono font-bold text-[#1F4D45]">
                      {k.key}
                    </td>
                    <td className="py-3 px-3 font-mono text-[#76827E]">{k.type}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-mono text-[10px] text-[#3F7D58] bg-[#E3F0E8] px-2 py-0.5 rounded font-bold">
                        TRUE ✓
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#42504C]">
                      {k.sanitize}
                    </td>
                    <td className="py-3 px-3 text-[#42504C]">{k.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PHP Code Snippet Display (PRD Section 13.8) */}
          <div className="pt-4 border-t border-[#E4DFD3]">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#76827E]">
              <FileCode2 size={15} />
              <span>mu-plugins/emtiaz-rest-meta.php (Illustrative Implementation)</span>
            </div>
            <pre className="p-4 bg-[#0F1A18] text-[#EAE6DB] rounded font-mono text-xs overflow-x-auto leading-relaxed">
{`<?php
/**
 * Plugin Name: EMTIAZ REST Meta Registration
 * Description: Registers source attribution and Rank Math SEO fields for n8n automation.
 */

add_action('init', function() {
    register_post_meta('post', 'source_url', [
        'show_in_rest'      => true,
        'single'            => true,
        'type'              => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'auth_callback'     => function() { return current_user_can('edit_posts'); }
    ]);

    register_post_meta('post', 'rank_math_title', [
        'show_in_rest'      => true,
        'single'            => true,
        'type'              => 'string',
        'sanitize_callback' => 'sanitize_text_field'
    ]);
});`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
