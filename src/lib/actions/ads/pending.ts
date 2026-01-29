"use server";

import { createClient } from "@/src/utils/supabase/server";

type Props = {
  id: string;
  status: string;
  reject_reason?: string;
};

export async function updateAdStatus(data: Props) {
  try {
    const supabase = await createClient();

    const user = await supabase.auth.getUser();
    const updateData = {
      status: data.status,
      approved_at: new Date().toISOString(),
      approved_by: user.data.user?.id,
      ...(data.reject_reason && { reject_reason: data.reject_reason }),
    };

    await supabase.from("ads").update(updateData).eq("id", data.id);

    return {
      success: true,
      title: "Approved",
      description:
        "Ad has been approved. You can now see it in the active ads section.",
    };
  } catch {
    throw new Error("Failed to update ad status");
  }
}
