'use client';

import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import MessageCard from './MessageCard';
import { useEffect, useRef, useState } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    staleTime: 1000 * 60,
  });

  const [newMessage, setNewMessage] = useState('');

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => fetchMessages(chatId),
    staleTime: 1000 * 60,
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: addMessage,
    mutationKey: ['messages', chatId],
    onSuccess: () => {
      setNewMessage('');
    },
  });

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
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
          <div ref={messagesEndRef} />
        </div>
      </div>
      <label className="relative flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({
              chat_room_id: chatId,
              sender_id: userId,
              content: newMessage,
            });
          }}
          className="w-full flex"
        >
          <input
            type="text"
            className="w-full bg-slate-50 h-12 rounded-2xl pl-3 pr-12 placeholder:text-center"
            placeholder="채팅을 입력해주세요."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            aria-label="전송 버튼"
            className={`text-title-lg  cursor-pointer absolute right-0 ${
              newMessage
                ? 'hover:text-main1 text-main1'
                : 'opacity-50 cursor-not-allowed text-main2'
            }`}
            disabled={!newMessage}
          >
            <IoArrowForwardCircleSharp />
          </button>
        </form>
      </label>
    </>
  );
};

export default Chatting;
