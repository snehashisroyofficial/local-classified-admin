import { User } from "@/src/types/ads/user";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from "@heroui/react";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: "DELETE";
  data: User | null;

  onConfirm: (reason: string) => void;

  // State from Hook
  isLoading: boolean;
  isSuccess: boolean;
}

const UserListingActionModal = ({
  isOpen,
  onClose,
  type,
  data,
  onConfirm,
  isLoading,
  isSuccess,
}: Props) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const handleSuccess = () => {
      setValue("");
      onClose();
    };

    if (isSuccess) handleSuccess();
  }, [isSuccess, onClose]);

  if (!type || !data) return null;

  const config = {
    DELETE: {
      icon: <TriangleAlert size={60} className="text-white" />,
      bg: "bg-red-600",
      title: "Delete User ?",
      desc: (title: string) =>
        `Are you sure you want to delete ${title} ? all the ads will be deleted. Please note this action cannot be undone. `,

      btnColor: "bg-red-500",
      btnText: "Delete",
    },
  }[type];

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
            <p className="text-sm text-gray-500">
              {config.desc(data?.full_name || "")}
            </p>
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
              isDisabled={isLoading}
            >
              {config.btnText}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserListingActionModal;
