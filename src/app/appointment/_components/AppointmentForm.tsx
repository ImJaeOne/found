'use client';

import AppointmentSpan from '@/app/@modal/(.)appointment/_components/AppointmentSpan';
import { DatePickerDemo } from '@/app/@modal/(.)appointment/_components/DatePickerDemo';
import CommonInput from '@/ui/common/CommonInput';
import { Avatar, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';
import React from 'react';

export type Appointment = {
  title: string;
  content: string;
  date: string;
  category: string;
};

export interface AppointmentFormProps {
  newAppointment: Appointment;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleAddClick: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  newAppointment,
  handleChange,
  handleDateChange,
  handleAddClick,
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-4">
          <Avatar size="sm">
            <AvatarImage src="/images/found_default_profile01.png" />
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
    </>
  );
};

export default AppointmentForm;
