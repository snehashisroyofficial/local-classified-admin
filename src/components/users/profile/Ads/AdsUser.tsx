"use client";
import ContentInfoCard from "@/src/components/ads/view/ContentInfoCard";
import StatusBadge from "@/src/components/ads/view/StatusBadge";
import AdCardSkeleton from "@/src/components/global/AdCardSkeleton";
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
    error,
  } = useUserAds({ type: statusType });
  console.log("data", data);
  const ads = data?.pages.flatMap((page) => page.data) ?? [];

  if (isError) {
    return <div className="text-black w-full">{error}</div>;
  }

  return (
    <div>
      <div className="divide-y-1 divide-gray-200 max-h-[68vh] overflow-y-auto">
        {isLoading && (
          <div className="p-4 space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <AdCardSkeleton key={index} />
            ))}
          </div>
        )}
        {ads.map((ad) => (
          <div
            onClick={() => router.push(`/ads/view/${ad.id}`)}
            key={ad.id}
            className={`group p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer `}
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

            <span className="font-bold">₹{ad.price}</span>

            {/* <StatusBadge status={ad.status} /> */}
          </div>
        ))}{" "}
      </div>
      {hasNextPage && (
        <div className="w-full flex justify-center">
          <Button
            variant="faded"
            color="default"
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
    </div>
  );
};

export default AdsUser;
