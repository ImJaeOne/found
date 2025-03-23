'use client';

import { useToast } from './useToast';
import { useState } from 'react';
import { PATH, QUERY_KEY } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
import { AUTH_ERROR_MESSAGES, AUTH_TOAST_MESSAGES } from '@/constants/users';
import { useForm } from 'react-hook-form';
import { AuthInputs } from '@/types/users';
import { login, signup } from '@/services/usersServices';
import { useRouter } from 'next/navigation';

export const useAuthValidation = (mode: string) => {
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

  return {
    isNicknameExisted,
    checkNicknameExsited,
    register,
    handleSubmit,
    errors,
    getValues,
    onSubmit,
  };
};
