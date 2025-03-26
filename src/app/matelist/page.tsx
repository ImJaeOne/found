import { createClient } from '@/services/server';
import AuthCardList from './_components/AuthCardList';
import { CATEGORIES } from '@/constants/constants';
import PublicCardList from './_components/PublicCardList';

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
