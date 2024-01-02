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
import SavedQuestion from "../partials/SavedQuestion";

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
    <div className=" mx-auto my-8 px-1 md:px-3 md:py-6 -z-50 mb-14 md:mb-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center justify-center">
          <img
            src={authorId?.picture}
            className="h-6 mr-2 rounded-full"
            alt={`Profile of ${authorId?.name}`}
          />
          <div className="text-lg font-semibold mr-4">{authorId?.name}</div>
        </div>
        <div className="flex items-center">
          <button className="mr-2 text-blue-500 hover:underline">
            <BiUpvote />
          </button>
          <div className="px-1 text-xs mr-2 bg-slate-300 rounded-sm">
            {question?.upvotes?.length}
          </div>
          <button className="mr-2 text-red-500 hover:underline">
            <BiDownvote />
          </button>
          <div className="px-1 mr-2 text-xs bg-slate-300 rounded-sm">
            {question?.downvotes?.length}
          </div>

          <SavedQuestion
            questionId={question?._id.toString()}
            authorId={authorId?._id.toString()}
          />
        </div>
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

      <ParseHTML code={question?.content}></ParseHTML>

      {/* render all the answers here */}
      {allAnswers.map((answer) => {
        return <div dangerouslySetInnerHTML={{ __html: answer.content }}></div>;
      })}

      <div className="text-xl font-bold">Write your answer here</div>
      <AnswerForm id={id} mongoUserId={mongoUserId} />
    </div>
  );
};

export default QuestionDetailsPage;
