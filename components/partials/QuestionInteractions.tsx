"use client";
import { saveTheQuestion, upvoteQuestion } from "@/lib/actions/user.action";
import React from "react";
import { CiStar } from "react-icons/ci";
import { BiUpvote, BiDownvote } from "react-icons/bi";

interface QuestionInteractionProps {
  question: string;
}

const QuestionInteractions: React.FC<QuestionInteractionProps> = (params) => {
  const { question } = params;

  const questionObj = JSON.parse(question);

  async function save() {
    await saveTheQuestion({
      userId: questionObj.author,
      questionId: questionObj._id,
      path: "/",
    });
  }

  async function upvoteQuestionHandler() {
    await upvoteQuestion({
      questionId: questionObj._id,
      authorId: questionObj.author,
    });
  }

  return (
    <div className="flex items-center">
      <button
        onClick={upvoteQuestionHandler}
        className="mr-2 text-blue-500 hover:underline"
      >
        <BiUpvote />
      </button>
      <div className="px-1 text-xs mr-2 bg-slate-300 rounded-sm">
        {questionObj?.upvotes?.length}
      </div>
      <button className="mr-2 text-red-500 hover:underline">
        <BiDownvote />
      </button>
      <div className="px-1 mr-2 text-xs bg-slate-300 rounded-sm">
        {questionObj?.downvotes?.length}
      </div>

      <button onClick={save} className="ml-2 text-2xl text-green-600">
        <CiStar />
      </button>
    </div>
  );
};

export default QuestionInteractions;
