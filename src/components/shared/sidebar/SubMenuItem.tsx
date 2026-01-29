type SubMenuItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
};

const SubMenuItem = ({ label, active, onClick, count }: SubMenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between pl-14 pr-6 py-2 text-sm transition-colors duration-200 ${
        active
          ? "text-primary font-medium bg-indigo-50/50"
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            active ? "bg-indigo-100" : "bg-slate-100"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default SubMenuItem;
