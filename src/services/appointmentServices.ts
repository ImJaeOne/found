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
  // 내 userId가 포함된 채팅방 찾기
  const { data: chatRooms, error: chatRoomsError } = await supabase
    .from(TABLE_NAME.CHAT_ROOMS)
    .select('id, user1_id, user2_id')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);
  if (chatRoomsError) throw new Error(chatRoomsError.message);
  if (!chatRooms || chatRooms.length === 0) return [];
  const enrichedChatRooms = chatRooms.map((room: any) => {
    const otherUserId =
      room.user1_id === userId ? room.user2_id : room.user1_id;
    return { ...room, otherUserId };
  });
  // 모든 채팅방 id 배열
  const chatRoomIds = enrichedChatRooms.map((room: any) => room.id);
  const { data: appointments, error: appointmentsError } = await supabase
    .from(TABLE_NAME.APPOINTMENTS)
    .select('*')
    .in('chat_room_id', chatRoomIds);
  if (appointmentsError) throw new Error(appointmentsError.message);
  const appointmentsMap = new Map<number, any[]>();
  chatRoomIds.forEach((id) => appointmentsMap.set(id, []));
  appointments.forEach((appointment: any) => {
    const arr = appointmentsMap.get(appointment.chat_room_id) || [];
    arr.push(appointment);
    appointmentsMap.set(appointment.chat_room_id, arr);
  });
  // 상대방 정보 돌기
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
  // appointments 테이블에서 is_confirmed가 true인 약속만 남김
  const result = enrichedChatRooms
    .map((room: any) => {
      const roomAppointments = appointmentsMap.get(room.id) || [];
      // 각 채팅방의 appointment 중 confirmed된 것들만 필터링
      const confirmedAppointments = roomAppointments.filter(
        (appointment: any) => appointment.is_confirmed,
      );
      if (confirmedAppointments.length === 0) return null; // confirmed 약속이 없으면 삭제
      const otherUserData = userMap.get(room.otherUserId) || null;
      return {
        ...room,
        appointments: confirmedAppointments,
        other_user_nickname: otherUserData ? otherUserData.nickname : null,
        other_user_profile: otherUserData ? otherUserData.profile : null,
      };
    })
    .filter((room) => room !== null);
  return result;
};
