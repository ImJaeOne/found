import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Header from './(layout)/Header';
import { Toaster } from '@/ui/shadcn/toaster';
import Providers from '@/providers/RQProviders';
import { AuthStoreProvider } from '@/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Found',
  description: '운동 메이트를 쉽게 구하고 운동을 시작해보세요.',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthStoreProvider>
          <Header />
          <Providers>
            <main className="pt-[100px] w-screen">
              {children}
              {modal}
            </main>
          </Providers>
        </AuthStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
