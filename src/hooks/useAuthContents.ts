'use client';

import { AUTH_ERROR_MESSAGES, AUTH_INPUT_PLACEHOLDER } from '@/constants/users';
import { AuthInputs } from '@/types/users';
import {
  FieldError,
  FieldErrors,
  RegisterOptions,
  UseFormGetValues,
} from 'react-hook-form';

type InputField = {
  title: string;
  id: string;
  type: string;
  placeholder: string;
  name: keyof AuthInputs;
  required?: string;
  minLength?: RegisterOptions['minLength'];
  maxLength?: RegisterOptions['maxLength'];
  pattern?: RegisterOptions['pattern'];
  error?: FieldError | undefined;
  checkButton?: boolean;
  validate?: RegisterOptions['validate'];
};

type AuthContents = {
  errors: FieldErrors<AuthInputs>;
  isNicknameExisted: boolean;
  getValues: UseFormGetValues<AuthInputs>;
};

export const useAuthContents = ({
  errors,
  isNicknameExisted,
  getValues,
}: AuthContents) => {
  //로그인 contents : 이메일, 비밀번호
  const loginInputContents: InputField[] = [
    {
      title: 'EMAIL',
      id: 'email',
      type: 'text',
      placeholder: AUTH_INPUT_PLACEHOLDER.EMAIL,
      name: 'email',
      required: AUTH_ERROR_MESSAGES.EMAIL.BLANK,
      minLength: {
        value: 3,
        message: AUTH_ERROR_MESSAGES.EMAIL.MIN,
      },
      maxLength: {
        value: 30,
        message: AUTH_ERROR_MESSAGES.EMAIL.MAX,
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: AUTH_ERROR_MESSAGES.EMAIL.INVALIDATE,
      },
      error: errors.email,
    },
    {
      title: 'PASSWORD',
      id: 'password',
      type: 'password',
      placeholder: AUTH_INPUT_PLACEHOLDER.PASSWORD,
      name: 'password',
      required: AUTH_ERROR_MESSAGES.PASSWORD.BLANK,
      minLength: {
        value: 6,
        message: AUTH_ERROR_MESSAGES.PASSWORD.MIN,
      },
      maxLength: {
        value: 12,
        message: AUTH_ERROR_MESSAGES.PASSWORD.MAX,
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s)[A-Za-z\d]{6,12}$/,
        message: AUTH_ERROR_MESSAGES.PASSWORD.INVALIDATE,
      },
      error: errors.password,
    },
  ];

  // 회원가입 contents : 비밀번호 확인, 닉네임, 상메, 카테고리
  const signUpInputContents: InputField[] = [
    {
      title: 'PW CHECK',
      id: 'checkPassword',
      type: 'password',
      placeholder: AUTH_INPUT_PLACEHOLDER.PASSWORD,
      name: 'checkPassword',
      minLength: {
        value: 6,
        message: AUTH_ERROR_MESSAGES.PASSWORD.MIN,
      },
      maxLength: {
        value: 12,
        message: AUTH_ERROR_MESSAGES.PASSWORD.MAX,
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s)[A-Za-z\d]{6,12}$/,
        message: AUTH_ERROR_MESSAGES.PASSWORD.INVALIDATE,
      },
      validate: (value: string) =>
        value === getValues('password')
          ? true
          : AUTH_ERROR_MESSAGES.PASSWORD.DIFFER,
      error: errors.checkPassword,
      checkButton: false,
    },
    {
      title: 'NICKNAME',
      id: 'nickname',
      type: 'text',
      placeholder: AUTH_INPUT_PLACEHOLDER.NICKNAME,
      name: 'nickname',
      required: AUTH_ERROR_MESSAGES.NICKNAME.BLANK,
      minLength: {
        value: 2,
        message: AUTH_ERROR_MESSAGES.NICKNAME.LENGTH,
      },
      maxLength: {
        value: 8,
        message: AUTH_ERROR_MESSAGES.NICKNAME.LENGTH,
      },
      validate: () =>
        !!isNicknameExisted ? AUTH_ERROR_MESSAGES.NICKNAME.SAME : true,
      error: errors.nickname,
      checkButton: true,
    },
    {
      title: 'BIO',
      id: 'bio',
      type: 'text',
      placeholder: AUTH_INPUT_PLACEHOLDER.BIO,
      name: 'bio',
      minLength: {
        value: 1,
        message: AUTH_ERROR_MESSAGES.BIO.BLANK,
      },
      maxLength: {
        value: 50,
        message: AUTH_ERROR_MESSAGES.BIO.MAX,
      },
      error: errors.bio,
      checkButton: false,
    },
  ];

  return { loginInputContents, signUpInputContents };
};
