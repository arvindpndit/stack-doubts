"use server";

import { connectToMongoDb } from "../mongoose";

export async function createQuestion() {
  try {
    connectToMongoDb();
  } catch (error) {
    console.log(error);
  }
}
