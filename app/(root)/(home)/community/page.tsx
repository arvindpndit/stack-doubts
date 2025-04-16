import CommunityPage from '@/components/pages/CommunityPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Stack Doubts',
  description:
    'Engage with fellow programmers, ask questions, share insights, and collaborate within the Stack Doubts community.',
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
      <CommunityPage searchParams={query} page={page} />
    </div>
  );
};

export default page;

