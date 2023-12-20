import QuestionDetailsPage from "@/components/QuestionDetailsPage";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full px-8 mt-28 h-screen">
      <QuestionDetailsPage id={params.id} />
    </div>
  );
};

export default page;
