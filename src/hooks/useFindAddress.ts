import { AppointmentInputs } from '@/types/appointments';
import { AuthInputs } from '@/types/users';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

declare global {
  interface Window {
    daum: any;
  }
}

type useFindAddessProps = {
  authSetValue?: UseFormSetValue<AuthInputs>;
  appointmentSetValue?: UseFormSetValue<AppointmentInputs>;
};

export const useFindAddess = ({
  authSetValue,
  appointmentSetValue,
}: useFindAddessProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        if (authSetValue) {
          authSetValue('address.place', data.roadAddress);
          authSetValue('address.detailPlace', '');
        } else if (appointmentSetValue) {
          appointmentSetValue('address.place', data.roadAddress);
          appointmentSetValue('address.detailPlace', '');
        }
      },
    }).open();
  };

  return { handlePostcodeSearch };
};
