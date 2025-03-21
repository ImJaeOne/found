import UserProfile from '@/ui/common/UserProfile';

const MyPage = () => {
  const user = {
    nick_name: 'Nickname',
    bio: 'bio',
    categories: ['런닝', '배드민턴', '축구'],
  };

  return (
    <div>
      <UserProfile user={user} edit={true}>
        <div>children</div>
      </UserProfile>
    </div>
  );
};

export default MyPage;
