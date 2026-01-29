import { User } from "@/src/types/ads/user";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type Props = {
  id: string;
};

async function fetchUserInfo({ id }: Props): Promise<User> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data as User;
}

const useUserInfo = () => {
  const { userId } = useParams();
  return useQuery({
    queryKey: ["user-info", userId],
    queryFn: async () => await fetchUserInfo({ id: userId as string }),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

export default useUserInfo;
