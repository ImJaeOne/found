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

type UserCategory = {
  id: number;
  user_id: number;
  category: string;
};

type UserCardListProps = {
  category: string;
  filteredUsers: UserCategory[];
};

const UserCardList = ({ category, filteredUsers }: UserCardListProps) => {
  const userIds = filteredUsers.map((user) => user.user_id);

  const {
    data: users,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['users', userIds],
    queryFn: async () => {
      const { data } = await supabase
        .from('users')
        .select('*')
        .in('id', userIds);
      console.log(data);
      return data;
    },
  });

  if (isError) {
    return <div>Error!</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }
  console.log(users);

  return (
    <section className="flex flex-col justify-center items-center">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full lg:max-w-[1380px] md:max-w-2xl pt-8"
      >
        <CarouselContent className="-ml-0">
          {users.map((user: UserData, index: number) => {
            return (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 pl-0"
              >
                <UserCard user={user} categories={categories} />
              </CarouselItem>
            );
          })}
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
