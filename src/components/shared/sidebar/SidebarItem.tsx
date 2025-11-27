import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  hasSubmenu?: boolean;
  isOpen?: boolean;
};

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  hasSubmenu,
  isOpen,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-3 transition-colors duration-200 ${
        active
          ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>

      {hasSubmenu &&
        (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
    </button>
  );
};

export default SidebarItem;
