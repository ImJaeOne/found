'use server';
import { createClient } from '@/services/server';
import AuthCardList from './_components/AuthCardList';
import { CATEGORIES, QUERY_KEY } from '@/constants/constants';
import PublicCardList from './_components/PublicCardList';
import { QueryClient } from '@tanstack/react-query';
import { getUsersCategories } from '@/services/getUsersCategories';

const MateListPage = async () => {
  const queryClient = new QueryClient();
  const categoryList = Object.values(CATEGORIES);
  const serverClient = await createClient();
  const { data } = await serverClient.auth.getUser();
  const userSession = data.user?.user_metadata;

  //{user : null}
  // console.log(data);

  let myCategories = [];
  let notMyCategories = [];

  if (data.user) {
    myCategories = userSession.categories;

    notMyCategories = categoryList.filter(
      (category) => !myCategories.includes(category),
    );
  }

  await Promise.all(
    categoryList.map((category) => {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.USERS, category],
        queryFn: () => getUsersCategories(category),
      });
    }),
  );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      {data.user ? (
        <AuthCardList
          myCategories={myCategories}
          notMyCategories={notMyCategories}
        />
      ) : (
        <PublicCardList />
      )}
      {/* </HydrationBoundary> */}
    </div>
  );
};

export default MateListPage;
