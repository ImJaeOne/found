'use client';

import { useFindAddess } from './useFindAddress';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { AuthInputs } from '@/types/users';

type useAddressChangePros = {
  setValue: UseFormSetValue<AuthInputs>;
  watch: UseFormWatch<AuthInputs>;
};

const useAddressChange = ({ setValue, watch }: useAddressChangePros) => {
  const { handlePostcodeSearch } = useFindAddess(setValue);

  const handlePlaceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValue(
      `address.${name}` as 'address.place' | 'address.detailPlace',
      value,
    );
  };

  return {
    place: {
      place: watch('address.place', ''),
      detailPlace: watch('address.detailPlace', ''),
    },
    handlePostcodeSearch,
    handlePlaceChange,
  };
};

export default useAddressChange;
