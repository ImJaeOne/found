import { ReactNode } from 'react';
import { GrEdit } from 'react-icons/gr';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/avatar';

const UserProfile = ({
  user,
  children,
  edit,
}: {
  user: User;
  children: ReactNode;
  edit: boolean;
}) => {
  const profileImg = '/images/found_default_profile01.png';
  const { nick_name, bio, categories } = user;

  return (
    <div className="flex flex-col gap-5 max-w-[300px]">
      <Avatar size="50">
        <AvatarImage src={profileImg} />
        <AvatarFallback>profile_image</AvatarFallback>
      </Avatar>
      {edit ? (
        <div className="flex justify-between items-center">
          <div className="text-title-lg font-bold">{nick_name}</div>
          <GrEdit />
        </div>
      ) : (
        <div className="text-title-lg font-bold">{nick_name}</div>
      )}
      <div className="text-lg">{bio}</div>
      <div className="flex">
        {categories.map((category) => (
          <div key={category}>{category}</div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default UserProfile;

type User = {
  nick_name: string;
  bio: string;
  categories: string[];
};
