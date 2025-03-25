import UserProfile from '../_components/UserProfile';
import Appointments from '../_components/Appointments';

const MyPage = () => {
  return (
    <div className="flex justify-center gap-20">
      <UserProfile />
      <Appointments />
    </div>
  );
};

export default MyPage;
