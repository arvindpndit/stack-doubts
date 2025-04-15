import React from 'react';
import QuestionCard from '../partials/QuestionCard';
import Link from 'next/link';
import LocalSearchBar from '../common/LocalSearchBar';

interface Props {
  searchQuestionQuery?: string | undefined;
  page?: number;
}

const MainContainer = ({ searchQuestionQuery, page = 1 }: Props) => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <div className="flex justify-between mx-1">
        <h1 className="font-bold text-3xl">All Questions</h1>
        <Link
          href="/ask-question"
          type="button"
          className="text-white transition-all bg-orange-500 font-medium rounded-full text-sm px-5 py-3 text-center  mb-2 hover:scale-105  hover:shadow-md"
        >
          Ask a question
        </Link>
      </div>

      <LocalSearchBar placeholder="Search questions..." />
      <QuestionCard
        searchQuestionQuery={searchQuestionQuery}
        page={page}
        showPagination={true}
      />
    </div>
  );
};

export default MainContainer;

