"use client";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Clock,
  Eye,
  MoreVertical,
  RefreshCw,
  ShoppingBag,
  Tag,
  Users,
  CheckCircle,
  X,
  Trash2,
  Filter,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// --- Mock Data ---
const INITIAL_ADS = [
  {
    id: 1,
    title: "Vintage Canon AE-1 Camera",
    price: 250,
    seller: "Alex Morgan",
    sellerRating: 4.8,
    date: "2 mins ago",
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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

const ActivePage = () => {
  const [ads] = useState(INITIAL_ADS);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState("active");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // **Filter only active ads**
  const activeAds = ads.filter((ad) => ad.status === "active");

  // Pagination Logic
  const totalPages = Math.ceil(activeAds.length / itemsPerPage);
  const paginatedAds = activeAds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
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
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {paginatedAds.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-12 w-12 text-slate-300 mb-3 flex items-center justify-center">
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              No Active Ads
            </h3>
            <p className="text-slate-500 mt-1">Your queue is empty.</p>
          </div>
        ) : (
          <>
            {/* ADS LIST */}
            <div className="divide-y divide-slate-100 flex-1">
              {paginatedAds.map((ad) => (
                <div
                  key={ad.id}
                  className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4 items-start md:items-center"
                >
                  <div className="h-20 w-20 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={ad.image}
                      alt={ad.title}
                      height={1000}
                      width={1000}
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
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === ad.id ? null : ad.id
                          )
                        }
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openDropdownId === ad.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-10 py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 flex items-center">
                            <Tag size={16} className="mr-2" /> Mark as Sold
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 flex items-center">
                            <AlertTriangle size={16} className="mr-2" /> Expired
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 flex items-center">
                            <RefreshCw size={16} className="mr-2" /> Renew Ad
                          </button>
                          <div className="h-px bg-slate-100 my-1"></div>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 flex items-center">
                            <Eye size={16} className="mr-2" /> View Ad
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between">
              <span className="text-sm text-slate-500">
                Showing <b>{(currentPage - 1) * itemsPerPage + 1}</b> to{" "}
                <b>{Math.min(currentPage * itemsPerPage, activeAds.length)}</b>{" "}
                of <b>{activeAds.length}</b> results
              </span>

              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "bg-white border"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded disabled:opacity-50"
                >
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivePage;
