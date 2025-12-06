"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Clock,
  Eye,
  ShoppingBag,
  Users,
  X,
  ChevronsRight,
  ChevronsLeft,
  Check,
} from "lucide-react";
import Image from "next/image";
import AdCardSkeleton from "@/src/components/global/AdCardSkeleton";
import { DateRangePicker, RangeValue } from "@heroui/react";
import { getLocalTimeZone, DateValue } from "@internationalized/date";

import { useListingActions } from "@/src/hooks/ads/useListingActions";
import ListingActionModal from "@/src/components/ads/pending/PendingListingActionModal";
import Link from "next/link";
import useAllAds from "@/src/hooks/ads/useAllAds";
const PendingAds = () => {
  const [value, setValue] = useState<RangeValue<DateValue> | null>(null);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const {
    data: pendingAds,
    isLoading: isPendingAdsLoading,
    isFetching: isPendingAdsFetching,
    isError: isPendingAdsError,
    refetch: refetchPendingAds,
  } = useAllAds({
    limit: itemsPerPage,
    page: currentPage,
    startDate: value?.start.toDate(getLocalTimeZone()) || null,
    endDate: value?.end.toDate(getLocalTimeZone()) || null,
    status: "pending",
  });

  // Pagination Logic
  const count = pendingAds?.count ?? 0;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, count);
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Smart Pagination Window
  const visiblePages = 5;
  let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const loading = isPendingAdsFetching || isPendingAdsLoading;

  // all actions
  const {
    handleChangeStatus,
    handleChangeReject,
    isLoading: isLoadingActions,
    isSuccess,
    resetState,
    activeModal,
    setActiveModal,
  } = useListingActions(refetchPendingAds);

  const onConfirmAction = (data: string) => {
    if (!activeModal) return;

    switch (activeModal.type) {
      case "APPROVE":
        handleChangeStatus(activeModal.data.id);
        break;

      case "REJECT":
        handleChangeReject({ ...activeModal.data, reject_reason: data });
        break;
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    resetState();
  };
  return (
    <div className="h-full space-y-4 md:space-y-8 flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 capitalize">
            Pending Listings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your marketplace listings and moderation queue.
          </p>
        </div>
        <div className="flex items-center space-x-3 self-start md:self-auto">
          <DateRangePicker
            showMonthAndYearPickers
            label="Date range "
            value={value}
            area-label="Date range picker"
            variant="bordered"
            onChange={setValue}
            className="font-sans!"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
        {loading && (
          <div className="p-4 space-y-4">
            {/* Render skeletons based on items per page */}
            {Array.from({ length: Math.min(itemsPerPage, 3) }).map(
              (_, index) => (
                <AdCardSkeleton key={index} />
              )
            )}
          </div>
        )}

        {/* Empty State */}
        {((pendingAds && pendingAds.data.length === 0) || isPendingAdsError) &&
        !loading ? (
          <div className="text-center flex flex-col items-center justify-center h-full p-8">
            <div className="mx-auto h-12 w-12 text-slate-300 mb-3 flex items-center justify-center">
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              No Pending Ads
            </h3>

            <button
              onClick={() => setValue(null)}
              className=" mt-6 p-2 rounded-md border-1 border-slate-200  bg-slate-100 hover:bg-slate-200 text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          !loading && (
            <>
              {/* ADS LIST - SCROLLABLE AREA */}
              <div className="divide-y divide-slate-100 flex-1 overflow-y-auto custom-scrollbar">
                {pendingAds &&
                  pendingAds.data.map((ad) => (
                    <div
                      key={ad.id}
                      className="group p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                    >
                      {/* Responsive Image Container */}
                      <div className="w-full sm:w-24 sm:h-24 md:w-32 md:h-24 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative aspect-video sm:aspect-square">
                        <Image
                          src={ad.ad_images[0].image_url}
                          alt={ad.title}
                          fill
                          sizes=""
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base font-semibold text-slate-800 line-clamp-2 pr-2">
                            {ad.title}
                          </h3>
                        </div>

                        <p className="text-sm text-slate-500 line-clamp-2 sm:line-clamp-1 mb-3">
                          {ad.description}
                        </p>

                        <div className="flex flex-wrap items-center text-xs text-slate-400 gap-y-2 gap-x-4">
                          <span className="font-bold text-green-600 shrink-0 bg-green-50 px-2 py-1 rounded text-sm">
                            ₹{ad.price}
                          </span>
                          <span className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
                            <Users size={12} className="mr-1.5" />
                            <span className="truncate max-w-[120px]">
                              {ad.user_id.full_name}
                            </span>
                          </span>
                          <span className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
                            <Clock size={12} className="mr-1.5" />
                            {new Date(ad.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Grid for Mobile (3 buttons in 1 row), Flex for Desktop */}
                        <div className="grid grid-cols-3 sm:flex sm:flex-col md:flex-row gap-2">
                          <Link href={`/ads/view/${ad.id}`}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium border border-blue-100 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors active:scale-95 whitespace-nowrap"
                            >
                              <Eye
                                size={16}
                                className="mr-1.5 hidden md:block"
                              />{" "}
                              Details
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              setActiveModal({
                                type: "REJECT",
                                data: ad,
                              });
                            }}
                            className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors active:scale-95"
                          >
                            <X size={16} className="mr-1.5 hidden md:block" />{" "}
                            Reject
                          </button>

                          <button
                            onClick={() => {
                              setActiveModal({
                                type: "APPROVE",
                                data: ad,
                              });
                            }}
                            className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium border border-green-100 text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors active:scale-95"
                          >
                            <Check
                              size={16}
                              className="mr-1.5 hidden md:block"
                            />{" "}
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Responsive Pagination */}
              <div className="px-4 py-3 md:px-6 md:py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-4 justify-between shrink-0">
                {/* Mobile: Showing X-Y Text (Centered) */}
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-600 w-full sm:w-auto justify-center">
                  <div className="flex items-center space-x-2">
                    <span>Show</span>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                    >
                      <option value={2}>2</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                  <span className="hidden sm:inline">|</span>
                  <span>
                    {start}-{end} of {count}
                  </span>
                </div>

                {/* Pagination Controls */}
                <div className="flex space-x-1 sm:space-x-2 w-full sm:w-auto justify-center">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200  text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
                  >
                    <ChevronsLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200  text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Hide page numbers on very small screens, show on tablet+ */}
                  <div className="hidden sm:flex space-x-1">
                    {Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-9 flex items-center justify-center text-sm rounded transition-colors ${
                          currentPage === page
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Only: Simple Page Indicator */}
                  <span className="flex sm:hidden items-center px-2 text-sm font-medium text-slate-700">
                    Page {currentPage}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2 border border-slate-200  text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2 border border-slate-200  text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
                  >
                    <ChevronsRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>
      <ListingActionModal
        isOpen={!!activeModal}
        onClose={closeModal}
        type={activeModal?.type || null}
        data={activeModal?.data || null}
        // Pass Hook State
        onConfirm={onConfirmAction}
        isLoading={isLoadingActions}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default PendingAds;
