import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
const useStartChat = () => {
  const router = useRouter();
  const startChat = async (user1_id: number, user2_id: number) => {
    // 기존 채팅방 조회
    const { data: existingChat, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .or(
        `and(user1_id.eq.${user1_id},user2_id.eq.${user2_id}),and(user1_id.eq.${user2_id},user2_id.eq.${user1_id})`,
      )
      .single();
    console.log(existingChat);
    if (existingChat) {
      router.push(`${PATH.CHATTING}/${existingChat.id}`);
      return;
    }
    // 새로운 채팅방 생성
    const { data: newChat, error: createError } = await supabase
      .from('chat_rooms')
      .insert([{ user1_id, user2_id }])
      .select()
      .single();
    console.log(newChat);
    if (createError) {
      console.error('채팅방 생성 실패', createError);
      return;
    }
    router.push(`${PATH.CHATTING}/${newChat.id}`);
  };
  return startChat;
};

export default useStartChat;

// 왜 계속 새로운 채팅방이 생성되는지 해결해야 함
