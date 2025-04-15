import Tag from '@/database/tag-model';
import { connectToMongoDb } from '../mongoose';

export async function getAllTags(page = 1, limit = 14) {
  try {
    connectToMongoDb();
    const skip = (page - 1) * limit;
    const [tags, total] = await Promise.all([
      Tag.aggregate([
        {
          $project: {
            name: 1,
            description: 1,
            questionCount: { $size: '$questions' },
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]).exec(),
      Tag.countDocuments(),
    ]);

    return {
      tags,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }
}

export async function getSearchTags(
  searchTagQuery: string,
  page = 1,
  limit = 14,
) {
  try {
    await connectToMongoDb();
    const skip = (page - 1) * limit;

    const matchFilter = {
      name: { $regex: searchTagQuery, $options: 'i' },
    };

    const [tags, total] = await Promise.all([
      Tag.aggregate([
        { $match: matchFilter },
        {
          $project: {
            name: 1,
            description: 1,
            questionCount: { $size: { $ifNull: ['$questions', []] } },
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]),
      Tag.countDocuments(matchFilter),
    ]);

    return {
      tags,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
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

