import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import searchIcon from "../../public/assets/icons/search.svg";

import devLogo from "../../public/assets/images/logo.png";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white h-20 flex items-center justify-between px-12">
      <Image src={devLogo} alt="devLogo" height={35} />
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search anything globally..."
          className="w-[600px] h-12 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="Search Icon"
          width={20}
          height={20}
          className="absolute right-2 top-3"
        />
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
