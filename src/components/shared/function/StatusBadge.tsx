import {
  AlertTriangle,
  Check,
  CheckCircle,
  Clock,
  FileText,
  LucideIcon,
  Tag,
  Trash2,
  XCircle,
} from "lucide-react";

type AdStatus =
  | "null"
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "published"
  | "expired"
  | "deleted"
  | "active"
  | "sold";

const styles: Record<AdStatus, string> = {
  null: "bg-gray-200 text-gray-600",
  draft: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  published: "bg-indigo-100 text-indigo-700",
  expired: "bg-orange-100 text-orange-700",
  deleted: "bg-rose-100 text-rose-700",
  active: "bg-emerald-100 text-emerald-700",
  sold: "bg-slate-200 text-slate-800",
};

const icons: Record<AdStatus, LucideIcon> = {
  null: FileText,
  draft: FileText,
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  published: CheckCircle,
  expired: AlertTriangle,
  deleted: Trash2,
  active: Check,
  sold: Tag,
};

const StatusBadge = ({ status }: { status?: string | null }) => {
  const normalized = (status?.toLowerCase() || "null") as AdStatus;
  const Icon = icons[normalized];

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${styles[normalized]}`}
    >
      <Icon size={12} className="mr-1.5" />
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </span>
  );
};

export default StatusBadge;
