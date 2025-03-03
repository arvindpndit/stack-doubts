'use server';

import Question from '@/database/question-model';
import { connectToMongoDb } from '../mongoose';
import { CreateQuestionParams } from './shared.types';
import { revalidatePath } from 'next/cache';
import Answer from '@/database/answer-model';
import User from '@/database/user-model';
import Tag from '@/database/tag-model';

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToMongoDb();
    const { title, content, tags: tagNames, path, author } = params;
    const tagIds = [];

    // Process each tag
    for (const tagName of tagNames) {
      // Check if tag already exists
      let tag = await Tag.findOne({ name: tagName.toLowerCase() });

      if (!tag) {
        // Create new tag if it doesn't exist
        tag = await Tag.create({
          name: tagName.toLowerCase(),
          description: `Questions about ${tagName}`,
          followers: [],
          questions: [],
        });
      }

      // Add tag ID to our array
      tagIds.push(tag._id);
    }

    // Create the question with tag IDs
    const question = await Question.create({
      title,
      content,
      tags: tagIds,
      author,
    });

    // Update each tag to include this question
    await Tag.updateMany(
      { _id: { $in: tagIds } },
      { $addToSet: { questions: question._id } },
    );

    // Update user reputation
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create question');
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
    const [questions, totalQuestions] = await Promise.all([
      Question.find({ author: id }).populate('author', 'name picture').exec(),
      Question.countDocuments({ author: id }),
    ]);

    return { questions, totalQuestions };
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
    const [totalQuestionsAnswered, questions] = await Promise.all([
      Question.countDocuments({ _id: { $in: uniqueQuestionIds } }),
      Question.find({ _id: { $in: uniqueQuestionIds } })
        .populate('author', 'name picture')
        .exec(),
    ]);

    return { totalQuestionsAnswered, questions };
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

