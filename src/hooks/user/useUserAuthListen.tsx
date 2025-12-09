"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserInfo } from "@/src/lib/actions/user";
import { createClient } from "@/src/utils/supabase/client";

export function useUserAuthListen() {
  const queryClient = useQueryClient();

  // 1. The Query: Fetches data and handles loading/error/caching
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 30, // Data is fresh for 30 minutes
    retry: false, // Don't retry if user is not logged in
  });

  // 2. The Listener: Auto-update on auth changes (optional but recommended)
  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // If user logs out, clear the cache immediately
      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["user"], null);
      }
      // If user logs in or updates token, invalidate cache to trigger refetch
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return { user, isLoading, error };
}
