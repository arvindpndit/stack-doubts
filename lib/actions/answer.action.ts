"use server";
import Answer from "@/database/answer-model";
import { connectToMongoDb } from "../mongoose";
import { Types } from "mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToMongoDb();
    const { content, author, path, question } = params;

    await Answer.create({
      content,
      author,
      path,
      question,
    });

    //revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAnswersByQuestionId(params: GetAnswersParams) {
  try {
    connectToMongoDb();
    const { questionId } = params;
    const answers = await Answer.find({
      question: new Types.ObjectId(questionId),
    }).exec();
    return answers;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
