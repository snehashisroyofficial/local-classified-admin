import { Clock, Users } from "lucide-react";
import { getExpiryStatus } from "../../global/getExpiryStatus";
import { AdvertisementType } from "@/src/types/ads/ads";

type Props = {
  ad: AdvertisementType;
  showUserInfo?: boolean;
};
const ContentInfoCard = ({ ad, showUserInfo }: Props) => {
  console.log("content info card", ad);
  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold text-slate-800 line-clamp-2 pr-2">
          {ad.title}
        </h3>
      </div>

      <p className="text-sm text-slate-500 line-clamp-2 sm:line-clamp-1 mb-3 max-w-[500px]">
        {ad.description}
      </p>

      <div className="flex flex-wrap items-center text-xs text-slate-400 gap-y-2 gap-x-4">
        {showUserInfo && (
          <span className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Users size={12} className="mr-1.5" />
            <span className="truncate max-w-[120px]">
              {ad.user_id.full_name}
            </span>
          </span>
        )}
        <span className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
          <Users size={12} className="mr-1.5" />
          <span className="truncate max-w-[120px]">{ad.category_id.name}</span>
        </span>
        <span className="flex items-center bg-slate-50 px-2 py-1 rounded border border-slate-100">
          <Users size={12} className="mr-1.5" />
          <span className="truncate max-w-[120px]">
            {ad.sub_category_id.name}
          </span>
        </span>
        <span className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-100 text-green-700">
          <Clock size={12} className="mr-1.5" />
          {new Date(ad.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center bg-red-50 px-2 py-1 rounded border border-red-100 text-red-500">
          <Clock size={12} className="mr-1.5" />

          {getExpiryStatus(ad.expires_at)}
        </span>
      </div>
    </div>
  );
};

export default ContentInfoCard;
