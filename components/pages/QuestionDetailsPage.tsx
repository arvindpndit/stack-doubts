import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";
import ParseHTML from "../partials/ParseHtml";
import AnswerForm from "../forms/AnswerForm";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { getAnswersByQuestionId } from "@/lib/actions/answer.action";

interface Props {
  id: string;
  mongoUserId: string;
}

const QuestionDetailsPage = async ({ id, mongoUserId }: Props) => {
  const question = await getQuestionById(id);
  const allAnswers = await getAnswersByQuestionId({ questionId: id });
  console.log(allAnswers);
  return (
    <div className=" mx-auto my-8 px-1 md:px-3 md:py-6 -z-50">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-800">
            {"Arvind Pandit"}
          </span>
        </div>
        <div className="flex items-center">
          <button className="mr-2 text-blue-500 hover:underline">
            <BiUpvote />
          </button>
          <button className="text-red-500 hover:underline">
            <BiDownvote />
          </button>
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
