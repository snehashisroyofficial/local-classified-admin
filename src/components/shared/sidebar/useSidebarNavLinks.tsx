import { LayoutList, Camera, Settings, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export const useSidebarNavLinks = () => {
  const pathname = usePathname();

  const isNavActive = (path: string, activePath: string) => {
    return path.includes(activePath);
  };

  return [
    {
      title: "Overview",
      url: "/post",
      icon: <LayoutDashboard size={18} />,
      isActive: isNavActive(pathname),
    },
    {
      title: "My Ads",
      url: "/my-ads",
      icon: <LayoutList size={18} />,
      isActive: isNavActive(pathname || "", "/my-ads"),
    },
    {
      title: "Settings",
      url: "/account",
      icon: <Settings size={18} />,
    },
  ];
};
