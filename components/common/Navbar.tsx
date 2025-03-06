import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { FaGithub } from 'react-icons/fa';

import logo from '../../public/assets/images/stack-logo.png';
import ThemeSwitcher from './ThemeSwitcher';
import GlobalSearchBar from './GlobalSearchBar';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 container fixed top-0 left-0 right-0  h-14 sm:h-20 flex items-center gap-4 justify-between px-1 md:px-2 z-50 ">
      <div className=" flex items-center justify-center">
        <Image src={logo} alt="devLogo" className="h-9 sm:h-12 w-9 sm:w-12" />

        <div className="hidden sm:block ml-1 text-2xl font-bold">
          Stack <span className="text-orange-500">Doubts</span>
        </div>
      </div>
      <div className="relative"></div>
      {/* <div className="absolute top-full mt-2 w-full  flex justify-center items-center h-96 bg-gray-50 dark:bg-gray-700 rounded-3xl z-20 shadow-md"></div> */}
      <div className="flex items-center gap-3">
        <GlobalSearchBar placeholder="Search anything globally..." />
        <ThemeSwitcher />
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

