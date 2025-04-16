import React from 'react';
import { getPopularTags } from '@/lib/actions/tag.action';
import Link from 'next/link';

const PopularTags = async () => {
  const popularTags = await getPopularTags();
  return (
    <div>
      <h1 className="font-bold text-xl my-5">Popular Tags</h1>
      <div className="flex gap-3 flex-wrap">
        {popularTags.map((tag) => {
          return (
            <Link href={`/tags/${tag.name}/${tag._id}`} key={tag._id}>
              <div className=" bg-orange-100 dark:bg-gray-700 rounded-full  text-xs px-3 py-1.5 rounded-ful shadow-sm hover:cursor-pointer">
                {tag.name}
                <span className="ml-3 bg-orange-50 dark:bg-gray-800 px-2 rounded-full">
                  {tag.questionCount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;

