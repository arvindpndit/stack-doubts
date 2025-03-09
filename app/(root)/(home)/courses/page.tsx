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
    <div className="w-full lg:pr-8 mt-20 sm:mt-28 h-screen">
      <CoursesPage playlists={playlists} />
    </div>
  );
};

export default Courses;

