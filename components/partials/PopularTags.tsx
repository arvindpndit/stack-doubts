import React from "react";
import { popularTags } from "@/utils/constants";

const PopularTags = () => {
  return (
    <div>
      <h1 className="font-bold text-xl my-5">Popular Tags</h1>
      <div className="flex gap-3 flex-wrap">
        {popularTags.map((tag) => {
          return (
            <div className="text-orange-500 text-xs p-2 w-16 rounded-2xl border-orange-500 shadow-md">
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;
