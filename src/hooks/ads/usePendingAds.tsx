import { AdvertisementType } from "@/src/types/ads/ads";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
type Props = {
  page: number;
  limit: number;
};
export async function fetchPendingAds({
  limit,
  page,
}: Props): Promise<{ data: AdvertisementType[]; count: number }> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("ads")
    .select(
      `
        *,
        user_id(*),
        location(*),
        ad_images(id, image_url)
      `,
      { count: "exact" }
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) throw error;

  return {
    data: data as AdvertisementType[],
    count: count as number,
  };
}

const usePendingAds = ({ limit, page }: Props) => {
  return useQuery({
    queryKey: ["pending-ads", limit, page],
    queryFn: async () => await fetchPendingAds({ limit, page }),
    refetchOnWindowFocus: false,
  });
};

export default usePendingAds;
