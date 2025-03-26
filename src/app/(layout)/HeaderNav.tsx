'use client';

import { PATH } from '@/constants/constants';
import Link from 'next/link';
import { useAuthStore } from '@/providers/AuthProvider';
import { logout } from '@/services/usersServices';
import { toast } from '@/hooks/useToast';
import { usePrefetchUser } from '@/hooks/queries/usePrefetchUser';
import { usePathname, useRouter } from 'next/navigation';

const HeaderNav = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setLogout = useAuthStore((state) => state.setLogout);
  const handleHover = usePrefetchUser(user ? user.id : undefined);
  const route = useRouter();
  const pathName = usePathname();

  const handleLogout = async () => {
    await logout();
    setLogout();

    //사용자 알림
    if (pathName === PATH.HOME) {
      toast({ description: '로그아웃 되었습니다!' });
    } else {
      //로그아웃시 Home으로 이동
      route.push(PATH.HOME);

      toast({
        variant: 'destructive',
        description: '로그인이 필요한 서비스입니다!',
      });
    }
  };

  return (
    <>
      <nav className="w-1/4">
        {/* 로그인 상태 */}
        <ul className="w-full flex justify-between items-center text-main1 text-text-lg">
          {isAuthenticated ? (
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
            </>
          ) : (
            <>
              <li className={navLi}>
                <Link href={PATH.LOGIN}>LOG IN</Link>
              </li>
              <li className={navLi}>
                <Link href={PATH.SIGNUP}>SIGN UP</Link>
              </li>
            </>
          )}
          <li className={navLi}>
            <Link href={PATH.MATELIST} onMouseEnter={handleHover}>
              FOUNIES
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

//style
const navLi = 'font-medium duration-200 hover:scale-105';

export default HeaderNav;
