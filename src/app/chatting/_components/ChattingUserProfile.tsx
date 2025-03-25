'use client';

import { PATH } from '@/constants/constants';
import Link from 'next/link';
import React from 'react';
import UserProfile from './UserProfile';
import { useAuthStore } from '@/providers/AuthProvider';
import { useGetChatPartner } from '@/hooks/queries/useUserQuery';

const ChattingUserProfile = ({ chatId }: { chatId: number }) => {
  const { user } = useAuthStore((state) => state);
  const {
    data: partner,
    isPending,
    isError,
    error,
  } = useGetChatPartner(chatId, user);

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>상대 정보를 불러올 수 없습니다.</p>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="flex flex-col justify-between p-4 rounded-md items-center">
      <UserProfile user={partner} />
      <div className="flex flex-col gap-4 p-3 w-[200px] h-[100px] rounded-md items-center bg-main2">
        <Link href={PATH.APPOINTMENT} className="h-[50px]">
          약속 요청하기
        </Link>
        <Link href={PATH.APPOINTMENT} className="h-[50px]">
          약속 확인하기
        </Link>
      </div>
    </div>
  );
};

export default ChattingUserProfile;
