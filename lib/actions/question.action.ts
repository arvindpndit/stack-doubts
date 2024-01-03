"use server";

import Question, { IQuestion } from "@/database/question-model";
import { connectToMongoDb } from "../mongoose";
import { Document, Types } from "mongoose";
import { CreateQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToMongoDb();
    const { title, content, tags, path, author } = params;
    const question = await Question.create({
      title,
      content,
      tags,
      path,
      author,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllQuestions() {
  try {
    await connectToMongoDb();
    const questions = await Question.find();
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function getQuestionById(id: string) {
  try {
    await connectToMongoDb();
    const question = await Question.findById(id);
    return question;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function incrementQuestionViewCount(questionId: string) {
  try {
    await connectToMongoDb();
    const question = await Question.findOneAndUpdate(
      {
        _id: questionId,
      },
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );

    return question;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
}
