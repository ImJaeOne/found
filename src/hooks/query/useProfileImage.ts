'use client';

import { useAuthStore } from '@/providers/AuthProvider';
import { getProfileImg } from '@/services/uploadProfile';
import { useQuery } from '@tanstack/react-query';

export const useProfileImageQuery = () => {
  const user_id: number = useAuthStore((state) => state?.user?.id);

  return useQuery({
    queryKey: ['profileImage'],
    queryFn: () => getProfileImg(user_id),
  });
};
