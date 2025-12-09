"use client";
import { useState } from "react";
import {
  Eye,
  Filter,
  Tag,
  AlertTriangle,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import useActiveAds from "@/src/hooks/ads/useAllAds";
import AdCardSkeleton from "@/src/components/global/skeleton-ui/AdCardSkeleton";

import { useActiveListingActions } from "@/src/hooks/ads/useActiveListingActions";
import moment from "moment";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import NoAdsFound from "@/src/components/ads/view/NoAdsFound";
import ContentInfoCard from "@/src/components/ads/view/ContentInfoCard";
import ActionPopup from "@/src/components/ads/active-ads/ActionPopup";
import ActionItem from "@/src/components/ads/active-ads/ActionItem";
import Pagination from "@/src/components/shared/table/Pagination";
import { SubmitHandler, useForm } from "react-hook-form";

type formValueProps = {
  minPrice: number;
  maxPrice: number;
  userNameOrEmail: string;
};

const ActiveAds = () => {
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  // 1. NEW: State to store the applied filters
  const [activeFilters, setActiveFilters] = useState<formValueProps | null>(
    null
  );
  const { register, handleSubmit, reset } = useForm<formValueProps>();

  const handleOnSubmit: SubmitHandler<formValueProps> = (
    data: formValueProps
  ) => {
    setActiveFilters(data);
    setOpenFilter(false);
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const {
    data: ActiveAds,
    isLoading: isActiveAdsLoading,
    isFetching: isActiveAdsFetching,
    isError: isActiveAdsError,
    refetch: refetchActiveAds,
  } = useActiveAds({
    limit: itemsPerPage,
    page: currentPage,
    status: "active",
    userEmailOrName: activeFilters?.userNameOrEmail,
    maxPrice: activeFilters?.maxPrice,
    minPrice: activeFilters?.minPrice,
  });

  // Pagination Logic
  const count = ActiveAds?.count ?? 0;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, count);
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleItemsPerPageChange = (itemNumber: number) => {
    setItemsPerPage(Number(itemNumber));
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

  const loading = isActiveAdsFetching || isActiveAdsLoading;

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const { handleRenewAds, handleExpireAds, handleSoldAds } =
    useActiveListingActions(refetchActiveAds);

  const popupRef = useClickOutside<HTMLDivElement>({
    enabled: openDropdownId !== null,
    onClose: () => {
      setOpenDropdownId(null);
    },
  });
  const filterRef = useClickOutside<HTMLDivElement>({
    enabled: openFilter,
    onClose: () => {
      setOpenFilter(false);
    },
  });

  // 3. NEW: Handle Reset Logic
  const handleResetFilters = () => {
    reset(); // Reset visual form inputs
    setActiveFilters(null); // Clear actual filter state
    setCurrentPage(1); // Reset pagination
  };

  return (
    <div className="h-full space-y-4 md:space-y-8 flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 capitalize">
            Active Listings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your marketplace listings and moderation queue.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex items-center gap-2 mr-0 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors active:scale-95"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <ActionPopup ref={filterRef} open={openFilter}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="p-2 space-y-2">
                {/* Price Range */}
                <div className="space-y-4 text-xs">
                  <label className=" font-medium text-slate-700">
                    Price Range
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      min={0}
                      {...register("minPrice")}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    outline-none"
                    />

                    <input
                      type="number"
                      placeholder="Max"
                      min={100}
                      {...register("maxPrice")}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg 
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    outline-none"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">
                    User Name or Email
                  </label>
                  <input
                    type="text"
                    {...register("userNameOrEmail")}
                    placeholder="John Doe or johndoe123@gmail.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  outline-none text-sm"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 text-sm">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-1/2 py-2 rounded-lg border border-slate-300 
                 text-slate-700 bg-white hover:bg-slate-50 
                 active:scale-[.98] transition text-xs"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-2 rounded-lg bg-indigo-600 text-white 
                 hover:bg-indigo-700 active:scale-[.98] transition text-xs"
                  >
                    Apply
                  </button>
                </div>
              </div>{" "}
            </form>
          </ActionPopup>
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
        {((ActiveAds && ActiveAds.data.length === 0) || isActiveAdsError) &&
        !loading ? (
          <NoAdsFound
            title="No Active Ads Found!"
            setValue={handleResetFilters}
          />
        ) : (
          !loading && (
            <>
              {/* ADS LIST - SCROLLABLE AREA */}
              <div className="divide-y divide-slate-100 flex-1 overflow-y-auto custom-scrollbar">
                {ActiveAds &&
                  ActiveAds.data.map((ad) => {
                    const isExpired = moment(ad.expires_at).isBefore(moment());
                    return (
                      <div
                        key={ad.id}
                        className={`group p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center ${
                          isExpired ? "bg-red-100 " : ""
                        }`}
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
                        {ad?.user_id && (
                          <div className="flex-1 min-w-0 w-full">
                            <ContentInfoCard ad={ad} showUserInfo />
                          </div>
                        )}

                        <span className="font-bold">₹{ad.price}</span>

                        {/* ACTIONS */}
                        <div className="w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
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

                            {/* popup modal  */}

                            <ActionPopup
                              ref={popupRef}
                              open={openDropdownId === ad.id}
                            >
                              <ActionItem
                                label="Mark as Sold"
                                icon={Tag}
                                onClick={() => handleSoldAds(ad.id)}
                              />

                              <ActionItem
                                label="Expired"
                                icon={AlertTriangle}
                                danger
                                onClick={() => handleExpireAds(ad.id)}
                              />

                              <ActionItem
                                label="Renew Ad"
                                icon={RefreshCw}
                                onClick={() => handleRenewAds(ad.id)}
                              />

                              <div className="h-px bg-slate-100 my-1 hidden sm:block" />

                              <ActionItem
                                label="View Ad"
                                icon={Eye}
                                onClick={() =>
                                  router.push(`/ads/view/${ad.id}`)
                                }
                              />

                              {/* Mobile Only Cancel Button */}
                              <button
                                className="w-full text-center py-3 text-slate-500 font-medium border-t border-slate-100 mt-2 sm:hidden active:bg-slate-50"
                                onClick={() => setOpenDropdownId(null)}
                              >
                                Cancel
                              </button>
                            </ActionPopup>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Responsive Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                count={count}
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={[2, 5, 10, 20]}
                start={start}
                end={end}
                startPage={startPage}
                endPage={endPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                onPageChange={setCurrentPage}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ActiveAds;
