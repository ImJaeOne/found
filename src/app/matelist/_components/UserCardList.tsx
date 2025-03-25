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
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

type Category = {
  category: 'string';
};

type UserData = {
  id: number;
  created_at: string;
  nickname: string;
  address: string;
  profile: string;
  bio: string;
  user_id: string;
  is_finding: boolean;
  user_categories: Category[];
};

const UserCardList = ({
  category,
  userId,
}: {
  category: string;
  userId?: number;
}) => {
  const {
    data: users,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<UserData[]> => {
      const { data, error } = await supabase
        .from('users')
        .select('*, user_categories(category)');

      if (error) {
        throw new Error('users 데이터를 불러오지 못했습니다', error);
      }

      return data as UserData[];
    },
  });

  if (isError) return <div>Error!</div>;
  if (isPending) return <div>Loading!</div>;

  const filteredUsers = users?.filter(
    (user) =>
      user.user_categories.some((item) => item.category === category) &&
      user.id !== userId,
  );

  if (filteredUsers.length === 0) {
    return (
      <div className="flex justify-center item-center">
        <h1 className="text-title-md text-main1">해당 운동을 원하는 파우니가 없어요ㅠ</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full pt-8"
      >
        <CarouselContent className="-ml-0 gap-2">
          {filteredUsers.map((user: UserData, index: number) => {
            const categories = user.user_categories
              .map((item) => Object.values(item))
              .flat();

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
