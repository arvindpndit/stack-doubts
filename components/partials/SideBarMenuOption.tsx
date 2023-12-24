import React from "react";
import Link from "next/link";
import {
  RiBriefcaseLine,
  RiCommunityLine,
  RiHashtag,
  RiFolderLine,
  RiHome2Line,
  RiQuestionLine,
} from "react-icons/ri";

interface SideBarMenuOptionProps {
  menutitle: string;
  link: string;
}

const SideBarMenuOption: React.FC<SideBarMenuOptionProps> = (props) => {
  const IconComponent = getIconComponent(props.menutitle);
  return (
    <Link href={props.link} className=" hover:bg-amber-100 md:p-3 rounded-lg">
      <div className="flex flex-col md:flex-row items-center  gap-2">
        <div className="text-3xl md:text-2xl">
          {IconComponent && <IconComponent />}
        </div>
        <div className="hidden md:block md:text-xl"> {props.menutitle}</div>
      </div>
    </Link>
  );
};

export const getIconComponent = (menutitle: string) => {
  switch (menutitle.toLowerCase()) {
    case "home":
      return RiHome2Line;
    case "community":
      return RiCommunityLine;
    case "collections":
      return RiFolderLine;
    case "find jobs":
      return RiBriefcaseLine;
    case "tags":
      return RiHashtag;
    case "ask a question":
      return RiQuestionLine;
    default:
      return null;
  }
};

export default SideBarMenuOption;
