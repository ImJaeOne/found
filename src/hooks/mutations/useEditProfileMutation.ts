import { editProfile } from '@/services/profileServices';
import { UserData } from '@/types/users';
import { useMutation } from '@tanstack/react-query';

export const useEditProfileMutation = () => {
  return useMutation({
    mutationFn: ({ user_id, data }: { user_id: number; data: UserData }) =>
      editProfile(user_id, data),
    onSuccess: (data) => {
      console.log('프로필 수정 성공', data);
    },
    onError: (error) => {
      console.error('프로필 수정 에러', error);
    },
  });
};
