import TagsPage from '@/components/pages/TagsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags | Stack Doubts',
  description:
    'Browse and explore various programming tags to find relevant discussions, solutions, and expert insights on Stack Doubts.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: PageProps) => {
  const query = (await searchParams).query as string | undefined;
  const pageParam = (await searchParams).page as string | undefined;
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <TagsPage searchParams={query} page={page} />
    </div>
  );
};

export default page;

