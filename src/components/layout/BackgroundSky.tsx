import React, { useState, useEffect } from 'react';

const checkIsDay = (): boolean => {
  const gmt4Hour = (new Date().getUTCHours() + 4) % 24;
  return gmt4Hour >= 7 && gmt4Hour < 19;
};

interface BackgroundSkyProps {
  children: React.ReactNode;
}

export const BackgroundSky: React.FC<BackgroundSkyProps> = ({ children }) => {
  const [isDay, setIsDay] = useState<boolean>(checkIsDay);

  useEffect(() => {
    // ყოველ 30 წამში მოწმდება დრო
    const timer = setInterval(() => {
      setIsDay(checkIsDay());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  // amindi.ge-ს ოფიციალური ფონის სურათები
  const bgImage = isDay
    ? 'https://amindi.ge/static/img/sun2.jpg'
    : 'https://amindi.ge/static/img/bg/clouds_night2.jpg';

  return (
    <div
      className="relative isolate min-h-screen w-full overflow-x-clip flex flex-col justify-between"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[#19375c]"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      />
      {children}
    </div>
  );
};
