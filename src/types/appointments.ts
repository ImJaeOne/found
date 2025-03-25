export type Appointment = {
  title: string;
  place: string;
  content: string;
  date: string;
  category: string;
  chat_room_id: number;
};

export type AppointmentInputs = {
  title: string;
  address: { place: string; detailPlace: string };
  content: string;
  date: string;
  category: string[];
};
