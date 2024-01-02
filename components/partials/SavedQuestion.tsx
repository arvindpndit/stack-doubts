"use client";

import { saveTheQuestion } from "@/lib/actions/user.action";
import React from "react";
import { CiStar } from "react-icons/ci";

interface SavedQuestion {
  authorId: string;
  questionId: string;
}

const SavedQuestion: React.FC<SavedQuestion> = (params) => {
  const { authorId, questionId } = params;

  async function save() {
    const updatedUser = await saveTheQuestion({
      userId: authorId,
      questionId: questionId,
      path: "/",
    });
    console.log(updatedUser);
  }

  return (
    <button onClick={save} className="ml-2 text-2xl text-green-600">
      <CiStar />
    </button>
  );
};

export default SavedQuestion;
