import { PATH } from '@/constants/constants';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from './HeaderNav';
import { Params } from '@/types/params';

const Header = () => {
  return (
    <header
      className="w-full fixed top-0 flex justify-between text-main1 px-[70px] h-14 items-center z-50 bg-white shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]
      }"
    >
      <Link href={PATH.HOME} className="relative w-[100px] h-[75px]">
        <Image
          src="/images/found_logo.png"
          alt="Found 로고"
          fill
          priority
          sizes="100px"
          style={{ objectFit: 'contain' }}
        />
      </Link>

      <HeaderNav />
    </header>
  );
};

export default Header;
