import React from 'react';

import { getTopQuestions } from '@/lib/actions/question.action';
import Link from 'next/link';
import { truncateText } from '@/utils/data-manipulation';

const TopQuestions = async () => {
  const topQuestions = await getTopQuestions();
  return (
    <div>
      <h1 className="font-bold text-xl mt-5">Top Questions</h1>
      {topQuestions?.map((question) => {
        return (
          <Link key={question._id} href={`/question-details/${question?._id}`}>
            <div className="my-0.5 text-sm transition-all hover:bg-orange-500 hover:text-white p-2 rounded-2xl cursor-pointer lg:mr-2 leading-snug text-gray-700 dark:text-gray-300 ">
              {truncateText(question.title, 52)}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TopQuestions;

