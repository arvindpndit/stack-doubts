import React from "react";

import SideBarMenuOption from "./SideBarMenuOption";
import { sideBarMenuOptionList } from "@/utils/constants";

const LeftSideBar = () => {
  return (
    <div className="bg-slate-50 w-2/12 h-screen p-6">
      <div className="flex flex-col space-y-4">
        {sideBarMenuOptionList.map((item) => {
          return <SideBarMenuOption menutitle={item} />;
        })}
      </div>
    </div>
  );
};

export default LeftSideBar;
