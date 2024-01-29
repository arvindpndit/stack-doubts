"use server";
import User from "@/database/user-model";
import { connectToMongoDb } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  voteTheQuestionParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question-model";

export async function getUserById(params: { key: string; value: any }) {
  try {
    connectToMongoDb();
    const { key, value } = params;
    const user = await User.findOne({ [key]: value });
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

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToMongoDb();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface saveTheQuestionProps {
  userId: string;
  questionId: string;
  path: string;
}

export async function saveTheQuestion(params: saveTheQuestionProps) {
  try {
    connectToMongoDb();
    const { userId, questionId, path } = params;

    const IsQuestionAlreadySaved = await User.findOne({
      saved: {
        $elemMatch: { $eq: questionId },
      },
    });

    if (IsQuestionAlreadySaved) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { saved: questionId } },
        {
          new: true,
        }
      );

      revalidatePath(path);
      return false;
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { saved: questionId } },
      {
        new: true,
      }
    );

    revalidatePath(path);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface getAllSavedQuestionsParams {
  mongoUser: any;
}

export async function getAllSavedQuestions(params: getAllSavedQuestionsParams) {
  const { mongoUser } = params;
  const savedQuestion = mongoUser.saved;

  try {
    await connectToMongoDb();
    const questions = await Question.find({
      _id: { $in: savedQuestion },
    });
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function upvoteQuestion(params: voteTheQuestionParams) {
  try {
    const { questionId, authorId, path } = params;

    //check whether the user is present in the upvotes or downvotes (Question model)
    const hasUserAlreadyUpvoted = await Question.findOne({
      _id: questionId,
      upvotes: authorId,
    });

    if (!hasUserAlreadyUpvoted) {
      const question = await Question.findOneAndUpdate(
        { _id: questionId },
        { $pull: { downvotes: authorId }, $push: { upvotes: authorId } },
        {
          new: true,
        }
      );
      revalidatePath(path);

      return question;
    }

    const removeUpvote = await Question.updateOne(
      { _id: questionId },
      { $pull: { upvotes: authorId } }
    );

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: voteTheQuestionParams) {
  try {
    const { questionId, authorId, path } = params;

    //check whether the user is present in the upvotes or downvotes (Question model)
    const hasUserAlreadyUpvoted = await Question.findOne({
      _id: questionId,
      downvotes: authorId,
    });

    if (!hasUserAlreadyUpvoted) {
      const question = await Question.findOneAndUpdate(
        { _id: questionId },
        { $pull: { upvotes: authorId }, $push: { downvotes: authorId } },
        {
          new: true,
        }
      );
      revalidatePath(path);
      return question;
    }

    const removeUpvote = await Question.updateOne(
      { _id: questionId },
      { $pull: { upvotes: authorId } }
    );

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToMongoDb();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    connectToMongoDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
