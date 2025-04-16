import {
  getAllQuestions,
  getQuestionsByAuthorId,
  getSearchQuestions,
  getSearchTagQuestions,
  questionsAnsweredByAuthor,
} from '@/lib/actions/question.action';
import { getAllSavedQuestions, getUserById } from '@/lib/actions/user.action';
import Link from 'next/link';
import {
  TbClockHour2,
  TbEye,
  TbMessageCircle,
  TbThumbUp,
} from 'react-icons/tb';
import { getQuestionsbyTag } from '@/lib/actions/question.action';
import { timeAgo, truncateText } from '@/utils/data-manipulation';
import AppPagination from '../common/AppPagination';

interface QuestionCardProps {
  searchQuestionQuery?: string | undefined;
  filter?: string;
  mongoUser?: any;
  tagId?: string | undefined;
  page?: number;
  showPagination?: boolean;
}

const QuestionCard = async (params: QuestionCardProps) => {
  const {
    filter,
    mongoUser,
    searchQuestionQuery,
    tagId,
    page,
    showPagination = false,
  } = params;

  let questions, totalPages;

  switch (filter) {
    case 'savedQuestions':
      ({ questions, totalPages } = await getAllSavedQuestions({
        mongoUser,
        searchQuestionQuery,
        page,
      }));
      break;
    case 'questionAskedByAuthor':
      ({ questions } = await getQuestionsByAuthorId(mongoUser));
      break;
    case 'questionsAnsweredByAuthor':
      ({ questions } = await questionsAnsweredByAuthor(mongoUser));
      break;
    case 'questionsByTag':
      ({ questions, totalPages } =
        searchQuestionQuery === undefined
          ? await getQuestionsbyTag(tagId, page)
          : await getSearchTagQuestions(tagId, searchQuestionQuery, page));
      break;
    default:
      ({ questions, totalPages } =
        searchQuestionQuery === undefined
          ? await getAllQuestions(page)
          : await getSearchQuestions(searchQuestionQuery, page));
  }

  return (
    <div className="mt-8 pb-16 md:pb-10 mb-16 md:mb-10">
      {questions?.reverse().map(async (question, index) => (
        <Link key={index} href={`/question-details/${question._id}`}>
          <div className="group bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 my-6 transition-all hover:shadow-lg hover:border-orange-400 cursor-pointer">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              {truncateText(question.title, 60)}
            </h1>

            <div className="flex flex-wrap gap-2 mt-3">
              {question?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-orange-50 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium"
                >
                  {/* @ts-expect-error fix later */}
                  {tag?.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col mt-5 gap-4">
              {/* Author & Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={question?.author?.picture}
                    alt={`Profile of ${question?.author?.name}`}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {question?.author?.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <TbClockHour2 className="text-base" />
                  <span>Asked {timeAgo(question?.createdAt)}</span>
                </div>
              </div>

              {/* Stats: Votes, Answers, Views */}
              <div className="flex items-center gap-6 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <TbThumbUp className="text-sm" />
                  <span>{question?.upvotes?.length} Votes</span>
                </div>
                <div className="flex items-center gap-1">
                  <TbMessageCircle className="text-sm" />
                  <span>{question?.answers?.length} Answers</span>
                </div>
                <div className="flex items-center gap-1">
                  <TbEye className="text-sm" />
                  <span>{question?.views} Views</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {showPagination && (
        <div className="mb-3">
          <AppPagination
            searchParams={searchQuestionQuery}
            page={page ?? 1}
            totalPages={totalPages ?? 0}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;

