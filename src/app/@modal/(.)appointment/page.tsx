'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';

const AppointmentPage = () => {
  const router = useRouter();

  const modalRef = useClickOutside();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
      >
        <h2 className="text-xl font-semibold mb-4">약속 관리</h2>
        <button
          onClick={() => router.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AppointmentPage;
