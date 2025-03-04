import LocalSearchBar from '@/components/common/LocalSearchBar';
import QuestionCard from '@/components/partials/QuestionCard';

interface Props {
  params: {
    id: string;
    name: string;
  };
  searchParams: any;
}
const page = async ({ params, searchParams }: Props) => {
  const searchQuestionQuery = searchParams.query;
  console.log(searchQuestionQuery);
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">#{params.name}</h1>
      </div>
      <LocalSearchBar placeholder={`Search ${params.name} questions...`} />
      <QuestionCard
        filter="questionsByTag"
        tagId={params.id}
        searchQuestionQuery={searchQuestionQuery}
      />
    </div>
  );
};

export default page;

