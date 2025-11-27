import { AdvertisementType } from "@/src/types/ads/ads";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
type Props = {
  page: number;
  limit: number;
  startDate: Date | null;
  endDate: Date | null;
};
export async function fetchPendingAds({
  limit,
  page,
  endDate,
  startDate,
}: Props): Promise<{ data: AdvertisementType[]; count: number }> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const supabase = createClient();

  const queryBuilder = () => {
    let query = supabase
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

    if (startDate && endDate) {
      query = query
        .gte("created_at", new Date(startDate).toISOString())
        .lte("created_at", new Date(endDate).toISOString());
    }
    return query;
  };

  const { data, error, count } = await queryBuilder();

  if (error) throw error;

  return {
    data: data as AdvertisementType[],
    count: count as number,
  };
}

const usePendingAds = ({ limit, page, endDate, startDate }: Props) => {
  console.log({ startDate }, { endDate });
  return useQuery({
    queryKey: ["pending-ads", limit, page, endDate, startDate],
    queryFn: async () =>
      await fetchPendingAds({ limit, page, endDate, startDate }),
    refetchOnWindowFocus: false,
  });
};

export default usePendingAds;
