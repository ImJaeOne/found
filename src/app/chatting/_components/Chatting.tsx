import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import MessageCard from './MessageCard';

const user: { id: number } = {
  id: 1,
};

const messages = [
  {
    id: 1,
    user_id: 2,
    content: '낼 운동 ㄱ?',
    appointment: false,
  },
  {
    id: 2,
    user_id: 2,
    content:
      '햄부기햄북 햄북어 햄북스딱스 함부르크햄부가우가 햄비기햄부거 햄부가티햄부기온앤 온을 차려오거라. 햄부기햄북 햄북어 햄북스딱스 함부르크햄부가우가 햄비기햄부거 햄부가티햄부기온앤 온을 차려오라고 하지않앗느냐.',
    appointment: false,
  },
  {
    id: 3,
    user_id: 1,
    content: '어디 할건데?',
    appointment: false,
  },
  {
    id: 4,
    user_id: 1,
    content: '나 내일 하체해야됨. 내일 개맛도리 운동 알려줄게',
    appointment: false,
  },
  { id: 5, user_id: 1, content: '일욜에 만나', appointment: false },
  {
    id: 6,
    user_id: 2,
    content: '낼 운동 ㄱ?',
    appointment: false,
  },
  {
    id: 7,
    user_id: 2,
    content:
      '햄부기햄북 햄북어 햄북스딱스 함부르크햄부가우가 햄비기햄부거 햄부가티햄부기온앤 온을 차려오거라. 햄부기햄북 햄북어 햄북스딱스 함부르크햄부가우가 햄비기햄부거 햄부가티햄부기온앤 온을 차려오라고 하지않앗느냐.',
    appointment: false,
  },
  {
    id: 8,
    user_id: 1,
    content: '어디 할건데?',
    appointment: false,
  },
  {
    id: 9,
    user_id: 1,
    content: '나 내일 하체해야됨. 내일 개맛도리 운동 알려줄게',
    appointment: false,
  },
  {
    id: 10,
    user_id: 2,
    content:
      '<p>햄부기님이 약속 요청을 보냈어요!</p><p>약속 확인 후 수락 버튼을 눌러주세요!</p><div class="flex justify-center mt-4"><button class="text-white bg-main1 rounded-lg px-4 py-2">CHECK</button></div>',
    appointment: true,
  },
  { id: 11, user_id: 1, content: '일욜에 만나', appointment: false },
];

const Chatting = () => {
  return (
    <>
      <div className="h-[90%] mt-10 rounded-2xl mb-6">
        <div className=" overflow-y-scroll h-full scrollbar-thin scrollbar-thumb-main1 scrollbar-track-main2 rounded-scrollbar pr-2">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              isMyMessage={message.user_id === user.id}
              isAppointment={message.appointment}
            />
          ))}
        </div>
      </div>
      <label className="relative flex">
        <input
          type="text"
          className=" w-full bg-slate-50 h-12 rounded-2xl pl-3 pr-12 placeholder:text-center"
          placeholder="채팅을 입력해주세요."
        />
        <IoArrowForwardCircleSharp
          aria-label="전송 버튼"
          className="text-title-lg text-main2 hover:text-main1 cursor-pointer absolute right-0"
        />
      </label>
    </>
  );
};

export default Chatting;
