import { AdvertisementType } from "@/src/types/ads/ads";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
type Props = {
  page: number;
  limit: number;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
};
export async function fetchAllAds({
  limit,
  page,
  endDate,
  startDate,
  status,
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
        category_id(*),
        sub_category_id(*),
        ad_images(id, image_url)
      `,
        { count: "exact" }
      )
      .eq("status", status)
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

const useAllAds = ({ limit, page, endDate, startDate, status }: Props) => {
  return useQuery({
    queryKey: ["dynamic-ads", limit, page, endDate, startDate, status],
    queryFn: async () =>
      await fetchAllAds({ limit, page, endDate, startDate, status }),
    refetchOnWindowFocus: false,
  });
};

export default useAllAds;
