import { QUERY_KEY } from '@/constants/constants';
import { requestAppointment } from '@/services/appointmentServices';
import {
  checkAppointmentMessage,
  fetchMessages,
} from '@/services/chatsServices';
import { useQuery } from '@tanstack/react-query';

export const useFetchChatMessages = (chatId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.MESSAGES, chatId],
    queryFn: () => fetchMessages(chatId),
  });
};

export const useAppointmentMessages = (chatId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPOINTMENTS, 'hasAppointment', chatId],
    queryFn: () => checkAppointmentMessage(chatId),
  });
};

export const useRequestedAppointment = (chatId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPOINTMENTS, 'isRequested'],
    queryFn: () => requestAppointment(chatId),
  });
};
