'use client';

import { CATEGORIES } from '@/constants/constants';
import { AUTH_ERROR_MESSAGES } from '@/constants/users';
import { toast } from '@/hooks/useToast';
import { AuthInputs } from '@/types/users';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Checkbox } from '../shadcn/checkbox';
import { AppointmentInputs } from '@/types/appointments';

type CategorySelectorProps = {
  mode: number;
  authWatch?: UseFormWatch<AuthInputs>;
  authSetValue?: UseFormSetValue<AuthInputs>;
  appointmentWatch?: UseFormWatch<AppointmentInputs>;
  appointmentSetValue?: UseFormSetValue<AppointmentInputs>;
};

const CategorySeletor = ({
  mode,
  authWatch,
  authSetValue,
  appointmentWatch,
  appointmentSetValue,
}: CategorySelectorProps) => {
  const checkedItems = authWatch
    ? authWatch('categories', [])
    : appointmentWatch
      ? appointmentWatch('category', [])
      : [];

  const handleChange = (category: string, checked: boolean) => {
    let updatedItems;

    if (mode === 1) {
      updatedItems = checked ? [category] : []; // 하나만 선택 가능하도록 처리
    } else {
      updatedItems = checked
        ? [...checkedItems, category]
        : checkedItems.filter((item) => item !== category);

      if (updatedItems.length > mode) {
        toast({ description: `최대 ${mode}개까지 선택 가능합니다!` });
        return;
      }
    }

    if (updatedItems.length === 0) {
      toast({ description: AUTH_ERROR_MESSAGES.CATEGORIES.BLANK });
      return;
    }

    authSetValue
      ? authSetValue('categories', updatedItems)
      : appointmentSetValue
        ? appointmentSetValue('category', updatedItems)
        : [];
  };

  const categories = Object.values(CATEGORIES);

  return (
    <div className="w-full grid grid-cols-3">
      {categories.map((category) => {
        return (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              id={category}
              checked={checkedItems.includes(category)}
              onCheckedChange={(checked) =>
                handleChange(category, Boolean(checked))
              }
            />
            <label htmlFor={category} className="text-text-sm font-medium">
              {category}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySeletor;
