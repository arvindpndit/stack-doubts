import TagsPage from '@/components/pages/TagsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags | Stack Doubts',
  description:
    'Browse and explore various programming tags to find relevant discussions, solutions, and expert insights on Stack Doubts.',
};

const page = ({ searchParams }: any) => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <TagsPage searchParams={searchParams.query} />
    </div>
  );
};

export default page;

