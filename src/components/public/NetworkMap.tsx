import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang, useT } from '../../i18n/useT';

interface CityNode {
  id: string;
  nameAr: string;
  nameEn: string;
  x: number;
  y: number;
  storyCount: number;
  geoCode: string;
}

const CITIES: CityNode[] = [
  { id: 'riyadh', nameAr: 'الرياض', nameEn: 'Riyadh', x: 290, y: 220, storyCount: 24, geoCode: 'saudi' },
  { id: 'jeddah', nameAr: 'جدة', nameEn: 'Jeddah', x: 170, y: 260, storyCount: 16, geoCode: 'saudi' },
  { id: 'dammam', nameAr: 'الدمام', nameEn: 'Dammam', x: 345, y: 195, storyCount: 11, geoCode: 'saudi' },
  { id: 'kuwait', nameAr: 'الكويت', nameEn: 'Kuwait City', x: 335, y: 140, storyCount: 9, geoCode: 'gcc' },
  { id: 'manama', nameAr: 'المنامة', nameEn: 'Manama', x: 358, y: 205, storyCount: 5, geoCode: 'gcc' },
  { id: 'doha', nameAr: 'الدوحة', nameEn: 'Doha', x: 380, y: 228, storyCount: 8, geoCode: 'gcc' },
  { id: 'abudhabi', nameAr: 'أبوظبي', nameEn: 'Abu Dhabi', x: 420, y: 260, storyCount: 12, geoCode: 'gcc' },
  { id: 'dubai', nameAr: 'دبي', nameEn: 'Dubai', x: 440, y: 245, storyCount: 19, geoCode: 'gcc' },
  { id: 'muscat', nameAr: 'مسقط', nameEn: 'Muscat', x: 495, y: 295, storyCount: 6, geoCode: 'gcc' },
];

interface ExpansionArc {
  from: CityNode;
  to: CityNode;
  brandAr: string;
  brandEn: string;
  detailsAr: string;
  detailsEn: string;
}

const EXPANSION_SCENARIOS: ExpansionArc[] = [
  {
    from: CITIES[0], // Riyadh
    to: CITIES[3], // Kuwait
    brandAr: 'هالة لتحميص القهوة',
    brandEn: 'Hala Coffee Roasters',
    detailsAr: 'امتياز رئيسي · 25 موقعاً',
    detailsEn: 'Master franchise · 25 locations',
  },
  {
    from: CITIES[1], // Jeddah
    to: CITIES[0], // Riyadh
    brandAr: 'أسواق النخيل الطازجة',
    brandEn: 'Nakheel Fresh Market',
    detailsAr: 'توسع تجزئة مجتمعية · 14 وحدة',
    detailsEn: 'Community retail · 14 units',
  },
  {
    from: CITIES[7], // Dubai
    to: CITIES[5], // Doha
    brandAr: 'سحاب كيتشن',
    brandEn: 'Sahab Kitchen',
    detailsAr: 'مطابخ سحابية رخصة رئيسية',
    detailsEn: 'Cloud kitchens master license',
  },
  {
    from: CITIES[3], // Kuwait
    to: CITIES[8], // Muscat
    brandAr: 'دار برجر',
    brandEn: 'Dar Burger Co.',
    detailsAr: 'حقوق التطوير · 12 مطعماً',
    detailsEn: 'Development rights · 12 venues',
  },
];

