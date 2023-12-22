import React from "react";
import TopQuestions from "../partials/TopQuestions";
import PopularTags from "../partials/PopularTags";

const RightSideBar = () => {
  return (
    <div className="fixed top-24">
      <TopQuestions />
      <PopularTags />
    </div>
  );
};

export default RightSideBar;
