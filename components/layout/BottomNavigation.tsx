import React from "react";

import SideBarMenuOption from "../partials/SideBarMenuOption";
import { sideBarMenuOptionList } from "@/utils/constants";

const BottomNavigation = () => {
  return (
    <div className="">
      <div className="flex justify-evenly p-3">
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

export default BottomNavigation;
