import MainContainer from "@/components/layout/MainContainer";

export default function Home({ searchParams }: any) {
  const searchQuestionQuery = searchParams.query;
  return <MainContainer searchQuestionQuery={searchQuestionQuery} />;
}
