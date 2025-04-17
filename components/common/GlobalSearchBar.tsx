'use client';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import searchIcon from '../../public/assets/icons/search.svg';
import { FaSearch } from 'react-icons/fa';
import { TbEye, TbHash, TbMessageCircle, TbSearch, TbX } from 'react-icons/tb';
import { useEffect, useRef, useState } from 'react';
import { getGlobalSearchResult } from '@/lib/actions/global.action';
import Link from 'next/link';
import GlobalSearchEmptyState from './GlobalSearchEmptyState';

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
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       searchRef.current &&
  //       !searchRef.current.contains(event.target as Node)
  //     ) {
  //       const params = new URLSearchParams(searchParams); // Get latest params
  //       params.delete('global'); // Remove 'global' param
  //       replace(`${pathname}?${params.toString()}`); // Update URL
  //       setShowResultContainer(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  useEffect(() => {
    if (showResultContainer) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden'); // clean up on unmount
    };
  }, [showResultContainer]);

  return (
    <div className=" sm:flex flex-col items-center">
      {/* fake search bar */}
      <TbSearch
        className="block md:hidden text-2xl cursor-pointer "
        onClick={() => setShowResultContainer(true)}
      />
      <div
        className="hidden md:block w-full max-w-sm"
        onClick={() => setShowResultContainer(true)}
      >
        <div className="relative">
          <input
            placeholder={placeholder}
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <TbSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      {showResultContainer && (
        <>
          <div className="fixed inset-0 bg-white dark:bg-gray-900  z-0"></div>
          <div className="absolute top-1 md:-top-1 left-1/2 transform -translate-x-1/2 w-full lg:w-2/3 max-h-screen overflow-y-auto z-50 shadow-lg p-2 no-scrollbar ">
            <div className="w-full ">
              <div className="relative flex gap-4">
                <input
                  placeholder={placeholder}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowResultContainer(true)}
                  defaultValue={searchQuery}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 md:py-3.5 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <TbSearch className="absolute left-3  top-3.5 md:top-4 text-gray-500 dark:text-gray-400" />
                <button
                  onClick={() => setShowResultContainer(false)}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-5 rounded-2xl  transition-all duration-200 "
                  aria-label="Close Search"
                >
                  <TbX size={20} className="font-bold" />
                </button>
              </div>
            </div>

            <div className="pb-36 md:pb-10">
              {result.questions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 mt-5 rounded-xl px-2 py-1">
                    Matching Questions
                  </h3>
                  {result.questions.map((question) => (
                    <Link
                      key={question._id}
                      onClick={() => setShowResultContainer(false)}
                      href={`/question-details/${question._id}`}
                    >
                      <div className="mb-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl cursor-pointer transition-colors border border-gray-200 dark:border-gray-700 hover:border-orange-500 ">
                        <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                          {question.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <div className="mr-2 flex gap-1">
                            <TbEye className="text-sm" /> {question.views}{' '}
                            <span>View</span>
                          </div>
                          <div className="mr-2 flex gap-1">
                            <TbMessageCircle className="text-sm" />
                            {question.answers.length} Answers
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {result.users.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 rounded-xl px-2 py-1">
                    Matching Users
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {' '}
                    {result.users.map((user) => (
                      <Link
                        key={user.clerkId}
                        onClick={() => setShowResultContainer(false)}
                        href={`/profile/${user._id}`}
                      >
                        <div
                          key={user._id}
                          className="flex items-center mb-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl cursor-pointer transition-colors  border border-gray-200 dark:border-gray-700 hover:border-orange-500"
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
                </div>
              )}

              {result.tags.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200  rounded-xl px-2 py-1">
                    Matching Tags
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.tags.map((tag) => (
                      <Link
                        key={tag._id}
                        onClick={() => setShowResultContainer(false)}
                        href={`/tags/${tag.name}/${tag._id}`}
                      >
                        <div
                          key={tag._id}
                          className="flex items-center mb-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl cursor-pointer transition-colors  border border-gray-200 dark:border-gray-700 hover:border-orange-500"
                        >
                          <div className="w-8 h-8 flex justify-center items-center rounded-full mr-3  bg-gray-100 dark:bg-gray-700">
                            <TbHash />
                          </div>
                          <div>
                            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                              {tag.name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {result.questions.length === 0 &&
                result.users.length === 0 &&
                result.tags.length === 0 && <GlobalSearchEmptyState />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearchBar;

