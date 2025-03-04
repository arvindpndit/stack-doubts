import {
  getAllQuestions,
  getQuestionsByAuthorId,
  getSearchQuestions,
  getSearchTagQuestions,
  questionsAnsweredByAuthor,
} from '@/lib/actions/question.action';
import { getAllSavedQuestions, getUserById } from '@/lib/actions/user.action';
import Link from 'next/link';
import { CiClock2 } from 'react-icons/ci';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FiMessageSquare } from 'react-icons/fi';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { getQuestionsbyTag } from '@/lib/actions/question.action';

interface QuestionCardProps {
  searchQuestionQuery?: string | undefined;
  filter?: string;
  mongoUser?: any;
  tagId?: string | undefined;
}

const QuestionCard = async (params: QuestionCardProps) => {
  const { filter, mongoUser, searchQuestionQuery, tagId } = params;

  let questions;

  switch (filter) {
    case 'savedQuestions':
      questions = await getAllSavedQuestions({
        mongoUser,
        searchQuestionQuery,
      });
      break;
    case 'questionAskedByAuthor':
      ({ questions } = await getQuestionsByAuthorId(mongoUser));
      break;
    case 'questionsAnsweredByAuthor':
      ({ questions } = await questionsAnsweredByAuthor(mongoUser));
      break;
    case 'questionsByTag':
      questions =
        searchQuestionQuery === undefined
          ? await getQuestionsbyTag(tagId)
          : await getSearchTagQuestions(tagId, searchQuestionQuery);
      break;
    default:
      questions =
        searchQuestionQuery === undefined
          ? await getAllQuestions()
          : await getSearchQuestions(searchQuestionQuery);
  }

  return (
    <div className="mt-8 pb-16 md:pb-10 mb-16 md:mb-10">
      {questions?.reverse().map(async (question, index) => {
        return (
          <Link key={index} href={`/question-details/${question._id}`}>
            <div className=" p-4 rounded-3xl bg-gray-50 dark:bg-gray-700 shadow-md my-5 md:my-8 cursor-pointer">
              <h1 className="text-xl font-semibold">{question.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2 w-full">
                {question?.tags &&
                  question.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 bg-orange-100 dark:bg-gray-600  text-orange-400 rounded-full text-sm"
                    >
                      {/* @ts-ignore */}
                      {tag?.name}
                    </span>
                  ))}
              </div>

              <div className="flex flex-col  mt-4 gap-4 ">
                <div className="flex items-center justify-between mr-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={question?.author?.picture}
                      className="h-8 mr-2 rounded-full"
                      alt={`Profile of ${question?.author?.name}`}
                    />
                    <div className="text-sm font-semibold mr-4">
                      {question?.author?.name}
                    </div>
                  </div>
                  <div className=" text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                    <CiClock2 />
                    <span>
                      asked on {question?.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center  gap-4">
                  <div className="text-sm font-semibold flex items-center gap-1">
                    <FaRegThumbsUp />
                    <div>{question?.upvotes?.length} Votes</div>
                  </div>
                  <p className="text-gray-500  dark:text-gray-400 text-sm flex items-center gap-1">
                    <FiMessageSquare />
                    {question?.answers?.length} Answers
                  </p>
                  <div className="  text-sm font-semibold flex items-center gap-1">
                    <MdOutlineRemoveRedEye />
                    <div>{question?.views} Views</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default QuestionCard;

