"use client";

import { fetchUserAdsAction } from "@/src/lib/actions/user/user-ads";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export type statusType = "active" | "pending" | "rejected" | "expired";

type Props = {
  type: statusType | null;
};

const useUserAds = ({ type }: Props) => {
  const { userId } = useParams();
  const limit = 5;
  return useInfiniteQuery({
    queryKey: ["user-ads", limit, type, userId],
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    queryFn: async ({ pageParam = 0 }) =>
      fetchUserAdsAction({
        pageParam,
        limit,
        selectedStatus: type,
        id: userId as string,
      }),
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length === limit ? allPages.length : undefined,
  });
};

export default useUserAds;
