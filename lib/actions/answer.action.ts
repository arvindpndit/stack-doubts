import Answer from "@/database/answer-model";
import { connectToMongoDb } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";

async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToMongoDb();
    const { author, content, path, question } = params;

    const answer = await Answer.create({
      author,
      content,
      question,
      path,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
