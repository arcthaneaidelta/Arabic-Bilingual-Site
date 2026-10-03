import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-[#14201D]/50 backdrop-blur-[2px] transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} bg-[#FFFFFF] rounded-md border border-[#E4DFD3] shadow-lg overflow-hidden transform transition-all duration-200 ease-out z-10 flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="px-6 py-4 border-b border-[#E4DFD3] flex items-start justify-between bg-[#FBF9F4]">
            <div>
              {title && (
                <h3 className="font-headline font-semibold text-lg text-[#14201D]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#76827E] mt-0.5 font-arabic">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-[#76827E] hover:text-[#14201D] transition-colors p-1.5 rounded-sm hover:bg-[#E9E2D2]/50"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content body with custom scroll */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
