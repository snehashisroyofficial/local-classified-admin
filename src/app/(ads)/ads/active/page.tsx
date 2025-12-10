import ActiveAds from "./ActiveAds";
import { Metadata } from "next";
import manifest from "@/src/app/infoApp";

export const metadata: Metadata = {
  title: "Active Ads",
  description: `View and manage your active ads for ${manifest().name}.`,
};

const page = () => {
  return <ActiveAds />;
};

export default page;
