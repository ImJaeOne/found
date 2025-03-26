import { Params } from '@/types/params';
import AppointmentForm from '../_components/AppointmentForm';
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
    title: `${chatPartner.nickname}님과의 약속`,
    description: '운동 메이트를 쉽게 구하고 운동을 시작해보세요.',
  };
};

const AppointmentPage = ({ params }: Params) => {
  const chatId = Number(params.id);

  return (
    <div className="h-[calc(100vh-56px)] p-32 bg-main2">
      <div className="container mx-auto max-w-5xl rounded-2xl shadow-xl border border-gray-200 p-10 bg-white w-full flex items-center justify-center">
        <AppointmentForm chatId={chatId} />
      </div>
    </div>
  );
};

export default AppointmentPage;
