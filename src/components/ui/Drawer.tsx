import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLang } from '../../i18n/useT';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-[480px]',
}) => {
  const lang = useLang();
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#14201D]/40 backdrop-blur-[1px] transition-opacity duration-260"
        onClick={onClose}
      />

      {/* Drawer panel positioned at inline-end */}
      <div
        className={`fixed inset-y-0 ${
          isRtl ? 'left-0' : 'right-0'
        } w-full ${width} bg-[#FFFFFF] shadow-lg border-s border-[#E4DFD3] z-10 flex flex-col transform transition-transform duration-260 ease-out`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E4DFD3] bg-[#FBF9F4] flex items-center justify-between">
          <div>
            {title && (
              <h3 className="font-headline font-semibold text-lg text-[#14201D]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#76827E] mt-0.5 font-mono">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#76827E] hover:text-[#14201D] p-1.5 rounded-sm hover:bg-[#E9E2D2]/50"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
