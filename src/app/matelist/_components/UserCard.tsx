import { Avatar } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';
import React from 'react';

type UserData = {
  nick_name: string;
  address: string;
  bio: string;
  categories: string[];
};

const UserCard = ({ user }: { user: UserData }) => {
  return (
    <article className="flex flex-col min-w-80 max-w-80 h-96 bg-light-gray rounded-3xl p-7">
      <div className="flex flex-row w-full">
        <figure className=" flex w-20 border-main2 bg-slate-500 rounded-full items-center justify-center">
          <Avatar />
        </figure>
        <div className="flex flex-col pl-6">
          <h3 className="text-title-md text-black font-bold">
            {user.nick_name}
          </h3>
          <p className="text-text-md text-medium-gray">{user.address}</p>
        </div>
      </div>
      <p className="flex text-text-md text-medium-gray pt-12">{user.bio}</p>
      <div className="flex flex-col items-center flex-1 pt-5 w-full justify-around">
        <div className="flex flex-row w-full justify-evenly ">
          {user.categories.map((category) => {
            return <Button className="bg-sub1">{category}</Button>;
          })}
        </div>
        <Button className="bg-main1">CHAT ROOM</Button>
      </div>
    </article>
  );
};

export default UserCard;
