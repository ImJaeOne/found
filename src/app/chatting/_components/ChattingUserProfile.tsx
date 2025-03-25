'use client';

import { PATH } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
import UserProfile from '@/app/mypage/_components/UserProfile';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const ChattingUserProfile = ({ chatId }: { chatId: number }) => {
  const { data: userId } = useQuery({
    queryKey: ['userId'],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userSessionId = sessionData?.session?.user.id;
      if (!userSessionId) return null;

      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('user_id', userSessionId)
        .single();

      return userData?.id || null;
    },
    staleTime: 1000 * 60,
  });

  const {
    data: partner,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['chatPartner', chatId, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('user1_id, user2_id')
        .eq('id', chatId)
        .single();

      if (error) throw new Error(error.message);

      const otherUserId =
        data.user1_id === userId ? data.user2_id : data.user1_id;

      const { data: otherUser, error: userError } = await supabase
        .from('users')
        .select('id, nickname, profile, bio, user_categories(category)')
        .eq('id', otherUserId)
        .single();

      if (userError) throw new Error(userError.message);

      const categories = otherUser.user_categories.map((item) => item.category);

      const otherUserInfo: User = { ...otherUser, categories };

      return otherUserInfo;
    },
    enabled: !!chatId && !!userId,
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <UserProfile user={partner} edit={false}>
      <div>
        <Link href={PATH.APPOINTMENT}>약속 요청하기</Link>
        <Link href={PATH.APPOINTMENT}>약속 확인하기</Link>
      </div>
    </UserProfile>
  );
};

export default ChattingUserProfile;

type User = {
  id: number;
  nickname: string;
  bio: string;
  profile: string;
  categories: string[];
};
