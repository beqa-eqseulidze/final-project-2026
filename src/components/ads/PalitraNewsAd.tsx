import { useEffect, useState } from 'react';
import newsAdVideo from '../../assets/ads/PALITRA-NEWS.mp4';

export function PalitraNewsAd() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // ჩატვირთვის გადადება პირველი რენდერის (FCP/LCP) შემდეგ
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-[#102238]/20">
      {shouldLoad ? (
        <video
          src={newsAdVideo}
          autoPlay
          loop
          preload="metadata"
          muted
          playsInline
          aria-label="რეკლამა: პალიტრა ნიუსი - ახალი ამბების ტელევიზია"
          className="w-full h-full object-contain scale-[1.02]"
        />
      ) : null}
    </div>
  );
}
