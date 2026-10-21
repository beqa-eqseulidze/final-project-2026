/**
 * @file WindAndPressure.tsx
 * @description amindi.ge-ს იდენტური "ქარი და წნევა" (.wind) და დამატებითი ინფორმაციის (.more-info) ბლოკი.
 * იყენებს ზუსტად amindi.ge-ს ქარის წისქვილის სურათებს:
 * - https://amindi.ge/static/img/bg_qari.png
 * - https://amindi.ge/static/img/b1.png
 * - https://amindi.ge/static/img/b2.png
 */

import React from 'react';
import { useAppSelector } from '../../store';
import { formatTempValue } from '../../utils/weatherUtils';

export const WindAndPressure: React.FC = () => {
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);
  const { unit } = useAppSelector((state) => state.ui);

  const city = cities.find((c) => c.id === selectedCityId) || cities[0];

  if (!city) return null;

  return (
    <div>
      {/* .wind ბლოკი */}
      <div className="wind mb-2">
        <div className="flex items-start">
          <div className="w-5/12 flex justify-center">
            <div className="wind-animation">
              <div className="first" />
              <div className="last" />
            </div>
          </div>
          <div className="w-7/12 pl-2">
            <div className="wind-text mt-[15px] text-[12px] text-white">
              <span className="title block text-[14px] mb-[5px]">ქარი და წნევა</span>
              <span className="block">
                {city.windSpeed} kph, {city.windDirection}
              </span>
              <span className="block">
                {city.pressure.toFixed(2)} {city.pressureUnit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* .more-info ბლოკი: background-color: rgba(25, 55, 92, 0.5) */}
      <div
        className="more-info p-[5px]"
        style={{ backgroundColor: 'rgba(25, 55, 92, 0.5)' }}
      >
        <div className="flex">
          <div className="w-9/12 pr-2">
            <div className="desc text-right text-white text-[12px] leading-[1.6]">
              <span className="block">ტემპერატურის მგრძნობელობა:</span>
              <span className="block">ქარში მგრძნობელობა:</span>
              <span className="block">ტენიანობა:</span>
              <span className="block">ხილვადობა:</span>
            </div>
          </div>
          <div className="w-3/12 pl-1">
            <div className="value text-left text-white text-[12px] leading-[1.6]">
              <span className="block" data-temp={city.feelsLike}>
                {formatTempValue(city.feelsLike, unit)}
              </span>
              <span className="block" data-temp={city.feelsLikeWind}>
                {formatTempValue(city.feelsLikeWind, unit)}
              </span>
              <span className="block">{city.humidity} %</span>
              <span className="block">{city.visibility} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
