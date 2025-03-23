import { AUTH_MODE } from '@/constants/users';
import AuthForm from '../_components/AuthForm';

const SignupPage = () => {
  return (
    <div>
      <AuthForm mode={AUTH_MODE.SIGNUP} />
    </div>
  );
};

export default SignupPage;
