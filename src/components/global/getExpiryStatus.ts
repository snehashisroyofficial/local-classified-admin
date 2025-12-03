import moment from "moment";

export function getExpiryStatus(expiryDate: string | null) {
  if (!expiryDate) return "No expiry date";

  const today = moment().startOf("day");
  const target = moment(expiryDate).startOf("day");

  const diff = target.diff(today, "days");

  if (diff > 1) return `Expires in ${diff} days`;
  if (diff === 1) return "Expires tomorrow";
  if (diff === 0) return "Already expired";
  if (diff === -1) return "Expired yesterday";
  if (diff < -1) return `Expired ${Math.abs(diff)} days ago`;

  return "Invalid date";
}
