"use client";
import React, { ReactElement, useState } from "react";

interface Props {
  authorId: string;
  children: React.ReactNode;
}

const ToggleUserQuestions = ({ children, authorId }: Props) => {
  const [toggleQuestionsAndAnswers, setToggleQuestionsAndAnswers] =
    useState(true);

  function toggleQuestions() {
    setToggleQuestionsAndAnswers(true);
    console.log("Displaying Questions Asked");
  }

  function toggleAnswers() {
    setToggleQuestionsAndAnswers(false);
    console.log("Displaying Answers Given");
  }

  return (
    <div>
      <div className="bg-green-300 w-max rounded-md">
        <button
          onClick={toggleQuestions}
          className={`font-semibold text-sm p-3 rounded-md hover:bg-green-400 ${
            toggleQuestionsAndAnswers ? "bg-green-400" : ""
          }`}
        >
          Questions Asked
        </button>
        <button
          onClick={toggleAnswers}
          className={`font-semibold text-sm p-3 rounded-md hover:bg-green-400 ${
            !toggleQuestionsAndAnswers ? "bg-green-400" : ""
          }`}
        >
          Answers Given
        </button>
      </div>

      <div className="mt-3 text-xs">
        *Question Asked and Answers given toggle feature will be developed soon
      </div>

      {children}
    </div>
  );
};

export default ToggleUserQuestions;