export const NetworkMap: React.FC = () => {
  const lang = useLang();
  const { t } = useT();
  const isRtl = lang === 'ar';
  const navigate = useNavigate();

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate realistic dot grid coordinates representing the Arabian Peninsula shape
  const dots = useMemo(() => {
    const list: { x: number; y: number; id: number }[] = [];
    let idCounter = 0;
    // Bounding region around Arabian Peninsula
    for (let x = 120; x <= 530; x += 14) {
      for (let y = 100; y <= 410; y += 14) {
        // Outline filter logic approximating peninsula shape
        const inPeninsula =
          (x >= 140 && x <= 380 && y >= 110 && y <= 350) ||
          (x >= 240 && x <= 460 && y >= 180 && y <= 380) ||
          (x >= 400 && x <= 510 && y >= 230 && y <= 340) ||
          (x >= 310 && x <= 360 && y >= 120 && y <= 210);

        // Exclude Red Sea & Arabian Gulf indentations
        const inRedSea = x < 210 && y > 270;
        const inGulfWater = x > 350 && x < 415 && y < 200;

        if (inPeninsula && !inRedSea && !inGulfWater) {
          // Add slight jitter for organic feeling
          const jitterX = ((x * 13) % 4) - 2;
          const jitterY = ((y * 17) % 4) - 2;
          list.push({ x: x + jitterX, y: y + jitterY, id: idCounter++ });
        }
      }
    }
    return list;
  }, []);

  // Cycle expansion arcs every 3.8s
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveScenarioIndex((prev) => (prev + 1) % EXPANSION_SCENARIOS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: relX * 8, y: relY * 8 });
  };

  const currentArc = EXPANSION_SCENARIOS[activeScenarioIndex];

  // Compute curved SVG path between two cities
  const arcPath = useMemo(() => {
    const { from, to } = currentArc;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx = (from.x + to.x) / 2 - dy * 0.25;
    const cy = (from.y + to.y) / 2 + dx * 0.25;
    return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  }, [currentArc]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center select-none overflow-hidden rounded-md border border-[#E4DFD3] bg-[#FBF9F4]/70"
    >
      {/* Decorative SVG Map Canvas */}
      <svg
        viewBox="0 0 600 460"
        className="w-full h-full object-contain pointer-events-auto"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F4D45" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B08A4A" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Static Dot Grid Layer with Parallax */}
        <g
          style={{
            transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {dots.map((d) => (
            <circle
              key={d.id}
              cx={d.x}
              cy={d.y}
              r={1.4}
              fill="#CFC8B8"
              opacity={0.7}
            />
          ))}
        </g>

        {/* Active Animated Expansion Arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="2"
          strokeDasharray="8 4"
          className="transition-all duration-700 ease-out"
        />

        {/* City Nodes */}
        {CITIES.map((city, idx) => {
          const isOrigin = currentArc.from.id === city.id;
          const isTarget = currentArc.to.id === city.id;
          const isHovered = hoveredCity?.id === city.id;

          return (
            <g
              key={city.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/${lang}/news?geo=${city.geoCode}`)}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              tabIndex={0}
              role="button"
              aria-label={`${city.nameEn} - ${city.storyCount} stories`}
            >
              {/* Outer Pulse Ring */}
              <circle
                cx={city.x}
                cy={city.y}
                r={isTarget || isHovered ? 14 : 9}
                fill="none"
                stroke={isTarget ? '#B08A4A' : isOrigin ? '#1F4D45' : '#CFC8B8'}
                strokeWidth="1.2"
                opacity={isTarget || isHovered ? 0.9 : 0.4}
                className={isTarget ? 'animate-ping' : ''}
                style={{
                  transformOrigin: `${city.x}px ${city.y}px`,
                  animationDuration: `${3.5 + (idx % 3)}s`,
                }}
              />

              {/* Core Node Dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={isTarget || isHovered ? 5.5 : 4}
                fill={isTarget ? '#B08A4A' : '#1F4D45'}
                className="transition-all duration-200"
              />

              {/* City Label */}
              <text
                x={city.x + (isRtl ? -8 : 8)}
                y={city.y - 8}
                textAnchor={isRtl ? 'end' : 'start'}
                className={`text-[11px] font-medium font-arabic select-none transition-colors ${
                  isHovered || isTarget
                    ? 'fill-[#1F4D45] font-bold'
                    : 'fill-[#42504C]'
                }`}
              >
                {lang === 'ar' ? city.nameAr : city.nameEn}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Expansion Story Tooltip */}
      <div
        className={`absolute bottom-4 ${
          isRtl ? 'right-4' : 'left-4'
        } max-w-xs bg-white/95 backdrop-blur-sm border border-[#E4DFD3] shadow-md rounded-md p-3 transition-all duration-300 pointer-events-auto`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#B08A4A] inline-block animate-pulse" />
          <span className="text-[10px] font-mono uppercase text-[#76827E] tracking-wider">
            {lang === 'ar' ? 'توسع نشط في الشبكة' : 'Active Network Expansion'}
          </span>
        </div>
        <h5 className="font-headline font-semibold text-sm text-[#14201D] truncate">
          {lang === 'ar' ? currentArc.brandAr : currentArc.brandEn}
        </h5>
        <div className="flex items-center gap-2 text-xs text-[#42504C] mt-1 font-arabic">
          <span className="font-medium text-[#1F4D45]">
            {lang === 'ar' ? currentArc.from.nameAr : currentArc.from.nameEn}
          </span>
          <span className="text-[#B08A4A]">→</span>
          <span className="font-medium text-[#1F4D45]">
            {lang === 'ar' ? currentArc.to.nameAr : currentArc.to.nameEn}
          </span>
        </div>
        <p className="text-[11px] text-[#76827E] mt-1 font-arabic">
          {lang === 'ar' ? currentArc.detailsAr : currentArc.detailsEn}
        </p>
      </div>

      {/* Hovered City Quick Card */}
      {hoveredCity && (
        <div
          className={`absolute top-4 ${
            isRtl ? 'left-4' : 'right-4'
          } bg-[#16241F] text-white px-3.5 py-2 rounded-sm shadow-md border border-[#B08A4A]/40 text-xs font-arabic animate-in fade-in duration-150`}
        >
          <div className="font-semibold text-[#B08A4A]">
            {lang === 'ar' ? hoveredCity.nameAr : hoveredCity.nameEn}
          </div>
          <div className="text-[11px] text-[#EAE6DB] mt-0.5">
            {hoveredCity.storyCount} {lang === 'ar' ? 'أخبار وتوسعات' : 'news stories'}
          </div>
          <div className="text-[10px] text-[#CFC8B8] mt-1 underline">
            {lang === 'ar' ? 'انقر لتصفية الأخبار' : 'Click to filter stories'}
          </div>
        </div>
      )}
    </div>
  );
};
