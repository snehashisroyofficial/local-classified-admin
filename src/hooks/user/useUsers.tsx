import { User } from "@/src/types/ads/user";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
type Props = {
  page: number;
  limit: number;
};
async function fetchUsers({
  limit,
  page,
}: Props): Promise<{ data: User[]; count: number }> {
  const supabase = createClient();
  const start = (page - 1) * limit;
  const end = start + limit - 1;
  console.log({ start, end });
  const {
    data: allUsers,
    error,
    count,
  } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .range(start, end);

  if (error) throw new Error(error.message);
  console.log("hook users", allUsers);
  return {
    data: allUsers as User[],
    count: count as number,
  };
}

const useUsers = ({ limit, page }: Props) => {
  return useQuery({
    queryKey: ["users", limit, page],
    queryFn: async () => await fetchUsers({ limit, page }),

    refetchOnWindowFocus: false,
  });
};

export default useUsers;
