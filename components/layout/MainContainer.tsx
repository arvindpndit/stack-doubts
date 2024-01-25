import React from "react";
import Image from "next/image";
import searchIcon from "../../public/assets/icons/search.svg";
import QuestionCard from "../partials/QuestionCard";
import Link from "next/link";

const MainContainer = () => {
  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">All questions</h1>
        <Link
          href="/ask-question"
          type="button"
          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-3 text-center  mb-2"
        >
          Ask a question
        </Link>
      </div>

      <div className="relative flex items-center mt-6">
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full h-12 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="Search Icon"
          width={20}
          height={20}
          className="absolute right-2 top-3"
        />
      </div>

      <QuestionCard />
    </div>
  );
};

export default MainContainer;
