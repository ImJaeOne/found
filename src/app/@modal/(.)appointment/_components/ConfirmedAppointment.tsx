'use client';

import { useConfirmAppointmentMutation } from '@/hooks/mutations/useAppointmentMutation';
import { useProfileImageQuery } from '@/hooks/queries/useUserQuery';
import { Appointment } from '@/types/appointments';
import { ImageType } from '@/types/image';
import { UserData } from '@/types/users';
import CommonInput from '@/ui/common/CommonInput';
import { Avatar, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';
import { useRouter } from 'next/navigation';

const ConfirmedAppointment = ({
  chatPartner,
  appointment,
  chatId,
}: {
  chatPartner: UserData;
  appointment: Appointment;
  chatId: number;
}) => {
  const confirmAppointmentMutation = useConfirmAppointmentMutation(chatId);
  const router = useRouter();

  const { data: image } = useProfileImageQuery(chatPartner?.profile, {
    enabled: !!chatPartner?.profile,
  });

  const imageUrl = image as ImageType;

  const profileImage =
    chatPartner.profile?.includes('found_default') ||
    chatPartner.profile?.includes('googleusercontent') ||
    chatPartner.profile?.includes('kakaocdn')
      ? chatPartner.profile
      : imageUrl?.publicUrl;

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        confirmAppointmentMutation();
        router.back();
      }}
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-4">
          <Avatar size="sm">
            <AvatarImage src={profileImage} />
          </Avatar>
          <span className="font-bold text-title-sm">
            <span className="text-main1">{chatPartner.nickname}</span> 님과의
            약속
          </span>
        </div>
        {!appointment.is_confirmed && (
          <div className="flex justify-center items-center">
            <Button variant="button" size="button" type="submit">
              CHECK
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <section className="w-1/2 flex flex-col justify-between">
          <div>
            <h6 className="text-main1 text-title-sm font-bold text-left">
              TITLE
            </h6>
            <CommonInput
              placeholder="Enter title"
              height={8}
              value={appointment.title}
              disabled
            />
          </div>
          <div>
            <h6 className="text-main1 text-title-sm font-bold text-left">
              CONTENT
            </h6>
            <CommonInput
              placeholder="Enter content"
              isTextarea={true}
              height={44}
              value={appointment.content}
              disabled
            />
          </div>
        </section>
        <section className="flex flex-col w-1/2 gap-6">
          <div>
            <h6 className="text-main1 text-title-sm font-bold mb-2 text-left">
              ADDRESS
            </h6>
            <CommonInput
              placeholder="Enter address"
              height={8}
              value={appointment.address}
              disabled
            />
          </div>

          <div>
            <h6 className="text-main1 text-title-sm font-bold mb-2 text-left">
              DATE
            </h6>
            <CommonInput
              placeholder="Enter date"
              height={8}
              value={appointment.date}
              disabled
            />
          </div>

          <div>
            <h6 className="text-main1 text-title-sm font-bold text-left">
              SPORT
            </h6>
            <div className="flex">
              <Button variant="label" size="label" key={appointment.category}>
                {appointment.category}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};

export default ConfirmedAppointment;
