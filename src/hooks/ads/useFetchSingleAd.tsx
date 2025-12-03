import { AdvertisementType } from "@/src/types/ads/ads";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

async function fetchSingleAd(data: Props): Promise<AdvertisementType> {
  const supabase = createClient();

  const { data: singleAds, error } = await supabase
    .from("ads")
    .select(
      `
        *,
        user_id(*),
        category_id(*),
        sub_category_id(*),
        condition(*),
        location(*),
        contact_preferences(*),
        ad_images(id, image_url),
        ad_tags(*)
      `
    )
    .eq("id", data.id)
    .single();

  if (error) throw new Error(error.message);

  return singleAds;
}

const useFetchSingleAd = ({ id }: Props) => {
  return useQuery({
    queryKey: ["single-ad", id],
    queryFn: async () => await fetchSingleAd({ id }),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export default useFetchSingleAd;
