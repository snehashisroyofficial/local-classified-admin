"use client";
import ProfileSidebar from "@/src/components/users/profile/ProfileSidebar";
import ProfileTabs from "@/src/components/users/profile/ProfileTabs";

const UserView = () => {
  return (
    <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 ">
      <ProfileSidebar />
      <ProfileTabs />
    </div>
  );
};

export default UserView;
