import React from "react";
import Link from "next/link";

interface SideBarMenuOptionProps {
  menutitle: string;
}

const SideBarMenuOption: React.FC<SideBarMenuOptionProps> = (props) => {
  return (
    <Link
      href="/tags"
      className=" hover:bg-green-300 p-3 rounded-lg text-lg font-medium"
    >
      {props.menutitle}
    </Link>
  );
};

export default SideBarMenuOption;
