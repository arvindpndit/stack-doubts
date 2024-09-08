import AskQuestionForm from '@/components/forms/AskQuestionForm';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ask a Question | Stack Doubts',
  description:
    'Ask programming-related questions and receive expert answers from the knowledgeable community at Stack Doubts.',
};

const Ask = async () => {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ key: 'clerkId', value: userId });

  return (
    <div className="w-full px-1 lg:pr-8 mt-28  h-screen">
      <h1 className="font-bold text-3xl">Ask a question</h1>
      <AskQuestionForm mongoUserId={JSON.stringify(mongoUser?._id)} />
    </div>
  );
};

export default Ask;

