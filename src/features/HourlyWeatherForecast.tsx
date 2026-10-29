/**
 * @file HourlyWeatherForecast.tsx
 * @description amindi.ge-ს საათობრივი ამინდის ბლოკი ("ამინდი საათების მიხედვით").
 *
 * ვიზუალური შესაბამისობა:
 * - სათაური: "ამინდი საათების მიხედვით"
 * - საათების სია: {საათი} საათი | ამინდის იკონი | ტემპერატურა°
 * - ღილაკი: [ იხილეთ სრულად ] (ცისფერი #15aadc)
 */

import React, { useState, useEffect } from 'react';
import {
  fetchHourlyForecast,
  HourlyForecastItem,
} from '../services/weatherService';

interface HourlyWeatherForecastProps {
  city?: string;
  onViewFullHourly?: () => void;
  isFullHourlyOpen?: boolean;
}

// სარეზერვო საწყისი მონაცემები ზუსტად სქრინშოტის მიხედვით
const DEFAULT_HOURLY: HourlyForecastItem[] = [
  { hourLabel: '21 საათი', temp: 15, iconCode: '04', description: 'ღრუბლიანი' },
  { hourLabel: '22 საათი', temp: 15, iconCode: '04', description: 'ღრუბლიანი' },
  { hourLabel: '23 საათი', temp: 14, iconCode: '04', description: 'ღრუბლიანი' },
  { hourLabel: '20 საათი', temp: 14, iconCode: '04', description: 'ღრუბლიანი' },
];

export const HourlyWeatherForecast: React.FC<HourlyWeatherForecastProps> = ({
  city = 'Tbilisi',
  onViewFullHourly,
  isFullHourlyOpen = false,
}) => {
  const [hourlyData, setHourlyData] = useState<HourlyForecastItem[]>(DEFAULT_HOURLY);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    fetchHourlyForecast(city)
      .then((items) => {
        if (isMounted && items.length > 0) {
          setHourlyData(items);
        }
      })
      .catch(() => {
        // შეცდომის შემთხვევაში რჩება სარეზერვო მონაცემები
      });

    return () => {
      isMounted = false;
    };
  }, [city]);

  // თუ გაშლილი არაა, ვაჩვენებთ პირველ 3 საათს (როგორც სქრინშოტზეა)
  const visibleItems = expanded ? hourlyData : hourlyData.slice(0, 3);

  return (
    <div className="w-full text-white font-amindi1 select-none">
      {/* 1. სათაური */}
      <h3 className="text-white text-[14px] sm:text-[15px] font-bold tracking-wide mb-2.5">
        ამინდი საათების მიხედვით
      </h3>

      {/* 2. საათების ჩამონათვალი */}
      <div className="flex flex-col space-y-1">
        {visibleItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-1 px-1 hover:bg-white/5 rounded transition-colors"
          >
            {/* მარცხნივ: საათის წარწერა */}
            <span className="text-white text-[13px] sm:text-[14px] font-bold">
              {item.hourLabel}
            </span>

            {/* ცენტრში: amindi.ge-ს იკონი */}
            <img
              src={`https://amindi.ge/static/img/weather_small_${item.iconCode}.png`}
              alt={item.description}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://amindi.ge/static/img/weather_small_04.png';
              }}
            />

            {/* მარჯვნივ: ტემპერატურა */}
            <span className="text-white text-[14px] sm:text-[15px] font-bold text-right min-w-[32px]">
              {item.temp}°
            </span>
          </div>
        ))}
      </div>

      {/* 3. ქვედა ცისფერი ღილაკი: [ იხილეთ სრულად ] */}
      <div className="flex justify-center mt-3 pt-1">
        <button
          type="button"
          onClick={() => {
            if (onViewFullHourly) {
              onViewFullHourly();
            } else {
              setExpanded((prev) => !prev);
            }
          }}
          className="
            font-amindi1 text-white text-[12px] sm:text-[13px] font-bold
            bg-[#15aadc] hover:bg-[#129ac6] active:bg-[#0f8cb6]
            px-5 py-2 rounded-[4px] cursor-pointer border-0
            transition-colors tracking-wide shadow-sm
          "
        >
          {onViewFullHourly ? (isFullHourlyOpen ? 'შეკეცვა' : 'იხილეთ სრულად') : (expanded ? 'შეკეცვა' : 'იხილეთ სრულად')}
        </button>
      </div>
    </div>
  );
};
