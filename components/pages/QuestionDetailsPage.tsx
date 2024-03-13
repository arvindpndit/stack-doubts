import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";
import ParseHTML from "../partials/ParseHtml";
import AnswerForm from "../forms/AnswerForm";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { CiClock2, CiStar } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { getAnswersByQuestionId } from "@/lib/actions/answer.action";
import { getUserById, saveTheQuestion } from "@/lib/actions/user.action";
import QuestionInteractions from "../partials/QuestionInteractions";
import Image from "next/image";

interface Props {
  id: string;
  mongoUserId: string;
}

const QuestionDetailsPage = async ({ id, mongoUserId }: Props) => {
  const question = await getQuestionById(id);
  const allAnswers = await getAnswersByQuestionId({ questionId: id });
  const authorId = await getUserById({
    key: "_id",
    value: question?.author,
  });

  return (
    <div className="mt-8 mb-16 md:mb-12">
      <div className="flex justify-between mb-2">
        <div className="flex items-center justify-center">
          <img
            src={authorId?.picture}
            className="h-6 mr-2 rounded-full"
            alt={`Profile of ${authorId?.name}`}
          />
          <div className="text-lg font-semibold mr-4">{authorId?.name}</div>
        </div>
        <QuestionInteractions
          userId={mongoUserId}
          question={JSON.stringify(question)}
        />
      </div>
      <h2 className="text-3xl font-bold ">{question?.title}</h2>
      <div className="flex items-center justify-between"></div>
      <div className="mt-4 flex gap-4">
        <div className=" text-gray-500 text-sm flex items-center gap-1">
          <CiClock2 />
          <div>asked on {question?.createdAt.toLocaleDateString()}</div>
        </div>
        <div className=" text-gray-500 text-sm flex items-center gap-1">
          <MdOutlineRemoveRedEye />
          <div>Views: {question?.views}</div>
        </div>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <FiMessageSquare />
          Answers: {allAnswers?.length}
        </p>
      </div>

      <ParseHTML code={question?.content || ""}></ParseHTML>
      <div className="my-8 font-semibold text-lg  p-2 rounded-2xl w-fit text-green-800">
        {allAnswers?.length} Answers
      </div>
      {/* render all the answers here */}
      {allAnswers.map(async (answer) => {
        const authorId = await getUserById({
          key: "_id",
          value: answer?.author,
        });

        return (
          <div className="mb-8">
            <div className="flex gap-2">
              <img src={authorId?.picture} className="h-5 rounded-full" />
              <div className="font-medium text-sm">{authorId?.name}</div>
              <div className="text-gray-500 text-sm">
                ‣ answered on {answer?.createdAt.toLocaleDateString()}
              </div>
            </div>
            <ParseHTML code={answer.content} />
          </div>
        );
      })}
      <div className="text-xl font-bold">Write your answer here</div>
      <AnswerForm id={id} mongoUserId={mongoUserId} />
    </div>
  );
};

export default QuestionDetailsPage;
