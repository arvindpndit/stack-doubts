import Image from "next/image";
import searchIcon from "../../public/assets/icons/search.svg";
import React from "react";

interface localSearchBarProps {
  placeholder: string;
}

const LocalSearchBar = ({ placeholder }: localSearchBarProps) => {
  return (
    <div className="relative flex items-center mt-6">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-12 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
      />
      <Image
        src={searchIcon}
        alt="Search Icon"
        width={20}
        height={20}
        className="absolute right-2 top-3 cursor-pointer "
      />
    </div>
  );
};

export default LocalSearchBar;
