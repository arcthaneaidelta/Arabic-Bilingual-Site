import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Inbox,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useNewsroomStore, DraftItem } from '../../store/newsroomStore';
import { Badge } from '../../components/ui/Badge';
import { useT, useLang } from '../../i18n/useT';

export const DraftsInboxPage: React.FC = () => {
  const { drafts } = useNewsroomStore();
  const { t } = useT();
  const lang = useLang();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'needs_review' | 'draft' | 'published'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = {
    all: drafts.length,
    needs_review: drafts.filter((d) => d.status === 'needs_review' || d.hasWarning).length,
    draft: drafts.filter((d) => d.status === 'draft' && !d.hasWarning).length,
    published: drafts.filter((d) => d.status === 'published').length,
  };

  const filteredDrafts = useMemo(() => {
    return drafts.filter((d) => {
      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'needs_review' && (d.status === 'needs_review' || d.hasWarning)) ||
        (activeTab === 'draft' && d.status === 'draft' && !d.hasWarning) ||
        (activeTab === 'published' && d.status === 'published');

      const matchSearch =
        !searchQuery.trim() ||
        d.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.sourceName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchTab && matchSearch;
    });
  }, [drafts, activeTab, searchQuery]);

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DFD3]">
        <div>
          <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
            {t.newsroom.drafts.title}
          </h1>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {t.newsroom.drafts.subtitle}
          </p>
        </div>
      </div>

      {/* Tabs & Search Toolbar */}
      <div className="bg-white border border-[#E4DFD3] rounded-md p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-[#1F4D45] text-white'
                : 'bg-[#FBF9F4] text-[#42504C] hover:bg-[#E9E2D2]'
            }`}
          >
            <span>{t.newsroom.drafts.filterAll}</span>
            <span className="opacity-80">({counts.all})</span>
          </button>

          <button
            onClick={() => setActiveTab('needs_review')}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'needs_review'
                ? 'bg-[#B7791F] text-white'
                : 'bg-[#FAEFD9] text-[#B7791F] hover:bg-[#F2E9D6]'
            }`}
          >
            <AlertTriangle size={12} />
            <span>{t.newsroom.drafts.filterNeedsReview}</span>
            <span className="font-bold">({counts.needs_review})</span>
          </button>

          <button
            onClick={() => setActiveTab('draft')}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'draft'
                ? 'bg-[#1F4D45] text-white'
                : 'bg-[#FBF9F4] text-[#42504C] hover:bg-[#E9E2D2]'
            }`}
          >
            <span>{t.newsroom.drafts.filterDrafts}</span>
            <span className="opacity-80">({counts.draft})</span>
          </button>

          <button
            onClick={() => setActiveTab('published')}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'published'
                ? 'bg-[#3F7D58] text-white'
                : 'bg-[#E3F0E8] text-[#3F7D58] hover:bg-[#D5E8DC]'
            }`}
          >
            <CheckCircle2 size={12} />
            <span>{t.newsroom.drafts.filterPublished}</span>
            <span className="opacity-80">({counts.published})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="text-[#76827E] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.newsroom.drafts.searchDrafts}
            className="w-full ps-9 pe-3 py-1.5 text-xs bg-[#FBF9F4] border border-[#CFC8B8] rounded focus:outline-none focus:border-[#1F4D45]"
          />
        </div>
      </div>

      {/* Drafts List */}
      <div className="space-y-3">
        {filteredDrafts.map((draft) => (
          <div
            key={draft.id}
            onClick={() => navigate(`/newsroom/drafts/${draft.id}`)}
            className={`p-4 bg-white border rounded-md shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              draft.hasWarning
                ? 'border-s-4 border-s-[#B7791F] border-[#E4DFD3]'
                : 'border-[#E4DFD3] hover:border-[#1F4D45]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Branded Tile Monogram Thumb (48px) */}
              <div
                className="w-12 h-12 rounded-sm border border-[#E4DFD3] flex items-center justify-center font-headline font-bold text-lg shrink-0"
                style={{ backgroundColor: draft.categoryColor ? `${draft.categoryColor}15` : '#E5EEEB' }}
              >
                <span style={{ color: draft.categoryColor || '#1F4D45' }}>
                  {draft.monogram}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="wpml">WPML: AR</Badge>
                  <span className="text-[11px] font-mono text-[#76827E]">
                    {draft.sourceName}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-[#1F4D45] bg-[#E5EEEB] px-1.5 py-0.2 rounded">
                    {draft.geo}
                  </span>
                  {draft.hasWarning && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B7791F] bg-[#FAEFD9] px-2 py-0.5 rounded">
                      <AlertTriangle size={12} />
                      <span>{draft.warningNoteAr || 'تحقق تحريري مطلوب'}</span>
                    </span>
                  )}
                  {draft.status === 'published' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F7D58] bg-[#E3F0E8] px-2 py-0.5 rounded">
                      <CheckCircle2 size={12} />
                      <span>Auto-Published</span>
                    </span>
                  )}
                </div>

                <h4 className="font-headline font-semibold text-base text-[#14201D] truncate">
                  {draft.titleAr}
                </h4>

                <div className="flex items-center gap-3 text-xs text-[#76827E] mt-1 font-mono">
                  <span>WP Post ID: #{draft.wpPostId}</span>
                  <span>·</span>
                  <span>{draft.wordCount} words</span>
                  <span>·</span>
                  <span>{draft.readTimeMin}m read</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 bg-[#E5EEEB] text-[#1F4D45] hover:bg-[#1F4D45] hover:text-white rounded transition-colors">
                فتح المراجعة / Review →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
