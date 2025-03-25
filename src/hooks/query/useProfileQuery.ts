import { getProfile } from '@/services/profileServices';
import { useQuery } from '@tanstack/react-query';

export const useGetUserQuery = (user_id: number) => {
  return useQuery({
    queryKey: [`userData-${user_id}`],
    queryFn: () => getProfile(user_id),
  });
};
