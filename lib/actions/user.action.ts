'use server';
import User from '@/database/user-model';
import { connectToMongoDb } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  voteTheQuestionParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question-model';
import { currentUser } from '@clerk/nextjs/server';

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
  update: boolean;
}

export async function saveTheQuestion(params: saveTheQuestionProps) {
  try {
    const { userId, questionId, path, update } = params;

    const IsQuestionAlreadySaved = await User.findOne({
      _id: userId,
      saved: {
        $elemMatch: { $eq: questionId },
      },
    });

    if (!update) {
      return IsQuestionAlreadySaved; //null or obj
    } else {
      if (IsQuestionAlreadySaved === null) {
        const res = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { saved: questionId } },
          {
            new: true,
          },
        );
        revalidatePath(path);
        return res; //obj
      } else {
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { saved: questionId } },
          {
            new: true,
          },
        );

        revalidatePath(path);
        return null; //null
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface getAllSavedQuestionsParams {
  mongoUser: any;
  searchQuestionQuery?: string;
}

export async function getAllSavedQuestions(params: getAllSavedQuestionsParams) {
  const { mongoUser, searchQuestionQuery } = params;
  const savedQuestion = mongoUser.saved;

  try {
    await connectToMongoDb();
    if (searchQuestionQuery === undefined) {
      const questions = await Question.find({
        _id: { $in: savedQuestion },
      })
        .populate('author', 'name picture')
        .exec();
      return questions;
    } else {
      const questions = await Question.find({
        _id: { $in: savedQuestion },
        title: { $regex: searchQuestionQuery, $options: 'i' },
      })
        .populate('author', 'name picture')
        .exec();
      return questions;
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
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
        },
      );
      revalidatePath(path);

      return question;
    }

    const removeUpvote = await Question.updateOne(
      { _id: questionId },
      { $pull: { upvotes: authorId } },
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
        },
      );
      revalidatePath(path);
      return question;
    }

    const removeUpvote = await Question.updateOne(
      { _id: questionId },
      { $pull: { upvotes: authorId } },
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
      throw new Error('User not found');
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

export async function getAllUsers(page = 1, limit = 15) {
  try {
    connectToMongoDb();
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().skip(skip).limit(limit).exec(),
      User.countDocuments(),
    ]);

    return {
      users,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMostReputedUser() {
  try {
    await connectToMongoDb();
    const mostReputedUser = await User.findOne()
      .sort({ reputation: -1 })
      .limit(1)
      .exec();
    return mostReputedUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function getSearchUsers(
  searchUserQuery: string,
  page = 1,
  limit = 15,
) {
  try {
    await connectToMongoDb();
    const skip = (page - 1) * limit;

    const searchCondition = {
      $or: [
        { name: { $regex: searchUserQuery, $options: 'i' } },
        { username: { $regex: searchUserQuery, $options: 'i' } },
      ],
    };
    const [users, total] = await Promise.all([
      User.find(searchCondition).skip(skip).limit(limit),
      User.countDocuments(searchCondition),
    ]);

    return {
      users,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

