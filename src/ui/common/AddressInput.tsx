'use client';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Button } from '../shadcn/button';
import CommonInput from './CommonInput';
import { AuthInputs } from '@/types/users';
import useAddressChange from '@/hooks/useAddressChange';
import { AppointmentInputs } from '@/types/appointments';

type AddressInputProps = {
  authWatch?: UseFormWatch<AuthInputs>;
  authSetValue?: UseFormSetValue<AuthInputs>;
  appointmentWatch?: UseFormWatch<AppointmentInputs>;
  appointmentSetValue?: UseFormSetValue<AppointmentInputs>;
};

const AddressInput = ({
  authWatch,
  authSetValue,
  appointmentWatch,
  appointmentSetValue,
}: AddressInputProps) => {
  // Address관련 커스텀 훅
  const { place, handlePostcodeSearch, handlePlaceChange } = useAddressChange({
    authSetValue,
    authWatch,
    appointmentWatch,
    appointmentSetValue,
  });

  return (
    <>
      <CommonInput
        placeholder="도로명 주소"
        height={8}
        name="place"
        value={place.place}
        disabled={true}
      />
      <div className="flex items-center gap-2">
        <CommonInput
          placeholder="상세 주소"
          height={8}
          name="detailPlace"
          type="text"
          value={place.detailPlace}
          onChange={handlePlaceChange}
        />
        <Button
          onClick={handlePostcodeSearch}
          className="bg-white text-sub1 border border-sub1 rounded-xl px-3 py-2 "
          variant="subbutton"
          size="subbutton"
        >
          주소 찾기
        </Button>
      </div>
    </>
  );
};

export default AddressInput;
