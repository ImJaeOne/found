import UserProfile from '@/ui/common/UserProfile';
import Appointments from './(components)/Appointments';

const MyPage = () => {
  const user = {
    nick_name: 'Nickname',
    bio: 'bio',
    categories: ['런닝', '배드민턴', '축구'],
  };

  return (
    <div className="flex justify-center gap-24">
      <UserProfile user={user} edit={true}>
        <div>children</div>
      </UserProfile>
      <Appointments />
    </div>
  );
};

export default MyPage;
