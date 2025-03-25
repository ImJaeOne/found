'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';
import AppointmentForm, {
  Appointment,
} from '@/app/appointment/_components/AppointmentForm';

const AppointmentModal = () => {
  const router = useRouter();
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    title: '',
    content: '',
    date: '',
    category: '',
  });

  const modalRef = useClickOutside();

  //react-hook-form 이후 수정해야함
  // const { place, handlePostcodeSearch, handlePlaceChange } = useAddressChange();

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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-lg text-center w-[80%]"
        ref={modalRef}
      >
        <AppointmentForm
          newAppointment={newAppointment}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleAddClick={handleAddClick}
        />
      </div>
    </div>
  );
};

export default AppointmentModal;
