import { Params } from '@/types/params';
import AppointmentModal from '../_components/AppointmentModal';
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

const AppointmentModalPage = ({ params }: Params) => {
  const chatId = Number(params.id);
  return <AppointmentModal chatId={chatId} />;
};

export default AppointmentModalPage;
