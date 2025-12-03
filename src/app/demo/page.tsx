"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  MoreVertical,
  Filter,
  DollarSign,
  TrendingUp,
  Clock,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Trash2,
  Eye,
  RefreshCw,
  Tag,
  AlertTriangle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  CreditCard,
  UserPlus,
  Activity,
} from "lucide-react";
import StatusBadge from "@/src/components/ads/view/StatusBadge";

// --- Mock Data ---
const INITIAL_ADS = [
  {
    id: 1,
    title: "Vintage Canon AE-1 Camera",
    price: 250,
    seller: "Alex Morgan",
    sellerRating: 4.8,
    date: "2 mins ago",
    status: "pending",
    category: "Electronics",
    description:
      "In working condition. Lens included. Slight wear on the body but functional.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    title: "MacBook Pro M1 2020",
    price: 850,
    seller: "Sarah Jenkins",
    sellerRating: 5.0,
    date: "15 mins ago",
    status: "pending",
    category: "Computers",
    description:
      "Battery health 98%. Comes with original charger and box. No scratches.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 3,
    title: "Leather Chesterfield Sofa",
    price: 1200,
    seller: "Mike Ross",
    sellerRating: 4.2,
    date: "1 hour ago",
    status: "pending",
    category: "Furniture",
    description: "Genuine leather. Buyer must pick up. Heavy item.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 4,
    title: "PlayStation 5 - Digital Edition",
    price: 400,
    seller: "GamerXYZ",
    sellerRating: 3.5,
    date: "2 hours ago",
    status: "active",
    category: "Gaming",
    description: "Brand new sealed box. Unwanted gift.",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 5,
    title: "Mountain Bike - Trek Marlin",
    price: 550,
    seller: "John Doe",
    sellerRating: 4.9,
    date: "3 hours ago",
    status: "pending",
    category: "Sports",
    description: "Used for one season. Great condition. Includes helmet.",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57e36fb?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 6,
    title: "Broken Lawn Mower",
    price: 50,
    seller: "Tim Burton",
    sellerRating: 2.1,
    date: "1 day ago",
    status: "rejected",
    category: "Garden",
    description: "Doesn't start. Good for parts.",
    image:
      "https://images.unsplash.com/photo-1589252084566-73699310d54b?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 7,
    title: "iPhone 13",
    price: 600,
    seller: "Alice Smith",
    sellerRating: 4.5,
    date: "5 hours ago",
    status: "active",
    category: "Electronics",
    description: "Like new.",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21918a4?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 8,
    title: "Nintendo Switch OLED",
    price: 300,
    seller: "Mario Fan",
    sellerRating: 4.9,
    date: "6 hours ago",
    status: "active",
    category: "Gaming",
    description: "White joycons. Screen protector applied.",
    image:
      "https://images.unsplash.com/photo-1578303512597-81de50a55096?auto=format&fit=crop&q=80&w=150",
  },
  // Adding more mock data to demonstrate pagination better
  {
    id: 9,
    title: "Coffee Table",
    price: 150,
    seller: "Furniture Co",
    status: "active",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=150",
    date: "7 hours ago",
    description: "Oak finish.",
  },
  {
    id: 10,
    title: "Gaming Mouse",
    price: 45,
    seller: "Tech Shop",
    status: "active",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=150",
    date: "8 hours ago",
    description: "RGB lighting.",
  },
  {
    id: 11,
    title: "Office Chair",
    price: 200,
    seller: "Office Depot",
    status: "pending",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=150",
    date: "9 hours ago",
    description: "Ergonomic mesh.",
  },
  {
    id: 12,
    title: "Running Shoes",
    price: 80,
    seller: "Nike Reseller",
    status: "rejected",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    date: "10 hours ago",
    description: "Fake branding detected.",
  },
];

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    user: "Alex Morgan",
    type: "Ad Boost",
    amount: 15.0,
    date: "2 mins ago",
    status: "completed",
  },
  {
    id: 2,
    user: "Sarah Jenkins",
    type: "Premium",
    amount: 29.99,
    date: "1 hour ago",
    status: "completed",
  },
  {
    id: 3,
    user: "Mike Ross",
    type: "Ad Boost",
    amount: 5.0,
    date: "3 hours ago",
    status: "failed",
  },
  {
    id: 4,
    user: "John Doe",
    type: "Verification",
    amount: 10.0,
    date: "5 hours ago",
    status: "completed",
  },
];

const NEW_USERS = [
  { id: 1, name: "Emily Blunt", email: "emily@example.com", joined: "Today" },
  { id: 2, name: "Chris Evans", email: "captain@example.com", joined: "Today" },
  {
    id: 3,
    name: "Scarlett Jo",
    email: "widow@example.com",
    joined: "Yesterday",
  },
];

