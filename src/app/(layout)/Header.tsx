'use client';

import { PATH } from '@/constants/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [shadow, setShadow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 flex justify-between text-main1 text-title-sm font-light px-[100px] h-[100px] items-center transition-shadow duration-300 ${
        shadow ? 'shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]' : ''
      }`}
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
      <nav>
        <ul className="flex gap-[50px]">
          <li>
            <Link href={PATH.MATELIST}>운동메이트</Link>
          </li>
          <li>
            <Link href={PATH.LOGIN}>로그인</Link>
          </li>
          <li>
            <Link href={PATH.SIGNUP}>회원가입</Link>
          </li>
          {/* 아래는 개발 편의를 위해 만들어 둠 */}
          <li>
            <Link href={PATH.MYPAGE}>마이페이지</Link>
          </li>
          <li>
            <Link href={PATH.CHATTING}>채팅</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
