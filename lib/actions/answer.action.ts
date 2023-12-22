"use server";
import Answer from "@/database/answer-model";
import { connectToMongoDb } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToMongoDb();
    const { content, author, path, question } = params;

    const answer = await Answer.create({
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
