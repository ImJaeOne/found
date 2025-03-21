import { log } from 'console';

const layout = ({
  children,
  login,
  signup,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  signup: React.ReactNode;
}) => {
  return (
    <div className="w-screen">
      {children}
      <div>
        {login}
        {signup}
      </div>
    </div>
  );
};

export default layout;
