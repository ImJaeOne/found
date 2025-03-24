import Chatting from '../_components/Chatting';
import SectionHeader from '../_components/SectionHeader';
import { Params } from '@/types/params';
import ChattingUserProfile from '../_components/\bChattingUserProfile';

const ChattingPage = async ({ params }: Params) => {
  const chatId = Number(params.id);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[70%] h-[70vh] flex pt-10 2xl:pt-20 gap-20">
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
