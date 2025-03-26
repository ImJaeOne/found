'use client';

import { sendNewAppoinment } from '@/services/appointmentServices';
import { AppointmentInputs } from '@/types/appointments';
import { useForm } from 'react-hook-form';
import { useAddMessageMutation } from './mutations/useChatMutation';
import { UserData } from '@/types/users';
import { PATH } from '@/constants/constants';
import { useRouter } from 'next/navigation';

const useAppointmentValidation = (
  chatId: number,
  loginUser: UserData | null,
) => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: appointmentSetValue,
    getValues,
    watch: appointmentWatch,
  } = useForm<AppointmentInputs>();

  const { sendMessage } = useAddMessageMutation(chatId);

  const router = useRouter();

  const appointmentContent = `<p>${loginUser?.nickname}님이 약속 요청을 보냈어요!</p>
  <p>약속 확인 후 수락 버튼을 눌러주세요!</p>
  <div class="flex justify-center mt-4">
    <a href="${PATH.APPOINTMENT}/${chatId}" class="text-white bg-main1 rounded-lg px-4 py-2">
      CHECK
    </a>
  </div>`;

  // 약속 추가 로직
  const addNewAppointment = async (data: AppointmentInputs) => {
    const address = `${data.address.place} ${data.address.detailPlace}`;
    const category = data.category.join(', ');

    // 기존 data에 변환된 값 추가
    const newAppointmentData = {
      ...data,
      chat_room_id: chatId,
      address: address,
      category: category,
      is_confirmed: false,
    };

    await sendNewAppoinment(newAppointmentData);
    sendMessage({
      chat_room_id: chatId,
      sender_id: loginUser!.id,
      content: appointmentContent,
      appointment: true,
    });
    router.back();
  };

  const onSubmit = (data: AppointmentInputs) => {
    addNewAppointment(data);
  };

  return {
    register,
    appointmentWatch,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    appointmentSetValue,
  };
};

export default useAppointmentValidation;
