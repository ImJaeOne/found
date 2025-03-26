import CategoryCardSection from './CategoryCardSection';

type AuthCardListProps = {
  myCategories: string[];
  notMyCategories: string[];
};

const AuthCardList = ({ myCategories, notMyCategories }: AuthCardListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[1380px] px-4 pt-8 flex flex-col gap-12">
        {/* 관심있는 카테고리 섹션 */}
        <div className="w-full">
          <h1 className="text-title-md text-main1 font-semibold mb-4">
            관심있는 카테고리
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            나만의 맞춤 운동 카테고리로, 내가 관심 있는 운동을 더 쉽게 찾을 수
            있어요!
          </p>
          <CategoryCardSection categories={myCategories} />
        </div>

        {/* 다른 운동 카테고리 섹션 */}
        <div className="w-full">
          <h1 className="text-title-md text-main1 font-semibold mb-4">
            다른 운동도 찾아보세요
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            새로운 운동을 찾아보고, 다양한 카테고리에서 운동을 발견해보세요.
          </p>
          <CategoryCardSection categories={notMyCategories} />
        </div>

        {/* 추가 기능을 위한 버튼 */}
        <div className="w-full text-center mt-6">
          <button className="text-main1 text-lg font-semibold hover:underline">
            더 많은 운동 카테고리 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthCardList;