// --- Components ---

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  hasSubmenu,
  isOpen,
}) => (
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

const SubMenuItem = ({ label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between pl-14 pr-6 py-2 text-sm transition-colors duration-200 ${
      active
        ? "text-indigo-600 font-medium bg-indigo-50/50"
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

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      <p
        className={`text-xs mt-2 font-medium ${
          change.startsWith("+") ? "text-green-600" : "text-red-500"
        }`}
      >
        {change} from last week
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
  </div>
);

export default function AdminDashboard() {
  const [ads, setAds] = useState(INITIAL_ADS);
  const [activeView, setActiveView] = useState("overview"); // active, pending, rejected, overview
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adSubmenuOpen, setAdSubmenuOpen] = useState(false); // Collapsed by default
  const [notification, setNotification] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Dynamic state instead of const

  // Filter ads based on active view
  const filteredAds = ads.filter((ad) => {
    if (["active", "pending", "rejected"].includes(activeView)) {
      return ad.status === activeView;
    }
    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewChange = (view) => {
    setActiveView(view);
    setCurrentPage(1); // Reset to page 1 when changing views
    setAdSubmenuOpen(view !== "overview"); // Auto-expand submenu if ad view
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    setAds(ads.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad)));
    showNotification(`Ad marked as ${newStatus}`);
    setOpenDropdownId(null);
  };

  const handleDelete = (id) => {
    setAds(ads.filter((ad) => ad.id !== id));
    showNotification("Ad deleted permanently");
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 to avoid out of bounds
  };

  const counts = {
    active: ads.filter((a) => a.status === "active").length,
    pending: ads.filter((a) => a.status === "pending").length,
    rejected: ads.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-20 flex items-center px-8 border-b border-slate-100 flex-shrink-0">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <ShoppingBag className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800">MarketAdmin</span>
        </div>

        <nav className="mt-6 space-y-1 flex-1 overflow-y-auto">
          <SidebarItem
            icon={LayoutDashboard}
            label="Overview"
            active={activeView === "overview"}
            onClick={() => handleViewChange("overview")}
          />

          <div>
            <SidebarItem
              icon={ShoppingBag}
              label="Ad Listings"
              active={["active", "pending", "rejected"].includes(activeView)}
              hasSubmenu
              isOpen={adSubmenuOpen}
              onClick={() => setAdSubmenuOpen(!adSubmenuOpen)}
            />
            {adSubmenuOpen && (
              <div className="bg-slate-50 py-2">
                <SubMenuItem
                  label="Active Ads"
                  active={activeView === "active"}
                  count={counts.active}
                  onClick={() => handleViewChange("active")}
                />
                <SubMenuItem
                  label="Pending Ads"
                  active={activeView === "pending"}
                  count={counts.pending}
                  onClick={() => handleViewChange("pending")}
                />
                <SubMenuItem
                  label="Rejected Ads"
                  active={activeView === "rejected"}
                  count={counts.rejected}
                  onClick={() => handleViewChange("rejected")}
                />
              </div>
            )}
          </div>

          <SidebarItem
            icon={Users}
            label="Users"
            active={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={DollarSign}
            label="Transactions"
            active={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={false}
            onClick={() => {}}
          />
        </nav>

        <div className="p-6 border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
              alt="Admin"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-slate-700">Admin User</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
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

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto p-6 lg:p-10"
          onClick={() => setOpenDropdownId(null)}
        >
          {notification && (
            <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-bounce-in z-50">
              <CheckCircle size={18} className="mr-2 text-green-400" />
              {notification}
            </div>
          )}

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 capitalize">
                  {activeView === "overview"
                    ? "Dashboard Overview"
                    : `${activeView} Listings`}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Manage your marketplace listings and moderation queue.
                </p>
              </div>
              {activeView !== "overview" && (
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                </div>
              )}
            </div>

            {/* --- DASHBOARD OVERVIEW SECTION --- */}
            {activeView === "overview" && (
              <>
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    title="Total Revenue"
                    value="$4,250"
                    change="+12%"
                    icon={DollarSign}
                    color="bg-emerald-500"
                  />
                  <StatCard
                    title="Pending Review"
                    value={counts.pending}
                    change="-5%"
                    icon={Clock}
                    color="bg-amber-500"
                  />
                  <StatCard
                    title="New Users"
                    value="+24"
                    change="+18%"
                    icon={UserPlus}
                    color="bg-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Transactions Panel */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-800 flex items-center">
                        <CreditCard size={18} className="mr-2 text-slate-400" />
                        Recent Transactions
                      </h3>
                      <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {RECENT_TRANSACTIONS.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                        >
                          <div className="flex items-center">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                tx.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              <DollarSign size={14} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {tx.type}
                              </p>
                              <p className="text-xs text-slate-500">
                                {tx.user} • {tx.date}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              tx.status === "completed"
                                ? "text-slate-700"
                                : "text-slate-400 line-through"
                            }`}
                          >
                            ${tx.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* New Users Panel */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-800 flex items-center">
                        <Users size={18} className="mr-2 text-slate-400" />
                        New Users
                      </h3>
                      <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {NEW_USERS.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-slate-500 font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {user.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            {user.joined}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Ad Stats */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center">
                      <Activity size={18} className="mr-2 text-slate-400" />
                      Listing Activity
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-4 py-3 font-medium">Item</th>
                          <th className="px-4 py-3 font-medium">Category</th>
                          <th className="px-4 py-3 font-medium">Status</th>
                          <th className="px-4 py-3 font-medium text-right">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ads.slice(0, 5).map((ad) => (
                          <tr
                            key={ad.id}
                            className="border-b border-slate-50 hover:bg-slate-50/50"
                          >
                            <td className="px-4 py-3 font-medium text-slate-700">
                              {ad.title}
                            </td>
                            <td className="px-4 py-3 text-slate-500">
                              {ad.category}
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge status={ad.status} />
                            </td>
                            <td className="px-4 py-3 text-right text-slate-600">
                              ${ad.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* --- AD LISTING VIEWS WITH PAGINATION --- */}
            {activeView !== "overview" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                {paginatedAds.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="mx-auto h-12 w-12 text-slate-300 mb-3 flex items-center justify-center">
                      <ShoppingBag size={48} strokeWidth={1} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">
                      No {activeView} ads
                    </h3>
                    <p className="text-slate-500 mt-1">Your queue is empty.</p>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-slate-100 flex-1">
                      {paginatedAds.map((ad) => (
                        <div
                          key={ad.id}
                          className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center"
                        >
                          <div className="h-20 w-20 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                            <img
                              src={ad.image}
                              alt={ad.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-base font-semibold text-slate-800 truncate pr-4">
                                {ad.title}
                              </h3>
                              <span className="font-bold text-indigo-600 block md:hidden">
                                ${ad.price}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-1 mb-2">
                              {ad.description}
                            </p>
                            <div className="flex items-center text-xs text-slate-400 space-x-4">
                              <span className="flex items-center">
                                <Users size={12} className="mr-1" /> {ad.seller}
                              </span>
                              <span className="flex items-center">
                                <Clock size={12} className="mr-1" /> {ad.date}
                              </span>
                              <span className="hidden md:inline-flex px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                                {ad.category}
                              </span>
                            </div>
                          </div>
                          <div className="hidden md:flex flex-col items-end min-w-[100px] text-right">
                            <span className="font-bold text-slate-800 mb-1">
                              ${ad.price}
                            </span>
                            <StatusBadge status={ad.status} />
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                            {activeView === "pending" && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(ad.id, "rejected");
                                  }}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                >
                                  <X size={16} className="mr-1.5" /> Reject
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(ad.id, "active");
                                  }}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                                >
                                  <CheckCircle size={16} className="mr-1.5" />{" "}
                                  Approve
                                </button>
                              </>
                            )}
                            {activeView === "rejected" && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(ad.id);
                                  }}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                  <Trash2 size={16} className="mr-1.5" /> Delete
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(ad.id, "active");
                                  }}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                                >
                                  <CheckCircle size={16} className="mr-1.5" />{" "}
                                  Approve
                                </button>
                              </>
                            )}
                            {activeView === "active" && (
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDropdown(ad.id);
                                  }}
                                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                  <MoreVertical size={20} />
                                </button>
                                {openDropdownId === ad.id && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-10 py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(ad.id, "sold");
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                                    >
                                      <Tag size={16} className="mr-2" /> Mark as
                                      Sold
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(ad.id, "expired");
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                                    >
                                      <AlertTriangle
                                        size={16}
                                        className="mr-2"
                                      />{" "}
                                      Expired
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        showNotification("Ad renewed");
                                        setOpenDropdownId(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                                    >
                                      <RefreshCw size={16} className="mr-2" />{" "}
                                      Renew Ad
                                    </button>
                                    <div className="h-px bg-slate-100 my-1"></div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        showNotification(
                                          "Viewing ad details..."
                                        );
                                        setOpenDropdownId(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                                    >
                                      <Eye size={16} className="mr-2" /> View Ad
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-slate-50 gap-4">
                      {/* Items per page selector */}
                      <div className="flex items-center space-x-3 text-sm text-slate-500">
                        <span>Show</span>
                        <select
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
                          className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                        </select>
                        <span>entries</span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500">
                          Showing{" "}
                          <span className="font-medium">
                            {(currentPage - 1) * itemsPerPage + 1}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {Math.min(
                              currentPage * itemsPerPage,
                              filteredAds.length
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium">
                            {filteredAds.length}
                          </span>{" "}
                          results
                        </span>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="p-2 border border-slate-200 rounded-md bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                                currentPage === page
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                            className="p-2 border border-slate-200 rounded-md bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronRightIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
