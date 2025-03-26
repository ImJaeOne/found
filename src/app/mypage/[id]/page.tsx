import UserProfile from '../_components/UserProfile';
import Appointments from '../_components/Appointments';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  return {
    title: `마이페이지`,
    description: `${params.id}`,
  };
};

const MyPage = ({ params }: Props) => {
  return (
    <div className="flex justify-center gap-20 mt-20">
      <UserProfile params={params} />
      <Appointments params={params} />
    </div>
  );
};

export default MyPage;

export type Props = {
  params: {
    id: number;
  };
};
