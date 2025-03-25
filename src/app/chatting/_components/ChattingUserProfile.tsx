'use client';

import { PATH } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import UserProfile from './UserProfile';
import { useAuthStore } from '@/providers/AuthProvider';
import { UserData } from '@/types/users';

const ChattingUserProfile = ({ chatId }: { chatId: number }) => {
  const { user } = useAuthStore((state) => state);
  const {
    data: partner,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['userInfo', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('user1_id, user2_id')
        .eq('id', chatId)
        .single();

      if (error) throw new Error(error.message);

      const otherUserId =
        data.user1_id === user?.id ? data.user2_id : data.user1_id;

      const { data: otherUser, error: userError } = await supabase
        .from('users')
        .select('*, user_categories(category)')
        .eq('id', otherUserId)
        .single();

      if (userError) throw new Error(userError.message);

      const categories = otherUser.user_categories.map(
        (item: { category: string }) => item.category,
      );

      const otherUserInfo: UserData = {
        ...otherUser,
        categories,
      };
      return otherUserInfo;
    },
    enabled: !!chatId && !!user?.id,
  });
  if (!user) return <div>상대 정보를 가져오는 중...</div>;
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="flex flex-col justify-between shadow-md p-4 rounded-md">
      <UserProfile user={partner} />
      <div className="flex flex-col gap-4 p-3 rounded-md items-center bg-main2">
        <Link href={PATH.APPOINTMENT} className="">
          약속 요청하기
        </Link>
        <Link href={PATH.APPOINTMENT}>약속 확인하기</Link>
      </div>
    </div>
  );
};

export default ChattingUserProfile;
