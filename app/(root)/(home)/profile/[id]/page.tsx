import ProfileHeader from '@/components/partials/ProfileHeader';
import ToggleUserQuestions from '@/components/partials/ToggleUserQuestions';
import QuestionCard from '@/components/partials/QuestionCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Profile = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 mb-24 lg:mb-14 h-screen">
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

