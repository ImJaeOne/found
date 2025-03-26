import Chatting from '../_components/Chatting';
import SectionHeader from '../_components/SectionHeader';
import { Params } from '@/types/params';
import ChattingUserProfile from '../_components/ChattingUserProfile';
import { createClient } from '@/services/server';
import { fetchChatPartner } from '@/services/usersServices';

export const generateMetadata = async ({ params }: Params) => {
  const chatId = Number(params.id);
  const serverClient = await createClient();
  const { data } = await serverClient.auth.getUser();
  const chatPartner = await fetchChatPartner(
    chatId,
    data.user?.user_metadata.id,
  );
  return {
    title: `${chatPartner.nickname}님과의 채팅`,
    description: '운동 메이트를 쉽게 구하고 운동을 시작해보세요.',
  };
};

const ChattingPage = async ({ params }: Params) => {
  const chatId = Number(params.id);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[70%] h-[70vh] flex pt-10 2xl:pt-20 gap-10">
        <ChattingUserProfile chatId={chatId} />
        <div className="h-[90%] w-full">
          <SectionHeader />
          <Chatting chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
