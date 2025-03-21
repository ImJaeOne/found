'use client';

import {
  AUTH_ERROR_MESSAGES,
  AUTH_INPUT_PLACEHOLDER,
  AUTH_MODE,
} from '@/constants/auth';
import { PATH, QUERY_KEY } from '@/constants/constants';
import { supabase } from '@/services/supabaseClient';
import { AuthInputs } from '@/types/users';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type AuthFormProps = {
  mode: string;
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const route = useRouter();

  //nickname 중복 확인로직
  const [isNicknameExisted, setIsNickNameExisted] = useState(true);

  //닉네임 중복 검사
  const checkNicknameExsited = async (nickname: string) => {
    try {
      const { count } = await supabase
        .from(QUERY_KEY.USERS)
        .select('nickname', { count: 'exact', head: true })
        .eq('nickname', nickname);

      if (count > 0) {
        setIsNickNameExisted(true);
      } else {
        setIsNickNameExisted(false);
      }
    } catch (error: any) {
      console.error('닉네임 중복 오류 발생 : ', error.message);
    }
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AuthInputs>();

  const onSubmit = (data: AuthInputs) => {
    if (mode === 'login') {
      handleSubmitLogin(data);
    } else {
      handleSubmitSignUp(data);
    }
  };

  //-----로그인 로직-----
  const handleSubmitLogin = async (
    data: Pick<AuthInputs, 'email' | 'password'>,
  ) => {
    const { email, password } = data;

    // 예외처리 : 누락된 정보 확인
    if (!email || !password) {
      alert('빈칸 없이 입력해주세요');
      return;
    }

    //로그인하려는 유저 데이터 => supabase auth.users 데이터에서 존재 여부 확인
    const currentUser = {
      email,
      password,
    };

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword(currentUser);

      if (error) {
        if (error.message === 'Invalid login credentials') {
          return;
        }
      }

      if (data) {
        //홈으로 이동
        route.replace(PATH.HOME);
      }
    } catch (error) {
      console.error('로그인 error : ', error);
    }
  };

  //-----회원가입 로직-----
  const handleSubmitSignUp = async (data: AuthInputs) => {
    const { email, password, checkPassword, nickname, bio, category } = data;
    //예외처리 : 누락된 정보 확인
    if (!email || !password || !checkPassword) {
      alert(AUTH_ERROR_MESSAGES.ALL_BLANK);
      return;
    }
    //예외처리 : 닉네임 중복 확인
    if (isNicknameExisted) {
      alert(AUTH_ERROR_MESSAGES.NICKNAME.CHECK);
      return;
    }

    //새로운 유저 데이터 => supabase auth.users에 insert
    const newUserData = {
      email,
      password,
      created_at: Date.now(),
      options: {
        data: {
          nickname,
          bio,
          category,
        },
      },
    };

    console.log('newUserData', newUserData);

    try {
      const { data, error } = await supabase.auth.signUp(newUserData);

      //회원가입 성공
      if (data.user) {
        //유저 알람
        alert('회원가입 성공');
        //로그인 페이지로 이동
        route.replace(PATH.LOGIN);
      }

      //회원가입 실패
      if (error) {
        switch (error.message) {
          case 'User already registered':
            return alert(AUTH_ERROR_MESSAGES.EMAIL.SAME);

          case 'Unable to validate email address: invalid format':
            return alert(AUTH_ERROR_MESSAGES.EMAIL.INVALIDATE);

          case 'Network request failed':
            return alert(AUTH_ERROR_MESSAGES.ERROR);

          default:
            break;
        }
      }
    } catch (error) {
      alert(AUTH_ERROR_MESSAGES.ERROR);
      console.error('회원가입 error : ', error);
    }
  };

  //로그인 contents : 이메일, 비밀번호
  const loginInputContents = [
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
  const signUpInputContents = [
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
      valiedate: () => {
        isNicknameExisted || AUTH_ERROR_MESSAGES.NICKNAME.SAME;
      },
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
      {/* 제목 */}
      {mode === AUTH_MODE.SIGNUP ? <h2>SIGN UP</h2> : <h2>LOG IN</h2>}

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
