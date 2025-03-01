'use server';
import Answer from '@/database/answer-model';
import { connectToMongoDb } from '../mongoose';
import { Types } from 'mongoose';
import { CreateAnswerParams, GetAnswersParams } from './shared.types';
import Question from '@/database/question-model';
import { revalidatePath } from 'next/cache';
import User from '@/database/user-model';

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

    // Update question & user reputation in parallel
    await Promise.all([
      Question.findByIdAndUpdate(
        question,
        { $push: { answers: answer._id } },
        { new: true },
      ),
      User.findByIdAndUpdate(author, { $inc: { reputation: 2 } }),
    ]);

    revalidatePath(path);
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
    console.error('Error:', error);
    throw error;
  }
}

export async function getAnswersByAuthorId(id: string) {
  try {
    await connectToMongoDb();
    const answers = await Answer.find({ author: id });
    return answers;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

