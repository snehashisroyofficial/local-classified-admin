import { updateAdStatus } from "@/src/lib/actions/ads/pending";
import { AdvertisementType } from "@/src/types/ads/ads";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export type ModalType = "REJECT" | "APPROVE" | null;
export const useListingActions = (refreshData?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [activeModal, setActiveModal] = useState<{
    type: ModalType;
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
      toast.success(successText.message);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStatus = (id: string) => {
    performAction(() => updateAdStatus({ id, status: "approved" }), {
      title: "Approved",
      message:
        "Ad has been approved. You can now see it in the active ads section.",
    });
  };
  const handleChangeReject = ({
    id,
    reject_reason,
  }: {
    id: string;
    reject_reason?: string;
  }) => {
    performAction(
      () => updateAdStatus({ id, status: "rejected", reject_reason }),
      {
        title: "Rejected Successfully",
        message:
          "Ad has been rejected. You can now see it in the rejected ads section.",
      }
    );
  };

  return {
    handleChangeStatus,
    handleChangeReject,
    isLoading,
    isSuccess,
    resetState,
    activeModal,
    setActiveModal,
  };
};
