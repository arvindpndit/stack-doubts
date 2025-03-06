'use server';

import Question from '@/database/question-model';
import { connectToMongoDb } from '../mongoose';
import Tag from '@/database/tag-model';
import User from '@/database/user-model';

export async function getGlobalSearchResult(searchGlobalQuery: string) {
  try {
    await connectToMongoDb();

    const [questions, users, tags] = await Promise.all([
      Question.find({
        $or: [
          { title: { $regex: searchGlobalQuery, $options: 'i' } },
          { content: { $regex: searchGlobalQuery, $options: 'i' } },
        ],
      }).exec(),
      User.find({
        $or: [
          { name: { $regex: searchGlobalQuery, $options: 'i' } },
          { username: { $regex: searchGlobalQuery, $options: 'i' } },
        ],
      }).exec(),
      Tag.find({
        name: { $regex: searchGlobalQuery, $options: 'i' },
      }).exec(),
    ]);

    return { questions, users, tags };
  } catch (error) {
    console.error('Error fetching :', error);
    throw new Error('Failed to fetch');
  }
}

