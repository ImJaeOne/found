'use client';

import { Button } from '../shadcn/button';
import CommonInput from './CommonInput';

type AddressInputProps = {
  place: {
    place: string;
    detailPlace: string;
  };
  handlePostcodeSearch: () => void;
  handlePlaceChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const AddressInput = ({
  place,
  handlePostcodeSearch,
  handlePlaceChange,
}: AddressInputProps) => {
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
