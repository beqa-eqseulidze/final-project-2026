/**
 * @file BackgroundSky.tsx
 * @description amindi.ge-ს იდენტური ფონის კომპონენტი.
 * იყენებს ზუსტად amindi.ge-ს ფონის სურათებს:
 * - https://amindi.ge/static/img/bg/clouds_night2.jpg
 * - https://amindi.ge/static/img/sun2.jpg
 * - https://amindi.ge/static/img/bg/clouds3.jpg
 */

import React from 'react';
import { useAppSelector } from '../../store';

export const BackgroundSky: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);
  const selectedCity = cities.find((c) => c.id === selectedCityId) || cities[0];

  // ვიყენებთ არჩეული ქალაქის amindi.ge-ს ფონის სურათს (ნაგულისხმევად clouds_night2.jpg ან sun2.jpg)
  const bgPath = selectedCity?.bgImage || 'bg/clouds_night2.jpg';
  const bgUrl = bgPath.startsWith('http')
    ? bgPath
    : `https://amindi.ge/static/img/${bgPath}`;

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between"
      style={{
        backgroundImage: `url('${bgUrl}')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </div>
  );
};
