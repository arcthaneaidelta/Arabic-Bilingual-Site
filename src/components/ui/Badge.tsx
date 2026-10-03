import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'wpml' | 'category';
  categoryColor?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  categoryColor,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  if (variant === 'category') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium ${sizeClasses} ${className}`}>
        <span
          className="w-[3px] h-3 rounded-full shrink-0"
          style={{ backgroundColor: categoryColor || '#1F4D45' }}
        />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === 'wpml') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-mono font-bold uppercase rounded-xs border border-[#1F4D45]/30 bg-[#E5EEEB] text-[#1F4D45] ${sizeClasses} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1F4D45]" />
        <span>{children}</span>
      </span>
    );
  }

  const variantStyles = {
    default: 'bg-[#F2E9D6] text-[#7A6A3A] border border-[#E9E2D2]',
    success: 'bg-[#E3F0E8] text-[#3F7D58] border border-[#3F7D58]/20',
    warning: 'bg-[#FAEFD9] text-[#B7791F] border border-[#B7791F]/30',
    error: 'bg-[#F8E4E0] text-[#B5473A] border border-[#B5473A]/20',
    info: 'bg-[#E3ECF3] text-[#3E6A8A] border border-[#3E6A8A]/20',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-xs ${sizeClasses} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
