import CollectionsPage from '@/components/pages/CollectionsPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Collections | Stack Doubts',
  description:
    'Explore curated collections of programming questions, tutorials, and tips to enhance your skills on Stack Doubts.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: PageProps) => {
  const searchQuestionQuery = (await searchParams).query as string | undefined;
  const pageParam = (await searchParams).page as string | undefined;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <CollectionsPage searchQuestionQuery={searchQuestionQuery} page={page} />
    </div>
  );
};

export default page;

