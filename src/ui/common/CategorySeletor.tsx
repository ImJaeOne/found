'use client';

import { CATEGORIES } from '@/constants/constants';
import { AUTH_ERROR_MESSAGES } from '@/constants/users';
import { toast } from '@/hooks/useToast';
import { AuthInputs } from '@/types/users';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Checkbox } from '../shadcn/checkbox';

type CategorySelectorProps = {
  mode: number;
  watch: UseFormWatch<AuthInputs>;
  setValue: UseFormSetValue<AuthInputs>;
};

const CategorySeletor = ({ mode, watch, setValue }: CategorySelectorProps) => {
  const checkedItems = watch('categories', []);

  const handleChange = (category: string, checked: boolean) => {
    const updatedItems = checked
      ? [...checkedItems, category]
      : checkedItems.filter((item: string) => item !== category);

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
          <div key={category} className="items-top flex space-x-2">
            <div className="flex items-center gap-2">
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
          </div>
        );
      })}
    </div>
  );
};

export default CategorySeletor;
