import { QUERY_KEY } from '@/constants/constants';
import { getUsersCategories } from '@/services/getUsersCategories';
import { useQuery } from '@tanstack/react-query';

export const useUsersCategories = (category) => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS, category],
    queryFn: () => getUsersCategories(category),
  });
};
