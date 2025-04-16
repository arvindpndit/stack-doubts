import PageHeader from '@/components/common/PageHeader';
import AskQuestionForm from '@/components/forms/AskQuestionForm';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ask a Question | Stack Doubts',
  description:
    'Ask programming-related questions and receive expert answers from the knowledgeable community at Stack Doubts.',
};

const Ask = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ key: 'clerkId', value: userId });

  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <PageHeader
        introBadgeText="💬 Ask Away"
        titleText="Post a New Question"
        subTitleText="Describe your issue and get guidance from the dev community."
        searchBarPlaceholder="Search existing questions first..."
        showBtn={false}
        showSearchBar={false}
      />

      <AskQuestionForm mongoUserId={JSON.stringify(mongoUser?._id)} />
    </div>
  );
};

export default Ask;

