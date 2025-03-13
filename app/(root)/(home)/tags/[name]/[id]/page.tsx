import LocalSearchBar from '@/components/common/LocalSearchBar';
import QuestionCard from '@/components/partials/QuestionCard';

interface PageProps {
  params: Promise<{ id: string; name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { id, name } = await params;
  const searchQuestionQuery = (await searchParams).query as string | undefined;
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">#{name}</h1>
      </div>
      <LocalSearchBar placeholder={`Search ${name} questions...`} />
      <QuestionCard
        filter="questionsByTag"
        tagId={id}
        searchQuestionQuery={searchQuestionQuery}
      />
    </div>
  );
};

export default page;

