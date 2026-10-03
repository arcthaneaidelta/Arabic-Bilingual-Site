import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  TableProperties,
  GitFork,
  Inbox,
  ListOrdered,
  Cpu,
  Terminal,
  Grid,
  FileCheck,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useNewsroomStore } from '../../store/newsroomStore';
import { useT, useLang } from '../../i18n/useT';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { drafts, sources } = useNewsroomStore();
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';

  const needsReviewCount = drafts.filter((d) => d.status === 'needs_review').length;
  const readyDraftsCount = drafts.length;

  const navLinks = [
    { to: '/newsroom', label: t.newsroom.nav.overview, icon: LayoutDashboard, end: true },
    { to: '/newsroom/sources', label: t.newsroom.nav.sources, icon: TableProperties },
    { to: '/newsroom/pipeline', label: t.newsroom.nav.pipeline, icon: GitFork },
    {
      to: '/newsroom/drafts',
      label: t.newsroom.nav.drafts,
      icon: Inbox,
      badge: needsReviewCount > 0 ? `${needsReviewCount} ⚠` : `${readyDraftsCount}`,
      badgeColor: needsReviewCount > 0 ? 'bg-[#B7791F] text-white' : 'bg-[#1F4D45] text-white',
    },
    { to: '/newsroom/log', label: t.newsroom.nav.log, icon: ListOrdered },
    { to: '/newsroom/prompts', label: t.newsroom.nav.prompts, icon: Cpu },
    { to: '/newsroom/api', label: t.newsroom.nav.api, icon: Terminal },
    { to: '/newsroom/structure', label: t.newsroom.nav.structure, icon: Grid },
    { to: '/newsroom/handover', label: t.newsroom.nav.handover, icon: FileCheck },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F1A18] text-[#EAE6DB] border-r border-[#1F4D45]/50 flex flex-col justify-between transition-transform duration-200 select-none ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1F4D45]/60 flex items-center justify-between">
        <Logo isDark linkTo="/newsroom" />
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto text-start">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase text-[#76827E] tracking-wider">
          AI Newsroom Modules
        </div>

        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-sm text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1F4D45] text-white font-semibold shadow-xs'
                    : 'text-[#CFC8B8] hover:text-white hover:bg-[#16241F]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className="text-[#B08A4A] shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer with Simulated Connection Status (Section 12 & 26) */}
      <div className="p-4 border-t border-[#1F4D45]/60 bg-[#0F1A18] text-[11px] text-[#76827E] space-y-2 text-start">
        <div className="text-[10px] uppercase font-mono text-[#B08A4A] mb-1">
          Infrastructure Status
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3F7D58] shrink-0" />
          <span className="truncate">n8n: Self-hosted Workflow</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3F7D58] shrink-0" />
          <span className="truncate">WordPress REST: WPML (ar)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3F7D58] shrink-0" />
          <span className="truncate">Google Sheets: Ingestion Source</span>
        </div>

        <div className="pt-2 text-[10px] text-[#76827E] font-mono">
          Simulated connection (prototype)
        </div>
      </div>
    </aside>
  );
};
