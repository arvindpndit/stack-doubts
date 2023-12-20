import { getQuestionById } from "@/lib/actions/question.action";
import { CloudCog } from "lucide-react";
import React from "react";
import ParseHTML from "../partials/ParseHtml";

const QuestionDetailsPage = async (props: { id: string }) => {
  const id = props.id;
  const question = await getQuestionById(id);
  console.log(question);
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white  rounded-md">
      <h2 className="text-2xl font-bold mb-4">{question?.title}</h2>
      <ParseHTML code={question?.content}></ParseHTML>

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
    </div>
  );
};

export default QuestionDetailsPage;
