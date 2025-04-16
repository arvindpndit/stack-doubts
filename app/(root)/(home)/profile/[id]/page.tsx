import ProfileHeader from '@/components/partials/ProfileHeader';
import ToggleUserQuestions from '@/components/partials/ToggleUserQuestions';
import QuestionCard from '@/components/partials/QuestionCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Profile = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <ProfileHeader authorId={id} />
      <ToggleUserQuestions
        questionsAsked={
          <QuestionCard filter="questionAskedByAuthor" mongoUser={id} />
        }
        answersGiven={
          <QuestionCard filter="questionsAnsweredByAuthor" mongoUser={id} />
        }
      ></ToggleUserQuestions>
    </div>
  );
};

export default Profile;

