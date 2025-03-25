'use client';

import { PATH } from '@/constants/constants';
import Link from 'next/link';
import { useAuthStore } from '@/providers/AuthProvider';
import { logout } from '@/services/usersServices';

const HeaderNav = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setLogout = useAuthStore((state) => state.setLogout);

  const handleLogout = async () => {
    await logout();
    setLogout();
  };

  return (
    <>
      <nav className="w-1/4">
        {/* 로그인 상태 */}
        <ul className="w-full flex justify-between items-center text-main1 text-text-lg">
          {isAuthenticated && (
            <>
              <li className={navLi}>
                <Link href={`${PATH.MYPAGE}/${user?.id}`}>
                  {user?.nickname}
                  <span className="text-medium-gray"> 님</span>
                </Link>
              </li>
              <li className={navLi}>
                <button type="button" onClick={handleLogout}>
                  LOG OUT
                </button>
              </li>
              <li className={navLi}>
                <Link href={PATH.MATELIST}>FOUNIES</Link>
              </li>
            </>
          )}

          {/* 로그아웃 상태 */}
          {!isAuthenticated && (
            <>
              <li className={navLi}>
                <Link href={PATH.LOGIN}>LOG IN</Link>
              </li>
              <li className={navLi}>
                <Link href={PATH.SIGNUP}>SIGN UP</Link>
              </li>
              <li className={navLi}>
                <Link href={PATH.MATELIST}>FOUNIES</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

//style
const navLi = 'font-medium duration-200 hover:scale-105';

export default HeaderNav;
