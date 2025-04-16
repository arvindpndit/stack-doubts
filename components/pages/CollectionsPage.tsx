import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import QuestionCard from '../partials/QuestionCard';
import LocalSearchBar from '../common/LocalSearchBar';
import PageHeader from '../common/PageHeader';

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
      <PageHeader
        introBadgeText="🔖 Your Collection"
        titleText="Saved Questions"
        subTitleText="Easily revisit the questions you found helpful or want to explore later."
        searchBarPlaceholder="Search saved questions..."
      />
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

