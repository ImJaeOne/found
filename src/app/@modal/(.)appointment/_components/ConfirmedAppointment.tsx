'use client';

import { useConfirmAppointmentMutation } from '@/hooks/mutations/useAppointmentMutation';
import { Appointment } from '@/types/appointments';
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
            <AvatarImage src={chatPartner.profile} />
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

      <div className="flex gap-2 ">
        <section className="w-1/2">
          <div>
            <h6 className="text-main1 text-title-sm font-bold">TITLE</h6>
            <CommonInput
              placeholder="Enter title"
              height={8}
              value={appointment.title}
              disabled
            />
          </div>
          <div>
            <h6 className="text-main1 text-title-sm font-bold">CONTENT</h6>
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
            <h6 className="text-main1 text-title-sm font-bold mb-2">ADDRESS</h6>
            <CommonInput
              placeholder="Enter address"
              height={8}
              value={appointment.address}
              disabled
            />
          </div>

          <div>
            <h6 className="text-main1 text-title-sm font-bold mb-2">DATE</h6>
            <CommonInput
              placeholder="Enter date"
              height={8}
              value={appointment.date}
              disabled
            />
          </div>

          <div>
            <h6 className="text-main1 text-title-sm font-bold ">SPORT</h6>
            <Button variant="label" size="label" key={appointment.category}>
              {appointment.category}
            </Button>
          </div>
        </section>
      </div>
    </form>
  );
};

export default ConfirmedAppointment;
