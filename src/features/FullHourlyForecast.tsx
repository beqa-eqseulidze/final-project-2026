/**
 * @file FullHourlyForecast.tsx
 * @description amindi.ge-ს 24-საათიანი სრული პროგნოზის ბადე ("ამინდი საათების მიხედვით").
 *
 * ვიზუალური შესაბამისობა სქრინშოტთან:
 * - ღია ნაცრისფერი ფონი (#eeeeee / #f2f2f2)
 * - სათაური: "ამინდი საათების მიხედვით"
 * - 5-სვეტიანი ბადე (24 საათი)
 * - თითოეულ ბარათზე: {საათი} საათი, ამინდის იკონი, ტემპერატურა°
 * - აქტიური საათი გამოკვეთილია თეთრი ფონითა და ჩრდილით (როგორც "6 საათი" სქრინშოტზე)
 * - დღეების პროგნოზზე დაბრუნების ღილაკი
 */

import React, { useState, useEffect } from 'react';
import {
  fetch24HourForecast,
  HourlyForecastItem,
  UserCoordinates,
} from '../services/weatherService';

interface FullHourlyForecastProps {
  city?: string;
  coordinates?: UserCoordinates | null;
}

export const FullHourlyForecast: React.FC<FullHourlyForecastProps> = ({
  city = 'Tbilisi',
  coordinates,
}) => {
  const [items, setItems] = useState<HourlyForecastItem[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(8); // სქრინშოტის მსგავსად (მაგ. მე-8 საათი)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch24HourForecast(city, coordinates)
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [city, coordinates]);

  return (
    <div className="w-full bg-[#eeeeee] rounded-[4px] shadow-md border border-black/10 select-none p-3 sm:p-5">
      {/* 1. სათაური */}
      <div className="mb-3 sm:mb-6">
        <h2 className="font-amindi1 text-[#19375c] text-[14px] sm:text-[18px] font-bold uppercase tracking-wide">
          ამინდი საათების მიხედვით
        </h2>
      </div>

      {/* 2. 5-სვეტიანი საათობრივი ბადე */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 py-4 sm:py-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="h-[95px] sm:h-[105px] bg-black/5 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
          {items.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`
                  flex flex-col items-center justify-between py-1.5 sm:py-3 px-1.5 sm:px-2 rounded cursor-pointer
                  transition-all duration-150 min-h-[95px] sm:min-h-[115px]
                  ${isSelected
                    ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                    : 'bg-transparent hover:bg-white/50'
                  }
                `}
              >
                {/* საათი (მაგ: 22 საათი) */}
                <span className="font-amindi1 text-[11px] sm:text-[13px] font-bold text-[#222222] text-center">
                  {item.hourLabel}
                </span>

                {/* ამინდის იკონი */}
                <img
                  src={`https://amindi.ge/static/img/weather_small_${item.iconCode}.png`}
                  alt={item.description}
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain my-0.5 sm:my-1"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://amindi.ge/static/img/weather_small_04.png';
                  }}
                />

                {/* ტემპერატურა */}
                <span className="font-amindi1 text-[13px] sm:text-[15px] font-bold text-[#333333]">
                  {item.temp}°
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
