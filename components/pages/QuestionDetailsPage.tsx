import { getQuestionById } from "@/lib/actions/question.action";
import { CloudCog } from "lucide-react";
import React from "react";

const QuestionDetailsPage = async (props: { id: string }) => {
  const id = props.id;
  const question = await getQuestionById(id);
  console.log(question);
  return <div>QuestionDetailsPage : {id}</div>;
};

export default QuestionDetailsPage;
