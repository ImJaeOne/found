import { UserData, UserQueryData } from '@/types/users';
import { supabase } from './supabaseClient';

export const editProfile = async (user_id: number, data: UserData) => {
  const { error } = await supabase
    .from('users')
    .update({
      nickname: data.nickname,
      bio: data.bio,
      address: data.address,
      profile: data.profile,
      is_finding: data.is_finding,
    })
    .eq('id', user_id);

  if (error) {
    console.error('프로필 수정 에러', error);
    throw error;
  }

  return data;
};

export const getProfile = async (user_id: number): Promise<UserQueryData> => {
  const { data, error } = await supabase
    .from('users')
    .select(`*, user_categories (category)`)
    .eq('id', user_id)
    .single();

  if (error) {
    console.error('프로필 조회 에러', error);
    throw error;
  }

  return data;
};
