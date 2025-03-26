import { CATEGORIES, QUERY_KEY } from '@/constants/constants';
import { getUsersCategories } from '@/services/getUsersCategories';
import { useQueryClient } from '@tanstack/react-query';

export const usePrefetchUser = (id?: number) => {
  const queryClient = useQueryClient();
  const categoryList = Object.values(CATEGORIES);

  const handleHoverMateList = async () => {
    if (id) {
      await Promise.all(
        categoryList.map((category) => {
          queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.USERS, category, id],
            queryFn: () => getUsersCategories({ category, id }),
          });
        }),
      );
    } else {
      await Promise.all(
        categoryList.map((category) => {
          queryClient.prefetchQuery({
            queryKey: [QUERY_KEY.USERS, category],
            queryFn: () => getUsersCategories({ category }),
          });
        }),
      );
    }
  };

  return handleHoverMateList;
};
