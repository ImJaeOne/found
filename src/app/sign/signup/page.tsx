import { AUTH_MODE } from '@/constants/users';
import AuthForm from '../_components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - FOUND',
  description: 'FOUND에 회원가입하고 완벽한 운동 메이트를 찾아보세요!',
  openGraph: {
    title: '회원가입 - FOUND',
    description: 'FOUND에 회원가입하고 완벽한 운동 메이트를 찾아보세요!',
    url: 'https://found-smoky.vercel.app/sign/signup',
    siteName: 'FOUND',
    type: 'website',
  },
};

const SignupPage = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center bg-main2">
      <div className="flex flex-col justify-center items-center w-11/12 md:w-2/5 rounded-3xl p-5 bg-white shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]">
        <h3 className="text-title-md font-semibold text-main1 mb-5">SIGN UP</h3>
        <AuthForm mode={AUTH_MODE.SIGNUP} />
      </div>
    </div>
  );
};

export default SignupPage;
