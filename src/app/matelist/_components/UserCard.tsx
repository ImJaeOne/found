'use client';

import useStartChat from '@/hooks/useGoChatting';
import { supabase } from '@/services/supabaseClient';
import { Avatar } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';

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

const UserCard = ({
  user,
  categories,
}: {
  user: UserData;
  categories: string[];
}) => {
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

  if (isError) {
    return <div>Error!</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const startChat = useStartChat();

  return (
    <article className="flex flex-col min-w-80 max-w-80 h-96 bg-light-gray rounded-3xl p-7">
      <div className="flex flex-row w-full">
        <figure className=" flex w-20 border-main2 bg-slate-500 rounded-full items-center justify-center">
          <Avatar />
        </figure>
        <div className="flex flex-col pl-6">
          <h3 className="text-title-md text-black font-bold">
            {user.nickname}
          </h3>
          <p className="text-text-md text-medium-gray">{user.address}</p>
        </div>
      </div>
      <p className="flex text-text-md text-medium-gray pt-12">{user.bio}</p>
      <div className="flex flex-col items-center flex-1 pt-5 w-full justify-around">
        <div className="flex flex-row w-full gap-2 flex-wrap">
          {categories.map((category) => (
            <Button key={category} className="bg-sub1">
              {category}
            </Button>
          ))}
        </div>
        <Button
          className="bg-main1"
          onClick={() => startChat(userSession.id, user.id)}
        >
          CHAT ROOM
        </Button>
      </div>
    </article>
  );
};

export default UserCard;
