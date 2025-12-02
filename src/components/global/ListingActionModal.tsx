import { ModalType } from "@/src/hooks/ads/useListingActions";
import useRejectReasons from "@/src/hooks/ads/useRejectReasons";
import { AdvertisementType } from "@/src/types/ads/ads";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Check, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  data: AdvertisementType | null;

  onConfirm: (reason: string) => void;

  // State from Hook
  isLoading: boolean;
  isSuccess: boolean;
}

const ListingActionModal = ({
  isOpen,
  onClose,
  type,
  data,
  onConfirm,
  isLoading,
  isSuccess,
}: Props) => {
  const [value, setValue] = useState<string>("");
  const {
    data: rejectReasons,
    isLoading: isRejectReasonsLoading,
    isError: isRejectReasonsError,
  } = useRejectReasons(type);

  useEffect(() => {
    const handleSuccess = () => {
      setValue("");
      onClose();
    };

    if (isSuccess) handleSuccess();
  }, [isSuccess, onClose]);

  if (!type || !data) return null;

  if ((type == "REJECT" && isRejectReasonsLoading) || isRejectReasonsError)
    return (
      <Modal
        isOpen={isOpen}
        isDismissable={!isLoading}
        onClose={onClose}
        size="md"
      >
        <ModalContent className="p-6 ">
          <ModalBody>
            <div className="flex justify-center items-center gap-2 h-full min-h-48">
              {isRejectReasonsLoading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-gray-200 border-t-gray-600 animate-spin "></div>
                  <span className="text-slate-500">Loading</span>
                </>
              ) : (
                <span className="text-slate-500">{isRejectReasonsError}</span>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );

  const config = {
    REJECT: {
      icon: <TriangleAlert size={60} className="text-white" />,
      bg: "bg-red-600",
      title: "Reject Listing",
      desc: (title: string) =>
        `Are you sure you want to reject ${title} listing? Please note this action cannot be undone.`,

      btnColor: "bg-red-500",
      btnText: "Delete",
    },
    APPROVE: {
      icon: <Check size={60} className="text-white" />,
      bg: "bg-green-500",
      title: "Approved",

      desc: (title: string) =>
        `Are you sure you want to approve ${title} listing? Please note this action cannot be undone.`,
      btnColor: "bg-green-600",
      btnText: "Confirm",
    },
  }[type];
  console.log({ value });
  const isConfirmDisabled = type === "REJECT" && !value;

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={!isLoading}
      onClose={onClose}
      size="md"
    >
      <ModalContent className="p-6">
        <ModalBody>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`p-6 w-fit rounded-full ${config.bg}`}>
              {config.icon}
            </div>
            <h2 className="text-2xl font-semibold">{config.title}</h2>
            <p className="text-sm text-gray-500">{config.desc(data.title)}</p>

            {type == "REJECT" &&
              rejectReasons &&
              rejectReasons.length > 0 &&
              !isSuccess && (
                <div className="w-full">
                  <Select
                    isVirtualized
                    className="w-full"
                    label="Reason"
                    selectedKeys={[value]}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Select Reject Reason"
                    variant={"underlined"}
                  >
                    {rejectReasons?.map((reason) => (
                      <SelectItem key={reason.id}>{reason.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              )}
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-center w-full">
          <div className="flex gap-4 w-full">
            <Button
              fullWidth
              variant="light"
              onPress={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              className={`${config.btnColor} text-white shadow-md disabled:opacity-60 disabled:cursor-not-allowed`}
              onPress={() => {
                onConfirm(value);
                setValue("");
              }}
              isLoading={isLoading}
              isDisabled={isLoading || isConfirmDisabled}
            >
              {config.btnText}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ListingActionModal;
