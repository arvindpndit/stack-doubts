import PageHeader from '@/components/common/PageHeader';
import CoursesPage from '@/components/pages/CoursesPage';
import getYoutubePlaylists from '@/lib/actions/course.action';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses | Stack Doubts',
  description:
    'Browse through programming courses and resources on Stack Doubts.',
};

const Courses = async () => {
  const playlists = await getYoutubePlaylists();
  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <PageHeader
        introBadgeText="📚 Enhance Your Skills"
        titleText="Dev Courses"
        subTitleText="Jump into coding with courses made for all skill levels."
        searchBarPlaceholder="Find a course..."
        showSearchBar={false}
      />
      <CoursesPage playlists={playlists} />
    </div>
  );
};

export default Courses;
export const dynamic = 'force-static'; //static page

