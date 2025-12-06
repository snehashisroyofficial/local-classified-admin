import { Bell, Menu, Search } from "lucide-react";

type Props = {
  setSidebarOpen: (open: boolean) => void;
};
const Header = ({ setSidebarOpen }: Props) => {
  return (
    <div>
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
        <div className="flex items-center">
          <button
            className="lg:hidden mr-4 p-2 text-slate-500 hover:bg-slate-100 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search ads, users..."
              className="pl-10 pr-4 py-2 w-64 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
