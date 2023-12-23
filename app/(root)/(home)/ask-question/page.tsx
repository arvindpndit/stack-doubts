import AskQuestionForm from "@/components/forms/AskQuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Ask = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ key: "clerkId", value: userId });

  return (
    <div className="w-full px-1 md:px-8 mt-28 h-screen">
      <h1 className="font-bold text-3xl">Ask a question</h1>
      <AskQuestionForm mongoUserId={JSON.stringify(mongoUser?._id)} />
    </div>
  );
};

export default Ask;
