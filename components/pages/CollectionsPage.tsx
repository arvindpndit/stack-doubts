import React from "react";
import { getAllSavedQuestions, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import searchIcon from "../../public/assets/icons/search.svg";
import QuestionCard from "../partials/QuestionCard";
import LocalSearchBar from "../common/LocalSearchBar";

const CollectionsPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ key: "clerkId", value: userId });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Saved Questions</h1>
      </div>
      <LocalSearchBar placeholder="Search questions..." />
      <QuestionCard filter="savedQuestions" mongoUser={mongoUser} />
    </div>
  );
};

export default CollectionsPage;
