import { Menu, ShoppingBag } from "lucide-react";

type Props = {
  setSidebarOpen: (open: boolean) => void;
};
const Header = ({ setSidebarOpen }: Props) => {
  return (
    <div>
      <header className=" lg:hidden  h-16 bg-white border-b border-slate-200 flex  items-center justify-between px-4 lg:px-10 shrink-0">
        {/* logo  */}
        <div className="h-16 flex items-center  border-b border-slate-100 shrink-0">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3">
            <ShoppingBag className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800">MarketAdmin</span>
        </div>

        {/* menu hamburger  */}
        <div className="flex items-center">
          <button
            className="lg:hidden  p-2 text-slate-500 hover:bg-slate-100 rounded-md"
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
