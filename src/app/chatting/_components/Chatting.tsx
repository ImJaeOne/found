'use client';

import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import MessageCard from './MessageCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/types/chats';

type AddMessage = Pick<Message, 'chat_room_id' | 'sender_id' | 'content'>;

const fetchMessages = async (chatId: number) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_room_id', chatId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

const addMessage = async ({ chat_room_id, sender_id, content }: AddMessage) => {
  const { error } = await supabase
    .from('messages')
    .insert([{ chat_room_id, sender_id, content }]);

  if (error) throw new Error(error.message);
};

const Chatting = ({ chatId }: { chatId: number }) => {
  const queryClient = useQueryClient();

  const { data: userId } = useQuery({
    queryKey: ['userId'],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userSessionId = sessionData?.session?.user.id;
      if (!userSessionId) return null;

      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('user_id', userSessionId)
        .single();

      return userData?.id || null;
    },
    staleTime: 1000 * 60, // 1분 동안 캐싱 유지
  });

  const [newMessage, setNewMessage] = useState('');

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => fetchMessages(chatId),
    staleTime: 1000 * 60,
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: addMessage,
    onSuccess: () => {
      setNewMessage('');
    },
  });

  useEffect(() => {
    const subscription = supabase
      .channel(`chat-${chatId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          queryClient.setQueryData(
            ['messages', chatId],
            (oldMessages: Message[]) => {
              return [...(oldMessages || []), payload.new];
            },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId, queryClient]);
  return (
    <>
      <div className="h-[90%] mt-10 rounded-2xl mb-6">
        <div className=" overflow-y-scroll h-full scrollbar-thin scrollbar-thumb-main1 scrollbar-track-main2 rounded-scrollbar pr-2">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              isMyMessage={message.sender_id === userId}
              isAppointment={message.appointment}
            />
          ))}
        </div>
      </div>
      <label className="relative flex">
        <input
          type="text"
          className=" w-full bg-slate-50 h-12 rounded-2xl pl-3 pr-12 placeholder:text-center"
          placeholder="채팅을 입력해주세요."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IoArrowForwardCircleSharp
          aria-label="전송 버튼"
          className="text-title-lg text-main2 hover:text-main1 cursor-pointer absolute right-0"
          onClick={() => {
            sendMessage({
              chat_room_id: chatId,
              sender_id: userId,
              content: newMessage,
            });
          }}
        />
      </label>
    </>
  );
};

export default Chatting;
