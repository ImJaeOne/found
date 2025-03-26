import { TABLE_NAME } from '@/constants/constants';
import { supabase } from './supabaseClient';
import { Appointment } from '@/types/appointments';

export const sendNewAppoinment = async (newAppointmentData: Appointment) => {
  const { data, error } = await supabase
    .from(TABLE_NAME.APPOINTMENTS)
    .upsert(newAppointmentData)
    .eq('chat_room_id', newAppointmentData.chat_room_id);

  if (error) throw new Error(error.message);
};

export const fetchAppointments = async (userId: number) => {
  // 내 userId가 포함된 채팅방 조회
  const { data: chatRooms, error: chatRoomsError } = await supabase
    .from(TABLE_NAME.CHAT_ROOMS)
    .select('id, user1_id, user2_id')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

  if (chatRoomsError) throw new Error(chatRoomsError.message);
  if (!chatRooms || chatRooms.length === 0) return [];

  // 채팅방별로 다른 user id(내 userId가 아닌 쪽) 결정
  const enrichedChatRooms = chatRooms.map((room: any) => {
    const otherUserId =
      room.user1_id === userId ? room.user2_id : room.user1_id;
    return { ...room, otherUserId };
  });

  // 모든 채팅방 id 배열
  const chatRoomIds = enrichedChatRooms.map((room: any) => room.id);

  // Step 3. 해당 채팅방의 appointments 조회 (없는 채팅방은 빈 배열로 처리)
  const { data: appointments, error: appointmentsError } = await supabase
    .from(TABLE_NAME.APPOINTMENTS)
    .select('*')
    .in('chat_room_id', chatRoomIds);

  if (appointmentsError) throw new Error(appointmentsError.message);

  // 그룹별로 appointments 분류 (없으면 빈 배열)
  const appointmentsMap = new Map<number, any[]>();
  chatRoomIds.forEach((id) => appointmentsMap.set(id, []));
  appointments.forEach((appointment: any) => {
    const arr = appointmentsMap.get(appointment.chat_room_id) || [];
    arr.push(appointment);
    appointmentsMap.set(appointment.chat_room_id, arr);
  });

  // Step 4. 상대방 user의 닉네임과 프로필 조회
  const uniqueOtherUserIds = Array.from(
    new Set(enrichedChatRooms.map((room: any) => room.otherUserId)),
  );
  const { data: otherUsers, error: otherUsersError } = await supabase
    .from('users')
    .select('id, nickname, profile')
    .in('id', uniqueOtherUserIds);

  if (otherUsersError) throw new Error(otherUsersError.message);
  const userMap = new Map<number, { nickname: string; profile: string }>();
  otherUsers.forEach((user: any) => {
    userMap.set(user.id, { nickname: user.nickname, profile: user.profile });
  });

  // Step 5. 각 채팅방에 appointments와 상대방 정보 병합
  const result = enrichedChatRooms.map((room: any) => {
    const roomAppointments = appointmentsMap.get(room.id) || [];
    const otherUserData = userMap.get(room.otherUserId) || null;
    return {
      ...room,
      appointments: roomAppointments,
      other_user_nickname: otherUserData ? otherUserData.nickname : null,
      other_user_profile: otherUserData ? otherUserData.profile : null,
    };
  });

  return result;
};

export const fetchAppointment = async (chatId: number) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('chat_room_id', chatId);

  if (error) throw new Error(error.message);
  return data;
};

export const confirmAppointment = async (chatId: number) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ is_confirmed: true })
    .eq('chat_room_id', chatId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
