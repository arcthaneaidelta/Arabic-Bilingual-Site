import React, { useState } from 'react';
import {
  Grid,
  Layers,
  Sliders,
  Globe,
  CheckCircle2,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { GEOGRAPHIES, TOPICS, AD_ZONES_CONFIG, AdZone } from '../../data/taxonomy';
import { Switch } from '../../components/ui/Switch';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

export const StructurePage: React.FC = () => {
  const { adZonesVisible, toggleAdZones } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [adZones, setAdZones] = useState<AdZone[]>(AD_ZONES_CONFIG);

  const toggleZone = (id: string) => {
    setAdZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z))
    );
  };

  return (
    <div className="space-y-8 text-start">
      {/* Header */}
      <div className="pb-4 border-b border-[#E4DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-semibold text-2xl sm:text-3xl text-[#14201D]">
            {t.newsroom.structure.title}
          </h1>
          <p className="text-xs text-[#76827E] font-arabic mt-0.5">
            {t.newsroom.structure.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Ad Locations Map & Wireframe (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD3]">
            <h3 className="font-headline font-semibold text-base text-[#14201D]">
              {t.newsroom.structure.adZones} (Advanced Ads Manager)
            </h3>
            <button
              onClick={toggleAdZones}
              className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
                adZonesVisible
                  ? 'bg-[#B08A4A] text-white border-[#B08A4A]'
                  : 'bg-[#FBF9F4] text-[#42504C] border-[#CFC8B8]'
              }`}
            >
              Public Overlay: {adZonesVisible ? 'VISIBLE' : 'HIDDEN'}
            </button>
          </div>

          {/* Interactive Wireframe */}
          <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD3] rounded-md space-y-3 font-mono text-[11px]">
            {/* Header Ad Slot (1) */}
            <div
              onMouseEnter={() => setHoveredZone('header')}
              onMouseLeave={() => setHoveredZone(null)}
              className={`p-3 rounded text-center border-2 border-dashed transition-all ${
                hoveredZone === 'header'
                  ? 'border-[#B08A4A] bg-[#FAEFD9]'
                  : 'border-[#1F4D45]/40 bg-white'
              }`}
            >
              <div className="font-bold text-[#1F4D45]">Zone 01: Header Leaderboard</div>
              <div className="text-[#76827E] text-[10px]">728×90 Desktop / 320×50 Mobile</div>
            </div>

            {/* Wireframe Mock Nav Bar */}
            <div className="h-6 bg-[#0F1A18] rounded flex items-center justify-between px-3 text-[10px] text-[#EAE6DB]">
              <span>EMTIAZ LIVE</span>
              <span>Nav Items</span>
            </div>

            {/* Mid Split Section */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2">
                <div className="h-20 bg-white border border-[#E4DFD3] rounded p-2 text-[#76827E]">
                  Lead Article Content
                </div>

                {/* Homepage Mid Ad Slot (2) */}
                <div
                  onMouseEnter={() => setHoveredZone('home')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className={`p-3 rounded text-center border-2 border-dashed transition-all ${
                    hoveredZone === 'home'
                      ? 'border-[#B08A4A] bg-[#FAEFD9]'
                      : 'border-[#1F4D45]/40 bg-white'
                  }`}
                >
                  <div className="font-bold text-[#1F4D45]">Zone 02: Homepage Mid-Split</div>
                  <div className="text-[#76827E] text-[10px]">728×90 / 300×250</div>
                </div>

                {/* In Article Ad Slot (4) */}
                <div
                  onMouseEnter={() => setHoveredZone('in_article')}
                  onMouseLeave={() => setHoveredZone(null)}
                  className={`p-2.5 rounded text-center border-2 border-dashed transition-all ${
                    hoveredZone === 'in_article'
                      ? 'border-[#B08A4A] bg-[#FAEFD9]'
                      : 'border-[#1F4D45]/40 bg-white'
                  }`}
                >
                  <div className="font-bold text-[#1F4D45]">Zone 04: In-Article P3 Break</div>
                  <div className="text-[#76827E] text-[10px]">300×250 Responsive</div>
                </div>
              </div>

              {/* Sidebar Ad Slot (3) */}
              <div
                onMouseEnter={() => setHoveredZone('sidebar')}
                onMouseLeave={() => setHoveredZone(null)}
                className={`col-span-1 rounded border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                  hoveredZone === 'sidebar'
                    ? 'border-[#B08A4A] bg-[#FAEFD9]'
                    : 'border-[#1F4D45]/40 bg-white'
                }`}
              >
                <div className="font-bold text-[#1F4D45]">Zone 03</div>
                <div className="text-[10px] text-[#76827E]">Sidebar Sticky</div>
                <div className="text-[9px] text-[#76827E]">300×600</div>
              </div>
            </div>

            {/* Category Slot (5) */}
            <div
              onMouseEnter={() => setHoveredZone('category')}
              onMouseLeave={() => setHoveredZone(null)}
              className={`p-3 rounded text-center border-2 border-dashed transition-all ${
                hoveredZone === 'category'
                  ? 'border-[#B08A4A] bg-[#FAEFD9]'
                  : 'border-[#1F4D45]/40 bg-white'
              }`}
            >
              <div className="font-bold text-[#1F4D45]">Zone 05: Category Feed Inset</div>
              <div className="text-[#76827E] text-[10px]">In-list Card Interstitial</div>
            </div>
          </div>

          {/* Zones Toggle List */}
          <div className="space-y-2">
            {adZones.map((zone) => (
              <div
                key={zone.id}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                className={`p-3 rounded border flex items-center justify-between text-xs transition-colors ${
                  hoveredZone === zone.id ? 'bg-[#FAEFD9] border-[#B08A4A]' : 'bg-white border-[#E4DFD3]'
                }`}
              >
                <div>
                  <div className="font-bold text-[#14201D]">{zone.name}</div>
                  <div className="font-mono text-[11px] text-[#76827E]">
                    {zone.placement} · {zone.dimensions}
                  </div>
                </div>
                <Switch
                  size="sm"
                  checked={zone.active}
                  onChange={() => toggleZone(zone.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: WPML & Taxonomies Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WPML Multi-language Card */}
          <div className="bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E4DFD3]">
              <Globe size={16} className="text-[#1F4D45]" />
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {t.newsroom.structure.wpmlStatus}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
                <span className="font-semibold">Arabic (ar_SA)</span>
                <span className="font-mono text-[10px] text-[#3F7D58] bg-[#E3F0E8] px-2 py-0.5 rounded font-bold">
                  PRIMARY (DEFAULT)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
                <span className="font-semibold">English (en_US)</span>
                <span className="font-mono text-[10px] text-[#1F4D45] bg-[#E5EEEB] px-2 py-0.5 rounded font-bold">
                  SECONDARY
                </span>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] text-[#76827E]">
                  <span>Interface String Translation:</span>
                  <span className="font-bold text-[#3F7D58]">100% Complete</span>
                </div>
                <div className="w-full bg-[#E4DFD3] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3F7D58] h-full w-full" />
                </div>
              </div>

              <p className="text-[11px] text-[#76827E] font-arabic leading-relaxed pt-2">
                * في المرحلة الأولى (Phase 1): يتم توليد الأخبار العربية آلياً، بينما تتم كتابة الأخبار الإنجليزية يدوياً وفق نطاق المشروع المتفق عليه.
              </p>
            </div>
          </div>

          {/* WordPress Category Tree Mock */}
          <div className="bg-white border border-[#E4DFD3] rounded-md p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E4DFD3]">
              <Layers size={16} className="text-[#1F4D45]" />
              <h3 className="font-headline font-semibold text-base text-[#14201D]">
                {t.newsroom.structure.taxonomies}
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
                <div className="font-bold text-[#1F4D45] mb-1">Geographies (5 Categories)</div>
                <div className="text-[11px] text-[#76827E]">
                  Saudi Arabia, GCC, Middle East, International
                </div>
              </div>

              <div className="p-2.5 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
                <div className="font-bold text-[#1F4D45] mb-1">Topics (8 Categories)</div>
                <div className="text-[11px] text-[#76827E]">
                  Franchise Agreements, Brand Expansion, Investments, F&B, Retail, Services, Regulations
                </div>
              </div>

              <div className="p-3 bg-[#E5EEEB] text-[#1F4D45] rounded text-[11px] font-arabic leading-relaxed">
                التصنيفات متزامنة مع قوائم ووردبريس ومربوطة بمصنفات نموذج n8n تلقائياً.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
