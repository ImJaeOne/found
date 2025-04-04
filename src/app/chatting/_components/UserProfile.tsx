import { useProfileImageQuery } from '@/hooks/queries/useUserQuery';
import { ImageType } from '@/types/image';
import { UserData } from '@/types/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';

const UserProfile = ({ user }: { user: UserData }) => {
  const { nickname, bio, address, categories, profile } = user;

  const { data: image } = useProfileImageQuery(profile, {
    enabled: !!profile,
  });

  const imageUrl = image as ImageType;

  const profileImage =
    user.profile?.includes('found_default') ||
    user.profile?.includes('googleusercontent') ||
    user.profile?.includes('kakaocdn')
      ? user.profile
      : imageUrl?.publicUrl;

  return (
    <div className="flex flex-col gap-5 max-w-[300px] items-center ">
      <Avatar size="150">
        <AvatarImage src={profileImage} alt="profile_img" />
        <AvatarFallback>profile_image</AvatarFallback>
      </Avatar>
      <div className="text-title-md font-bold">{nickname}</div>
      <div className="text-center text-md text-medium-gray">{address}</div>
      <div className="text-center text-title-sm text-medium-gray">{bio}</div>
      <div className="flex gap-2 justify-center">
        {categories.map((category) => (
          <Button variant="label" size="label" key={category}>
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
