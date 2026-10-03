import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/useT';

interface LogoProps {
  className?: string;
  isDark?: boolean;
  compact?: boolean;
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  isDark = false,
  compact = false,
  linkTo,
}) => {
  const lang = useLang();
  const targetLink = linkTo || `/${lang}`;

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Monogram Icon */}
      <div
        className={`w-9 h-9 rounded-sm flex items-center justify-center font-headline font-bold text-lg transition-colors border ${
          isDark
            ? 'bg-[#16241F] text-[#B08A4A] border-[#1F4D45]'
            : 'bg-[#1F4D45] text-[#F7F4EE] border-[#183D37]'
        }`}
      >
        <span className="font-serif italic">E</span>
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-headline font-semibold text-lg tracking-wide ${
              isDark ? 'text-[#EAE6DB]' : 'text-[#14201D]'
            }`}
          >
            EMTIAZ LIVE
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B08A4A] pulse-brass" />
        </div>
        {!compact && (
          <span
            className={`text-xs font-arabic font-medium mt-0.5 ${
              isDark ? 'text-[#B08A4A]' : 'text-[#42504C]'
            }`}
          >
            امتياز لايف · ذكاء الامتياز
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo === null) {
    return content;
  }

  return (
    <Link to={targetLink} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
      {content}
    </Link>
  );
};
