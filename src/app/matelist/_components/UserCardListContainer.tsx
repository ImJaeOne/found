'use client';
import React from 'react';
import UserCardList from './UserCardList';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import { Button } from '@/ui/shadcn/button';

const UserCardListContainer = () => {
  const {
    data: userSession,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['loginUser'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', data.session?.user.id);
      return user[0];
    },
  });

  const {
    data: users,
    isError: isUsersError,
    isPending: isUsersPending,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await supabase.from('users').select();
      return data;
    },
  });

  const {
    data: categories,
    isError: isCategoriesError,
    isPending: isCategoriesPending,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('user_categories').select();
      return data;
    },
  });

  if (isError || isUsersError || isCategoriesError) return <div>Error...</div>;
  if (isPending || isUsersPending || isCategoriesPending)
    return <div>Loading...</div>;

  // console.log(userSession);
  // console.log(users);
  // console.log(categories);

  const userSessionId = userSession.id;

  const myCategories = categories?.filter(
    (category) => category.user_id === userSessionId,
  );

  return (
    <div>
      {myCategories.map((myCategory) => {
        const filteredUsers = categories?.filter((category) => {
          return category.category === myCategory.category;
        });
        console.log(filteredUsers);
        return (
          <>
            <div className="flex flex-row w-full lg:max-w-[1380px] md:max-w-2xl pl-1">
              <Button className="bg-sub1">{myCategory.category}</Button>
              <h3 className="text-title-sm pl-3">
                같이 할 파우니를 찾고있어요!
              </h3>
            </div>
            <UserCardList category={myCategory} filteredUsers={filteredUsers} />
          </>
        );
      })}
    </div>
  );
};

export default UserCardListContainer;
