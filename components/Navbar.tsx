import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import devLogo from "../public/assets/images/logo-light.svg";

const Navbar: React.FC = () => {
  return (
    <div className="h-20 background-light800_dark300 flex flex-row justify-between items-center px-12">
      <Image src={devLogo} alt="devLogo" />
      <div>Search bar</div>
      <UserButton />
    </div>
  );
};

export default Navbar;
