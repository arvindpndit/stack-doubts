import React from 'react';
import Link from 'next/link';
import LocalSearchBar from '../common/LocalSearchBar';
import { TbPencil } from 'react-icons/tb';

interface PageHeaderProps {
  introBadgeText: string;
  titleText: string;
  subTitleText: string;
  searchBarPlaceholder?: string;
  showBtn?: boolean;
  showSearchBar?: boolean;
}

const PageHeader = ({
  introBadgeText,
  titleText,
  subTitleText,
  searchBarPlaceholder,
  showSearchBar = true,
  showBtn = true,
}: PageHeaderProps) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 my-6 md:my-10">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-400 via-pink-300 to-purple-400 pointer-events-none z-0 rounded-3xl" />
      <div className="z-10">
        <span className="inline-block text-xs text-orange-500 font-semibold uppercase tracking-wide mb-1">
          {introBadgeText}
        </span>

        <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
          {titleText}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          {subTitleText}
        </p>

        {showSearchBar && (
          <div className="mt-4">
            <LocalSearchBar
              placeholder={
                searchBarPlaceholder ? searchBarPlaceholder : 'Search...'
              }
            />
          </div>
        )}
      </div>
      {showBtn && (
        <div className="z-10 self-start md:self-center justify-self-start md:justify-self-end">
          <Link
            href="/ask-question"
            className="group flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-semibold rounded-full text-sm px-6 py-3 hover:shadow-lg w-max"
          >
            <TbPencil className="text-lg group-hover:animate-bounce" />
            Ask a question
          </Link>
        </div>
      )}
    </div>
  );
};

export default PageHeader;

