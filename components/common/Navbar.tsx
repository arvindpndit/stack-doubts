import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import searchIcon from "../../public/assets/icons/search.svg";
import { FaGithub } from "react-icons/fa";

import logo from "../../public/assets/icons/logo.png";
import devLogo2 from "../../public/assets/images/logo2.png";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white h-20 flex items-center gap-4 justify-between px-1 md:px-2 z-50">
      <div className=" flex items-center justify-center">
        <Image src={logo} alt="devLogo" className="h-12 w-12" />

        <div className="hidden lg:block text-3xl font-bold">
          Stack <span className="text-orange-500">Doubts</span>
        </div>
      </div>

      <div className="hidden sm:flex relative  items-center w-1/2">
        <input
          type="text"
          placeholder="Search anything globally..."
          className="block w-full h-12 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-300 focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="Search Icon"
          width={20}
          height={20}
          className="absolute right-2 top-3"
        />
      </div>
      <div className="flex gap-3">
        <a
          href="https://github.com/arvindpndit/stack-overflow-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl"
        >
          <FaGithub />
        </a>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
