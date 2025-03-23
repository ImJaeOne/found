// useClickOutside.ts
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useClickOutside = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        router.back();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [router]);

  return ref;
};

export default useClickOutside;
