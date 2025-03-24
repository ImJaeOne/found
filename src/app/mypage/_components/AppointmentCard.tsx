import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';

const AppointmentCard = () => {
  const profieImg = '/images/found_default_profile01.png';
  const user = { nickname: 'nickname' };
  const { nickname } = user;
  return (
    <div className="w-[400px] text-black rounded-[16px] py-6 px-4 flex flex-col gap-2 bg-light-gray">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar size="50">
            <AvatarImage src={profieImg} />
            <AvatarFallback>profile_image</AvatarFallback>
          </Avatar>
          <div className="text-main1 font-bold">{nickname}</div>
          <div>님과의 약속</div>
        </div>
        <div className="text-main1 px-1 font-bold text-caption">D-day</div>
      </div>
      <div className="w-full flex justify-end items-center gap-4">
        <div className="text-title-sm font-bold">하체 맛도리 코스</div>
        <div>category</div>
      </div>
    </div>
  );
};

export default AppointmentCard;
