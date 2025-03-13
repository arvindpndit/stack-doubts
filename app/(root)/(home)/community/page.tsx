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
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <CommunityPage searchParams={query} />
    </div>
  );
};

export default page;

