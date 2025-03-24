'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';
import CommonInput from '@/ui/common/CommonInput';
import AppointmentSpan from './_components/AppointmentSpan';
import { DatePickerDemo } from './_components/DatePickerDemo';
import { format } from 'date-fns';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';

type Appointment = {
  title: string;
  content: string;
  date: string;
  category: string;
};

const AppointmentPage = () => {
  const router = useRouter();
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    title: '',
    content: '',
    date: '',
    category: '',
  });

  const modalRef = useClickOutside();

  //react-hook-form 이후 수정해야함
  // const { place, handlePostcodeSearch, handlePlaceChange } = useAddressChange();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 추후 supabase upsert
  const handleAddClick = () => {
    // console.log('appointment', { ...newAppointment, ...place });
    router.back();
  };

  // DatePickerDemo에서 날짜가 선택될 때 상태 업데이트
  const handleDateChange = (date: Date | undefined) => {
    setNewAppointment((prev) => ({
      ...prev,
      date: date ? format(date, 'yyyy년 MM월 dd일') : '',
    }));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-lg text-center w-[80%]"
        ref={modalRef}
      >
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-4">
            <Avatar size="sm">
              <AvatarImage src="/images/found_default_profile01.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="font-bold text-title-sm">
              <span className="text-main1">햄부기</span> 님과의 약속
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Button variant="button" size="button" onClick={handleAddClick}>
              ADD
            </Button>
          </div>
        </div>
        {/* Main content */}
        <div className="pt-7">
          <div className="flex gap-12">
            <div className="flex flex-col w-[55%] gap-8">
              <div className="flex flex-col gap-4">
                <AppointmentSpan label={'TITLE'} />
                <CommonInput
                  placeholder="제목을 입력해주세요."
                  height={8}
                  name="title"
                  type="text"
                  value={newAppointment.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-4">
                <AppointmentSpan label={'CONTENT'} />
                <CommonInput
                  placeholder="내용을 입력해주세요."
                  isTextarea={true}
                  height={60}
                  name="content"
                  value={newAppointment.content}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-[40%]">
              <div className="flex flex-col gap-4">
                <AppointmentSpan label={'PLACE'} />
                <div className="flex flex-col gap-1">
                  <>
                    {/* react-hook-form 이후에 수정 */}
                    {/* <AddressInput
                      handlePostcodeSearch={handlePostcodeSearch}
                      handlePlaceChange={handlePlaceChange}
                    /> */}
                  </>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <AppointmentSpan label={'DATE'} />
                <DatePickerDemo onChange={handleDateChange} />
              </div>
              <div className="flex flex-col gap-4">
                <AppointmentSpan label={'CATEGORY'} />
                <CommonInput
                  placeholder="카테고리"
                  height={8}
                  name="category"
                  value={newAppointment.category}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
