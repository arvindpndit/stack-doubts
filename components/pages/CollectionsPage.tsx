import React from "react";
import { getAllSavedQuestions, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import searchIcon from "../../public/assets/icons/search.svg";
import QuestionCard from "../partials/QuestionCard";

const CollectionsPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ key: "clerkId", value: userId });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Saved Questions</h1>
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
      <QuestionCard filter="savedQuestions" mongoUser={mongoUser} />
    </div>
  );
};

export default CollectionsPage;
