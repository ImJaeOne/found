import { QUERY_KEY } from '@/constants/constants';
import { addMessage } from '@/services/chatsServices';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useAddMessageMutation = (chatId: number) => {
  const [newMessage, setNewMessage] = useState('');

  const { mutate: sendMessage } = useMutation({
    mutationFn: addMessage,
    mutationKey: [QUERY_KEY.MESSAGES, chatId],
    onSuccess: () => {
      setNewMessage('');
    },
  });

  return { newMessage, setNewMessage, sendMessage };
};
