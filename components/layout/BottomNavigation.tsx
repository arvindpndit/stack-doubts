import React from 'react';

import SideBarMenuOption from '../partials/SideBarMenuOption';
import { sideBarMenuOptionList } from '@/utils/constants';

const BottomNavigation = () => {
  return (
    <div className="">
      <div className="flex justify-evenly p-3 z-30  border-t-[0.5px] border-gray-200  dark:border-gray-800">
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

