import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Header from './(layout)/Header';
import { Toaster } from '@/ui/shadcn/toaster';
import Providers from '@/providers/RQProviders';
import { AuthStoreProvider } from '@/providers/AuthProvider';
import AuthListner from '@/providers/AuthListener';

export const metadata: Metadata = {
  title: 'Found',
  description: '운동 메이트를 쉽게 구하고 운동을 시작해보세요.',
  icons: '/images/favicon.ico',
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
          <Providers>
            <Header />
            <AuthListner />
            <main className="pt-14 w-screen">
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
