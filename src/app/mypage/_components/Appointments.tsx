'use client';

import SectionHeader from './SectionHeader';
import { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { useAppointmentQuery } from '@/hooks/queries/useAppointmentQuery';
import { useAuthStore } from '@/providers/AuthProvider';

const Appointments = () => {
  const user = useAuthStore((state) => state.user);
  const { data: appointments } = useAppointmentQuery(user?.id || 0);
  const [selected, setSelected] = useState<'upcoming' | 'previous'>('upcoming');

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader selected={selected} setSelected={setSelected} />
      <div>
        {appointments?.map((appointment) => (
          <AppointmentCard key={appointment.id} data={appointment} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
