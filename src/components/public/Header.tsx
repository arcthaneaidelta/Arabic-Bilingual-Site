import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ExternalLink, Sliders } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { Button } from '../ui/Button';
import { useT, useLang } from '../../i18n/useT';
import { useUiStore } from '../../store/uiStore';

export const Header: React.FC = () => {
  const { t } = useT();
  const lang = useLang();
  const isRtl = lang === 'ar';
  const navigate = useNavigate();
  const location = useLocation();
  const { openSearch, adZonesVisible, toggleAdZones } = useUiStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.news, path: `/${lang}/news` },
    { label: t.nav.opportunities, path: `/${lang}/opportunities` },
    { label: t.nav.features, path: `/${lang}/features` },
    { label: t.nav.interviews, path: `/${lang}/interviews` },
    { label: t.nav.reports, path: `/${lang}/reports` },
    { label: t.nav.events, path: `/${lang}/events` },
    { label: t.nav.video, path: `/${lang}/video` },
    { label: t.nav.podcast, path: `/${lang}/podcast` },
  ];

  const primaryNav = navItems.slice(0, 5);
  const moreNav = navItems.slice(5);

  const toggleLanguage = (targetLang: 'ar' | 'en') => {
    if (targetLang === lang) return;
    const currentPath = location.pathname;
    let newPath = currentPath.replace(/^\/(ar|en)/, `/${targetLang}`);
    if (!newPath.startsWith(`/${targetLang}`)) {
      newPath = `/${targetLang}`;
    }
    navigate(newPath);
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full bg-[#F7F4EE]/95 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled
          ? 'py-2.5 border-[#E4DFD3] shadow-sm'
          : 'py-4 border-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo linkTo={`/${lang}`} />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-sm text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-[#1F4D45] font-semibold'
                    : 'text-[#42504C] hover:text-[#14201D] hover:bg-[#E9E2D2]/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#B08A4A]" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Collapsed "More" dropdown for larger screens */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-sm font-medium text-[#42504C] hover:text-[#14201D] hover:bg-[#E9E2D2]/40"
            >
              <span>{t.nav.more}</span>
              <ChevronDown size={14} className={moreDropdownOpen ? 'rotate-180' : ''} />
            </button>
            {moreDropdownOpen && (
              <div
                className={`absolute top-full mt-1 ${
                  isRtl ? 'left-0' : 'right-0'
                } w-44 bg-white border border-[#E4DFD3] rounded-md shadow-md py-1.5 z-40`}
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                {moreNav.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-[#42504C] hover:text-[#1F4D45] hover:bg-[#FBF9F4]"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ad zones toggle button (demo-only tool) */}
          <button
            onClick={toggleAdZones}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-pill font-mono border transition-all ${
              adZonesVisible
                ? 'bg-[#B08A4A] text-white border-[#B08A4A]'
                : 'bg-white text-[#76827E] border-[#E4DFD3] hover:text-[#14201D]'
            }`}
            title="Toggle Advertising Slots Overlay"
          >
            <Sliders size={12} />
            <span className="text-[11px]">{t.common.adZoneToggle}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="p-2 text-[#42504C] hover:text-[#14201D] hover:bg-[#E9E2D2]/50 rounded-sm transition-colors"
            aria-label={t.nav.search}
          >
            <Search size={18} />
          </button>

          {/* Language Switcher Segmented Control */}
          <div className="flex items-center bg-[#E9E2D2] p-0.5 rounded-sm border border-[#CFC8B8] text-xs font-semibold select-none">
            <button
              type="button"
              onClick={() => toggleLanguage('ar')}
              className={`px-2 py-1 rounded-[3px] transition-all ${
                lang === 'ar'
                  ? 'bg-white text-[#1F4D45] shadow-xs'
                  : 'text-[#42504C] hover:text-[#14201D]'
              }`}
            >
              عربي
            </button>
            <button
              type="button"
              onClick={() => toggleLanguage('en')}
              className={`px-2 py-1 rounded-[3px] transition-all ${
                lang === 'en'
                  ? 'bg-white text-[#1F4D45] shadow-xs'
                  : 'text-[#42504C] hover:text-[#14201D]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Behind the scenes / Newsroom link */}
          <Link
            to="/newsroom"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-pill bg-[#16241F] text-[#EAE6DB] hover:bg-[#1F4D45] border border-[#B08A4A]/40 transition-colors shadow-xs"
          >
            <span>{t.nav.behindTheScenes}</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#14201D] hover:bg-[#E9E2D2]/60 rounded-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[108px] bg-[#FFFFFF] border-b border-[#E4DFD3] shadow-lg p-6 flex flex-col gap-4 z-40 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1 pb-4 border-b border-[#E4DFD3]">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded text-base font-medium text-[#14201D] hover:bg-[#FBF9F4] flex items-center justify-between"
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/newsroom"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded bg-[#0F1A18] text-[#EAE6DB] font-semibold text-sm flex items-center justify-center gap-2 border border-[#B08A4A]"
            >
              <span>{t.nav.behindTheScenes}</span>
              <ExternalLink size={14} />
            </Link>

            <button
              onClick={() => {
                toggleAdZones();
                setMobileMenuOpen(false);
              }}
              className="py-2 text-xs text-[#76827E] border border-[#E4DFD3] rounded"
            >
              {t.common.adZoneToggle}: {adZonesVisible ? 'مفعل ON' : 'معطل OFF'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
