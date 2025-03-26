import parse from 'html-react-parser';
import Link from 'next/link';

const MessageCard = ({
  content,
  isMyMessage,
  isAppointment,
}: {
  content: string;
  isMyMessage: boolean;
  isAppointment: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 text-text-sm px-12 py-4 bg-slate-50 rounded-lg">
      <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`rounded-2xl px-6 py-3 w-fit max-w-[60%] 
          ${isMyMessage ? 'bg-sub1' : 'bg-main2'}`}
        >
          {isAppointment ? parse(content) : content}
        </div>
      </div>
      {isAppointment && !isMyMessage && (
        <div className="w-full flex flex-col">
          <hr className="w-full border-main1 my-1" />
          <div className="text-main1 text-sm flex flex-col justify-center items-center font-semibold">
            <p>약속이 요청되었습니다!</p>
            <p>약속을 확인해주세요!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
