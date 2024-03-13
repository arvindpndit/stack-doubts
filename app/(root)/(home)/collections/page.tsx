import CollectionsPage from "@/components/pages/CollectionsPage";
import React from "react";

const page = async ({ searchParams }: any) => {
  const searchQuestionQuery = searchParams.query;
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <CollectionsPage searchQuestionQuery={searchQuestionQuery} />
    </div>
  );
};

export default page;
