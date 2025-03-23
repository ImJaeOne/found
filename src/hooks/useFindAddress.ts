import { useEffect, useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

export const useFindAddess = (
  setPlace: React.Dispatch<
    React.SetStateAction<{ place: string; detailPlace: string }>
  >,
) => {
  const [roadAddress, setRoadAddress] = useState('');

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
        let extraRoadAddr = '';

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += extraRoadAddr
            ? `, ${data.buildingName}`
            : data.buildingName;
        }
        if (extraRoadAddr !== '') {
          extraRoadAddr = ` (${extraRoadAddr})`;
        }

        setRoadAddress(data.roadAddress);
        setPlace({
          place: data.roadAddress,
          detailPlace: '',
        });
      },
    }).open();
  };

  return { handlePostcodeSearch };
};
