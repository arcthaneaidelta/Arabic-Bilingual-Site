import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  TableProperties,
  GitFork,
  Inbox,
  ListOrdered,
  Cpu,
  Terminal,
  Grid,
  FileCheck,
  X,
} from 'lucide-react';
import { useLang } from '../../i18n/useT';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const lang = useLang();
  const [search, setSearch] = useState('');

  const screens = [
    { label: 'Overview — KPIs & Activity Feed', path: '/newsroom', icon: LayoutDashboard },
    { label: 'Sources — Google Sheet Mirror & Toggles', path: '/newsroom/sources', icon: TableProperties },
    { label: 'Pipeline — n8n Automated Node Graph Flow', path: '/newsroom/pipeline', icon: GitFork },
    { label: 'Drafts Inbox — Review Generated Reports', path: '/newsroom/drafts', icon: Inbox },
    { label: 'Operation Log — Full Ingestion Audit Table', path: '/newsroom/log', icon: ListOrdered },
    { label: 'Prompts & Models — System Prompt & Fact-Safety', path: '/newsroom/prompts', icon: Cpu },
    { label: 'WP REST API — WPML (ar) & Meta Field Inspector', path: '/newsroom/api', icon: Terminal },
    { label: 'Site Structure & Ads — Category Tree & Zones', path: '/newsroom/structure', icon: Grid },
    { label: 'Handover & Docs — Deliverables & Videos', path: '/newsroom/handover', icon: FileCheck },
    { label: 'Public Site — Homepage', path: `/${lang}`, icon: LayoutDashboard },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = screens.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#14201D]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-[#E4DFD3] rounded-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-[#E4DFD3] gap-2.5">
          <Search size={16} className="text-[#76827E]" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a screen name or action (e.g. Pipeline, API, Sheet)..."
            className="w-full text-sm bg-transparent focus:outline-none text-[#14201D]"
          />
          <button onClick={onClose} className="text-[#76827E] p-1">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs text-[#14201D] hover:bg-[#E5EEEB] hover:text-[#1F4D45] transition-colors text-start"
              >
                <Icon size={14} className="text-[#B08A4A]" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
