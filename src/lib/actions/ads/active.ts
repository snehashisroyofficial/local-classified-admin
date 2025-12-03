"use server";

import { ActiveModalType } from "@/src/hooks/ads/useActiveListingActions";
import { createClient } from "@/src/utils/supabase/server";

type Props = {
  id: string;
  duration: number;
  status: string;
  type: ActiveModalType;
};

export async function updateAd(data: Props) {
  try {
    const supabase = await createClient();

    const futureDate = getFutureDate(data.duration);

    let updateData: any = {};

    if (data.type === "EXPIRED" || data.type === "RENEW") {
      updateData = {
        expires_at: futureDate,
        status: data.status,
      };
    }

    if (data.type === "MARK_AS_SOLD") {
      updateData = {
        status: "sold",
        expires_at: new Date().toISOString(),
        sold: "other",
      };
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No update parameters found.");
    }

    // -----------------------
    //    SUPABASE UPDATE
    // -----------------------
    const { error } = await supabase
      .from("ads")
      .update(updateData)
      .eq("id", data.id);

    if (error) {
      console.error(error);
      throw new Error("Failed to update ad.");
    }

    return {
      success: true,
      title: "Ads Updated",
      description: "Ad has been updated successfully.",
    };
  } catch (error) {
    console.error("Update Ad Error:", error);
    throw new Error("Failed to update ad");
  }
}

// -----------------------
//   FUTURE DATE HELPER
// -----------------------
function getFutureDate(duration: number) {
  const today = new Date();

  // If duration = 0 → expire today (midnight)
  if (duration === 0) {
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  }

  // Add days normally
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + duration);

  return futureDate.toISOString();
}
