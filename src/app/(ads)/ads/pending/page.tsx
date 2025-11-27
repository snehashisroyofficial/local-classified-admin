"use client";
import React, { useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Clock,
  Eye,
  RefreshCw,
  ShoppingBag,
  Tag,
  Users,
  CheckCircle,
  X,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { INITIAL_ADS } from "../active/page";
const PendingAds = () => {
  const [ads] = useState(INITIAL_ADS);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState("pending");
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
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 to avoid out of bounds
  };
  return (
    <div className=" h-full space-y-8">
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
                    <div className="relative flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        <Eye size={16} className="mr-1.5" /> View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      >
                        <X size={16} className="mr-1.5" /> Reject
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                      >
                        <CheckCircle size={16} className="mr-1.5" /> Approve
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

export default PendingAds;
