'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/utils/lib/cn';
import { PopoverTrigger, Popover, PopoverContent } from '@/ui/shadcn/popover';
import { Button } from '@/ui/shadcn/button';
import { Calendar } from '@/ui/shadcn/calendar';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { AppointmentInputs } from '@/types/appointments';

type DatePickerProps = {
  // onChange: (date: Date | undefined) => void;
  appointmentSetValue: UseFormSetValue<AppointmentInputs>;
  getValues: UseFormGetValues<AppointmentInputs>;
};

export function DatePickerDemo({
  appointmentSetValue,
  getValues,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const newDate = format(selectedDate, 'yyyy년 MM월 dd일');
      appointmentSetValue('date', newDate);
    }
  };

  // const getDate = getValues('date');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal bg-main2 h-8 rounded-xl',
            !date && 'text-muted-foreground',
            'border border-transparent hover:border-main1 hover:bg-main2',
          )}
        >
          <CalendarIcon className="mr-2 text-main1 text-lg" />
          <span className="w-full text-center">
            {date ? format(date, 'yyyy년 MM월 dd일') : '날짜를 선택해주세요'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
