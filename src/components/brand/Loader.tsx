import React, { useState, useEffect } from 'react';
import { useLang } from '../../i18n/useT';

let hasLoadedOnceInMemory = false;

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const lang = useLang();
  const isRtl = lang === 'ar';
  
  // If already shown once in memory, skip
  const [shouldRender, setShouldRender] = useState(!hasLoadedOnceInMemory);
  const [progress, setProgress] = useState(10);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    if (hasLoadedOnceInMemory) {
      if (onComplete) onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Simulate real font & DOM readiness checks
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 85) return prev + 15;
        return prev;
      });
    }, 150);

    const finishLoading = () => {
      clearInterval(progressInterval);
      setProgress(100);

      const elapsed = Date.now() - startTime;
      const minDisplayTime = 750;
      const delayRemaining = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        if (prefersReducedMotion) {
          hasLoadedOnceInMemory = true;
          setShouldRender(false);
          if (onComplete) onComplete();
        } else {
          setIsSplitting(true);
          setTimeout(() => {
            hasLoadedOnceInMemory = true;
            setShouldRender(false);
            if (onComplete) onComplete();
          }, 600);
        }
      }, delayRemaining);
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        finishLoading();
      }).catch(() => {
        setTimeout(finishLoading, 900);
      });
    } else {
      setTimeout(finishLoading, 900);
    }

    // Hard fallback cap at 2.0s
    const hardCapTimer = setTimeout(finishLoading, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hardCapTimer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top half split panel */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#0F1A18] transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom half split panel */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#0F1A18] transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Centered Wordmark and Hairline bar */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isSplitting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center">
          {/* Latin Wordmark */}
          <span className="font-headline font-semibold text-3xl md:text-4xl text-[#EAE6DB] tracking-[0.18em]">
            EMTIAZ
          </span>

          {/* Arabic Wordmark */}
          <span className="font-arabic font-medium text-lg md:text-xl text-[#B08A4A] mt-1">
            امتياز لايف
          </span>

          {/* Brass Hairline Progress */}
          <div className="w-48 h-[1px] bg-[#1F4D45] mt-4 relative overflow-hidden">
            <div
              className={`absolute top-0 bottom-0 bg-[#B08A4A] transition-all duration-300 ${
                isRtl ? 'right-0' : 'left-0'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[11px] font-mono text-[#76827E] mt-3">
            Franchise Intelligence
          </span>
        </div>
      </div>
    </div>
  );
};
