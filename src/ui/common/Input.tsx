type InputProps = {
  placeholder: string;
  isTextarea?: boolean;
  height?: string;
};

const Input = ({ placeholder, isTextarea = false, height }: InputProps) => {
  return (
    <div>
      {isTextarea ? (
        <textarea
          className="w-full resize-none bg-main2 h-32 rounded-xl pl-3  placeholder:text-center scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-main2 overflow-y-auto"
          placeholder="내용을 입력해주세요."
        />
      ) : (
        <input
          type="text"
          className={`w-full bg-main2 h-12 rounded-xl px-3 placeholder:text-center h-${height}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
