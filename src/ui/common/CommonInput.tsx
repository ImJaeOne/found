import { Input } from '../shadcn/input';
import { Textarea } from '../shadcn/textarea';

type InputProps = {
  placeholder: string;
  isTextarea?: boolean;
  height: number;
};

const CommonInput = ({
  placeholder,
  isTextarea = false,
  height,
}: InputProps) => {
  return (
    <div className="rounded-xl">
      {isTextarea ? (
        <Textarea
          className={`w-[60%] resize-none bg-main2 h-${height} scrollbar-thin py-2 scrollbar-thumb-blue-400 scrollbar-track-main2 overflow-y-auto `}
          placeholder={placeholder}
        />
      ) : (
        <Input
          type="text"
          className={`w-full bg-main2 rounded-xl px-3 h-${height}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CommonInput;
