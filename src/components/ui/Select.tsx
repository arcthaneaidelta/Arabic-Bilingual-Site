import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="w-full flex flex-col gap-1.5 text-start">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-[#14201D]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={`w-full appearance-none px-3.5 py-2 pe-9 text-sm bg-white text-[#14201D] border border-[#CFC8B8] rounded-sm transition-all focus:outline-none focus:border-[#1F4D45] focus:ring-2 focus:ring-[#E5EEEB] hover:border-[#B9B19F] cursor-pointer ${
              error ? 'border-[#B5473A]' : ''
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute end-3 text-[#76827E] pointer-events-none">
            <ChevronDown size={16} />
          </div>
        </div>
        {error && <p className="text-xs text-[#B5473A]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
