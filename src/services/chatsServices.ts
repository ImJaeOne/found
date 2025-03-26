import { Message } from '@/types/chats';
import { supabase } from './supabaseClient';

export const fetchMessages = async (chatId: number) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_room_id', chatId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

type AddMessage = Pick<
  Message,
  'chat_room_id' | 'sender_id' | 'content' | 'appointment'
>;

export const addMessage = async ({
  chat_room_id,
  sender_id,
  content,
  appointment = false,
}: AddMessage) => {
  const { error } = await supabase
    .from('messages')
    .insert([{ chat_room_id, sender_id, content, appointment }]);

  if (error) throw new Error(error.message);
};

export const checkAppointmentMessage = async (chatId: number) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_room_id', chatId)
    .eq('appointment', true);

  if (error) throw new Error(error.message);

  if (data.length) {
    return true;
  } else {
    return false;
  }
};
