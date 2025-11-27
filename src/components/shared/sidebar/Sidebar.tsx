"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import SidebarItem from "./SidebarItem";
import SubMenuItem from "./SubMenuItem";
import { SIDEBAR_ITEMS } from "./item";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeView, setActiveView] = useState("overview");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    router.push(`/ads/${view}`);
  };

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  useEffect(() => {
    SIDEBAR_ITEMS.forEach((item) => {
      if (item.submenu?.some((sub) => pathname.includes(sub.route))) {
        setOpenMenu(item.label);
      }
    });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200
          transform transition-transform duration-200 ease-in-out flex flex-col
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="h-20 flex items-center px-8 border-b border-slate-100 shrink-0">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <ShoppingBag className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800">MarketAdmin</span>
        </div>

        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = item.submenu?.some((sub) =>
              pathname.includes(sub.route)
            );

            return (
              <div key={item.label}>
                <SidebarItem
                  icon={item.icon}
                  label={item.label}
                  active={
                    item.submenu ? isActive ?? false : item.route === activeView
                  }
                  hasSubmenu={!!item.submenu}
                  isOpen={item.submenu && openMenu === item.label}
                  onClick={() =>
                    item.submenu
                      ? toggleMenu(item.label)
                      : handleViewChange(item.route!)
                  }
                />

                {/* submenu visible when opened */}
                {item.submenu && openMenu === item.label && (
                  <div className="bg-slate-50 py-2">
                    {item.submenu.map((sub) => (
                      <SubMenuItem
                        key={sub.route}
                        label={sub.label}
                        active={pathname.includes(sub.route)}
                        onClick={() => handleViewChange(sub.route)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 flex shrink-0 mt-auto">
          <div className="flex items-center space-x-3">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
              alt="Admin"
              width={100}
              height={100}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-slate-700">Admin User</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
