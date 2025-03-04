import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import QuestionCard from '../partials/QuestionCard';
import LocalSearchBar from '../common/LocalSearchBar';

interface Props {
  searchQuestionQuery: string | undefined;
}

const CollectionsPage = async ({ searchQuestionQuery }: Props) => {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ key: 'clerkId', value: userId });

  return (
    <div className="pb-24">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Saved Questions</h1>
      </div>
      <LocalSearchBar placeholder="Search questions..." />
      <QuestionCard
        searchQuestionQuery={searchQuestionQuery}
        filter="savedQuestions"
        mongoUser={mongoUser}
      />
    </div>
  );
};

export default CollectionsPage;

