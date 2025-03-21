import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/shadcn/carousel';
import React from 'react';
import UserCard from './UserCard';
import { Button } from '@/ui/shadcn/button';
import { CATEGORIES } from '@/constants/constants';

type UserData = {
  nick_name: string;
  address: string;
  profile: string;
  bio: string;
};

type CategoriesData = string[];

const user: UserData = {
  nick_name: '햄부기',
  address: '마포구 상암동',
  profile: 'https://',
  bio: '저랑 러닝 하실 분!!',
};

const categories: CategoriesData = [
  CATEGORIES.RUNNING,
  CATEGORIES.TENNIS,
  CATEGORIES.SOCCER,
];

const UserCardList = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="flex flex-row w-full lg:max-w-[1380px] md:max-w-2xl pl-1">
        <Button className="bg-sub1">{CATEGORIES.RUNNING}</Button>
        <h3 className="text-title-sm pl-3">같이 할 파우니를 찾고있어요!</h3>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full lg:max-w-[1380px] md:max-w-2xl pt-8"
      >
        <CarouselContent className="-ml-0">
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4 pl-0"
            >
              <UserCard user={user} categories={categories} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="w-[105px] h-full absolute right-0 top-0 z-9 bg-gradient-to-r from-transparent to-white"></div>
      </Carousel>
    </section>
  );
};

export default UserCardList;
