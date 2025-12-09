"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserInfo } from "@/src/lib/actions/user";
import { createClient } from "@/src/utils/supabase/client";

export function useUserAuthListen() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["user"], null);
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return { user, isLoading, error };
}
