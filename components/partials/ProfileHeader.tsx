import React from 'react';
import Image from 'next/image';
import BronzeMedalImg from '../../public/assets/icons/bronze-medal.svg';
import GoldMedalImg from '../../public/assets/icons/gold-medal.svg';
import SilverMedalImg from '../../public/assets/icons/silver-medal.svg';
import { getUserById } from '@/lib/actions/user.action';
import {
  getQuestionsByAuthorId,
  questionsAnsweredByAuthor,
} from '@/lib/actions/question.action';

interface ProfileHeaderProps {
  authorId: string;
}

const ProfileHeader = async (params: ProfileHeaderProps) => {
  const [user, { totalQuestions }, { totalQuestionsAnswered }] =
    await Promise.all([
      getUserById({ key: '_id', value: params.authorId }),
      getQuestionsByAuthorId(params.authorId),
      questionsAnsweredByAuthor(params.authorId),
    ]);

  if (!user) return;
  const goldBadgeScore = Math.floor(user?.reputation / 200);
  const silveBadgeScore = Math.floor(totalQuestionsAnswered / 20);
  const bronzeBadgeScore = Math.floor(totalQuestions / 10);

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex items-center gap-4 ">
        <img
          src={user?.picture}
          width={160}
          height={160}
          alt="Picture of the author"
          className="rounded-full"
        />
        <div className="">
          <div className="text-3xl font-bold">{user?.name}</div>
          <div className="text-gray-500">@{user?.username}</div>
        </div>
      </div>
      {(goldBadgeScore > 0 || silveBadgeScore > 0 || bronzeBadgeScore > 0) && (
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Badges</h1>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {goldBadgeScore > 0 && (
              <div className="flex items-center">
                <Image src={GoldMedalImg} alt="" width={40} height={40} />
                <div className="ml-2">
                  <span className="font-bold">
                    {Math.floor(user?.reputation / 200)}
                  </span>{' '}
                  Gold Badge{goldBadgeScore > 1 && 's'}
                </div>
              </div>
            )}
            {silveBadgeScore > 0 && (
              <div className="flex items-center">
                <Image src={SilverMedalImg} alt="" width={40} height={40} />
                <div className="ml-2">
                  <span className="font-bold">{silveBadgeScore}</span> Silver
                  Badge{silveBadgeScore > 1 && 's'}
                </div>
              </div>
            )}
            {bronzeBadgeScore > 0 && (
              <div className="flex items-center">
                <Image src={BronzeMedalImg} alt="" width={40} height={40} />
                <div className="ml-2">
                  <span className="font-bold">{bronzeBadgeScore}</span> Bronze
                  Badge{bronzeBadgeScore > 1 && 's'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;

