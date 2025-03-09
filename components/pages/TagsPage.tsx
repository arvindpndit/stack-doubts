import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import QuestionCard from '../partials/QuestionCard';
import LocalSearchBar from '../common/LocalSearchBar';
import TagCard from '../common/TagCard';
import { getAllTags, getSearchTags } from '@/lib/actions/tag.action';

interface Props {
  searchParams: string | undefined;
}

const TagsPage = async ({ searchParams }: Props) => {
  if (searchParams === undefined) {
    var tags = await getAllTags();
  } else {
    var tags = await getSearchTags(searchParams);
  }

  return (
    <div className="pb-24">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mx-1">All #tags</h1>
      </div>
      <LocalSearchBar placeholder="Search tags..." />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
        {tags?.map((tag) => (
          <TagCard
            key={tag._id}
            name={tag.name}
            questionCount={tag.questionCount}
            id={tag._id}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsPage;

