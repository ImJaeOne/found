'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/shadcn/carousel';
import UserCard from './UserCard';
import { UserData } from '@/types/users';
import { useUsersCategories } from '@/hooks/queries/useUsersCategories';
import { useAuthStore } from '@/providers/AuthProvider';

const UserCardList = ({ category }: { category: string }) => {
  const user = useAuthStore((state) => state.user);

  const {
    data: users,
    isError,
    isPending,
  } = useUsersCategories(user ? { category, id: user.id } : { category });

  if (isError) return <div>Error!</div>;
  if (isPending)
    return (
      <div className="w-full h-96 flex justify-center items-center">
        Loading!
      </div>
    );

  if (users.length === 0) {
    return (
      <div className="flex justify-center item-center">
        <h1 className="text-title-md text-main1">
          해당 운동을 원하는 파우니가 없어요ㅠ
        </h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full py-8"
      >
        <CarouselContent className="-ml-0 gap-2">
          {users.map((user: UserData, index: number) => {
            const categories = user.categories;
            return (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 pl-0"
              >
                <UserCard user={user} categories={categories} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="w-[105px] h-full absolute right-0 top-0 z-9 bg-gradient-to-r from-transparent to-white"></div>
      </Carousel>
    </section>
  );
};

export default UserCardList;
