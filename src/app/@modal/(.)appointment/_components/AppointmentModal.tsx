'use client';

import AppointmentForm from '@/app/appointment/_components/AppointmentForm';
import useClickOutside from '@/hooks/useClickOutside';
import React from 'react';

const AppointmentModal = ({ chatId }: { chatId: number }) => {
  const modalRef = useClickOutside();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-lg text-center w-[80%]"
        ref={modalRef}
      >
        <AppointmentForm chatId={chatId} />
      </div>
    </div>
  );
};

export default AppointmentModal;
