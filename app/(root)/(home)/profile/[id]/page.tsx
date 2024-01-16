import React, { useState } from "react";
import ProfileHeader from "@/components/partials/ProfileHeader";
import ToggleUserQuestions from "@/components/partials/ToggleUserQuestions";
import QuestionCard from "@/components/partials/QuestionCard";

const Profile = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <ProfileHeader authorId={params.id} />
      <ToggleUserQuestions authorId={params.id}>
        <QuestionCard />
      </ToggleUserQuestions>
    </div>
  );
};

export default Profile;
