'use client';

import { CATEGORIES } from '@/constants/constants';
import { AUTH_ERROR_MESSAGES } from '@/constants/users';
import { toast } from '@/hooks/useToast';
import { AuthInputs } from '@/types/users';
import { ChangeEvent } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

type CategorySelectorProps = {
  mode: number;
  watch: UseFormWatch<AuthInputs>;
  setValue: UseFormSetValue<AuthInputs>;
};

const CategorySeletor = ({ mode, watch, setValue }: CategorySelectorProps) => {
  const checkedItems = watch('categories', []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const updatedItems = checked
      ? [...checkedItems, value]
      : checkedItems.filter((item: string) => item !== value);

    if (updatedItems.length > mode) {
      toast({ description: `최대 ${mode}개까지 선택 가능합니다!` });
      return;
    }

    if (updatedItems.length === 0) {
      toast({ description: AUTH_ERROR_MESSAGES.CATEGORIES.BLANK });
      return;
    }

    setValue('categories', updatedItems);
  };

  const categories = Object.values(CATEGORIES);

  return (
    <div className="grid grid-cols-3">
      {categories.map((category) => {
        return (
          <label htmlFor={category} key={category}>
            <input
              type="checkbox"
              name={category}
              onChange={handleChange}
              value={category}
              checked={checkedItems.includes(category)}
              className="w-4 h-4 appearance-none border-solid border border-sub1 rounded-sm p-2 checked:border-sub1 checked:bg-sub1"
            />
            <span>{category}</span>
          </label>
        );
      })}
    </div>
  );
};

export default CategorySeletor;
