import { getAllQuestions } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

const QuestionCard = async () => {
  const questions = await getAllQuestions();
  console.log(questions);

  return (
    <div>
      {questions?.map(async (question, index) => {
        const authorId = await getUserById({
          userId: question.author,
        });
        //console.log("this is the author id   " + authorId?.name);
        return (
          <div className="bg-white p-4 rounded-lg shadow-md my-8">
            <h1 className="text-xl font-semibold">{question?.title}</h1>
            <div></div>
            <div className="flex space-x-2 mt-2">
              {question?.tags &&
                question?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {tag.toString()}
                  </span>
                ))}
            </div>

            <div className="flex mt-4">
              <div className="flex items-center mr-4">
                <img
                  src={authorId?.picture}
                  className="h-8 mr-2 rounded-full"
                ></img>
                <div className="text-sm font-semibold mr-4">
                  {authorId?.name}
                </div>
                <div className="text-gray-600 text-sm">
                  asked on {new Date(question?.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center mr-4">
                <div className="text-sm font-semibold">
                  {question?.upvotes.length} Votes
                </div>
                <div className="text-gray-600 text-sm ml-2">
                  {question?.answers.length} Answers
                </div>
              </div>

              <div className="flex items-center">
                <div className="text-sm font-semibold">
                  {question?.views} views
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionCard;
