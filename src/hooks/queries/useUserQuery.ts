import { QUERY_KEY } from '@/constants/constants';
import { getProfile } from '@/services/profileServices';
import { getProfileImg } from '@/services/uploadProfile';
import { fetchChatPartner } from '@/services/usersServices';
import { UserData } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

export const useGetChatPartner = (chatId: number, user: UserData | null) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHAT_PARTNER, user?.id],
    queryFn: () => fetchChatPartner(chatId, user!.id),
    enabled: !!chatId && !!user?.id,
  });
};

export const useProfileImageQuery = (
  filePath: string | undefined,
  options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.PROFILE_IMAGE, filePath],
    queryFn: () => getProfileImg(filePath!),
    ...options,
  });
};

export const useGetUserQuery = (user_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS, user_id],
    queryFn: () => getProfile(user_id),
  });
};
