import { CommonType } from "@/src/types/ads/common";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ModalType } from "./useListingActions";

export async function fetchRejectReason(): Promise<CommonType[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("common")
    .select("*")
    .eq("type", "ads")
    .order("key", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

const useRejectReasons = (type: ModalType) => {
  return useQuery({
    queryKey: ["reject-reasons"],
    queryFn: async () => await fetchRejectReason(),
    refetchOnWindowFocus: false,
    enabled: type === "REJECT",
  });
};

export default useRejectReasons;
