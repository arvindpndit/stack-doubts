import React from "react";

import { questions } from "../utils/constants";

const TopQuestions = () => {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mt-5">Top Questions</h1>
      {questions.map((question) => {
        return <div className="my-5 text-sm">{question}</div>;
      })}
    </div>
  );
};

export default TopQuestions;
