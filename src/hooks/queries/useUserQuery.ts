import { fetchChatPartner } from '@/services/usersServices';
import { UserData } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

export const useGetChatPartner = (chatId: number, user: UserData | null) => {
  return useQuery({
    queryKey: ['userInfo', user?.id],
    queryFn: () => fetchChatPartner(chatId, user!.id),
    enabled: !!chatId && !!user?.id,
  });
};
