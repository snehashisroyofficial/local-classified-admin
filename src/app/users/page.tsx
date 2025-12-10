import { Metadata } from "next";
import manifest from "@/src/app/infoApp";
import CustomerListTable from "./UserPage";

export const metadata: Metadata = {
  title: "Users",
  description: `View and manage your users for ${manifest().name}.`,
};

const page = () => {
  return <CustomerListTable />;
};

export default page;
