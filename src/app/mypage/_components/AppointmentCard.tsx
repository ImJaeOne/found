import { useProfileImageQuery } from '@/hooks/queries/useUserQuery';
import { MyAppointment } from '@/types/appointments';
import { ImageType } from '@/types/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';

const AppointmentCard = ({ data }: { data: MyAppointment }) => {
  const { appointments, other_user_nickname, other_user_profile } = data;
  const { data: image } = useProfileImageQuery(other_user_profile, {
    enabled: !!other_user_profile,
  });

  const imageUrl = image as ImageType;

  const profileImage =
    other_user_profile.includes('found_default') ||
    other_user_profile.includes('googleusercontent') ||
    other_user_profile.includes('kakaocdn')
      ? other_user_profile
      : imageUrl?.publicUrl;

  const appointment = appointments[0];

  return (
    <div className="w-[400px] text-black rounded-[16px] py-6 px-4 flex flex-col gap-2 bg-light-gray mb-6">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar size="50">
            <AvatarImage src={profileImage} />
            <AvatarFallback>profile_image</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <div className="text-main1 font-bold">{other_user_nickname}</div>
            <div>님과의 약속</div>
          </div>
        </div>
        <div className="text-main1 px-1 font-bold text-caption">D-day</div>
      </div>
      <div className="w-full flex justify-end items-center gap-4">
        <div className="text-title-sm font-bold">{appointment?.title}</div>
        <Button variant="label" size="label">
          {appointment?.category}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;
