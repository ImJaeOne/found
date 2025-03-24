'use client';

import { useState } from 'react';
import { useFindAddess } from './useFindAddress';

const useAddressChange = () => {
  const [place, setPlace] = useState<{ place: string; detailPlace: string }>({
    place: '',
    detailPlace: '',
  });

  const { handlePostcodeSearch } = useFindAddess(setPlace);

  const handlePlaceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPlace((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { place, handlePostcodeSearch, handlePlaceChange };
};

export default useAddressChange;
