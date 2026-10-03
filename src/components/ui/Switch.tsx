import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex shrink-0 transition-colors duration-200 ease-in-out rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08A4A] focus-visible:ring-offset-2 ${
          isSm ? 'h-5 w-9' : 'h-6 w-11'
        } ${checked ? 'bg-[#1F4D45]' : 'bg-[#CFC8B8]'}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
            isSm ? 'h-4 w-4' : 'h-5 w-5'
          } ${
            checked
              ? isSm
                ? 'translate-x-4 rtl:-translate-x-4'
                : 'translate-x-5 rtl:-translate-x-5'
              : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-xs text-[#42504C]">{label}</span>}
    </label>
  );
};
