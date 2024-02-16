"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import searchIcon from "../../public/assets/icons/search.svg";

interface localSearchBarProps {
  placeholder: string;
}

const LocalSearchBar = ({ placeholder }: localSearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  }, 300);

  return (
    <div className="relative flex items-center mt-6">
      <input
        className="w-full h-12 px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
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
