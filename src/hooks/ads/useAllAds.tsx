import { AdvertisementType } from "@/src/types/ads/ads";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
type Props = {
  page: number;
  limit: number;
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  minPrice?: number;
  maxPrice?: number;
  email?: string;
};
export async function fetchAllAds({
  limit,
  page,
  endDate,
  startDate,
  status,
  email,
  maxPrice,
  minPrice,
}: Props): Promise<{ data: AdvertisementType[]; count: number }> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const supabase = createClient();

  const queryBuilder = () => {
    const userRelation = email ? "user_id!inner(*)" : "user_id(*)";

    let query = supabase
      .from("ads")
      .select(
        `
        *,
        ${userRelation},
        location(*),
        category_id(*),
        sub_category_id(*),
        ad_images(id, image_url)
      `,
        { count: "exact" }
      )
      .eq("status", status)

      .order("created_at", { ascending: false });

    if (startDate && endDate) {
      query = query
        .gte("created_at", new Date(startDate).toISOString())
        .lte("created_at", new Date(endDate).toISOString());
    }
    if (minPrice) {
      query = query.gte("price", minPrice);
    }
    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    if (email) {
      query = query.eq("user_id.email", email);
    }

    query = query.range(start, end);

    return query;
  };

  const { data, error, count } = await queryBuilder();

  if (error) throw error;

  return {
    data: data as AdvertisementType[],
    count: count as number,
  };
}

const useAllAds = ({
  limit,
  page,
  endDate,
  startDate,
  status,
  email,
  maxPrice,
  minPrice,
}: Props) => {
  return useQuery({
    queryKey: [
      "dynamic-ads",
      limit,
      page,
      endDate,
      startDate,
      status,
      email,
      maxPrice,
      minPrice,
    ],
    queryFn: async () =>
      await fetchAllAds({
        limit,
        page,
        endDate,
        startDate,
        status,
        email,
        maxPrice,
        minPrice,
      }),
    refetchOnWindowFocus: false,
  });
};

export default useAllAds;
