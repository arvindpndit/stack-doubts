import LocalSearchBar from '@/components/common/LocalSearchBar';
import QuestionCard from '@/components/partials/QuestionCard';

const page = async ({ params }: { params: { id: string; name: string } }) => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">#{params.name}</h1>
      </div>
      <LocalSearchBar placeholder="Search questions..." />
      <QuestionCard filter="questionsByTag" tagId={params.id} />
    </div>
  );
};

export default page;

