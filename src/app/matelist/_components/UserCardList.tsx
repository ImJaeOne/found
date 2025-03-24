'use client';

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
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/getServices';
import { supabase } from '@/services/supabaseClient';

type UserData = {
  id: number;
  created_at: string;
  nickname: string;
  address: string;
  profile: string;
  bio: string;
  user_id: string;
  is_finding: boolean;
};

type CategoriesData = string[];

const categories: CategoriesData = [
  CATEGORIES.RUNNING,
  CATEGORIES.TENNIS,
  CATEGORIES.SOCCER,
];

const UserCardList = () => {
  const {
    data: users,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isError) {
    return <div>Error!</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  

  console.log('user : ', users);
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
          {users.map((user: UserData, index:number) => (
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

/**
 * 유저 정보 가져오기
 * 유저의 category 가져오기
 * category에 맞는 유저들 가져오기
 */
