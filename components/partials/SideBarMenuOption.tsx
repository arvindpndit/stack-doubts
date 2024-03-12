import React from "react";
import Link from "next/link";
import { TbSmartHome, TbHash, TbBriefcase } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface SideBarMenuOptionProps {
  menutitle: string;
  link: string;
}

const SideBarMenuOption: React.FC<SideBarMenuOptionProps> = (props) => {
  const IconComponent = getIconComponent(props.menutitle);
  return (
    <Link
      href={props.link}
      className="hover:text-white hover:bg-orange-500  md:p-3 rounded-2xl"
    >
      <div className="flex flex-col lg:flex-row items-center  gap-5 ">
        <div className="text-3xl lg:text-2xl">
          {IconComponent && <IconComponent />}
        </div>
        <div className="hidden lg:block md:text-xl"> {props.menutitle}</div>
      </div>
    </Link>
  );
};

export const getIconComponent = (menutitle: string) => {
  switch (menutitle.toLowerCase()) {
    case "home":
      return TbSmartHome;
    case "community":
      return MdPeopleOutline;
    case "collections":
      return FaRegStar;
    case "find jobs":
      return TbBriefcase;
    case "tags":
      return TbHash;
    case "ask a question":
      return AiOutlineQuestionCircle;
    default:
      return null;
  }
};

export default SideBarMenuOption;
