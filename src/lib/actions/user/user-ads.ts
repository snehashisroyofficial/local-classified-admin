"use server";

import { AdvertisementType } from "@/src/types/ads/ads";
import { createClient } from "@/src/utils/supabase/server";

type FetchAdsParams = {
  limit: number;
  selectedStatus: string | null;
  pageParam: number;
  id: string;
};

export async function fetchUserAdsAction({
  limit,
  selectedStatus,
  pageParam,
  id,
}: FetchAdsParams): Promise<{
  data: AdvertisementType[];
  count: number;
}> {
  const supabase = await createClient();

  const queryBuilder = () => {
    let query = supabase
      .from("ads")
      .select(
        `*, ad_images(id, image_url), category_id(*),
        sub_category_id(*), location(*), user_id(*)`,
        { count: "exact" }
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    if (selectedStatus) {
      query = query.eq("status", selectedStatus.toLowerCase());
    }

    return query;
  };
  const { data, error, count } = await queryBuilder().range(
    pageParam * limit,
    (pageParam + 1) * limit - 1
  );

  if (error) throw new Error(error.message);

  return { data: data ?? [], count: count ?? 0 };
}
