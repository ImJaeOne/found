import { AUTH_MODE } from '@/constants/users';
import AuthForm from '../_components/AuthForm';

const SignupPage = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-11/12 md:w-2/5 border-2 border-main1 rounded-3xl p-5">
        <h3 className="text-title-md font-semibold text-main1 mb-5">SIGN UP</h3>
        <AuthForm mode={AUTH_MODE.SIGNUP} />
      </div>
    </div>
  );
};

export default SignupPage;
