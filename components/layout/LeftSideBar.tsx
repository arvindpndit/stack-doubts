import React from "react";

import SideBarMenuOption from "../partials/SideBarMenuOption";
import { sideBarMenuOptionList } from "@/utils/constants";

const LeftSideBar = () => {
  return (
    <div className="h-screen fixed top-24">
      <div className="flex flex-col space-y-4 mt-5">
        {sideBarMenuOptionList.map((item) => {
          return (
            <SideBarMenuOption
              menutitle={item.title}
              link={item.link}
              key={item.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideBar;
