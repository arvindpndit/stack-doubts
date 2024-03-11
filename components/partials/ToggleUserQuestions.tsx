"use client";
import React, { Children, ReactNode, useState } from "react";

interface Props {
  questionsAsked: ReactNode;
  answersGiven: ReactNode;
}

const ToggleUserQuestions = ({ questionsAsked, answersGiven }: Props) => {
  const [toggleQuestionsAndAnswers, setToggleQuestionsAndAnswers] =
    useState(true);

  function toggleQuestions() {
    setToggleQuestionsAndAnswers(true);
  }

  function toggleAnswers() {
    setToggleQuestionsAndAnswers(false);
  }

  return (
    <div>
      <div className="bg-orange-300 w-max rounded-2xl p-1">
        <button
          onClick={toggleQuestions}
          className={`mr-1 text-white font-semibold text-sm p-3 rounded-2xl hover:bg-orange-500 ${
            toggleQuestionsAndAnswers ? "bg-orange-500" : ""
          }`}
        >
          Questions Asked
        </button>
        <button
          onClick={toggleAnswers}
          className={`text-white font-semibold text-sm p-3 rounded-2xl hover:bg-orange-500 ${
            !toggleQuestionsAndAnswers ? "bg-orange-500" : ""
          }`}
        >
          Answers Given
        </button>
      </div>

      <div className="mt-3 text-xs">
        *Ask questions and provide more answers to earn badges.
      </div>

      {toggleQuestionsAndAnswers ? (
        <div>{questionsAsked}</div>
      ) : (
        <div>{answersGiven}</div>
      )}
    </div>
  );
};

export default ToggleUserQuestions;
