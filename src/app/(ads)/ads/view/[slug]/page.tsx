import NotFoundPage from "@/src/app/not-found";
import ViewAdDetails from "./ViewAdDetails";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  if (!slug) return <NotFoundPage />;
  console.log({ slug });
  return <ViewAdDetails id={slug as string} />;
};

export default page;
