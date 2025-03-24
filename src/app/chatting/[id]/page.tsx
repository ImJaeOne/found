import UserProfile from '@/ui/common/UserProfile';
import Chatting from '../_components/Chatting';
import Link from 'next/link';
import SectionHeader from '../_components/SectionHeader';
import { PATH } from '@/constants/constants';
import { Params } from '@/types/params';

const partner = {
  user_id: 2,
  nick_name: '케빈',
  bio: '운동 좋아하는 26남',
  categories: ['런닝', '배드민턴', '축구'],
};

const ChattingPage = async ({ params }: Params) => {
  const chatId = Number(params.id);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[70%] h-[70vh] flex pt-10 2xl:pt-20 gap-20">
        <UserProfile user={partner} edit={false}>
          <div>
            <Link href={PATH.APPOINTMENT}>약속 요청하기</Link>
            <Link href={PATH.APPOINTMENT}>약속 확인하기</Link>
          </div>
        </UserProfile>
        <div className="h-[90%] w-full">
          <SectionHeader />
          <Chatting chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
