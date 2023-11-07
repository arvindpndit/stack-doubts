import React from "react";

const TopQuestions = () => {
  const questions: Array<string> = [
    "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    "Can I get the course for free?",
    "Redux Toolkit Not Updating State as Expected",
    "Async/Await Function Not Handling Errors Properly",
    "How do I use express as a custom server in NextJS?",
  ];

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
