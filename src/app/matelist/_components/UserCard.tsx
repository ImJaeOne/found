'use client';

import { useProfileImageQuery } from '@/hooks/queries/useUserQuery';
import useStartChat from '@/hooks/useGoChatting';
import { useAuthStore } from '@/providers/AuthProvider';
import { ImageType } from '@/types/image';
import { UserData } from '@/types/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';

const UserCard = ({
  user,
  categories,
}: {
  user: UserData;
  categories: string[];
}) => {
  const userSession = useAuthStore((state) => state.user);
  const { data: image } = useProfileImageQuery(user.profile, {
    enabled: !!user.profile,
  });

  const imageUrl = image as ImageType;

  const profileImage =
    user.profile?.includes('found_default') ||
    user.profile?.includes('googleusercontent') ||
    user.profile?.includes('kakaocdn')
      ? user.profile
      : imageUrl?.publicUrl;

  const startChat = useStartChat();

  return (
    <article className="flex flex-col min-w-80 max-w-80 h-80 bg-white rounded-3xl p-7 border-2 border-main2">
      <div className="flex flex-row w-full mb-4">
        <figure>
          <Avatar size="60">
            <AvatarImage src={profileImage} alt="profile_img" />
            <AvatarFallback>profile_image</AvatarFallback>
          </Avatar>
        </figure>
        <div className="flex flex-col pl-6">
          <div className="text-2xl text-black font-bold">{user.nickname}</div>
          <p className="text-text-md text-medium-gray line-clamp-1">
            {user.address}
          </p>
        </div>
      </div>
      <p className="text-text-lg text-black  text-center line-clamp-1">
        {user.bio}
      </p>
      <div className="flex flex-col items-center w-full justify-between gap-2 flex-1">
        <div className="flex flex-row w-full flex-wrap justify-center gap-1 mt-2">
          {categories.map((category) => (
            <Button
              key={`${category}-${crypto.randomUUID()}`}
              variant={'label'}
              size={'label'}
            >
              {category}
            </Button>
          ))}
        </div>
        {userSession && (
          <div className="mt-7">
            <Button
              variant={'button'}
              size={'button'}
              onClick={() => startChat(userSession.id, user.id)}
            >
              CHAT ROOM
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;
