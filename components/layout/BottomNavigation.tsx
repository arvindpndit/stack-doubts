import React from 'react';
import SideBarMenuOption from '../partials/SideBarMenuOption';
import { sideBarMenuOptionList } from '@/utils/constants';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-sm lg:hidden">
      <div className="flex justify-evenly items-center px-4 py-2">
        {sideBarMenuOptionList.map((item) => (
          <SideBarMenuOption
            key={item.link}
            menutitle={item.title}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;

