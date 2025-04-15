import React from 'react';

import { getAllUsers, getSearchUsers } from '@/lib/actions/user.action';
import Link from 'next/link';
import LocalSearchBar from '../common/LocalSearchBar';
import AppPagination from '../common/AppPagination';

interface Props {
  searchParams: string | undefined;
  page?: number;
}

const CommunityPage = async ({ searchParams, page = 1 }: Props) => {
  let users, totalPages;

  if (searchParams === undefined) {
    ({ users, totalPages } = await getAllUsers(page));
  } else {
    ({ users, totalPages } = await getSearchUsers(searchParams, page));
  }
  return (
    <div className="overflow-hidden">
      <h1 className="font-bold text-3xl mx-1">All Users</h1>

      <LocalSearchBar placeholder="Search amazing minds here..." />

      <div className="mt-8 pb-16 md:pb-10 grid grid-cols-2 lg:grid-cols-3 gap-8">
        {users?.map((user) => (
          <Link
            href={`/profile/${user._id}`}
            key={user.clerkId}
            className=" p-4 "
          >
            <img
              src={user.picture}
              alt={user.name}
              className="w-40 object-cover rounded-full mb-4 mx-auto"
            />
            <div className="text-sm sm:text-xl truncate font-semibold mb-2 text-center">
              {user.name}
            </div>
            <div className="text-xs sm:text-lg text-gray-500 dark:text-gray-400 text-center ">
              @{user.username}
            </div>
          </Link>
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

export default CommunityPage;

