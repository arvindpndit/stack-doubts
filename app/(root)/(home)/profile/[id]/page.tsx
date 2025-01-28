import React, { useState } from 'react';
import ProfileHeader from '@/components/partials/ProfileHeader';
import ToggleUserQuestions from '@/components/partials/ToggleUserQuestions';
import QuestionCard from '@/components/partials/QuestionCard';

const Profile = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 mb-24 lg:mb-14 h-screen">
      <ProfileHeader authorId={params.id} />
      <ToggleUserQuestions
        questionsAsked={
          <QuestionCard filter="questionAskedByAuthor" mongoUser={params.id} />
        }
        answersGiven={
          <QuestionCard
            filter="questionsAnsweredByAuthor"
            mongoUser={params.id}
          />
        }
      ></ToggleUserQuestions>
    </div>
  );
};

export default Profile;

