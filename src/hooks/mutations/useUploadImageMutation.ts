import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage } from '../../services/uploadProfile';

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ filePath, file }: { filePath: string; file: File }) =>
      uploadImage(filePath, file),
    onSuccess: (data) => {
      console.log('Image upload success', data);
      queryClient.invalidateQueries(['profileImage']);
    },
    onError: (error: Error) => {
      console.error('Image upload error', error.message);
    },
  });
};
