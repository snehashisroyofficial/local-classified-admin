import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  DollarSign,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarMenuItem = {
  label: string;
  icon: LucideIcon;
  route?: string;
  submenu?: { label: string; route: string }[];
};

export const SIDEBAR_ITEMS: SidebarMenuItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    route: "/overview",
  },
  {
    label: "Ad Listings",
    icon: ShoppingBag,
    submenu: [
      { label: "Active Ads", route: "/active" },
      { label: "Pending Ads", route: "/pending" },
      { label: "Rejected Ads", route: "/rejected" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    route: "/users",
  },
  {
    label: "Transactions",
    icon: DollarSign,
    route: "/transactions",
  },
  {
    label: "Settings",
    icon: Settings,
    route: "/settings",
  },
];
