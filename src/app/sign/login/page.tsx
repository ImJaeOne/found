import { AUTH_MODE } from '@/constants/users';
import AuthForm from '../_components/AuthForm';

const LoginPage = () => {
  return (
    <div>
      <AuthForm mode={AUTH_MODE.LOGIN} />
    </div>
  );
};

export default LoginPage;
