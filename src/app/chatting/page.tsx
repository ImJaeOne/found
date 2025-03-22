'use client';

import SectionHeader from '@/ui/common/SectionHeader';
import UserProfile from '@/ui/common/UserProfile';
import Chatting from './_components/Chatting';

const partner = {
  user_id: 2,
  nick_name: '케빈',
  bio: '운동 좋아하는 26남',
  categories: ['런닝', '배드민턴', '축구'],
};

export type User = {
  user_id: number;
};

const user: User = {
  user_id: 1,
};

const ChattingPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[70%] h-[70vh] flex pt-10 2xl:pt-20 gap-20">
        <UserProfile user={partner} edit={false}>
          <div>
            <button>약속 요청하기</button>
            <button>약속 확인하기</button>
          </div>
        </UserProfile>
        <div className="h-[90%] w-full">
          <SectionHeader />
          <Chatting user={user} />
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
