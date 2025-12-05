import {
  Check,
  OctagonX,
  Shield,
  TriangleAlert,
  User,
  Users,
} from "lucide-react";

export const statusConfig = {
  active: {
    label: "Active",
    icon: <Check size={14} />,
    classes: "bg-green-100 text-green-600",
  },
  pending: {
    label: "Pending",
    icon: <TriangleAlert size={14} />,
    classes: "bg-yellow-100 text-yellow-700",
  },
  suspend: {
    label: "Suspend",
    icon: <OctagonX size={14} />,
    classes: "bg-red-100 text-red-600",
  },
};

export const roleConfig = {
  admin: {
    label: "Admin",
    icon: <Shield size={14} />,
    classes: "bg-red-100 text-red-600",
  },
  user: {
    label: "User",
    icon: <User size={14} />,
    classes: "bg-blue-100 text-blue-600",
  },
  member: {
    label: "member",
    icon: <Users size={14} />,
    classes: "bg-orange-100 text-orange-600",
  },
};
