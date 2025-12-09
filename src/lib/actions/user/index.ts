"use server";
import { User } from "@/src/types/ads/user";
import { supabaseAdmin } from "@/src/utils/supabase/admin";
import { createClient } from "@/src/utils/supabase/server";

export type Props = { id: string; role: string };
export async function updateRole({ id, role }: Props) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAccountStatus({
  id,
  account_status,
}: {
  id: string;
  account_status: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update({ account_status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}
export async function updateVerified(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update({ email_verified: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}
export async function deleteUser(id: string) {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) throw new Error(error.message);
  return data;
}

export async function getUserInfo() {
  const supabase = await createClient();

  // 1. Validate the User
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null; // Return null so the UI can redirect or show a "Sign In" button
  }

  // 2. Fetch the Profile
  const { data: userData, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (dbError) {
    console.error("Error fetching profile:", dbError);
    return null;
  }

  return userData as User;
}
