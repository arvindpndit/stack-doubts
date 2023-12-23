import { getQuestionById } from "@/lib/actions/question.action";
import { CloudCog } from "lucide-react";
import React from "react";
import ParseHTML from "../partials/ParseHtml";
import AnswerForm from "../forms/AnswerForm";

const QuestionDetailsPage = async (props: { id: string }) => {
  const id = props.id;
  const question = await getQuestionById(id);
  console.log(question);
  return (
    <div className=" mx-auto my-8 px-1 md:px-3 md:py-6 -z-50  rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{question?.title}</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-gray-500">Author: {}</span>
          <span className="mr-2 text-gray-500">Views: {question?.views}</span>
        </div>

        <div className="flex items-center">
          <button className="mr-2 text-blue-500 hover:underline">Upvote</button>
          <button className="text-red-500 hover:underline">Downvote</button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-500">Answers: {question?.answers?.length}</p>
      </div>

      <div className="mt-4 text-gray-500 text-sm">
        {question?.createdAt.toString()}
      </div>
      <ParseHTML code={question?.content}></ParseHTML>

      <div className="text-xl font-bold">Write your answer here</div>
      <AnswerForm />
    </div>
  );
};

export default QuestionDetailsPage;
