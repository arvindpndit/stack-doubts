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
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <TagsPage searchParams={query} />
    </div>
  );
};

export default page;

