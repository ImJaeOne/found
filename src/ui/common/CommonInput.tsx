import { forwardRef } from 'react';
import { Input } from '../shadcn/input';
import { Textarea } from '../shadcn/textarea';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  id?: string;
  placeholder: string;
  isTextarea?: boolean;
  height: number;
  name?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onClick?: (
    e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  type?: string;
  register?: UseFormRegisterReturn;
};

const CommonInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      id,
      placeholder,
      isTextarea = false,
      height,
      type = 'text',
      register,
      ...props
    },
    ref,
  ) => {
    return isTextarea ? (
      <Textarea
        className={`w-full rounded-xl resize-none bg-main2 h-44 scrollbar-thin py-2 scrollbar-thumb-blue-400 scrollbar-track-main2 overflow-y-auto`}
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...props}
        {...register}
      />
    ) : (
      <Input
        id={id}
        type={type}
        className={`w-full bg-main2 rounded-xl px-3 h-${height}`}
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLInputElement>}
        {...props}
        {...register}
      />
    );
  },
);

export default CommonInput;
