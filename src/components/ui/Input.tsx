import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="w-full flex flex-col gap-1.5 text-start">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[#14201D]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={inputId}
            ref={ref}
            className={`w-full px-3.5 py-2 text-sm bg-white text-[#14201D] border rounded-sm transition-all focus:outline-none placeholder:text-[#76827E] ${
              error
                ? 'border-[#B5473A] focus:border-[#B5473A] focus:ring-2 focus:ring-[#F8E4E0]'
                : success
                ? 'border-[#3F7D58] focus:border-[#3F7D58] focus:ring-2 focus:ring-[#E3F0E8]'
                : 'border-[#CFC8B8] hover:border-[#B9B19F] focus:border-[#1F4D45] focus:ring-2 focus:ring-[#E5EEEB]'
            } ${className}`}
            {...props}
          />
          {error && (
            <div className="absolute end-3 text-[#B5473A] pointer-events-none">
              <AlertCircle size={16} />
            </div>
          )}
          {success && !error && (
            <div className="absolute end-3 text-[#3F7D58] pointer-events-none">
              <CheckCircle2 size={16} />
            </div>
          )}
        </div>
        {error && <p className="text-xs text-[#B5473A] flex items-center gap-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#76827E]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
