"use client";
import ContentInfoCard from "@/src/components/ads/view/ContentInfoCard";
import AdCardSkeleton from "@/src/components/global/skeleton-ui/AdCardSkeleton";
import useUserAds, { statusType } from "@/src/hooks/user/useUserAds";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdsUser = ({ statusType }: { statusType: statusType }) => {
  const router = useRouter();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error: AdError,
  } = useUserAds({ type: statusType });
  const ads = data?.pages.flatMap((page) => page.data) ?? [];

  if (isError) {
    return <div className="text-black w-full">{AdError.message}</div>;
  }

  return (
    <>
      <div className=" w-full bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y-1 divide-gray-200  overflow-y-auto">
          {isLoading && (
            <div className="p-4 space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <AdCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!isLoading && ads.length === 0 && (
            <div className="h-24 flex justify-center items-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              No {statusType} Ads
            </div>
          )}
          {ads.map((ad) => (
            <div
              onClick={() => router.push(`/ads/view/${ad.id}`)}
              key={ad.id}
              className={`group relative p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer `}
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
                  <ContentInfoCard ad={ad} />
                </div>
              )}

              <span className="font-bold absolute lg:static top-8 right-6 bg-white group-hover:bg-green-100 outline-1 text-green-600 px-2 py-1 rounded-full">
                ₹{ad.price}
              </span>
            </div>
          ))}{" "}
        </div>
      </div>{" "}
      {hasNextPage && (
        <div className="w-full flex justify-center mt-6">
          <Button
            variant="solid"
            color="primary"
            size="sm"
            className=""
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}
    </>
  );
};

export default AdsUser;
