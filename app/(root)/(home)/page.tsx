import MainContainer from '@/components/layout/MainContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Stack Doubts',
  description:
    'Get answers to your programming questions on Stack Doubts - a community-driven platform for knowledge sharing and problem-solving.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const query = (await searchParams).query as string | undefined;
  return <MainContainer searchQuestionQuery={query} />;
}

