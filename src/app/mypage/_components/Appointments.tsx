'use client';

import SectionHeader from './SectionHeader';
import { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { useAppointmentQuery } from '@/hooks/queries/useAppointmentQuery';
import { Props } from '../[id]/page';
import Link from 'next/link';

const Appointments = ({ params }: Props) => {
  const { data: appointments } = useAppointmentQuery(Number(params.id) || 0);
  const [selected, setSelected] = useState<'upcoming' | 'previous'>('upcoming');

  const formatKoreanDateString = (dateStr: string) => {
    // "2025년 03월 26일" 형태를 "2025-03-26"로 변환
    const parts = dateStr?.split(' ');
    if (parts?.length !== 3) return dateStr; // 예상과 다른 형식일 경우 그대로 반환
    const year = parts[0].replace('년', '').trim();
    const month = parts[1].replace('월', '').trim().padStart(2, '0');
    const day = parts[2].replace('일', '').trim().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  // 선택된 옵션에 따라 약속을 필터링: upcoming은 현재 날짜 이후, previous는 이전 날짜
  const filteredAppointments = appointments?.filter((appointment) => {
    const appointmentDate = new Date(
      formatKoreanDateString(appointment.appointments[0]?.date),
    );
    return selected === 'upcoming'
      ? appointmentDate > now
      : appointmentDate <= now;
  });

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader selected={selected} setSelected={setSelected} />
      <div>
        {filteredAppointments?.map((appointment) => (
          <Link key={appointment.id} href={`/appointment/${appointment.id}`}>
            <AppointmentCard data={appointment} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
