import { fetchAppointments } from '@/services/appointmentServices';
import { useQuery } from '@tanstack/react-query';

export const useAppointmentQuery = (user_id: number) => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => fetchAppointments(user_id),
  });
};
