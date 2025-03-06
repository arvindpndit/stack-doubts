import MainContainer from '@/components/layout/MainContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Stack Doubts',
  description:
    'Get answers to your programming questions on Stack Doubts - a community-driven platform for knowledge sharing and problem-solving.',
};

export default function Home({ searchParams }: any) {
  const searchQuestionQuery = searchParams.query;
  return <MainContainer searchQuestionQuery={searchQuestionQuery} />;
}

