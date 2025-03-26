import { Params } from '@/types/params';
import AppointmentModal from '../_components/AppointmentModal';

const AppointmentModalPage = ({ params }: Params) => {
  const chatId = Number(params.id);
  return <AppointmentModal chatId={chatId} />;
};

export default AppointmentModalPage;
