'use client';

import { useFindAddess } from './useFindAddress';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { AuthInputs } from '@/types/users';
import { AppointmentInputs } from '@/types/appointments';

type useAddressChangePros = {
  authWatch?: UseFormWatch<AuthInputs>;
  appointmentWatch?: UseFormWatch<AppointmentInputs>;
  authSetValue?: UseFormSetValue<AuthInputs>;
  appointmentSetValue?: UseFormSetValue<AppointmentInputs>;
};

const useAddressChange = ({
  authWatch,
  authSetValue,
  appointmentWatch,
  appointmentSetValue,
}: useAddressChangePros) => {
  const { handlePostcodeSearch } = useFindAddess({
    authSetValue,
    appointmentSetValue,
  });

  const handlePlaceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    appointmentSetValue
      ? appointmentSetValue(
          `address.${name}` as 'address.place' | 'address.detailPlace',
          value,
        )
      : authSetValue
        ? authSetValue(
            `address.${name}` as 'address.place' | 'address.detailPlace',
            value,
          )
        : undefined;
  };

  return {
    place: appointmentWatch
      ? {
          place: appointmentWatch('address.place', ''),
          detailPlace: appointmentWatch('address.detailPlace', ''),
        }
      : authWatch
        ? {
            place: authWatch('address.place', ''),
            detailPlace: authWatch('address.detailPlace', ''),
          }
        : {
            place: undefined,
            detailPlace: undefined,
          },
    handlePostcodeSearch,
    handlePlaceChange,
  };
};

export default useAddressChange;
