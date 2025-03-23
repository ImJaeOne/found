'use client';

import { AUTH_MODE } from '@/constants/users';
import { useAuthContents } from '@/hooks/useAuthContents';
import { useAuthValidation } from '@/hooks/useAuthValidation';

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
    handleSubmit,
    errors,
    getValues,
    onSubmit,
  } = useAuthValidation(mode);

  // AuthContents 커스텀 훅
  const { loginInputContents, signUpInputContents } = useAuthContents({
    errors,
    isNicknameExisted,
    getValues,
  });

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
