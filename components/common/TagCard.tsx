import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

interface TagCardProps {
  name: string;
  questionCount: number;
  id: string;
}

const TagCard: React.FC<TagCardProps> = ({ name, questionCount, id }) => {
  return (
    <Link href={`/tags/${name}/${id}`}>
      <div className="rounded-3xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mx-0.5 sm:mx-2 mb-6 p-4 hover:cursor-pointer">
        <div className="flex flex-col justify-start">
          <p className="my-3 text-left text-3xl font-semibold">
            <span className="text-sm"> # </span>
            {name}
          </p>
          <div className="flex items-center text-sm text-green-500">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
            </svg>
            <span> {questionCount} </span>
            <span className="ml-2 text-gray-400">
              {' '}
              Question{questionCount > 1 && 's'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;

