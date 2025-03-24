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

const CommonInput = ({
  id,
  placeholder,
  isTextarea = false,
  height,
  type = 'text',
  register,
  ...props
}: InputProps) => {
  return (
    <>
      {isTextarea ? (
        <Textarea
          className={`w-full resize-none bg-main2 min-h-${height} scrollbar-thin py-2 scrollbar-thumb-blue-400 scrollbar-track-main2 overflow-y-auto `}
          placeholder={placeholder}
          {...props}
          {...register}
        />
      ) : (
        <Input
          id={id}
          type={type} // 전달받은 type 사용
          className={`w-full bg-main2 rounded-xl px-3 h-${height}`}
          placeholder={placeholder}
          {...props}
          {...register}
        />
      )}
    </>
  );
};

export default CommonInput;
