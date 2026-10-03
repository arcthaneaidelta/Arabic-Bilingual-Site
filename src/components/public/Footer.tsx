import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { NewsletterForm } from './NewsletterForm';
import { useT, useLang } from '../../i18n/useT';

export const Footer: React.FC = () => {
  const { t } = useT();
  const lang = useLang();

  return (
    <footer className="bg-[#0F1A18] text-[#EAE6DB] border-t border-[#1F4D45] pt-16 pb-12 select-none text-start">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1F4D45]/60">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo isDark linkTo={`/${lang}`} className="mb-4" />
            <p className="text-xs text-[#CFC8B8] leading-relaxed max-w-sm mb-6 font-arabic">
              منصة إعلامية متخصصة في قطاع الامتياز التجاري في السعودية والخليج والعالم، تجمع بين التحليل الاقتصادي الرصين وتقنيات الرصد الذكية.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#76827E] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#3F7D58]" />
              <span>Riyadh · Dubai · Kuwait · Doha</span>
            </div>
          </div>

          {/* Nav Links Col 1 (2 cols) */}
          <div className="lg:col-span-2">
            <h5 className="font-headline font-semibold text-xs text-[#B08A4A] uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'الأقسام الرئيسية' : 'Sections'}
            </h5>
            <ul className="space-y-2 text-xs text-[#CFC8B8]">
              <li>
                <Link to={`/${lang}/news`} className="hover:text-white transition-colors">
                  {t.nav.news}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/opportunities`} className="hover:text-white transition-colors">
                  {t.nav.opportunities}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/features`} className="hover:text-white transition-colors">
                  {t.nav.features}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/interviews`} className="hover:text-white transition-colors">
                  {t.nav.interviews}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/reports`} className="hover:text-white transition-colors">
                  {t.nav.reports}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Col 2 (2 cols) */}
          <div className="lg:col-span-2">
            <h5 className="font-headline font-semibold text-xs text-[#B08A4A] uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'المنصة والإعلان' : 'Platform & Media'}
            </h5>
            <ul className="space-y-2 text-xs text-[#CFC8B8]">
              <li>
                <Link to={`/${lang}/events`} className="hover:text-white transition-colors">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/video`} className="hover:text-white transition-colors">
                  {t.nav.video}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/podcast`} className="hover:text-white transition-colors">
                  {t.nav.podcast}
                </Link>
              </li>
              <li>
                <Link to="/newsroom" className="text-[#B08A4A] hover:underline font-semibold flex items-center gap-1">
                  <span>{t.nav.behindTheScenes}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Compact (4 cols) */}
          <div className="lg:col-span-4">
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#76827E]">
          <div>
            © 2026 EMTIAZ LIVE · جميع الحقوق محفوظة لامتياز لايف.
          </div>

          <div className="flex items-center gap-4">
            <Link to={`/${lang}/news`} className="hover:text-[#EAE6DB]">
              {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
            <span>·</span>
            <Link to={`/${lang}/news`} className="hover:text-[#EAE6DB]">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span>·</span>
            <span className="font-mono text-[#B08A4A]">WPML: ar / en</span>
          </div>
        </div>

        {/* Proposal attribution note (Section 8.10) */}
        <div className="mt-6 pt-4 border-t border-[#1F4D45]/30 text-center text-[11px] text-[#76827E] font-arabic">
          Prototype crafted for the EMTIAZ AI NEWSROOM proposal · صُمم هذا العرض التفاعلي خصيصاً لمقترح غرفة أخبار امتياز لايف
        </div>
      </div>
    </footer>
  );
};
