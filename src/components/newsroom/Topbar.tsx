import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Menu,
  Clock,
  Sparkles,
  Command,
} from 'lucide-react';
import { useNewsroomStore } from '../../store/newsroomStore';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

interface TopbarProps {
  onToggleMobileMenu: () => void;
  onOpenCommandPalette: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleMobileMenu,
  onOpenCommandPalette,
}) => {
  const { pipelineIntervalMinutes, resetAllDemoData, drafts } = useNewsroomStore();
  const { showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();
  const location = useLocation();

  const [countdownSeconds, setCountdownSeconds] = useState(
    pipelineIntervalMinutes * 60 - 240
  );
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : pipelineIntervalMinutes * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, [pipelineIntervalMinutes]);

  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleResetData = () => {
    resetAllDemoData();
    showToast(
      lang === 'ar' ? 'تمت استعادة البيانات الافتراضية' : 'Demo Data Restored',
      lang === 'ar' ? 'تمت إعادة تعيين المصادر والمسودات وسجل العمليات.' : 'All sources, drafts, and logs reset to initial state.',
      'info'
    );
    setProfileMenuOpen(false);
  };

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E4DFD3] px-4 sm:px-6 flex items-center justify-between z-30 select-none">
      {/* Left items: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 text-[#14201D] hover:bg-[#FBF9F4] rounded"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#1F4D45] font-semibold">EMTIAZ AI NEWSROOM</span>
          <span className="text-[#CFC8B8]">/</span>
          <span className="text-[#76827E] uppercase truncate max-w-[140px] sm:max-w-none">
            {location.pathname.replace('/newsroom', '') || 'OVERVIEW'}
          </span>
        </div>
      </div>

      {/* Center Search / Command Palette Trigger */}
      <div className="hidden md:flex items-center">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3 py-1.5 bg-[#FBF9F4] hover:bg-[#F0ECE1] text-[#76827E] border border-[#E4DFD3] rounded text-xs transition-colors"
        >
          <Search size={14} />
          <span>Quick actions & jump to screen...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-[#CFC8B8] rounded font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Next Run Countdown Chip */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#FBF9F4] border border-[#CFC8B8] rounded text-xs font-mono text-[#14201D]">
          <Clock size={12} className="text-[#B08A4A]" />
          <span className="text-[#76827E]">{t.newsroom.nextRun}:</span>
          <span className="font-semibold">{timeFormatted}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-[#42504C] hover:text-[#14201D] hover:bg-[#FBF9F4] rounded relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-[#B7791F]" />
          </button>

          {notificationsOpen && (
            <div
              className="absolute end-0 mt-2 w-80 bg-white border border-[#E4DFD3] rounded-md shadow-lg p-3 z-50 text-start"
              onMouseLeave={() => setNotificationsOpen(false)}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E4DFD3] text-xs font-semibold text-[#14201D]">
                <span>التنبيهات التحريرية / Alerts</span>
                <span className="text-[10px] font-mono text-[#B7791F]">3 Unresolved</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-[#FAEFD9]/60 rounded border border-[#B7791F]/30">
                  <div className="font-semibold text-[#B7791F]">تعارض في قيمة الاستثمار</div>
                  <div className="text-[11px] text-[#42504C]">
                    هالة لتحميص القهوة: 40 مليون في العنوان مقابل 4 ملايين في المتن.
                  </div>
                </div>
                <div className="p-2 bg-[#FBF9F4] rounded border border-[#E4DFD3]">
                  <div className="font-semibold text-[#1F4D45]">تم استبعاد خبر مكرر</div>
                  <div className="text-[11px] text-[#76827E]">
                    Franchise Wire: تطابق عنوان بنسبة 98% مع Gulf Review.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User / Editorial Desk Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded hover:bg-[#FBF9F4] text-xs"
          >
            <div className="w-7 h-7 rounded bg-[#1F4D45] text-white flex items-center justify-center font-bold text-xs">
              ED
            </div>
            <span className="hidden md:inline font-semibold text-[#14201D]">
              Editorial Desk
            </span>
            <ChevronDown size={14} className="text-[#76827E]" />
          </button>

          {profileMenuOpen && (
            <div
              className="absolute end-0 mt-2 w-56 bg-white border border-[#E4DFD3] rounded-md shadow-lg py-1.5 z-50 text-start"
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <div className="px-4 py-2 border-b border-[#E4DFD3]">
                <div className="font-semibold text-xs text-[#14201D]">Emtiaz Editorial Lead</div>
                <div className="text-[11px] font-mono text-[#76827E]">admin@emtiaz.live</div>
              </div>

              <Link
                to={`/${lang}`}
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-xs text-[#42504C] hover:bg-[#FBF9F4] hover:text-[#1F4D45]"
              >
                <span>{lang === 'ar' ? 'العودة للموقع العام' : 'Switch to Public Site'}</span>
                <ExternalLink size={12} />
              </Link>

              <button
                onClick={handleResetData}
                className="w-full flex items-center justify-between px-4 py-2 text-xs text-[#B5473A] hover:bg-[#F8E4E0]/40 transition-colors"
              >
                <span>{t.newsroom.resetDemo}</span>
                <RotateCcw size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
