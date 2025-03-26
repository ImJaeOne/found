import { QUERY_KEY } from '@/constants/constants';
import { getUsersCategories } from '@/services/getUsersCategories';
import { useQuery } from '@tanstack/react-query';

export const useUsersCategories = ({
  category,
  id,
}: {
  category: string;
  id?: number;
}) => {
  if (id) {
    return useQuery({
      queryKey: [QUERY_KEY.USERS, category, id],
      queryFn: () => getUsersCategories({ category, id }),
    });
  } else {
    return useQuery({
      queryKey: [QUERY_KEY.USERS, category],
      queryFn: () => getUsersCategories({ category }),
    });
  }
};
