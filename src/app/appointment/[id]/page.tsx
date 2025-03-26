import { Params } from '@/types/params';
import AppointmentForm from '../_components/AppointmentForm';

const AppointmentPage = ({ params }: Params) => {
  const chatId = Number(params.id);

  return (
    <div className="container mx-auto max-w-5xl rounded-2xl shadow-xl border border-gray-200 p-10 bg-white">
      <AppointmentForm chatId={chatId} />
    </div>
  );
};

export default AppointmentPage;
