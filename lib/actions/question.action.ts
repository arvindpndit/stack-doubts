"use server";

import Question from "@/database/question-model";
import { connectToMongoDb } from "../mongoose";
import mongoose, { Schema } from "mongoose";

export async function createQuestion() {
  try {
    connectToMongoDb();

    let question = await Question.create({
      title: "Post new haha",
      content: "Content for post 1.",
      tags: [],
      views: 50,
      upvotes: [],
      downvotes: [],
      author: "656619589b0a37033acd3886",
      answers: [],
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
}
