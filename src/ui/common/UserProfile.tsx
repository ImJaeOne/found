import Image from 'next/image';
import profileImg from '../../../public/images/found_default_profile01.png';
import { ReactNode } from 'react';
import { GrEdit } from 'react-icons/gr';

const UserProfile = ({
  user,
  children,
  edit,
}: {
  user: User;
  children: ReactNode;
  edit: boolean;
}) => {
  const { nick_name, bio, categories } = user;

  return (
    <div className="flex flex-col gap-5 max-w-[300px]">
      <Image
        className="rounded-full"
        src={profileImg}
        alt="profile_img"
        width={250}
        height={250}
      />
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
