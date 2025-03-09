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

const SideBarMenuOption: React.FC<SideBarMenuOptionProps> = (props) => {
  const IconComponent = getIconComponent(props.menutitle);
  return (
    <Link
      href={props.link}
      className="hover:text-white hover:bg-orange-500 w-fit transition-all overflow-hidden md:p-3 rounded-full"
    >
      <div className="flex flex-col lg:flex-row items-center gap-3">
        <div className="text-2xl font-bold p-2 md:p-0">
          {IconComponent && <IconComponent />}
        </div>
        <div className="hidden lg:block md:text-xl">{props.menutitle}</div>
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

