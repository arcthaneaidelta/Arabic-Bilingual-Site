import React, { useState } from 'react';
import {
  ListOrdered,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { useNewsroomStore, LogEntry } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { Drawer } from '../../components/ui/Drawer';
import { Button } from '../../components/ui/Button';
import { useT, useLang } from '../../i18n/useT';

export const LogPage: React.FC = () => {
  const { logEntries, retryLogError } = useNewsroomStore();
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [filterResult, setFilterResult] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const resultsList = ['all', 'Drafted', 'Rejected', 'Duplicate', 'Skipped', 'Error'];

  const filteredEntries = logEntries.filter((l) =>
    filterResult === 'all' ? true : l.result === filterResult
  );

  const handleExportCsv = () => {
    showToast(
      lang === 'ar' ? 'تصدير التقرير (CSV)' : 'CSV Export Ready',
      lang === 'ar' ? 'تم تنزيل سجل عمليات الرصد كاملاً بصيغة CSV.' : 'Full audit trail exported to CSV.',
      'success'
    );
  };

  const handleRetry = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRetryingId(id);
    await retryLogError(id);
    setRetryingId(null);
    showToast(
      lang === 'ar' ? 'نجحت إعادة المحاولة' : 'Retry Succeeded',
      lang === 'ar' ? 'تمت إعادة جلب الرابط وتوليد المسودة برقم جديد.' : 'Feed recovered and converted to Drafted.',
      'success'
    );
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header & Export Toolbar */}
      <div className="p-4 bg-white border border-[#E4DFD3] rounded-md shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#1F4D45] mb-1">
            <FileSpreadsheet size={15} />
            <span className="font-bold">Google Sheet Mirror: [Log] Tab</span>
          </div>
          <h1 className="font-headline font-semibold text-xl sm:text-2xl text-[#14201D]">
            {t.newsroom.nav.log} — سجل تدقيق العمليات الكامل
          </h1>
        </div>

        <Button variant="secondary" size="sm" onClick={handleExportCsv}>
          <Download size={14} />
          <span>تصدير CSV (Export CSV)</span>
        </Button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {resultsList.map((res) => (
          <button
            key={res}
            onClick={() => setFilterResult(res)}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono font-medium transition-colors ${
              filterResult === res
                ? 'bg-[#1F4D45] text-white'
                : 'bg-white border border-[#E4DFD3] text-[#42504C] hover:bg-[#FBF9F4]'
            }`}
          >
            {res === 'all' ? 'All Results (الكل)' : res}
          </button>
        ))}
      </div>

      {/* Log Data Table */}
      <div className="bg-white border border-[#E4DFD3] rounded-md shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-start border-collapse">
          <thead>
            <tr className="bg-[#FBF9F4] border-b border-[#E4DFD3] text-[#76827E] font-mono text-[11px]">
              <th className="py-2.5 px-3">Date/Time</th>
              <th className="py-2.5 px-3">Original Title</th>
              <th className="py-2.5 px-3">Source</th>
              <th className="py-2.5 px-3">Result</th>
              <th className="py-2.5 px-3">Relevance / Diagnostic</th>
              <th className="py-2.5 px-3 text-center">WP Post ID</th>
              <th className="py-2.5 px-3">Warning / Error</th>
              <th className="py-2.5 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4DFD3]">
            {filteredEntries.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedEntry(row)}
                className="hover:bg-[#FBF9F4] cursor-pointer transition-colors"
              >
                <td className="py-3 px-3 font-mono text-[#76827E] whitespace-nowrap">
                  {row.timestamp}
                </td>
                <td className="py-3 px-3 font-medium text-[#14201D] max-w-xs truncate">
                  {row.originalTitle}
                </td>
                <td className="py-3 px-3 font-mono text-[#42504C] whitespace-nowrap">
                  {row.sourceName}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      row.result === 'Drafted'
                        ? 'bg-[#E3F0E8] text-[#3F7D58]'
                        : row.result === 'Duplicate'
                        ? 'bg-[#E3ECF3] text-[#3E6A8A]'
                        : row.result === 'Rejected'
                        ? 'bg-[#F0ECE1] text-[#76827E]'
                        : row.result === 'Error'
                        ? 'bg-[#F8E4E0] text-[#B5473A]'
                        : 'bg-[#FAEFD9] text-[#B7791F]'
                    }`}
                  >
                    {row.result}
                  </span>
                </td>
                <td className="py-3 px-3 text-[#42504C] font-mono text-[11px] max-w-xs truncate">
                  {row.relevance}
                </td>
                <td className="py-3 px-3 text-center font-mono text-[#1F4D45] font-semibold">
                  {row.wpPostId ? `#${row.wpPostId}` : '—'}
                </td>
                <td className="py-3 px-3">
                  {row.warningNote ? (
                    <span className="text-[11px] text-[#B7791F] font-semibold font-arabic truncate block max-w-xs">
                      ⚠ {row.warningNote}
                    </span>
                  ) : row.errorMessage ? (
                    <span className="text-[11px] text-[#B5473A] font-mono">
                      {row.errorMessage}
                    </span>
                  ) : (
                    <span className="text-[#CFC8B8] font-mono">—</span>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  {row.result === 'Error' ? (
                    <button
                      onClick={(e) => handleRetry(e, row.id)}
                      disabled={retryingId === row.id}
                      className="px-2 py-1 bg-[#1F4D45] text-white text-[11px] rounded flex items-center gap-1 mx-auto hover:bg-[#183D37]"
                    >
                      <RotateCcw size={11} className={retryingId === row.id ? 'animate-spin' : ''} />
                      <span>Retry</span>
                    </button>
                  ) : (
                    <span className="text-xs text-[#1F4D45] hover:underline font-mono">
                      Details ↗
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Row Detail Drawer */}
      <Drawer
        isOpen={selectedEntry !== null}
        onClose={() => setSelectedEntry(null)}
        title="Audit Log Entry Details"
        subtitle={`Row ID: ${selectedEntry?.id}`}
      >
        {selectedEntry && (
          <div className="space-y-4 text-start font-mono text-xs">
            <div className="p-3 bg-[#FBF9F4] border border-[#E4DFD3] rounded">
              <div className="text-[#76827E] mb-1">Original Article Title:</div>
              <div className="font-sans font-semibold text-sm text-[#14201D]">
                {selectedEntry.originalTitle}
              </div>
            </div>

            <div className="p-3 bg-white border border-[#E4DFD3] rounded space-y-2">
              <div>
                <span className="text-[#76827E]">Source URL:</span>{' '}
                <a
                  href={selectedEntry.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1F4D45] underline break-all"
                >
                  {selectedEntry.originalUrl}
                </a>
              </div>
              <div>
                <span className="text-[#76827E]">Ingestion Result:</span>{' '}
                <span className="font-bold">{selectedEntry.result}</span>
              </div>
              <div>
                <span className="text-[#76827E]">Relevance Audit:</span>{' '}
                <span>{selectedEntry.relevance}</span>
              </div>
              <div>
                <span className="text-[#76827E]">Classification:</span>{' '}
                <span>{selectedEntry.geo} · {selectedEntry.topic}</span>
              </div>
              {selectedEntry.wpDraftUrl && (
                <div>
                  <span className="text-[#76827E]">WordPress Admin:</span>{' '}
                  <span className="text-[#1F4D45] underline">{selectedEntry.wpDraftUrl}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
