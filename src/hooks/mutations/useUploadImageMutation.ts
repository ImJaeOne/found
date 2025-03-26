import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage } from '../../services/uploadProfile';
import { QUERY_KEY } from '@/constants/constants';

export const useUploadProfileImage = (user_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ filePath, file }: { filePath: string; file: File }) =>
      uploadImage(filePath, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS, user_id],
      });
    },
    onError: (error: Error) => {
      console.error('Image upload error', error.message);
    },
  });
};
