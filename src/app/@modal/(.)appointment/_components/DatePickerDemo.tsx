'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/utils/lib/cn';

import { PopoverTrigger, Popover, PopoverContent } from '@/ui/shadcn/popover';
import { Button } from '@/ui/shadcn/button';
import { Calendar } from '@/ui/shadcn/calendar';

export function DatePickerDemo({
  onChange,
}: {
  onChange: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal bg-main2 h-12 rounded-xl',
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
          onSelect={handleDateSelect} // 날짜가 선택되면 handleDateSelect 호출
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
