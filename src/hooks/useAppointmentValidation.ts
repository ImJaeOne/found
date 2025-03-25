'use client';

import { AppointmentInputs } from '@/types/appointments';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useAppointmentValidation = () => {
  //경로 이동을 위한 route
  const route = useRouter();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: appointmentSetValue,
    getValues,
    watch: appointmentWatch,
  } = useForm<AppointmentInputs>();

  // 약속 추가 로직
  const addNewAppointment = (data: AppointmentInputs) => {
    console.log('data', data);
  };

  const onSubmit = (data: AppointmentInputs) => {
    addNewAppointment(data);
  };

  return {
    register,
    appointmentWatch,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    appointmentSetValue,
  };
};

export default useAppointmentValidation;
