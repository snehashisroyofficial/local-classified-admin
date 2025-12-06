"use client";

import useUserInfo from "@/src/hooks/user/useUserInfo";
import { BadgeCheck, Mail, Phone } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { statusConfig } from "../tableUtils";

const ProfileSidebar = () => {
  const { data: UserInfo } = useUserInfo();
  const status = UserInfo?.account_status;

  // Safety: Handle case where config might be undefined
  const config = (status &&
    statusConfig[status as keyof typeof statusConfig]) || {
    classes: "bg-gray-100 text-gray-500",
    icon: null,
    label: "Unknown",
  };

  return (
    <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-0 h-fit">
      {/* Seller Profile Card */}
      <div className="relative bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200">
        {/* 2. HEADER SECTION */}
        {/* Added 'pr-20' to prevent the name from overlapping the absolute badge on small screens */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 pr-20">
          <div className="relative shrink-0">
            <Image
              width={56}
              height={56}
              src={UserInfo?.user_avatar || "/src/assets/vercel.svg"}
              alt={UserInfo?.full_name || "User Avatar"}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-50 shadow-sm object-cover"
            />
          </div>

          <div className="overflow-hidden">
            <h3 className="font-bold text-gray-900 truncate text-base sm:text-lg">
              {UserInfo?.full_name || "Loading..."}
            </h3>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mt-1">
              <BadgeCheck className="w-3 h-3" />
              <span className="truncate">Verified Seller</span>
            </div>
          </div>
        </div>

        {/* 3. STATUS BADGE */}
        {/* Kept absolute, but font scales slightly for better fit */}
        {UserInfo?.account_status && (
          <div
            className={`absolute top-4 right-4 sm:top-5 sm:right-5 py-1 px-2 flex items-center gap-1 text-[10px] sm:text-xs rounded-full w-fit ${config.classes}`}
          >
            {config.icon}
            {config.label}
          </div>
        )}

        {/* 4. CONTACT DETAILS */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Seller Contacts
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 break-all text-sm text-gray-600">
                <Mail size={16} className="shrink-0 text-gray-400" />
                <span>{UserInfo?.email ?? "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="shrink-0 text-gray-400" />
                <span>{UserInfo?.phone ?? "-"}</span>
              </div>
            </div>
          </div>

          {/* 5. METADATA FOOTER */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="text-gray-400 uppercase tracking-wider">
                  Last Login:
                </span>
                <span className="font-medium">
                  {UserInfo?.last_login
                    ? moment(UserInfo.last_login).fromNow()
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="text-gray-400 uppercase tracking-wider">
                  Joined:
                </span>
                <span className="font-medium">
                  {UserInfo?.created_at
                    ? new Date(UserInfo.created_at).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
