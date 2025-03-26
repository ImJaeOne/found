'use client';

import ConfirmedAppointment from '@/app/@modal/(.)appointment/_components/ConfirmedAppointment';
import { DatePickerDemo } from '@/app/@modal/(.)appointment/_components/DatePickerDemo';
import { CATEGORIES_SELECT_MODE } from '@/constants/constants';
import { useMyAppointmentQuery } from '@/hooks/queries/useAppointmentQuery';
import { useGetChatPartner } from '@/hooks/queries/useUserQuery';
import { useAppointmentContents } from '@/hooks/useAppointmentContents';
import useAppointmentValidation from '@/hooks/useAppointmentValidation';
import { useAuthStore } from '@/providers/AuthProvider';
import { AppointmentInputs } from '@/types/appointments';
import AddressInput from '@/ui/common/AddressInput';
import CategorySeletor from '@/ui/common/CategorySeletor';
import CommonInput from '@/ui/common/CommonInput';
import { Avatar, AvatarImage } from '@/ui/shadcn/avatar';
import { Button } from '@/ui/shadcn/button';

export type AppointmentFormProps = {
  newAppointment: AppointmentInputs;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleAddClick: () => void;
};

const AppointmentForm = ({ chatId }: { chatId: number }) => {
  const loginUser = useAuthStore((state) => state.user);
  const {
    data: appointment,
    isPending: isAppointmentPending,
    isError: isAppointmentError,
    error: appointmentError,
  } = useMyAppointmentQuery(chatId);

  const {
    data: chatPartner,
    isPending,
    isError,
    error,
  } = useGetChatPartner(chatId, loginUser);

  const {
    register,
    appointmentWatch,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    appointmentSetValue,
  } = useAppointmentValidation(chatId, loginUser);

  const { AppointmentMainContents } = useAppointmentContents({ errors });

  if (isAppointmentPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (isAppointmentError)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>상대 정보를 불러올 수 없습니다...</p>
        <p>{appointmentError.message}</p>
      </div>
    );

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>상대 정보를 불러올 수 없습니다...</p>
        <p>{error.message}</p>
      </div>
    );
  if (appointment.length) {
    return (
      <ConfirmedAppointment
        chatPartner={chatPartner}
        appointment={appointment[0]}
        chatId={chatId}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
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
        <div className="flex justify-center items-center">
          <Button variant="button" size="button" type="submit">
            ADD
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <section className="w-1/2">
          {AppointmentMainContents.map((item) => {
            const {
              isTextarea,
              id,
              name,
              title,
              type,
              placeholder,
              required,
              minLength,
              maxLength,
              error,
            } = item;
            return (
              <div key={id}>
                <label htmlFor={name}>
                  <h6>{title}</h6>
                  <div>
                    <CommonInput
                      height={8}
                      isTextarea={isTextarea}
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      {...register(name, {
                        required,
                        minLength,
                        maxLength,
                      })}
                    />
                  </div>
                </label>
                <p>{error && error.message}</p>
              </div>
            );
          })}
        </section>

        {/* Sub contents : 주소, 카테고리, 날짜 */}
        <section className="w-1/2">
          {/* 주소 */}
          <label htmlFor="address">
            <h6>ADDRESS</h6>
            <AddressInput
              appointmentWatch={appointmentWatch}
              appointmentSetValue={appointmentSetValue}
            />
          </label>
          {/* 날짜 */}
          <label htmlFor="date">
            <h6>DATE</h6>
            <DatePickerDemo
              appointmentSetValue={appointmentSetValue}
              getValues={getValues}
            />
          </label>
          {/* 카테고리 */}
          <label htmlFor="categories">
            <h6>SPORT</h6>
            <CategorySeletor
              mode={CATEGORIES_SELECT_MODE.APPOINTMENT}
              appointmentWatch={appointmentWatch}
              appointmentSetValue={appointmentSetValue}
            />
          </label>
        </section>
      </div>
    </form>
  );
};

export default AppointmentForm;
