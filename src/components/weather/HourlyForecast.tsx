/**
 * @file HourlyForecast.tsx
 * @description amindi.ge-ს იდენტური "ამინდი საათების მიხედვით" ბლოკი (.weather-hours) მარცხენა სვეტში.
 * აჩვენებს საათობრივ ამინდს amindi.ge-ს weather_small_{code}.png ხატულებით
 * და შეიცავს ღილაკს "იხილეთ სრულად" (#15aadc).
 */

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setHourlyModalOpen } from '../../store/slices/uiSlice';
import { formatTempValue, getSmallIconUrl } from '../../utils/weatherUtils';

export const HourlyForecast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);
  const { unit } = useAppSelector((state) => state.ui);

  const city = cities.find((c) => c.id === selectedCityId) || cities[0];

  if (!city || !city.hourly || city.hourly.length === 0) return null;

  // amindi.ge-ს მარცხენა სვეტში გამოაქვს პირველი 3 საათი
  const displayHours = city.hourly.slice(0, 3);

  return (
    <div className="weather-hours text-center text-white">
      <h2 className="text-[17px] font-normal mb-2 text-white">
        ამინდი საათების მიხედვით
      </h2>

      <div>
        {displayHours.map((item) => (
          <div
            key={item.id}
            className="hour flex items-center justify-center text-[13px] leading-[36px]"
          >
            <div className="w-5/12 text-center">
              <span>{item.hour}</span>
            </div>
            <div className="w-3/12 flex items-center justify-center">
              <img
                src={getSmallIconUrl(item.condition, item.iconCode)}
                alt={item.conditionLabel}
                className="w-[32px] h-auto"
              />
            </div>
            <div className="w-2/12 text-center">
              <span data-temp={item.temp}>{formatTempValue(item.temp, unit)}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => dispatch(setHourlyModalOpen(true))}
        className="mt-2 h-[33px] px-4 bg-[#15aadc] hover:bg-[#1298c5] text-white text-[13px] rounded-[4px] border border-[#15aadc] transition-colors inline-flex items-center justify-center cursor-pointer"
      >
        იხილეთ სრულად
      </button>
    </div>
  );
};
