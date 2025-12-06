import { User } from "@/src/types/ads/user";
import { createClient } from "@/src/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
type Props = {
  page: number;
  limit: number;
  searchQuery?: string;
};

async function fetchUsers({
  limit,
  page,
  searchQuery,
}: Props): Promise<{ data: User[]; count: number }> {
  const supabase = createClient();
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const queryBuilder = () => {
    let query = supabase.from("users").select("*", { count: "exact" });

    if (searchQuery) {
      query = query.or(
        `full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
      );
    }

    return query;
  };

  const {
    data: allUsers,
    count,
    error,
  } = await queryBuilder()
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) throw new Error(error.message);

  return {
    data: allUsers as User[],
    count: count as number,
  };
}

const useUsers = ({ limit, page, searchQuery }: Props) => {
  return useQuery({
    queryKey: ["users", limit, page, searchQuery],
    queryFn: async () => await fetchUsers({ limit, page, searchQuery }),

    refetchOnWindowFocus: false,
  });
};

export default useUsers;
