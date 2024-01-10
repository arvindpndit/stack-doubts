import React from "react";
import ProfileHeader from "@/components/partials/ProfileHeader";
import User from "@/database/user-model";
import QuestionCard from "@/components/partials/QuestionCard";
import { getQuestionsByAuthorId } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

const Profile = async ({ params }: { params: { id: string } }) => {
  const userInfo = await getUserById({ key: "_id", value: params.id });

  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <ProfileHeader userInfo={userInfo} />
      <button className="font-semibold text-sm bg-green-300 p-2 rounded-md hover:bg-green-400">
        Questions Asked
      </button>
      <QuestionCard filter="questionAskedByAuthor" mongoUser={params.id} />
    </div>
  );
};

export default Profile;
