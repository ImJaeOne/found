import { QUERY_KEY } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
import { Message } from '@/types/chats';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useSubscribeChat = (chatId: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const subscription = supabase
      .channel(`chat-${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${chatId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;

          queryClient.setQueryData(
            [QUERY_KEY.MESSAGES, chatId],
            (oldMessages: Message[] = []) => [...oldMessages, newMessage],
          );

          if (newMessage.appointment) {
            queryClient.setQueryData(
              [QUERY_KEY.APPOINTMENTS, chatId],
              () => newMessage.appointment,
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId, queryClient]);
};
