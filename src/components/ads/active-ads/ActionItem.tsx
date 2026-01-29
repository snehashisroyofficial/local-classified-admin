"use client";

import { LucideIcon } from "lucide-react";

export type ActionItemProps = {
  label: string;
  icon: LucideIcon;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean; // Optional: red hover style
};

const ActionItem: React.FC<ActionItemProps> = ({
  label,
  icon: Icon,
  onClick,
  danger = false,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={`
        w-full text-left px-6 sm:px-4 py-3 sm:py-2 
        text-base sm:text-sm 
        flex items-center active:bg-slate-100
        
        ${
          danger
            ? "text-slate-700 hover:bg-red-50 hover:text-red-700"
            : "text-slate-700 hover:bg-indigo-50 hover:text-primary"
        }
      `}
    >
      <Icon size={18} className="mr-3 sm:mr-2 sm:w-4 sm:h-4" />
      {label}
    </button>
  );
};

export default ActionItem;
