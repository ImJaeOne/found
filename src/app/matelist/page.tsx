import { getUsers } from '@/services/getServices';
import UserCardList from './_components/UserCardList';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const MateListPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return (
    <div className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserCardList />
      </HydrationBoundary>
    </div>
  );
};

export default MateListPage;
