import React from "react";
import ProfileHeader from "@/components/partials/ProfileHeader";
import QuestionCard from "@/components/partials/QuestionCard";

const Profile = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <ProfileHeader authorId={params.id} />
      <button className="font-semibold text-sm bg-green-300 p-2 rounded-md hover:bg-green-400">
        Questions Asked
      </button>
      <QuestionCard filter="questionAskedByAuthor" mongoUser={params.id} />
    </div>
  );
};

export default Profile;
