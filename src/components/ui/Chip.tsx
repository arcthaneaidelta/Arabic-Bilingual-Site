import React from 'react';

export interface ChipProps {
  label: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  onRemove?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  count,
  selected = false,
  onClick,
  size = 'md',
  onRemove,
}) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3.5 py-1.5';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-pill font-medium transition-all select-none border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08A4A] ${sizeClasses} ${
        selected
          ? 'bg-[#1F4D45] text-white border-[#1F4D45] shadow-sm'
          : 'bg-[#FFFFFF] text-[#42504C] border-[#E4DFD3] hover:border-[#CFC8B8] hover:bg-[#FBF9F4]'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.2 rounded-full font-mono ${
            selected ? 'bg-white/20 text-white' : 'bg-[#E5EEEB] text-[#1F4D45]'
          }`}
        >
          {count}
        </span>
      )}
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ms-1 hover:text-red-500 cursor-pointer"
        >
          ×
        </span>
      )}
    </button>
  );
};
