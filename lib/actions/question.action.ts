"use server";

import Question from "@/database/question-model";
import { connectToMongoDb } from "../mongoose";
import { CreateQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToMongoDb();
    const { title, content, tags, path } = params;
    const question = await Question.create({
      title,
      content,
      tags,
      path,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
