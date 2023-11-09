import React from "react";

const QuestionCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md my-8">
      <h1 className="text-xl font-semibold">
        Redux Toolkit Not Updating State as Expected
      </h1>
      <div className="flex space-x-2 mt-2">
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">tags</span>
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">tags</span>
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">tags</span>
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">tags</span>
        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">tags</span>
      </div>

      <div className="flex mt-4">
        <div className="flex items-center mr-4">
          <div className="text-sm font-semibold">Arvind</div>
          <div className="text-gray-600 ml-2">asked 63 days ago</div>
        </div>

        <div className="flex items-center mr-4">
          <div className="text-sm font-semibold">13 Votes</div>
          <div className="text-gray-600 ml-2">21 Answers</div>
        </div>

        <div className="flex items-center">
          <div className="text-sm font-semibold">568 views</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
