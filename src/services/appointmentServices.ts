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
