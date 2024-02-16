import React from "react";

import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import LocalSearchBar from "../common/LocalSearchBar";
LocalSearchBar;

const CommunityPage = async () => {
  const users = await getAllUsers();
  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <h1 className="font-bold text-3xl">All Users</h1>

      <LocalSearchBar placeholder="Search amazing minds here..." />

      <div className="mt-8 mb-16 md:mb-10 grid grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <Link
            href={`/profile/${user._id}`}
            key={user.clerkId}
            className="bg-white p-4 "
          >
            <img
              src={user.picture}
              alt={user.name}
              className="w-40 object-cover rounded-full mb-4 mx-auto"
            />
            <div className="text-2xl font-semibold mb-2 text-center">
              {user.name}
            </div>
            <div className="text-gray-500 text-center">@{user.username}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
