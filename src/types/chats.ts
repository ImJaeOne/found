export type Message = {
  id: number;
  created_at: string;
  chat_room_id: number;
  content: string;
  read_status: boolean;
  sender_id: number;
};
