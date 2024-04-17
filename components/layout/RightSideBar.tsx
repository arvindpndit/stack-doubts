import React from "react";
import TopQuestions from "../partials/TopQuestions";
import PopularTags from "../partials/PopularTags";

const RightSideBar = () => {
  return (
    <div className="w-64 fixed top-24">
      <TopQuestions />
      <PopularTags />
    </div>
  );
};

export default RightSideBar;
