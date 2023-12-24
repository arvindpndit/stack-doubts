import Image from "next/image";
import React from "react";

import searchIcon from "../../public/assets/icons/search.svg";
import { getAllUsers } from "@/lib/actions/user.action";

const CommunityPage = async () => {
  const users = await getAllUsers();
  //console.log("all users are - " + users);
  return (
    <div className="w-full px-1   md:px-8 mt-28 h-screen">
      <h1 className="font-bold text-3xl">All Users</h1>

      <div className="relative flex items-center mt-6">
        <input
          type="text"
          placeholder="Search amazing minds here..."
          className="w-full h-12 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="Search Icon"
          width={20}
          height={20}
          className="absolute right-2 top-3 cursor-pointer "
        />
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.clerkId} className="bg-white p-4 ">
            <img
              src={user.picture}
              alt={user.name}
              className="w-40 object-cover rounded-full mb-4 mx-auto"
            />
            <div className="text-2xl font-semibold mb-2 text-center">
              {user.name}
            </div>
            <div className="text-gray-500 text-center">@{user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
