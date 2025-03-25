import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage } from '../../services/uploadProfile';

export const useUploadProfileImage = (user_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ filePath, file }: { filePath: string; file: File }) =>
      uploadImage(filePath, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`userData-${user_id}`] });
      queryClient.invalidateQueries({ queryKey: ['profileImage'] });
    },
    onError: (error: Error) => {
      console.error('Image upload error', error.message);
    },
  });
};
