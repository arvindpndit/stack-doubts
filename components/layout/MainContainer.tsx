import React from "react";
import QuestionCard from "../partials/QuestionCard";
import Link from "next/link";
import LocalSearchBar from "../common/LocalSearchBar";

interface Props {
  searchQuestionQuery?: string | undefined;
}

const MainContainer = ({ searchQuestionQuery }: Props) => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">All questions</h1>
        <Link
          href="/ask-question"
          type="button"
          className="text-white bg-orange-500 font-medium rounded-2xl text-sm px-5 py-3 text-center  mb-2"
        >
          Ask a question
        </Link>
      </div>

      <LocalSearchBar placeholder="Search questions..." />

      <QuestionCard searchQuestionQuery={searchQuestionQuery} />
    </div>
  );
};

export default MainContainer;
