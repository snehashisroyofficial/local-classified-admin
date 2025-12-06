import ProfileSidebar from "@/src/components/users/profile/ProfileSidebar";
import React from "react";
import UserView from "./UserView";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  return (
    <div>
      <UserView />
    </div>
  );
};

export default page;
