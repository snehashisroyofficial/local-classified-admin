import { Menu } from "lucide-react";

type Props = {
  setSidebarOpen: (open: boolean) => void;
};
const Header = ({ setSidebarOpen }: Props) => {
  return (
    <div>
      <header className=" lg:hidden  h-20 bg-white border-b border-slate-200 flex  items-center justify-between px-6 lg:px-10 shrink-0">
        <div className="flex items-center">
          <button
            className="lg:hidden mr-4 p-2 text-slate-500 hover:bg-slate-100 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
