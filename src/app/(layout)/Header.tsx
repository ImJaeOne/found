import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className="w-full fixed top-0 flex justify-between text-main1 text-title-sm font-light px-[100px] h-[100px] items-center">
      <div className="relative w-[100px] h-[75px]">
        <Image
          src="/images/found_logo.png"
          alt="Found 로고"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <nav>
        <ul className="flex gap-[50px]">
          <li>운동메이트</li>
          <li>로그인</li>
          <li>회원가입</li>
          {/* 아래는 개발 편의를 위해 만들어 둠 */}
          <li>마이페이지</li>
          <li>채팅</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
