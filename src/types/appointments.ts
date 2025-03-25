export type AppointmentInputs = {
  title: string;
  address: { place: string; detailPlace: string };
  content: string;
  date: string;
  category: string[];
};
