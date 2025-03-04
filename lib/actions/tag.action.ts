import Tag from '@/database/tag-model';
import { connectToMongoDb } from '../mongoose';

export async function getAllTags() {
  try {
    connectToMongoDb();
    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          description: 1,
          questionCount: { $size: '$questions' },
        },
      },
    ]);
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }
}

export async function getQuestionsbyTag(id: string | undefined) {
  try {
    const res = await Tag.findById(id)
      .populate({
        path: 'questions',
        populate: [
          {
            path: 'author',
            select: 'name picture',
          },
          {
            path: 'tags', // Ensure tags inside questions are populated
            select: 'name',
          },
        ],
      })
      .lean() // Converts Mongoose document to a plain JS object
      .exec();

    return res;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
}

export async function getSearchTags(searchTagQuery: string) {
  try {
    await connectToMongoDb();

    const tags = await Tag.aggregate([
      {
        $match: {
          name: { $regex: searchTagQuery, $options: 'i' },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          questionCount: { $size: { $ifNull: ['$questions', []] } },
        },
      },
    ]);

    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }
}

export async function getPopularTags() {
  try {
    connectToMongoDb();
    const topTags = await Tag.aggregate([
      {
        $project: {
          name: 1, // Keep the tag name
          questionCount: { $size: '$questions' }, // Count the number of questions in the array
        },
      },
      {
        $sort: { questionCount: -1 }, // Sort tags by highest number of questions
      },
      {
        $limit: 6,
      },
    ]);
    return topTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }
}

