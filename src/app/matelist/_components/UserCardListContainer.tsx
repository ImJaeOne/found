'use client';
import React from 'react';
import UserCardList from './UserCardList';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { Button } from '@/ui/shadcn/button';
import { CATEGORIES } from '@/constants/constants';

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

const UserCardListContainer = () => {
  const categoryList = Object.values(CATEGORIES);

  const {
    data: userSession,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['loginUser'],
    queryFn: async (): Promise<UserData | null> => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session === null) {
        return null;
      }
      const { data: user, error } = await supabase
        .from('users')
        .select(
          `
        *,
        user_categories (
          category
        )
      `,
        )
        .eq('user_id', sessionData.session.user.id)
        .single();

      if (error) {
        throw new Error('사용자 정보를 불러오지 못했습니다.', error);
      }
      return user;
    },
  });

  if (isError) return <div>Error...</div>;
  if (isPending) return <div>Loading...</div>;

  let userId: number;
  let myCategories: string[] = [];
  let notMyCategories: string[] = [];

  if (userSession && typeof userSession !== undefined) {
    userId = userSession.id;

    myCategories = userSession.user_categories
      .map((item) => Object.values(item))
      .flat();

    notMyCategories = categoryList.filter(
      (category) => !myCategories.includes(category),
    );
  }

  return (
    <div>
      {userSession ? (
        <div>
          <h1>나의 카테고리</h1>
          {myCategories.map((category) => {
            return (
              <div key={category}>
                <div className="flex flex-row w-full lg:max-w-[1380px] md:max-w-2xl pl-1">
                  <Button className="bg-sub1">{category}</Button>
                  <h3 className="text-title-sm pl-3">
                    같이 할 파우니를 찾고있어요!
                  </h3>
                </div>
                <UserCardList category={category} userId={userId} />
              </div>
            );
          })}
          <h1>나의 카테고리 아님</h1>
          {notMyCategories.map((category) => {
            return (
              <div key={category}>
                <div className="flex flex-row w-full lg:max-w-[1380px] md:max-w-2xl pl-1">
                  <Button className="bg-sub1">{category}</Button>
                  <h3 className="text-title-sm pl-3">
                    같이 할 파우니를 찾고있어요!
                  </h3>
                </div>
                <UserCardList category={category} userId={userId} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {categoryList.map((category) => {
            return (
              <div key={category}>
                <div className="flex flex-row w-full lg:max-w-[1380px] md:max-w-2xl pl-1">
                  <Button className="bg-sub1">{category}</Button>
                  <h3 className="text-title-sm pl-3">
                    같이 할 파우니를 찾고있어요!
                  </h3>
                </div>
                <UserCardList category={category} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserCardListContainer;
