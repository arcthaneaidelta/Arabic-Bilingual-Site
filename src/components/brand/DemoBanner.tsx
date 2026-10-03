import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { useT } from '../../i18n/useT';

export const DemoBanner: React.FC = () => {
  const { demoBannerVisible, dismissBanner } = useUiStore();
  const { t } = useT();

  if (!demoBannerVisible) return null;

  return (
    <div className="h-8 bg-[#16241F] text-[#EAE6DB] border-b border-[#1F4D45] text-xs flex items-center justify-between px-4 z-40 select-none">
      <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-[#B08A4A] inline-block animate-pulse" />
        <span className="font-mono text-[11px] text-[#B08A4A] px-1.5 py-0.5 rounded bg-[#0F1A18] border border-[#B08A4A]/30">
          PROTOTYPE DEMO
        </span>
        <span className="text-[#CFC8B8] truncate">
          {t.common.demoBanner}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={dismissBanner}
          className="text-[#76827E] hover:text-[#EAE6DB] transition-colors p-1"
          aria-label={t.common.close}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
