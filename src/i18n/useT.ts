import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ar } from './ar';
import { en } from './en';

export type Language = 'ar' | 'en';

export function useLang(): Language {
  const location = useLocation();
  if (location.pathname.startsWith('/en')) {
    return 'en';
  }
  return 'ar';
}

export function useT() {
  const lang = useLang();
  const t = useMemo(() => (lang === 'en' ? en : ar), [lang]);
  const isRTL = lang === 'ar';

  return { t, lang, isRTL };
}
