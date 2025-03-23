import Image from 'next/image';
import profileImg from '../../../../public/images/found_default_profile01.png';

const AppointmentCard = () => {
  const user = { nick_name: 'nick_name' };
  const { nick_name } = user;

  return (
    <div className="w-[400px] text-black rounded-[16px] py-6 px-4 flex flex-col gap-2 bg-light-gray">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src={profileImg}
            alt="profile_img"
            width={50}
            height={50}
          />
          <div className="text-main1 font-bold">{nick_name}</div>
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
