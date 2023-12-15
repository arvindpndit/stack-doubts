"use server";
import User from "@/database/user-model";
import { connectToMongoDb } from "../mongoose";
import { CreateUserParams } from "./shared.types";

export async function getUserById(params: any) {
  try {
    connectToMongoDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToMongoDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
