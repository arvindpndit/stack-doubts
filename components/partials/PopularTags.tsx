import React from 'react';
import { getPopularTags } from '@/lib/actions/tag.action';

const PopularTags = async () => {
  const popularTags = await getPopularTags();
  return (
    <div>
      <h1 className="font-bold text-xl my-5">Popular Tags</h1>
      <div className="flex gap-3 flex-wrap">
        {popularTags.map((tag) => {
          return (
            <div className="text-orange-500 text-xs px-3 py-1.5 rounded-full border-orange-500 shadow-md hover:cursor-pointer">
              {tag.name}
              <span className="ml-3 bg-orange-100 dark:bg-gray-700 px-2 rounded-full">
                {tag.questionCount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;

