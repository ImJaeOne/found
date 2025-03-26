import { CATEGORIES, QUERY_KEY } from '@/constants/constants';
import { getUsersCategories } from '@/services/getUsersCategories';
import { useQueryClient } from '@tanstack/react-query';

export const usePrefetchUser = () => {
  const queryClient = useQueryClient();
  const categoryList = Object.values(CATEGORIES);

  const handleHoverMateList = async () => {
    await Promise.all(
      categoryList.map((category) => {
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEY.USERS, category],
          queryFn: () => getUsersCategories(category),
        });
      }),
    );
  };

  return handleHoverMateList;
};
