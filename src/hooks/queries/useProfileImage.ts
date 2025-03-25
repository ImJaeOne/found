import { getProfileImg } from '@/services/uploadProfile';
import { useQuery } from '@tanstack/react-query';

export const useProfileImageQuery = (
  filePath: string | undefined,
  options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['profileImage', filePath],
    queryFn: () => getProfileImg(filePath!),
    ...options,
  });
};
