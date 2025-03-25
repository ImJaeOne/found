import { createClient } from '@/services/server';
import UserCardListContainer from './_components/UserCardListContainer';

const MateListPage = async () => {
  const serverClient = await createClient();
  const { data } = await serverClient.auth.getUser();
  return <UserCardListContainer />;
};

export default MateListPage;
