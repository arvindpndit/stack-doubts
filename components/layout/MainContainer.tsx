import React from 'react';
import QuestionCard from '../partials/QuestionCard';
import PageHeader from '../common/PageHeader';

interface Props {
  searchQuestionQuery?: string | undefined;
  page?: number;
}

const MainContainer = ({ searchQuestionQuery, page = 1 }: Props) => {
  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <PageHeader
        introBadgeText="👋 Welcome back!"
        titleText="All Questions"
        subTitleText="Dive into the community’s knowledge or ask your own."
        searchBarPlaceholder="Search questions..."
      />
      <QuestionCard
        searchQuestionQuery={searchQuestionQuery}
        page={page}
        showPagination={true}
      />
    </div>
  );
};

export default MainContainer;

