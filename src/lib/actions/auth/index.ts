"use server";

import { createClient } from "@/src/utils/supabase/server";

export async function signInUser(email: string, password: string) {
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (user?.role !== "admin") {
    throw new Error(
      "You're not authorized to access this page. Please contact support team for further help."
    );
  }

  if (user?.account_status !== "active") {
    throw new Error(
      `Your account has been ${user?.account_status}. Please contact support team for further help.`
    );
  }

  if (user?.account_status !== "active") {
    throw new Error(
      `Your account has been ${user?.account_status}. Please contact support team for further help.`
    );
  }

  if (!user?.email_verified) {
    throw new Error(
      `Please verify your email first . Contact support team for further help.`
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ last_login: new Date() })
    .eq("id", data?.user?.id);

  if (updateError) {
    throw new Error(updateError.message);
  }
  return data;
}

/**
 *
 * 1. Admin
 * 2. account verified
 * 3. account status
 *
 *
 *
 *
 */
