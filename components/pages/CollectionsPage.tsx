import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import QuestionCard from '../partials/QuestionCard';
import LocalSearchBar from '../common/LocalSearchBar';

interface Props {
  searchQuestionQuery: string | undefined;
  page?: number;
}

const CollectionsPage = async ({ searchQuestionQuery, page = 1 }: Props) => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ key: 'clerkId', value: userId });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mx-1">Saved Questions</h1>
      </div>
      <LocalSearchBar placeholder="Search questions..." />
      <QuestionCard
        searchQuestionQuery={searchQuestionQuery}
        filter="savedQuestions"
        mongoUser={mongoUser}
        page={page}
        showPagination={true}
      />
    </div>
  );
};

export default CollectionsPage;

