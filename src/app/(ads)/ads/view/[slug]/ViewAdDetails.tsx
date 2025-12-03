"use client";

import { formatCurrency } from "@/src/components/ads/view/CurrencyFormat";
import ImageGallery from "@/src/components/ads/view/ImageGallery";

const MapView = dynamic(() => import("@/src/components/ads/view/MapView"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

import StatusBadge from "@/src/components/ads/view/StatusBadge";
import ViewAdDetailsSkeleton from "@/src/components/ads/view/ViewAdDetailsSkeleton";
import ListingActionModal from "@/src/components/global/ListingActionModal";
import useFetchSingleAd from "@/src/hooks/ads/useFetchSingleAd";
import { useListingActions } from "@/src/hooks/ads/useListingActions";
import { AdImage, AdvertisementType } from "@/src/types/ads/ads";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldAlert,
  Tag,
  X,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ViewAdDetails = ({ id }: { id: string }) => {
  const router = useRouter();

  const {
    data: singleAd,
    isLoading: isSingleAdLoading,
    error: singleAdError,
    isError: isSingleAdError,
    refetch: refetchSingleAd,
  } = useFetchSingleAd({ id });
  // all actions
  const {
    handleChangeStatus,
    handleChangeReject,
    isLoading: isLoadingActions,
    isSuccess,
    resetState,
    activeModal,
    setActiveModal,
  } = useListingActions(refetchSingleAd);
  // Optional: Handle loading/error states visually
  if (isSingleAdLoading) return <ViewAdDetailsSkeleton />;
  if (isSingleAdError)
    return (
      <div className="p-8 text-center text-red-500">Error loading ad.</div>
    );
  const onConfirmAction = (data: string) => {
    if (!activeModal) return;

    switch (activeModal.type) {
      case "APPROVE":
        handleChangeStatus(activeModal.data.id);
        break;

      case "REJECT":
        handleChangeReject({ ...activeModal.data, reject_reason: data });
        break;
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    resetState();
  };
  console.log({ singleAd });
  return (
    <div className="w-full min-h-screen bg-gray-50/50 pb-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-white hover:shadow-sm rounded-full transition-all duration-200 group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-800" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 capitalize">
                Listing Details
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Ad ID: #{singleAd?.id}
              </p>
            </div>
          </div>
          <StatusBadge status={singleAd?.status} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* LEFT CONTENT COLUMN (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden pb-6">
            {/* Image Gallery Wrapper */}
            <div className="w-full bg-gray-100 min-h-[250px] sm:min-h-[400px]">
              <ImageGallery
                images={singleAd?.ad_images as AdImage[]}
                title={singleAd?.title as string}
              />
            </div>

            <div className="px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug wrap-break-word">
                    {singleAd?.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(
                        singleAd?.created_at || ""
                      ).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5" />
                      {singleAd?.location?.city}, {singleAd?.location?.state}
                    </span>
                  </div>
                </div>

                {/* Price - Larger on mobile for visibility */}
                <div className="text-2xl sm:text-3xl font-extrabold text-green-600 shrink-0">
                  {formatCurrency(singleAd?.price || 0)}
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              {/* Description */}
              <div className="prose prose-sm sm:prose-base prose-slate prose-p:text-gray-600 prose-headings:font-bold prose-a:text-indigo-600 max-w-none">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="whitespace-pre-line leading-relaxed">
                  {singleAd?.description}
                </p>
              </div>

              {/* Attributes Grid - 2 cols mobile, 4 cols desktop */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <AttributeBox
                  label="Condition"
                  value={singleAd?.condition.label}
                />
                <AttributeBox
                  label="Category"
                  value={singleAd?.category_id.name}
                />
                <AttributeBox
                  label="Type"
                  value={singleAd?.sub_category_id.name}
                />
              </div>

              {/* Tags */}
              {singleAd?.ad_tags && singleAd.ad_tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {singleAd?.ad_tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        <Tag className="w-3 h-3 mr-1.5 opacity-70" />
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Map Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              Location
            </h3>
            {/* Aspect ratio optimized for mobile map view */}
            <div className="aspect-video sm:aspect-21/9  rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-indigo-400 w-full">
              {/* <Globe className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm font-medium text-center px-4">
                Interactive Map Component
              </span>
              <span className="text-xs mt-1 text-center px-4">
                Lat: {singleAd?.location?.latitude.toFixed(4)}, Lng:{" "}
                {singleAd?.location?.longitude.toFixed(4)}
              </span> */}
              <MapView
                lat={singleAd?.location ? singleAd?.location?.latitude : null}
                lon={singleAd?.location ? singleAd?.location?.longitude : null}
                city={
                  singleAd?.location &&
                  singleAd?.location?.latitude &&
                  singleAd?.location?.longitude
                    ? null
                    : singleAd?.location?.city
                }
              />
            </div>
            <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base">
              {singleAd?.location?.address}, {singleAd?.location?.city},{" "}
              {singleAd?.location?.country}
            </p>
          </div>
        </div>
        {/* right  */}
        <div className="lg:col-span-4 space-y-6 mt-6 lg:mt-0 lg:sticky lg:top-8">
          {singleAd?.status === "pending" && (
            <div className="fixed bottom-0 left-0 right-0 z-99999 bg-white border-t border-gray-200 shadow-sm p-4 lg:static lg:bg-white lg:border lg:rounded-2xl lg:shadow-sm mb-0 lg:p-5 lg:mb-6 lg:z-auto  ">
              <div className="hidden lg:flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                <ShieldAlert className="w-5 h-5 text-indigo-600" />
                <h3>Review Actions</h3>
              </div>
              <div className=" flex gap-4">
                <button
                  onClick={() => {
                    setActiveModal({
                      type: "REJECT",
                      data: singleAd as AdvertisementType,
                    });
                  }}
                  className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors active:scale-95 w-full"
                >
                  <X size={16} className="mr-1.5 hidden md:block" /> Reject
                </button>

                <button
                  onClick={() => {
                    setActiveModal({
                      type: "APPROVE",
                      data: singleAd as AdvertisementType,
                    });
                  }}
                  className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium border border-green-100 text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors active:scale-95 w-full"
                >
                  <Check size={16} className="mr-1.5 hidden md:block" /> Approve
                </button>
              </div>
            </div>
          )}

          {/* Seller Profile Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative shrink-0">
                <Image
                  width={56}
                  height={56}
                  src={
                    singleAd?.user_id.user_avatar || "/src/assets/vercel.svg"
                  }
                  alt={singleAd?.user_id.full_name || "User Avatar"}
                  className="w-14 h-14 rounded-full border-2 border-gray-50 shadow-sm object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-900 truncate text-lg">
                  {singleAd?.user_id.full_name}
                </h3>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mt-1">
                  <BadgeCheck className="w-3 h-3" />
                  <span className="truncate">Verified Seller</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Seller Contacts
              </div>
              <div className="grid grid-cols-1 gap-2">
                {singleAd?.contact_preferences?.email && (
                  <ContactRow
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    value={singleAd?.contact_preferences.email_contact} // Usually hidden until clicked
                    type="default"
                  />
                )}
                {singleAd?.contact_preferences?.phone && (
                  <ContactRow
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone"
                    value={singleAd?.contact_preferences.phone_contact}
                    type="default"
                  />
                )}
                {singleAd?.contact_preferences?.whatsapp && (
                  <ContactRow
                    icon={<MessageCircle className="w-4 h-4" />}
                    label="WhatsApp"
                    value={singleAd?.contact_preferences.whatsapp_contact}
                    type="whatsapp"
                  />
                )}
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100 flex gap-3">
              <button className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors shadow-sm">
                View Profile
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors shadow-sm">
                Ads History
              </button>
            </div>
          </div>

          {/* Safety Tips / Context */}
          {singleAd && singleAd.status === "pending" && singleAd?.resubmit && (
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">
                    Resubmission Alert
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    This ad was previously rejected. Please check if the user
                    has addressed the previous concerns before approving.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <ListingActionModal
        isOpen={!!activeModal}
        onClose={closeModal}
        type={activeModal?.type || null}
        data={activeModal?.data || null}
        // Pass Hook State
        onConfirm={onConfirmAction}
        isLoading={isLoadingActions}
        isSuccess={isSuccess}
      />
    </div>
  );
};

// Helper Components for cleaner code

const AttributeBox = ({ label, value }: { label: string; value?: string }) => (
  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
      {label}
    </div>
    <div className="text-sm font-medium text-gray-900 truncate">
      {value || "N/A"}
    </div>
  </div>
);

const ContactRow = ({
  icon,
  label,
  value,
  type,
}: {
  icon: any;
  label: string;
  value: string | number | null;
  type: "default" | "whatsapp";
}) => {
  const isWhatsapp = type === "whatsapp";
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer group ${
        isWhatsapp
          ? "bg-green-50 hover:bg-green-100"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div
          className={`p-1.5 rounded-lg shadow-sm ${
            isWhatsapp
              ? "bg-white text-green-600"
              : "bg-white text-gray-600 group-hover:text-indigo-600"
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-sm font-medium truncate ${
            isWhatsapp ? "text-green-800" : "text-gray-700"
          }`}
        >
          {label}
        </span>
      </div>
      <span
        className={`text-xs font-medium ${
          isWhatsapp ? "text-green-700" : "text-gray-500"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default ViewAdDetails;
