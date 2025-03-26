import { UserData } from '@/types/users';
import { supabase } from './supabaseClient';

export const getUsersCategories = async (category) => {
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

  return data as UserData[];
};
