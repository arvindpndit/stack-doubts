'use server';

import Question from '@/database/question-model';
import { connectToMongoDb } from '../mongoose';
import { CreateQuestionParams } from './shared.types';
import { revalidatePath } from 'next/cache';
import Answer from '@/database/answer-model';
import User from '@/database/user-model';

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToMongoDb();
    const { title, content, tags, path, author } = params;
    await Question.create({
      title,
      content,
      tags,
      path,
      author,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchQuestions(searchQuestionQuery: string) {
  try {
    await connectToMongoDb();

    const questions = await Question.find({
      $or: [
        { title: { $regex: searchQuestionQuery, $options: 'i' } },
        { content: { $regex: searchQuestionQuery, $options: 'i' } },
      ],
    })
      .populate('author', 'name picture')
      .exec();

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

export async function getAllQuestions() {
  try {
    await connectToMongoDb();
    const questions = await Question.find()
      .populate('author', 'name picture') // Populate the 'author' of the question with 'name' and 'picture'
      .exec();

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

export async function getQuestionById(id: string) {
  try {
    await connectToMongoDb();
    const question = await Question.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      },
    )
      .populate('author', 'name picture') // Populate the 'author' of the question
      .populate({
        path: 'answers',
        populate: {
          path: 'author',
          select: 'name picture',
        },
      })
      .exec();
    return question;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

export async function getQuestionsByAuthorId(id: string) {
  try {
    await connectToMongoDb();
    const questions = await Question.find({ author: id })
      .populate('author', 'name picture')
      .exec();
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

export async function questionsAnsweredByAuthor(id: string) {
  try {
    await connectToMongoDb();
    const answers = await Answer.find({ author: id });

    // Extract all question IDs from the provided answers
    const questionIds = answers.reduce(
      //@ts-ignore
      (ids, answer) => ids.concat(answer?.question),
      [],
    );

    // Remove duplicate question IDs
    const uniqueQuestionIds = Array.from(new Set(questionIds));

    // Use Mongoose to find the questions based on their IDs
    const questions = await Question.find({ _id: { $in: uniqueQuestionIds } })
      .populate('author', 'name picture')
      .exec();

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

export async function getTopQuestions() {
  try {
    connectToMongoDb();
    const topQuestions = await Question.find()
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return topQuestions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

