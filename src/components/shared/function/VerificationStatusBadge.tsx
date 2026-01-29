"use client";

import { BadgeCheck, BadgeX } from "lucide-react";

type VerificationStatusBadgeProps = {
  isVerified: boolean;
  verifiedLabel?: string;
  unverifiedLabel?: string;
  className?: string;
};

const VerificationStatusBadge = ({
  isVerified,
  verifiedLabel = "Verified Seller",
  unverifiedLabel = "Not Verified",
  className = "",
}: VerificationStatusBadgeProps) => {
  return (
    <div
      className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full w-fit mt-1 ${className} ${
        isVerified
          ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400"
      }`}
      role="status"
      aria-label={isVerified ? "Verified seller" : "Not verified"}
    >
      {isVerified ? (
        <BadgeCheck className="w-3 h-3 shrink-0" />
      ) : (
        <BadgeX className="w-3 h-3 shrink-0" />
      )}

      <span className="truncate">
        {isVerified ? verifiedLabel : unverifiedLabel}
      </span>
    </div>
  );
};

export default VerificationStatusBadge;
