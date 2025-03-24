import UserProfile from '@/ui/common/UserProfile';
import Appointments from './_components/Appointments';

const MyPage = () => {
  const user = {
    nickname: 'Nickname',
    bio: 'bio',
    categories: ['런닝', '배드민턴', '축구'],
    profile: '/images/found_default_profile01.png',
  };

  return (
    <div className="flex justify-center gap-20">
      <UserProfile user={user} edit={true}>
        <div>children</div>
      </UserProfile>
      <Appointments />
    </div>
  );
};

export default MyPage;
