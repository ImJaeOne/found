'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/shadcn/avatar';
import { useAuthStore } from '@/providers/AuthProvider';
import { UserData } from '@/types/users';
import ProfileDialog from './ProfileDialog';
import { Switch } from '@/ui/shadcn/switch';
import { useEditProfileMutation } from '@/hooks/mutations/useEditProfileMutation';
import {
  useProfileImageQuery,
  useGetUserQuery,
} from '@/hooks/queries/useUserQuery';
import { Button } from '@/ui/shadcn/button';
import { ImageType } from '@/types/image';

const UserProfile = () => {
  const user: UserData | null = useAuthStore((state) => state.user);
  const { mutate: updateUser } = useEditProfileMutation(user?.id || 0);
  const { data: userData, isPending, isError } = useGetUserQuery(user!.id);
  const {
    data,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = useProfileImageQuery(userData?.profile, {
    enabled: !!userData?.profile, // userData.profile이 있을 때만 쿼리 실행
  });

  const defaultUserData: UserData = {
    id: 0,
    profile: '',
    nickname: '',
    bio: '',
    is_finding: false,
    address: '',
    sub: '',
    categories: [],
  };

  const clickHandler = () => {
    updateUser({
      data: {
        ...defaultUserData,
        ...userData,
        is_finding: !userData?.is_finding,
      },
    });
  };

  const profileImage = data as ImageType;

  if (isPending || isPendingProfile) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isErrorProfile) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-5 max-w-[300px]">
      <Avatar size="150">
        <AvatarImage src={profileImage?.publicUrl} />
        <AvatarFallback>profile_image</AvatarFallback>
      </Avatar>
      <div className="text-title-lg font-bold">{userData?.nickname}</div>
      <div className="flex flex-col gap-1 text-md text-medium-gray">
        <div>{userData?.address}</div>
        <div>{userData?.bio}</div>
      </div>
      <div className="flex gap-2">
        {userData?.user_categories.map((category) => (
          <Button variant="label" size="label" key={category.category}>
            {category.category}
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center gap-10 mt-10">
        <div className="flex items-center gap-2">
          <div className="text-medium-gray text-sm">프로필 공개</div>
          <Switch checked={userData?.is_finding} onClick={clickHandler} />
        </div>
        <ProfileDialog />
      </div>
    </div>
  );
};

export default UserProfile;
