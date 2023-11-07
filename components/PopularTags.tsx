import React from "react";

const PopularTags = () => {
  const popularTags: Array<string> = ["React", "Next", "CSS", "Redux", "Node"];
  return (
    <div>
      <h1 className="font-bold text-xl mt-5">Popular Tags</h1>
      {popularTags.map((tag) => {
        return (
          <div className="my-5 text-xs p-2 bg-blue-300 w-16 rounded-lg text-blue-800 shadow-md">
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default PopularTags;
