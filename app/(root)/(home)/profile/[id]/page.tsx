import React from "react";
import ProfileHeader from "@/components/partials/ProfileHeader";
import User from "@/database/user-model";

const Profile = async ({ params }: { params: { id: string } }) => {
  const userInfo = await User.findById(params.id);

  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <ProfileHeader userInfo={userInfo} />
    </div>
  );
};

export default Profile;
