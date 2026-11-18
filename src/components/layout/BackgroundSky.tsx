/**
 * @file BackgroundSky.tsx
 * @description amindi.ge-ს დინამიური ფონი GMT+4 დროის მიხედვით.
 *
 * ლოგიკა:
 * - GMT+4 დროის სარტყელი:
 *   * 07:00 – 19:00 -> დღის მზიანი ცა (sun2.jpg)
 *   * 19:00 – 07:00 -> ღამის მოღრუბლული ცა (clouds_night2.jpg)
 */

import React, { useState, useEffect } from 'react';

/**
 * განსაზღვრავს დღეა თუ ღამე GMT+4 დროის სარტყელში:
 * UTC საათს ემატება +4 საათი (GMT+4)
 * - 07:00-დან 18:59:59-მდე -> დღე (true)
 * - 19:00-დან 06:59:59-მდე -> ღამე (false)
 */
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
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between transition-[background-image] duration-700 ease-in-out"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundColor: '#19375c',
      }}
    >
      {children}
    </div>
  );
};
