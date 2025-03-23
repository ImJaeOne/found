'use client';

import {
  AUTH_ERROR_MESSAGES,
  AUTH_INPUT_PLACEHOLDER,
  AUTH_MODE,
  AUTH_TOAST_MESSAGES,
} from '@/constants/users';
import { PATH, QUERY_KEY } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/services/supabaseClient';
import { AuthInputs } from '@/types/users';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldError, RegisterOptions, useForm } from 'react-hook-form';
import { login, signup } from '@/services/usersServices';

//-----타입 지정-----
type AuthFormProps = {
  mode: string;
};

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

//-----컴포넌트-----
const AuthForm = ({ mode }: AuthFormProps) => {
  // 경로 이동을 위한 route
  const route = useRouter();
  // shadcn/toast
  const { toast } = useToast();

  //---닉네임---
  // 닉네임 중복 여부 state
  const [isNicknameExisted, setIsNickNameExisted] = useState(true);

  // 닉네임 중복 검사 로직
  const checkNicknameExsited = async (nickname: string) => {
    try {
      const { count } = await supabase
        .from(QUERY_KEY.USERS)
        .select('nickname', { count: 'exact', head: true })
        .eq('nickname', nickname);

      if (!!count && count > 0) {
        setIsNickNameExisted(true);
        toast({
          variant: 'destructive',
          description: AUTH_ERROR_MESSAGES.NICKNAME.SAME,
        });
      } else {
        setIsNickNameExisted(false);
        toast({
          description: AUTH_ERROR_MESSAGES.NICKNAME.SUCCESS,
        });
      }
    } catch (error: any) {
      console.error('닉네임 중복 오류 발생 : ', error.message);
    }
  };

  //---입력값 유효성 검증 : react-hook-form---
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AuthInputs>();

  // 로그인 로직
  const handleSubmitLogin = async (
    data: Pick<AuthInputs, 'email' | 'password'>,
  ) => {
    const { email, password } = data;

    // 예외처리 : 누락된 정보 확인
    if (!email || !password) {
      toast({
        description: AUTH_TOAST_MESSAGES.LOGIN.FAIL.BLANK,
      });
      return;
    }

    //로그인하려는 유저 데이터
    const currentUser = {
      email,
      password,
    };

    try {
      //supabase 로그인
      const { data, error } = await login(currentUser);

      if (error) {
        if (error.message === 'Invalid login credentials') {
          toast({
            variant: 'destructive',
            description: AUTH_TOAST_MESSAGES.LOGIN.FAIL.WORNG,
          });
          return;
        }
      }

      if (data) {
        // 성공시 사용자 알람
        toast({
          description: AUTH_TOAST_MESSAGES.LOGIN.SUCCESS,
        });
        // 홈으로 이동
        route.replace(PATH.HOME);
      }
    } catch (error) {
      // 실패시 사용자 알람
      toast({
        variant: 'destructive',
        title: AUTH_TOAST_MESSAGES.LOGIN.ERROR.TITLE,
        description: AUTH_TOAST_MESSAGES.LOGIN.ERROR.DESCRIPTION,
      });
      console.error('로그인 error : ', error);
    }
  };

  // 회원가입 로직
  const handleSubmitSignUp = async (data: AuthInputs) => {
    const {
      email,
      password,
      checkPassword,
      nickname,
      bio,
      // 관련 컴포넌트 생성 후 수정할 예정입니다!
      // address,
      // categories,
    } = data;

    //예외처리 : 누락된 정보 확인
    if (!email || !password || !checkPassword || !nickname || !bio) {
      toast({ description: AUTH_ERROR_MESSAGES.ALL_BLANK });
      return;
    }

    //예외처리 : 닉네임 중복 확인
    if (isNicknameExisted) {
      toast({
        variant: 'destructive',
        description: AUTH_ERROR_MESSAGES.NICKNAME.CHECK,
      });
      return;
    }

    //새로운 유저 데이터 => supabase auth.users에 insert
    const newUserData = {
      email,
      password,
      checkPassword,
      created_at: Date.now(),
      options: {
        data: {
          nickname,
          bio,
          //임시값 입니다!
          address: '서울시 중랑구',
          categories: ['러닝'],
        },
      },
    };

    try {
      const { data, error } = await signup(newUserData);

      //회원가입 성공
      if (data.user) {
        //유저 알람
        toast({ description: AUTH_TOAST_MESSAGES.SIGNUP.SUCCESS });
        //로그인 페이지로 이동
        route.replace(PATH.LOGIN);
      }

      // 회원가입 실패 오류 분기처리
      if (error) {
        switch (error.message) {
          case 'User already registered':
            return toast({
              variant: 'destructive',
              description: AUTH_TOAST_MESSAGES.SIGNUP.FAIL.SAME,
            });

          case 'Unable to validate email address: invalid format':
            return toast({
              variant: 'destructive',
              description: AUTH_ERROR_MESSAGES.EMAIL.INVALIDATE,
            });

          case 'Network request failed':
            return toast({
              variant: 'destructive',
              title: AUTH_TOAST_MESSAGES.SIGNUP.ERROR.TITLE,
              description: AUTH_TOAST_MESSAGES.SIGNUP.ERROR.DESCRIPTION,
            });

          default:
            break;
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: AUTH_TOAST_MESSAGES.SIGNUP.ERROR.TITLE,
        description: AUTH_TOAST_MESSAGES.SIGNUP.ERROR.DESCRIPTION,
      });
      console.error('회원가입 error : ', error);
    }
  };

  //form submit 액션 분기처리
  const onSubmit = (data: AuthInputs) => {
    if (mode === 'login') {
      handleSubmitLogin(data);
    } else {
      handleSubmitSignUp(data);
    }
  };

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

  return (
    <div>
      {/* 폼 양식 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginInputContents.map((item) => {
          const {
            title,
            id,
            type,
            placeholder,
            name,
            required,
            minLength,
            maxLength,
            pattern,
            error,
          } = item;

          return (
            <div key={id}>
              <label htmlFor={name}>{title}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name, {
                  required,
                  minLength,
                  maxLength,
                  pattern,
                })}
              />
              {error && <p className="text-red-600">{error.message}</p>}
            </div>
          );
        })}

        {mode === AUTH_MODE.SIGNUP &&
          signUpInputContents.map((item) => {
            const {
              title,
              id,
              type,
              placeholder,
              name,
              required,
              minLength,
              maxLength,
              pattern,
              error,
              checkButton,
              validate,
            } = item;

            return (
              <div key={id}>
                <label htmlFor={name}>{title}</label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...register(name, {
                    required,
                    validate,
                    minLength,
                    maxLength,
                    pattern,
                  })}
                />
                {checkButton && (
                  <div className="self-end">
                    <button
                      type="button"
                      onClick={() =>
                        checkNicknameExsited(getValues('nickname'))
                      }
                    >
                      CHECK
                    </button>
                  </div>
                )}
                {error && <p className="text-red-600">{error.message}</p>}
              </div>
            );
          })}

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default AuthForm;
