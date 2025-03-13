import QuestionDetailsPage from '@/components/pages/QuestionDetailsPage';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ key: 'clerkId', value: userId });

  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <QuestionDetailsPage
        id={params.id}
        mongoUserId={JSON.stringify(mongoUser?._id)}
      />
    </div>
  );
};

export default page;

