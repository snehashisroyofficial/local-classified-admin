import { Metadata } from "next";
import manifest from "@/src/app/infoApp";
import PendingAds from "./PendingAds";

export const metadata: Metadata = {
  title: "Pending Ads",
  description: `View and manage your pending ads for ${manifest().name}.`,
};

const page = () => {
  return <PendingAds />;
};

export default page;
