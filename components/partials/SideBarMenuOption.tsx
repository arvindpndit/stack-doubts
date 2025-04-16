'use client';

import React from 'react';
import Link from 'next/link';
import {
  TbSmartHome,
  TbUsers,
  TbBooks,
  TbStar,
  TbBriefcase,
  TbTags,
  TbHelpCircle,
} from 'react-icons/tb';

interface SideBarMenuOptionProps {
  menutitle: string;
  link: string;
}

const SideBarMenuOption: React.FC<SideBarMenuOptionProps> = ({
  menutitle,
  link,
}) => {
  const IconComponent = getIconComponent(menutitle);

  return (
    <Link href={link}>
      <div className="group flex items-center gap-3 rounded-full p-2 lg:p-3 transition-all hover:bg-orange-500/90 hover:text-white text-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-orange-600 cursor-pointer w-fit">
        {IconComponent && (
          <IconComponent className="text-2xl transition-transform group-hover:scale-110" />
        )}
        <span className="hidden lg:block text-base font-medium">
          {menutitle}
        </span>
      </div>
    </Link>
  );
};

export const getIconComponent = (menutitle: string) => {
  switch (menutitle.toLowerCase()) {
    case 'home':
      return TbSmartHome;
    case 'community':
      return TbUsers;
    case 'courses':
      return TbBooks;
    case 'collections':
      return TbStar;
    case 'find jobs':
      return TbBriefcase;
    case 'tags':
      return TbTags;
    case 'ask a question':
      return TbHelpCircle;
    default:
      return null;
  }
};

export default SideBarMenuOption;

