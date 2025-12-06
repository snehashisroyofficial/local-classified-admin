"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, OctagonX, ReceiptText, TriangleAlert } from "lucide-react";
import AdsUser from "./Ads/AdsUser";

const tabs = [
  { id: "active", label: "Active", icon: <Check size={16} /> },
  { id: "pending", label: "Pending", icon: <TriangleAlert size={16} /> },
  { id: "rejected", label: "Rejected", icon: <OctagonX size={16} /> },
  {
    id: "transactions",
    label: "Transactions",
    icon: <ReceiptText size={16} />,
  },
];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className=" mt-4 lg:mt-0 col-span-6 lg:col-span-8 w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
      {/* 1. Wrapper with responsive padding (smaller on mobile) */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
        {/* 2. Scroll container for tabs */}
        {/* 'overflow-x-auto' enables scrolling on mobile. 'scrollbar-hide' (optional) cleans up UI. */}
        <div
          className="w-full overflow-x-auto pb-2 sm:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* 3. The Tab List */}
          {/* 'w-max' ensures the gray pill background stretches with the buttons when scrolling. */}
          {/* 'flex-nowrap' forces buttons into a single line. */}
          <div className="flex flex-nowrap space-x-1 rounded-full bg-gray-100 p-1 w-max min-w-full sm:min-w-0 sm:w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id ? "" : "hover:text-gray-600"
                } relative rounded-full px-4 py-2 text-sm font-medium text-gray-500 outline-sky-400 transition focus-visible:outline-2 flex-shrink-0 whitespace-nowrap`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 rounded-full bg-white shadow shadow-black/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span
                  className={`relative z-20 flex items-center gap-2 ${
                    activeTab === tab.id ? "text-gray-950" : "text-gray-500"
                  }`}
                >
                  {tab.icon}
                  {/* Optional: Hide label on very small screens if needed, strictly keeping icon */}
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Tab Content Area */}
      {/* Removed 'text-white' (likely a typo as bg is white). Added responsive padding. */}
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "active" && <AdsUser statusType="active" />}
          {activeTab === "pending" && <AdsUser statusType="pending" />}
          {activeTab === "rejected" && <AdsUser statusType="rejected" />}
          {activeTab === "transactions" && (
            <div className="h-24 flex justify-center items-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              Coming Soon!
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
