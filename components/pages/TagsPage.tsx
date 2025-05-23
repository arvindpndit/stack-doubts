import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import QuestionCard from '../partials/QuestionCard';
import LocalSearchBar from '../common/LocalSearchBar';
import TagCard from '../common/TagCard';
import { getAllTags, getSearchTags } from '@/lib/actions/tag.action';
import AppPagination from '../common/AppPagination';
import PageHeader from '../common/PageHeader';

interface Props {
  searchParams: string | undefined;
  page?: number;
}

const TagsPage = async ({ searchParams, page = 1 }: Props) => {
  let tags, totalPages;
  if (searchParams === undefined) {
    ({ tags, totalPages } = await getAllTags(page));
  } else {
    ({ tags, totalPages } = await getSearchTags(searchParams, page));
  }

  return (
    <div className="pb-20">
      <PageHeader
        introBadgeText="🏷️ Browse Topics"
        titleText="Explore Tags"
        subTitleText="Find questions grouped by technology, concept, or category."
        searchBarPlaceholder="Search tags..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-8">
        {tags?.map((tag) => (
          <TagCard
            key={tag._id}
            name={tag.name}
            questionCount={tag.questionCount}
            id={tag._id}
          />
        ))}
      </div>

      {/* Pagination */}
      <AppPagination
        searchParams={searchParams}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TagsPage;

