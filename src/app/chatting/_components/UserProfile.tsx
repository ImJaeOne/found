import { UserData } from '@/types/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';

const UserProfile = ({ user }: { user: UserData }) => {
  const { nickname, bio, address, categories, profile } = user;

  return (
    <div className="flex flex-col gap-5 max-w-[300px] items-center ">
      <Avatar size="150">
        <AvatarImage src={profile} />
        <AvatarFallback>profile_image</AvatarFallback>
      </Avatar>
      <div className="text-title-lg font-bold">{nickname}</div>
      <div className="text-center text-md text-medium-gray">{address}</div>
      <div className="text-center text-md text-medium-gray">{bio}</div>
      <div className="flex gap-2 flex-wrap justify-center">
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
