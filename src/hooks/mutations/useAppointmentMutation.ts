import { QUERY_KEY } from '@/constants/constants';
import { confirmAppointment } from '@/services/appointmentServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useConfirmAppointmentMutation = (chatId: number) => {
  const queryClient = useQueryClient();
  const { mutate: confirmAppointmentMutation } = useMutation({
    mutationFn: () => confirmAppointment(chatId),
    mutationKey: [QUERY_KEY.APPOINTMENTS, chatId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.APPOINTMENTS, chatId],
      });
    },
  });
  return confirmAppointmentMutation;
};
