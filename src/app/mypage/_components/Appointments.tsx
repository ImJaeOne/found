'use client';

import SectionHeader from './SectionHeader';
import { useState } from 'react';
import AppointmentCard from './AppointmentCard';

const Appointments = () => {
  const [selected, setSelected] = useState<'upcoming' | 'previous'>('upcoming');

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader selected={selected} setSelected={setSelected} />
      <AppointmentCard />
    </div>
  );
};

export default Appointments;
