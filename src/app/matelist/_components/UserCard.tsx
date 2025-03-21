import { Avatar } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';
import React from 'react';

const UserCard = () => {
  return (
    <article className="flex flex-col min-w-80 w-80 bg-light-gray rounded-3xl pl-5">
      <div className="flex flex-row w-full pt-7">
        <figure className=" flex w-20 border-main2 bg-slate-500 rounded-full items-center justify-center">
          <Avatar />
        </figure>
        <div className="flex flex-col pl-6">
          <h3 className="text-title-md text-black">햄부기</h3>
          <p className="text-text-md text-medium-gray">마포구 상암동</p>
        </div>
      </div>
      <p className="text-text-md text-medium-gray pt-12">저랑 러닝 하실분!!</p>
      <div className="flex flex-row justify-evenly pt-5">
        <div>런닝</div>
        <div>배드민턴</div>
        <div>테니스</div>
      </div>
      <Button>CHAT ROOM</Button>
    </article>
  );
};

export default UserCard;
