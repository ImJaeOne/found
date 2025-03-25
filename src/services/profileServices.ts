import { UserData } from '@/types/users';
import { supabase } from './supabaseClient';

export const editProfile = async (user_id: number, data: UserData) => {
  const { error } = await supabase
    .from('users')
    .update({
      nickname: data.nickname,
      bio: data.bio,
      address: data.address,
      profile: data.profile,
    })
    .eq('id', user_id);

  if (error) {
    console.error('프로필 수정 에러', error);
    throw error;
  }

  console.log('프로필 수정 성공');
  return data;
};

export const getProfile = async (user_id: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id)
    .single();

  if (error) {
    console.error('프로필 조회 에러', error);
    throw error;
  }

  console.log('프로필 조회 성공');
  return data;
};
