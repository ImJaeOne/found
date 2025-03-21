import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Header from './(layout)/Header';

export const metadata: Metadata = {
  title: 'Found',
  description: '운동 메이트를 쉽게 구하고 운동을 시작해보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="py-[100px] w-screen">{children}</main>
      </body>
    </html>
  );
}
