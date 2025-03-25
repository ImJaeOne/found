'use client';

import {
  AP_INPUT_ERROR_MESSAGES,
  AP_INPUT_PLACEHOLDER,
} from '@/constants/appointment';
import { AppointmentInputs } from '@/types/appointments';
import { FieldError, FieldErrors, RegisterOptions } from 'react-hook-form';

type AppointmentInputField = {
  isTextarea: boolean;
  id: string;
  name: keyof AppointmentInputs;
  title: string;
  type: string;
  placeholder: string;
  required?: string;
  minLength?: RegisterOptions['minLength'];
  maxLength?: RegisterOptions['maxLength'];
  error?: FieldError | undefined;
};

type AppointmentContents = {
  errors: FieldErrors<AppointmentInputs>;
};

export const useAppointmentContents = ({ errors }: AppointmentContents) => {
  const AppointmentMainContents: AppointmentInputField[] = [
    {
      isTextarea: false,
      id: 'title',
      name: 'title',
      title: 'TITLE',
      type: 'text',
      placeholder: AP_INPUT_PLACEHOLDER.TITLE,
      required: AP_INPUT_ERROR_MESSAGES.TITLE.BLANK,
      minLength: {
        value: 1,
        message: AP_INPUT_ERROR_MESSAGES.TITLE.MIN,
      },
      maxLength: {
        value: 30,
        message: AP_INPUT_ERROR_MESSAGES.TITLE.MAX,
      },
      error: errors.title,
    },
    {
      isTextarea: true,
      id: 'content',
      name: 'content',
      title: 'CONTENT',
      type: 'text',
      placeholder: AP_INPUT_PLACEHOLDER.CONTENT,
      required: AP_INPUT_ERROR_MESSAGES.CONTENT.BLANK,
      minLength: {
        value: 1,
        message: AP_INPUT_ERROR_MESSAGES.CONTENT.MIN,
      },
      maxLength: {
        value: 500,
        message: AP_INPUT_ERROR_MESSAGES.CONTENT.MAX,
      },
      error: errors.content,
    },
  ];

  return { AppointmentMainContents };
};
