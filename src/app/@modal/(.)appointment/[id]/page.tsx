'use client';

import useClickOutside from '@/hooks/useClickOutside';
import AppointmentForm from '@/app/appointment/_components/AppointmentForm';

const AppointmentModal = () => {
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
        <AppointmentForm />
      </div>
    </div>
  );
};

export default AppointmentModal;
