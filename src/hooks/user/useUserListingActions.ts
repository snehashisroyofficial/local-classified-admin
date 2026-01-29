import {
  deleteUser,
  updateAccountStatus,
  updateRole,
  updateVerified,
} from "@/src/lib/actions/user";
import { User } from "@/src/types/ads/user";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export type UserActionModalType =
  | "MAKE_ADMIN"
  | "MAKE_USER"
  | "SUSPEND"
  | "DELETE"
  | null;
export const useUserListingActions = (refreshData?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [activeModal, setActiveModal] = useState<{
    type: UserActionModalType;
    data: User;
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

  const handleChangeRole = ({ id, role }: { id: string; role: string }) => {
    performAction(() => updateRole({ id, role }), {
      title: "Role Updated",
      message: `User's role has been updated to ${role}. Please refresh the page.`,
    });
  };
  const handleVerifyEmail = ({ id }: { id: string }) => {
    performAction(() => updateVerified(id), {
      title: "Email Verified",
      message: "User's email has been verified. Please refresh the page",
    });
  };
  const handleDeleteUser = ({ id }: { id: string }) => {
    performAction(() => deleteUser(id), {
      title: "User Deleted",
      message: "User has been deleted. Please refresh the page",
    });
  };
  const handleUpdateRole = ({ id, status }: { id: string; status: string }) => {
    performAction(() => updateAccountStatus({ account_status: status, id }), {
      title: `User ${status}`,
      message: `User has been ${status}. Please refresh the page`,
    });
  };

  return {
    handleVerifyEmail,
    handleChangeRole,
    handleDeleteUser,
    handleUpdateRole,
    isLoading,
    isSuccess,
    resetState,
    activeModal,
    setActiveModal,
  };
};
