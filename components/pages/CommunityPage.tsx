import React from 'react';

import { getAllUsers, getSearchUsers } from '@/lib/actions/user.action';
import Link from 'next/link';
import LocalSearchBar from '../common/LocalSearchBar';

interface Props {
  searchParams: string | undefined;
}

const CommunityPage = async ({ searchParams }: Props) => {
  if (searchParams === undefined) {
    var users = await getAllUsers();
  } else {
    var users = await getSearchUsers(searchParams);
  }
  return (
    <div>
      <h1 className="font-bold text-3xl">All Users</h1>

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
            <div className="text-2xl font-semibold mb-2 text-center">
              {user.name}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-center">
              @{user.username}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;

