import QuestionDetailsPage from '@/components/pages/QuestionDetailsPage';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ key: 'clerkId', value: userId });

  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <QuestionDetailsPage
        id={id}
        mongoUserId={JSON.stringify(mongoUser?._id)}
      />
    </div>
  );
};

export default page;

