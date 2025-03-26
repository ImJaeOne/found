import { AUTH_MODE } from '@/constants/users';
import AuthForm from '../_components/AuthForm';

const LoginPage = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center bg-main2">
      <div className="flex flex-col justify-center items-center w-11/12 md:w-2/5 rounded-3xl p-5 bg-white shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]">
        <h3 className="text-title-md font-semibold text-main1 mb-5">LOG IN</h3>
        <AuthForm mode={AUTH_MODE.LOGIN} />
      </div>
    </div>
  );
};

export default LoginPage;
