import CategoryCardSection from './CategoryCardSection';

type AuthCardListProps = {
  myCategories: string[];
  notMyCategories: string[];
};

const AuthCardList = ({ myCategories, notMyCategories }: AuthCardListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[1380px] px-4 pt-8">
        <h1 className="text-title-md text-main1 font-bold">
          관심있는 카테고리
        </h1>
        <CategoryCardSection categories={myCategories} />
        <h1 className="text-title-md text-main1 font-bold">
          다른 운동 파우니도 찾아보세요
        </h1>
        <CategoryCardSection categories={notMyCategories} />
      </div>
    </div>
  );
};

export default AuthCardList;
