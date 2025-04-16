'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TbSearch } from 'react-icons/tb';

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
        params.set('query', term);
        params.set('page', '1');
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }
  }, 300);

  return (
    <div className="mt-4 w-full max-w-sm">
      <div className="relative">
        <input
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <TbSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
};

export default LocalSearchBar;

