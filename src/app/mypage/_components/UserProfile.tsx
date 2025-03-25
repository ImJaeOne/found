'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/shadcn/avatar';
import { Button } from '../../../ui/shadcn/button';
import { useAuthStore } from '@/providers/AuthProvider';
import { UserData } from '@/types/users';
import ProfileDialog from './ProfileDialog';
import { Switch } from '@/ui/shadcn/switch';
import { useEditProfileMutation } from '@/hooks/mutations/useEditProfileMutation';
import { useProfileImageQuery } from '@/hooks/query/useProfileImage';

const UserProfile = () => {
  const user: UserData | null = useAuthStore((state) => state.user);
  const { data: profileImage } = useProfileImageQuery();
  const { mutate: updateUser } = useEditProfileMutation();

  console.log(profileImage?.publicUrl);
  console.log(user);

  return (
    <div className="flex flex-col gap-5 max-w-[300px]">
      <Avatar size="150">
        <AvatarImage src={profileImage?.publicUrl || user?.profile} />
        <AvatarFallback>profile_image</AvatarFallback>
      </Avatar>
      <div className="text-title-lg font-bold">{user?.nickname}</div>
      <div className="flex flex-col gap-1 text-md text-medium-gray">
        <div>{user?.address}</div>
        <div>{user?.bio}</div>
      </div>
      <div className="flex gap-2">
        {user?.categories.map((category) => (
          <Button variant="label" size="label" key={category}>
            {category}
          </Button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center gap-10 mt-10">
        <div className="flex items-center gap-2">
          <div className="text-medium-gray text-sm">프로필 공개</div>
          <Switch
            checked={user?.isFinding}
            onClick={() =>
              updateUser({
                user_id: user?.id,
                data: { ...user, isFinding: !user.isFinding },
              })
            }
          />
        </div>
        <ProfileDialog />
      </div>
    </div>
  );
};

export default UserProfile;
