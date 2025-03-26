import UserCardList from './UserCardList';
import { Button } from '@/ui/shadcn/button';

type CategoryCardSectionProps = {
  categories: string[];
};

const CategoryCardSection = ({ categories }: CategoryCardSectionProps) => {
  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <div className="flex flex-row w-full pl-1 pt-2">
            <Button variant={'label'} size={'label'}>
              {category}
            </Button>
            <div className="text-title-sm pl-3">
              같이 할 파우니를 찾고있어요!
            </div>
          </div>
          <UserCardList category={category} />
        </div>
      ))}
    </>
  );
};

export default CategoryCardSection;
