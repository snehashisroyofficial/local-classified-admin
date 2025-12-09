"use client";
import ProfileSidebar from "@/src/components/users/view-profile/view-profile-left/ProfileSidebar";
import ProfileTabs from "@/src/components/users/view-profile/view-profile-right/ProfileTabs";

const UserView = () => {
  return (
    <div className="w-full h-full mx-auto  lg:grid lg:grid-cols-12 lg:gap-8 ">
      <ProfileSidebar />
      <ProfileTabs />
    </div>
  );
};

export default UserView;
