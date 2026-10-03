import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  RefreshCw,
  Info,
} from 'lucide-react';
import { useNewsroomStore, SourceItem } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import { useT, useLang } from '../../i18n/useT';

export const SourcesPage: React.FC = () => {
  const {
    sources,
    toggleSourceEnabled,
    toggleSourceTrusted,
    toggleSourceAutoPublish,
    addSource,
    deleteSource,
    testFeedSource,
  } = useNewsroomStore();
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  // New source form inline state
  const [showAddRow, setShowAddRow] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTrusted, setNewTrusted] = useState(false);
  const [newAutoPublish, setNewAutoPublish] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleSaveNewSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    if (!newUrl.startsWith('https://') || !newUrl.includes('.')) {
      setUrlError('URL must start with https:// and contain a domain dot');
      return;
    }

    addSource({
      name: newName,
      url: newUrl,
      enabled: true,
      trusted: newTrusted,
      autoPublish: newAutoPublish,
    });

    showToast(
      lang === 'ar' ? 'تمت إضافة المصدر بنجاح' : 'Source Added',
      lang === 'ar' ? `سيتم فحص ${newName} في الدورة القادمة.` : `${newName} will be scanned on next run.`,
      'success'
    );

    setShowAddRow(false);
    setNewName('');
    setNewUrl('');
    setUrlError('');
  };

  const handleTestFeed = async (id: string, name: string) => {
    setTestingId(id);
    const res = await testFeedSource(id);
    setTestingId(null);

    if (res.success) {
      showToast(name, res.message, 'success');
    } else {
      showToast(name, res.message, 'error');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Faux Google Sheets Toolbar Strip (Section 13.2) */}
      <div className="bg-white border border-[#E4DFD3] rounded-md overflow-hidden shadow-xs">
        <div className="bg-[#1F4D45] text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono">
            <FileSpreadsheet size={16} className="text-[#B08A4A]" />
            <span className="font-bold">EMTIAZ Feeds Configuration · Google Sheet Mirror</span>
          </div>
          <div className="text-[11px] font-mono text-[#EAE6DB] bg-black/20 px-2 py-0.5 rounded">
            Tab: [Sources]
          </div>
        </div>

        {/* Informative Banner */}
        <div className="p-4 bg-[#F2E9D6]/60 border-b border-[#E4DFD3] flex items-start sm:items-center justify-between gap-3 text-xs text-[#14201D]">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-[#B08A4A] shrink-0" />
            <p className="font-arabic leading-relaxed">{t.newsroom.sources.sheetNote}</p>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddRow(!showAddRow)}
            className="shrink-0"
          >
            <Plus size={14} />
            <span>{t.newsroom.sources.addSource}</span>
          </Button>
        </div>

        {/* Inline Add Source Form */}
        {showAddRow && (
          <form
            onSubmit={handleSaveNewSource}
            className="p-4 bg-[#FBF9F4] border-b border-[#E4DFD3] flex flex-col sm:flex-row items-center gap-3 animate-in fade-in duration-200"
          >
            <input
              type="text"
              required
              placeholder="Source Name (e.g. GCC Retail Digest)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-[#CFC8B8] rounded w-full sm:w-1/3 focus:outline-none focus:border-[#1F4D45]"
            />
            <div className="w-full sm:w-1/2 flex flex-col">
              <input
                type="text"
                required
                placeholder="https://example.com/rss.xml"
                value={newUrl}
                onChange={(e) => {
                  setNewUrl(e.target.value);
                  if (urlError) setUrlError('');
                }}
                className={`px-3 py-1.5 text-xs bg-white border rounded focus:outline-none ${
                  urlError ? 'border-[#B5473A]' : 'border-[#CFC8B8] focus:border-[#1F4D45]'
                }`}
              />
              {urlError && <span className="text-[10px] text-[#B5473A] mt-0.5">{urlError}</span>}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label className="flex items-center gap-1 text-xs text-[#76827E]">
                <input
                  type="checkbox"
                  checked={newTrusted}
                  onChange={(e) => setNewTrusted(e.target.checked)}
                />
                <span>Trusted</span>
              </label>

              <label className="flex items-center gap-1 text-xs text-[#76827E]">
                <input
                  type="checkbox"
                  checked={newAutoPublish}
                  onChange={(e) => setNewAutoPublish(e.target.checked)}
                />
                <span>Auto-Publish</span>
              </label>

              <Button type="submit" size="sm" variant="primary">
                Save Row
              </Button>
            </div>
          </form>
        )}

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#FBF9F4] border-b border-[#E4DFD3] text-[#76827E] font-mono text-[11px]">
                <th className="py-2.5 px-3 w-10 text-center">#</th>
                <th className="py-2.5 px-3">{t.newsroom.sources.colName}</th>
                <th className="py-2.5 px-3">{t.newsroom.sources.colUrl}</th>
                <th className="py-2.5 px-3 text-center">{t.newsroom.sources.colEnabled}</th>
                <th className="py-2.5 px-3 text-center">{t.newsroom.sources.colTrusted}</th>
                <th className="py-2.5 px-3 text-center">{t.newsroom.sources.colAutoPublish}</th>
                <th className="py-2.5 px-3">{t.newsroom.sources.colLastChecked}</th>
                <th className="py-2.5 px-3 text-center">{t.newsroom.sources.colItemsToday}</th>
                <th className="py-2.5 px-3 text-center">{t.newsroom.sources.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD3]">
              {sources.map((src, index) => (
                <tr
                  key={src.id}
                  className={`transition-colors hover:bg-[#FBF9F4] ${
                    !src.enabled ? 'opacity-40 bg-[#F0ECE1]/30' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-center font-mono text-[#76827E]">
                    {index + 1}
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#14201D]">
                    {src.name}
                    {src.status === 'error' && (
                      <span className="block text-[10px] text-[#B5473A] font-mono">
                        {src.errorMessage}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#76827E] max-w-xs truncate">
                    {src.url}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Switch
                      size="sm"
                      checked={src.enabled}
                      onChange={() => toggleSourceEnabled(src.id)}
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Switch
                      size="sm"
                      checked={src.trusted}
                      onChange={() => toggleSourceTrusted(src.id)}
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div title="Only applies when no warnings. Warned articles always stay Draft.">
                      <Switch
                        size="sm"
                        checked={src.autoPublish}
                        onChange={() => toggleSourceAutoPublish(src.id)}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#42504C]">
                    {src.lastChecked}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#1F4D45]">
                    {src.itemsToday}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleTestFeed(src.id, src.name)}
                        disabled={testingId === src.id}
                        className="p-1 text-[#1F4D45] hover:bg-[#E5EEEB] rounded"
                        title={t.newsroom.sources.testFeed}
                      >
                        <RefreshCw
                          size={14}
                          className={testingId === src.id ? 'animate-spin' : ''}
                        />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(t.newsroom.sources.deleteConfirm)) {
                            deleteSource(src.id);
                          }
                        }}
                        className="p-1 text-[#B5473A] hover:bg-[#F8E4E0] rounded"
                        title="Delete source"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
