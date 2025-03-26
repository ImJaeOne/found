import { Params } from '@/types/params';
import AppointmentForm from '../_components/AppointmentForm';

const AppointmentPage = ({ params }: Params) => {
  const chatId = Number(params.id);

  return (
    <div className="h-[calc(100vh-56px)] p-32 bg-main2">
      <div className="container mx-auto max-w-5xl rounded-2xl shadow-xl border border-gray-200 p-10 bg-white  w-full h-full flex items-center justify-center">
        <AppointmentForm chatId={chatId} />
      </div>
    </div>
  );
};

export default AppointmentPage;
