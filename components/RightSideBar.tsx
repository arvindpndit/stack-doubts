import React from "react";
import TopQuestions from "./TopQuestions";
import PopularTags from "./PopularTags";

const RightSideBar = () => {
  return (
    <div className="fixed top-24">
      <TopQuestions />
      <PopularTags />
    </div>
  );
};

export default RightSideBar;
