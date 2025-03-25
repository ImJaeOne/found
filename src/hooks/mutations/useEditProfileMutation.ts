import { editProfile } from '@/services/profileServices';
import { UserData } from '@/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditProfileMutation = (user_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: UserData }) => editProfile(user_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userData-${user_id}`] });
    },
    onError: (error) => {
      console.error('프로필 수정 에러', error);
    },
  });
};
