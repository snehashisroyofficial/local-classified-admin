import { updateAd } from "@/src/lib/actions/ads/active";
import { AdvertisementType } from "@/src/types/ads/ads";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export type ActiveModalType = "MARK_AS_SOLD" | "EXPIRED" | "RENEW" | null;
export const useActiveListingActions = (refreshData?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [activeModal, setActiveModal] = useState<{
    type: ActiveModalType;
    data: AdvertisementType;
  } | null>(null);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
  }, []);

  const performAction = async (
    actionFn: () => Promise<any>,
    successText: {
      title: string;
      message: string;
    }
  ) => {
    setIsLoading(true);
    try {
      await actionFn();
      setIsSuccess(true);
      if (refreshData) refreshData();
      toast.success(successText.title, { description: successText.message });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenewAds = (id: string) => {
    performAction(
      () => updateAd({ id, duration: 30, status: "active", type: "RENEW" }),
      {
        title: "Ads Renewed",
        message:
          "Ad has been renewed successfully and will expire on the new date.",
      }
    );
  };
  const handleExpireAds = (id: string) => {
    performAction(
      () => updateAd({ id, duration: 0, status: "expired", type: "EXPIRED" }),
      {
        title: "Ads Expired",
        message:
          "Ad has been expired successfully. You can now see it in the expired ads section.",
      }
    );
  };
  const handleSoldAds = (id: string) => {
    performAction(
      () => updateAd({ id, duration: 0, status: "sold", type: "MARK_AS_SOLD" }),
      {
        title: "Ads Sold",
        message: "Ad has been sold successfully",
      }
    );
  };

  return {
    handleRenewAds,
    handleExpireAds,
    handleSoldAds,
    isLoading,
    isSuccess,
    resetState,
    activeModal,
    setActiveModal,
  };
};
