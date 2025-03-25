'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import AppointmentForm, { Appointment } from './_components/AppointmentForm';

const AppointmentPage = () => {
  const router = useRouter();
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    title: '',
    content: '',
    date: '',
    category: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 추후 supabase upsert
  const handleAddClick = () => {
    // console.log('appointment', { ...newAppointment, ...place });
    router.back();
  };

  // DatePickerDemo에서 날짜가 선택될 때 상태 업데이트
  const handleDateChange = (date: Date | undefined) => {
    setNewAppointment((prev) => ({
      ...prev,
      date: date ? format(date, 'yyyy년 MM월 dd일') : '',
    }));
  };

  return (
    <div className="container mx-auto py-10">
      <AppointmentForm
        newAppointment={newAppointment}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleAddClick={handleAddClick}
      />
    </div>
  );
};

export default AppointmentPage;
