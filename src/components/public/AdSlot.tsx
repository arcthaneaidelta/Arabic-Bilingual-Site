import React from 'react';
import { useUiStore } from '../../store/uiStore';
import { AD_ZONES_CONFIG, AdZone } from '../../data/taxonomy';

interface AdSlotProps {
  zoneId: 'header' | 'home' | 'sidebar' | 'in_article' | 'category';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ zoneId, className = '' }) => {
  const { adZonesVisible } = useUiStore();
  const zone = AD_ZONES_CONFIG.find((z) => z.id === zoneId) || AD_ZONES_CONFIG[0];

  if (!zone.active) return null;

  return (
    <div
      className={`relative my-6 flex flex-col items-center justify-center transition-all ${
        adZonesVisible
          ? 'border-2 border-dashed border-[#B08A4A] bg-[#F2E9D6]/30 p-4 rounded-sm'
          : 'bg-[#FBF9F4] border border-[#E4DFD3] p-3 rounded-sm'
      } ${className}`}
    >
      {/* Ad slot label */}
      <div className="flex items-center justify-between w-full max-w-xl text-[10px] text-[#76827E] mb-2 uppercase tracking-wider font-mono">
        <span>إعلان · Advertisement</span>
        {adZonesVisible && (
          <span className="text-[#B08A4A] font-semibold">
            {zone.placement} ({zone.dimensions})
          </span>
        )}
      </div>

      {/* Realistic Advertisement Content Placeholder */}
      <div className="w-full max-w-xl py-6 px-4 bg-[#FFFFFF] border border-[#E4DFD3] rounded flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#1F4D45] text-white flex items-center justify-center font-bold text-xs shrink-0 font-serif">
            ADS
          </div>
          <div>
            <h5 className="font-headline font-semibold text-xs text-[#14201D]">
              Advanced Ads Manager · مساحة إعلانية مرخصة
            </h5>
            <p className="text-[11px] text-[#76827E] font-arabic">
              حلول رعاية متخصصة للعلامات التجارية والامتياز التجاري
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 bg-[#E5EEEB] text-[#1F4D45] rounded-xs shrink-0">
          {zone.dimensions}
        </span>
      </div>
    </div>
  );
};
