'use client';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import searchIcon from '../../public/assets/icons/search.svg';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { getGlobalSearchResult } from '@/lib/actions/global.action';
import Link from 'next/link';

interface GlobalSearchBarProps {
  placeholder: string;
}

const GlobalSearchBar = ({ placeholder }: GlobalSearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [showResultContainer, setShowResultContainer] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchQuery = searchParams.get('global')?.toString() || '';

  // Define type for search results
  interface SearchResults {
    questions: any[];
    users: any[];
    tags: any[];
  }

  const [result, setResult] = useState<SearchResults>({
    questions: [],
    users: [],
    tags: [],
  });

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('global', term);
    } else {
      params.delete('global');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const getResults = async (query: string) => {
    if (!query) {
      setResult({ questions: [], users: [], tags: [] }); // Reset results on empty query
      return;
    }
    try {
      const searchResults = await getGlobalSearchResult(query);
      setResult(searchResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getResults(searchQuery);
    } else {
      setResult({ questions: [], users: [], tags: [] });
    }
  }, [searchQuery]);

  // Close result container when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        const params = new URLSearchParams(searchParams); // Get latest params
        params.delete('global'); // Remove 'global' param
        replace(`${pathname}?${params.toString()}`); // Update URL
        setShowResultContainer(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className=" sm:flex flex-col items-center">
      {/* fake search bar */}
      <div className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-full border border-gray-300 h-10 dark:border-gray-600 ">
        <div
          className="hidden md:block ml-4 focus:outline-none text-gray-500 text-sm"
          onClick={() => setShowResultContainer(true)}
        >
          Search anything globally...
        </div>
        <FaSearch
          onClick={() => setShowResultContainer(true)}
          className="text-gray-500 text-xl mx-4 cursor-pointer"
        />
      </div>

      {showResultContainer && (
        <>
          <div
            onClick={() => setShowResultContainer(false)}
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-0"
          ></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full lg:w-2/3 max-h-[550px] overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-3xl z-50 shadow-lg border border-gray-100 dark:border-gray-700 p-4 no-scrollbar">
            <div className="w-full flex items-center relative">
              <input
                className="w-full h-12 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowResultContainer(true)}
                defaultValue={searchQuery}
                //value={searchQuery}
              />
              <Image
                src={searchIcon}
                alt="Search Icon"
                width={20}
                height={20}
                className="absolute right-3 top-3 cursor-pointer"
              />
            </div>
            {result.questions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 mt-5">
                  Questions
                </h3>
                {result.questions.map((question) => (
                  <Link
                    key={question._id}
                    href={`/question-details/${question._id}`}
                    onClick={() => setShowResultContainer(false)}
                  >
                    <div className="mb-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-3xl cursor-pointer transition-colors">
                      <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                        {question.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {question.content
                          ? question.content
                              .replace(/<[^>]*>/g, '')
                              .substring(0, 150) + '...'
                          : 'No description available'}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="mr-2">Views: {question.views}</span>
                        <span>Answers: {question.answers.length}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {result.users.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Users
                </h3>
                {result.users.map((user) => (
                  <Link
                    key={user.clerkId}
                    href={`/profile/${user._id}`}
                    onClick={() => setShowResultContainer(false)}
                  >
                    <div
                      key={user._id}
                      className="flex items-center mb-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-3xl cursor-pointer transition-colors"
                    >
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                          {user.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {result.tags.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Tags
                </h3>
                {result.tags.map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/tags/${tag.name}/${tag._id}`}
                    onClick={() => setShowResultContainer(false)}
                  >
                    <div className="inline-block mr-2 mb-2">
                      <span className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs">
                        {tag.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {result.questions.length === 0 &&
              result.users.length === 0 &&
              result.tags.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No results found
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearchBar;

