import React from 'react';
import TopQuestions from '../partials/TopQuestions';
import PopularTags from '../partials/PopularTags';
import TrophyCard from '../partials/TrophyCard';

const RightSideBar = () => {
  return (
    <div className="w-64 fixed top-24">
      <TrophyCard />
      <TopQuestions />
      <PopularTags />
    </div>
  );
};

export default RightSideBar;

