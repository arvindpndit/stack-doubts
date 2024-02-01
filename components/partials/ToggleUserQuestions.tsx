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
