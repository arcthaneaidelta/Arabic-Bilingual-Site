import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/public/Header';
import { Footer } from '../../components/public/Footer';
import { LiveTicker } from '../../components/brand/LiveTicker';
import { DemoBanner } from '../../components/brand/DemoBanner';
import { Loader } from '../../components/brand/Loader';
import { GuidedTour } from '../../components/brand/GuidedTour';
import { SeoDrawer } from '../../components/public/SeoDrawer';
import { EnquireModal } from '../../components/public/EnquireModal';
import { SearchModal } from '../../components/public/SearchModal';
import { ToastContainer } from '../../components/ui/ToastContainer';
import { useLang } from '../../i18n/useT';

export const PublicLayout: React.FC = () => {
  const lang = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  // Sync html dir and lang attributes
  useEffect(() => {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#14201D] font-sans">
      <Loader />
      <DemoBanner />
      <LiveTicker />
      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />

      {/* Global Overlays */}
      <GuidedTour />
      <SeoDrawer />
      <EnquireModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};
