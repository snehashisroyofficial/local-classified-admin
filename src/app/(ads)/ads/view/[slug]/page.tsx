import NotFoundPage from "@/src/app/not-found";
import ViewAdDetails from "./ViewAdDetails";
import { Metadata } from "next";
import manifest from "@/src/app/infoApp";
export const metadata: Metadata = {
  title: "View Ads",
  description: `View and manage your ads for ${manifest().name}.`,
};
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  if (!slug) return <NotFoundPage />;
  return <ViewAdDetails id={slug as string} />;
};

export default page;
