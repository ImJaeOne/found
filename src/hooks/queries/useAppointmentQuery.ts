import { QUERY_KEY } from '@/constants/constants';
import { fetchAppointments } from '@/services/appointmentServices';
import { useQuery } from '@tanstack/react-query';

export const useAppointmentQuery = (user_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPOINTMENTS, user_id],
    queryFn: () => fetchAppointments(user_id),
  });
};
