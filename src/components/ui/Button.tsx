import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  success?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  block = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all select-none rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08A4A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2 min-h-[42px] gap-2',
    lg: 'text-base px-6 py-2.5 min-h-[48px] gap-2.5',
  };

  const variants = {
    primary:
      'bg-[#1F4D45] text-white hover:bg-[#183D37] active:bg-[#122F2A] border border-[#183D37] shadow-sm',
    secondary:
      'bg-[#E9E2D2] text-[#14201D] hover:bg-[#E0D8C4] active:bg-[#D5CCB6] border border-[#CFC8B8]',
    outline:
      'bg-transparent text-[#1F4D45] hover:bg-[#E5EEEB] border border-[#1F4D45] active:bg-[#D0E2DC]',
    ghost:
      'bg-transparent text-[#1F4D45] hover:bg-[#E5EEEB]/60 active:bg-[#E5EEEB]',
    danger:
      'bg-[#B5473A] text-white hover:bg-[#9B3C31] active:bg-[#833229] border border-[#9B3C31]',
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${
        block ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0 transition-transform">{icon}</span>
      ) : null}
      <span className="truncate">{children}</span>
    </button>
  );
};
