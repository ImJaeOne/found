import { CATEGORIES } from '@/constants/constants';
import React from 'react';
import CategoryCardSection from './CategoryCardSection';

const PublicCardList = () => {
  const categories = Object.values(CATEGORIES).flat();
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[1380px] px-4 pt-8">
        <h1 className="text-title-md text-main1 font-bold">모집중인 파우니</h1>
        <CategoryCardSection categories={categories} />
      </div>
    </div>
  );
};

export default PublicCardList;
