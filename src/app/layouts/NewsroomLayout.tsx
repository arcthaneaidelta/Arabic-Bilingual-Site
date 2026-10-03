import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/newsroom/Sidebar';
import { Topbar } from '../../components/newsroom/Topbar';
import { CommandPalette } from '../../components/newsroom/CommandPalette';
import { ToastContainer } from '../../components/ui/ToastContainer';
import { useLang } from '../../i18n/useT';

export const NewsroomLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const lang = useLang();
  const isRtl = lang === 'ar';

  useEffect(() => {
    // Keep html direction aligned
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  return (
    <div className="min-h-screen bg-[#0F1A18] text-[#14201D] flex antialiased" dir="ltr">
      {/* Sidebar (Desktop 256px fixed + Mobile Drawer) */}
      <Sidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Container — offset left by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Topbar
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F7F4EE] min-h-screen">
          <div className="max-w-[1400px] w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <ToastContainer />
    </div>
  );
};
