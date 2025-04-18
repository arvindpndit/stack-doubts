'use client';
import {
  downvoteQuestion,
  saveTheQuestion,
  upvoteQuestion,
} from '@/lib/actions/user.action';
import React, { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { IUser } from '@/database/user-model';
import { toast } from 'sonner';

interface QuestionInteractionProps {
  question: string;
  userId: string;
}

const QuestionInteractions: React.FC<QuestionInteractionProps> = (params) => {
  const { question, userId } = params;
  const pathname = usePathname();
  const [questionSavedStatus, setQuestionSavedStatus] = useState<IUser | null>(
    null,
  );

  const questionObj = JSON.parse(question); //converts the question string to an object
  const userIdObj = JSON.parse(userId);

  const isQuestionSaved = async function () {
    const response = await saveTheQuestion({
      userId: userIdObj,
      questionId: questionObj._id,
      path: pathname,
      update: true,
    });

    setQuestionSavedStatus(response);
    if (response) {
      toast('✨ Boom! Question added to your collection!');
    } else {
      toast('🗑️ Poof! Question removed from your collection!');
    }
  };

  async function upvoteQuestionHandler() {
    const { isQuestionUpvoted } = await upvoteQuestion({
      questionId: questionObj._id,
      authorId: userIdObj,
      path: pathname,
    });
    if (isQuestionUpvoted) {
      toast('🧠 Big brain move. You upvoted!');
    } else {
      toast('😮‍💨 Changed your mind? Upvote removed.');
    }
  }

  async function downvoteQuestionHandler() {
    const { isQuestionDownvoted } = await downvoteQuestion({
      questionId: questionObj._id,
      authorId: userIdObj,
      path: pathname,
    });
    if (isQuestionDownvoted) {
      toast('👎 Oof! You just downvoted this question.');
    } else {
      toast('😅 Changed your mind? Downvote removed!');
    }
  }

  useEffect(() => {
    (async () => {
      const response = await saveTheQuestion({
        userId: userIdObj,
        questionId: questionObj._id,
        path: pathname,
        update: false,
      });
      setQuestionSavedStatus(response);
    })();
  }, []);

  return (
    <div className="flex items-center">
      <button
        onClick={upvoteQuestionHandler}
        className="mr-2 text-blue-500 hover:underline"
      >
        <BiUpvote />
      </button>
      <div className="px-1 text-xs mr-2 bg-slate-300 dark:bg-slate-600 rounded-sm">
        {questionObj?.upvotes?.length}
      </div>
      <button
        onClick={downvoteQuestionHandler}
        className="mr-2 text-red-500 hover:underline"
      >
        <BiDownvote />
      </button>
      <div className="px-1 mr-2 text-xs bg-slate-300 dark:bg-slate-600 rounded-sm">
        {questionObj?.downvotes?.length}
      </div>

      <button
        onClick={isQuestionSaved}
        className="ml-2 text-2xl text-green-600"
      >
        {!(questionSavedStatus === null) ? <FaStar /> : <FaRegStar />}
      </button>
    </div>
  );
};

export default QuestionInteractions;

