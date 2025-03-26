export type Appointment = {
  title: string;
  address: string;
  content: string;
  date: string;
  category: string;
  chat_room_id: number;
  is_confirmed: boolean;
};

export type AppointmentInputs = {
  title: string;
  address: { place: string; detailPlace: string };
  content: string;
  date: string;
  category: string[];
};

export type MyAppointment = {
  appointments: Appointment[];
  id: number;
  otherUserId: number;
  other_user_nickname: string;
  other_user_profile: string;
  user1_id: number;
  user2_id: number;
};
