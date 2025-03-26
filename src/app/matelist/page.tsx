import { createClient } from '@/services/server';
import AuthCardList from './_components/AuthCardList';
import { CATEGORIES } from '@/constants/constants';
import PublicCardList from './_components/PublicCardList';

export const generateMetadata = async () => {
  const serverClient = await createClient();
  const { data } = await serverClient.auth.getUser();
  return {
    title: `${data.user?.user_metadata.nickname}님과 함께할 파우니를 만나보세요.`,
    description: '운동 메이트를 쉽게 구하고 운동을 시작해보세요.',
  };
};

const MateListPage = async () => {
  const categoryList = Object.values(CATEGORIES);
  const serverClient = await createClient();
  const { data } = await serverClient.auth.getUser();
  const userSession = data.user?.user_metadata;
  let myCategories: string[] = [];
  let notMyCategories: string[] = [];

  if (data.user) {
    myCategories = userSession!.categories;

    notMyCategories = categoryList.filter(
      (category) => !myCategories.includes(category),
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {data.user ? (
        <AuthCardList
          myCategories={myCategories}
          notMyCategories={notMyCategories}
        />
      ) : (
        <PublicCardList />
      )}
    </div>
  );
};

export default MateListPage;
