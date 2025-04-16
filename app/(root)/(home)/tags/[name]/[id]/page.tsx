import LocalSearchBar from '@/components/common/LocalSearchBar';
import PageHeader from '@/components/common/PageHeader';
import QuestionCard from '@/components/partials/QuestionCard';

interface PageProps {
  params: Promise<{ id: string; name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { id, name } = await params;
  const searchQuestionQuery = (await searchParams).query as string | undefined;
  const pageParam = (await searchParams).page as string | undefined;
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  return (
    <div className="w-full px-2 lg:pr-8 mt-20 sm:mt-28 md:mt-24 h-screen">
      <PageHeader
        introBadgeText={`🧩 Tag: ${name}`}
        titleText={`${name} Questions`}
        subTitleText={`Explore all questions tagged with ${name}. Learn, contribute, or ask your own.`}
        searchBarPlaceholder={`Search in ${name}...`}
      />

      <QuestionCard
        filter="questionsByTag"
        tagId={id}
        searchQuestionQuery={searchQuestionQuery}
        showPagination={true}
        page={page}
      />
    </div>
  );
};

export default page;

