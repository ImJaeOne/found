'use client';

import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import MessageCard from './MessageCard';
import { useEffect, useRef } from 'react';
import { useSubscribeChat } from '@/hooks/useSubscribeChat';
import { useAuthStore } from '@/providers/AuthProvider';
import { useAddMessageMutation } from '@/hooks/mutations/useChatMutation';
import { useFetchChatMessages } from '@/hooks/queries/useChatQuery';

const Chatting = ({ chatId }: { chatId: number }) => {
  const { user } = useAuthStore((state) => state);

  useSubscribeChat(chatId);

  const {
    data: messages,
    isPending,
    isError,
    error,
  } = useFetchChatMessages(chatId);

  const { newMessage, setNewMessage, sendMessage } =
    useAddMessageMutation(chatId);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>채팅 내용을 불러올 수 없습니다.</p>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="h-full mt-10 rounded-2xl flex flex-col justify-between">
      <div className=" overflow-y-scroll h-[90%] scrollbar-thin scrollbar-thumb-main1 scrollbar-track-main2 rounded-scrollbar pr-2">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            content={message.content}
            isMyMessage={message.sender_id === user!.id}
            isAppointment={message.appointment}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <label className="relative flex mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({
              chat_room_id: chatId,
              sender_id: user!.id,
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
    </div>
  );
};

export default Chatting;
