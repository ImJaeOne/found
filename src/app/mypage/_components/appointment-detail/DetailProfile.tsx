import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';

const DetailProfile = () => {
  const profieImg = '/images/found_default_profile01.png';

  return (
    <div className="flex items-center gap-6">
      <Avatar size="100">
        <AvatarImage src={profieImg} />
        <AvatarFallback>profile_image</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <div className="text-main1 font-bold">nickname</div>
          <div className="font-bold">&nbsp;님과의 약속</div>
        </div>
        <div className="text-title-sm font-bold">하체 맛도리 코스</div>
      </div>
    </div>
  );
};

export default DetailProfile;
