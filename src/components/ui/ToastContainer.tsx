import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { useLang } from '../../i18n/useT';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUiStore();
  const lang = useLang();
  const isRtl = lang === 'ar';

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed bottom-5 ${
        isRtl ? 'left-5' : 'right-5'
      } z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0`}
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const icon =
          toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-[#B5473A] shrink-0" />
          ) : toast.type === 'info' ? (
            <AlertTriangle className="w-5 h-5 text-[#B7791F] shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#3F7D58] shrink-0" />
          );

        const border =
          toast.type === 'error'
            ? 'border-[#B5473A]/30'
            : toast.type === 'info'
            ? 'border-[#B7791F]/30'
            : 'border-[#3F7D58]/30';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-[#FFFFFF] rounded-md border ${border} shadow-md text-[#14201D] text-sm animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-[#14201D]">{toast.title}</p>
              {toast.desc && (
                <p className="text-xs text-[#42504C] mt-0.5 font-arabic">{toast.desc}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#76827E] hover:text-[#14201D] p-1"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
