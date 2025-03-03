import Tag from '@/database/tag-model';
import { connectToMongoDb } from '../mongoose';

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

