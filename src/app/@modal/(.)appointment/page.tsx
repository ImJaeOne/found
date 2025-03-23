'use client';

import { useRouter } from 'next/navigation';

const AppointmentPage = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        약속 관리
        <button onClick={() => router.back()}>닫기</button>
      </div>
    </div>
  );
};

export default AppointmentPage;
