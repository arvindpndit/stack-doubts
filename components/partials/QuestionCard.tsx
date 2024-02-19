import {
  getAllQuestions,
  getQuestionsByAuthorId,
  getSearchQuestions,
  questionsAnsweredByAuthor,
} from "@/lib/actions/question.action";
import { getAllSavedQuestions, getUserById } from "@/lib/actions/user.action";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa6";

interface QuestionCardProps {
  searchQuestionQuery?: string | undefined;
  filter?: string;
  mongoUser?: any;
}

const QuestionCard = async (params: QuestionCardProps) => {
  const { filter, mongoUser, searchQuestionQuery } = params;

  if (filter == "savedQuestions") {
    var questions = await getAllSavedQuestions({
      mongoUser,
      searchQuestionQuery,
    });
  } else if (filter == "questionAskedByAuthor") {
    var questions = await getQuestionsByAuthorId(mongoUser);
  } else if (filter == "questionsAnsweredByAuthor") {
    var questions = await questionsAnsweredByAuthor(mongoUser);
  } else {
    if (searchQuestionQuery === undefined) {
      var questions = await getAllQuestions();
    } else {
      var questions = await getSearchQuestions(searchQuestionQuery);
    }
  }

  return (
    <div className="mb-16 md:mb-10">
      {questions?.reverse().map(async (question, index) => {
        const authorId = await getUserById({
          key: "_id",
          value: question.author,
        });

        return (
          <Link key={index} href={`/question-details/${question._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md my-5 md:my-8 cursor-pointer">
              <h1 className="text-xl font-semibold">{question.title}</h1>
              <div className="flex space-x-2 mt-2">
                {question.tags &&
                  question.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                    >
                      {tag.toString()}
                    </span>
                  ))}
              </div>

              <div className="flex flex-col  mt-4 gap-4 ">
                <div className="flex items-center justify-between mr-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={authorId?.picture}
                      className="h-8 mr-2 rounded-full"
                      alt={`Profile of ${authorId?.name}`}
                    />
                    <div className="text-sm font-semibold mr-4">
                      {authorId?.name}
                    </div>
                  </div>
                  <div className=" text-gray-500 text-sm flex items-center gap-1">
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
                  <p className="text-gray-500 text-sm flex items-center gap-1">
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
