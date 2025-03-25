import { UserData } from '@/types/users';
import { supabase } from './supabaseClient';

export const editProfile = async (user_id: string, data: UserData) => {
  const { error } = await supabase
    .from('users')
    .update({
      nickname: data.nickname,
      bio: data.bio,
      address: data.address,
    })
    .eq('id', user_id);

  if (error) {
    console.error('프로필 수정 에러', error);
    throw error;
  }

  console.log('프로필 수정 성공');
  return data;
};
