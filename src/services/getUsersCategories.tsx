import { UserData } from '@/types/users';
import { supabase } from './supabaseClient';

export const getUsersCategories = async ({
  category,
  id,
}: {
  category: string;
  id?: number;
}) => {
  const { data, error } = await supabase.rpc(
    'get_users_with_category_all_categories',
    {
      target_category: category,
    },
  );
  if (error) {
    console.error('Supabase RPC 에러:', error);
    throw new Error('users 데이터를 불러오지 못했습니다');
  }

  const users = data as UserData[];
  const usersFingind = users.filter((user) => user.is_finding);
  if (id) {
    const filteredData = usersFingind.filter((item) => item.id !== id);

    return filteredData as UserData[];
  }
  return usersFingind as UserData[];
};
