'use client';

import { CATEGORIES_SELECT_MODE, PATH } from '@/constants/constants';
import { AUTH_MODE } from '@/constants/users';
import { useAuthContents } from '@/hooks/useAuthContents';
import { useAuthValidation } from '@/hooks/useAuthValidation';
import CategorySeletor from '@/ui/common/CategorySeletor';
import CommonInput from '@/ui/common/CommonInput';
import Link from 'next/link';

//-----타입 지정-----
type AuthFormProps = {
  mode: string;
};

//-----컴포넌트-----
const AuthForm = ({ mode }: AuthFormProps) => {
  // AuthValidation 커스텀 훅
  const {
    isNicknameExisted,
    checkNicknameExsited,
    register,
    watch,
    handleSubmit,
    errors,
    getValues,
    setValue,
    onSubmit,
  } = useAuthValidation(mode);

  // AuthContents 커스텀 훅
  const { loginInputContents, signUpInputContents } = useAuthContents({
    errors,
    isNicknameExisted,
    getValues,
  });

  return (
    <>
      {/* 폼 양식 */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
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
            <section key={id} className={INPUT_SECTION}>
              <label htmlFor={name} className={INPUT_LABLE}>
                <h6 className={INPUT_TITLE}>{title}</h6>
                <CommonInput
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  height={8}
                  {...register(name, {
                    required,
                    minLength,
                    maxLength,
                    pattern,
                  })}
                />
              </label>
              <p className={INPUT_ERROR_TEXT}>{error && error.message}</p>
            </section>
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
              <section key={id} className={INPUT_SECTION}>
                <label htmlFor={name} className={INPUT_LABLE}>
                  <h6 className={INPUT_TITLE}>{title}</h6>
                  <CommonInput
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    height={8}
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
                </label>
                <p className={INPUT_ERROR_TEXT}>{error && error.message}</p>
              </section>
            );
          })}

        {mode === AUTH_MODE.SIGNUP && (
          <section className={INPUT_SECTION}>
            <label htmlFor="categories" className={INPUT_LABLE}>
              <p className={INPUT_TITLE}>FAV SPORTS</p>
              <CategorySeletor
                mode={CATEGORIES_SELECT_MODE.AUTH}
                watch={watch}
                setValue={setValue}
              />
            </label>
          </section>
        )}

        {/* 로그인/회원가입 이동 버튼 */}
        <section className="w-full mb-5 pt-3 border-t-2 border-light-gray">
          {mode === AUTH_MODE.SIGNUP ? (
            <div className={PAGE_MOVE_WRAPPER}>
              <p className={PAGE_MOVE_TITLE}>FOUND 회원이신가요?</p>
              <Link href={PATH.LOGIN} className={PAGE_MOVE_LINK}>
                LOG IN
              </Link>
            </div>
          ) : (
            <div className={PAGE_MOVE_WRAPPER}>
              <p className={PAGE_MOVE_TITLE}>아직 회원이 아니신가요?</p>
              <Link href={PATH.SIGNUP} className={PAGE_MOVE_LINK}>
                SIGN UP
              </Link>
            </div>
          )}
        </section>
        <button type="submit">
          {mode === AUTH_MODE.SIGNUP ? 'SIGN UP' : 'LOG IN'}
        </button>
      </form>
    </>
  );
};

//style
const INPUT_SECTION = 'flex flex-col w-full justify-between items-center p-3';
const INPUT_LABLE = 'flex w-full justify-between items-center';
const INPUT_TITLE = 'w-1/3 text-xs md:text-text-lg font-semibold text-main1';
const INPUT_ERROR_TEXT = 'text-sub1 text-text-sm';

const PAGE_MOVE_WRAPPER = 'w-full flex justify-center items-center gap-10';
const PAGE_MOVE_TITLE = 'text-text-md';
const PAGE_MOVE_LINK =
  'text-text-md font-semibold text-main1 cursor-pointer duration-200 hover:scale-105';

export default AuthForm;
