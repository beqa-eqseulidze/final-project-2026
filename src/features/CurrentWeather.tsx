/**
 * @file CurrentWeather.tsx
 * @description amindi.ge-ს მიმდინარე ამინდის მთავარი ვიჯეტი:
 * - ქალაქის სახელი ("თბილისი")
 * - თარიღი ("ორშაბათი, 26 ოქტომბერი")
 * - ცოცხალი საათი წამებით GMT+4 დროის სარტყელში
 * - ამინდის დიდი იკონი (weather_big_{code}.png)
 * - დიდი ტემპერატურა (e.g. "14°")
 * - ამინდის მდგომარეობის ტექსტი ("ღრუბლიანი")
 */

import React, { useState, useEffect } from 'react';
import {
  fetchCurrentWeather,
  CurrentWeather as ICurrentWeatherData,
  GEO_DAYS,
  GEO_MONTHS,
} from '../services/weatherService';

interface CurrentWeatherProps {
  city?: string;
}

/**
 * ითვლის მიმდინარე თარიღსა და დროს GMT+4 დროის სარტყელში
 */
const getGmt4DateTime = () => {
  const now = new Date();

  // თბილისის თარიღი (GMT+4)
  const tbilisiDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tbilisi' }));
  const dayName = GEO_DAYS[tbilisiDate.getDay()];
  const dateStr = `${dayName}, ${tbilisiDate.getDate()} ${GEO_MONTHS[tbilisiDate.getMonth()]}`;

  // თბილისის ცოცხალი დრო (HH:MM:SS)
  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tbilisi',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  return { dateStr, timeStr };
};

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city = 'Tbilisi' }) => {
  // საწყისი მნიშვნელობები ზუსტად სქრინშოტის იდენტურია
  const [weather, setWeather] = useState<ICurrentWeatherData>({
    cityName: 'თბილისი',
    temp: 14,
    description: 'ღრუბლიანი',
    iconCode: '04',
  });

  const [{ dateStr, timeStr }, setDateTime] = useState(getGmt4DateTime);

  // ცოცხალი საათის ტაიმერი (ყოველ წამში ახლდება)
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getGmt4DateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // OpenWeatherMap API-დან მიმდინარე მონაცემების მიღება
  useEffect(() => {
    let isMounted = true;
    fetchCurrentWeather(city)
      .then((data) => {
        if (isMounted) setWeather(data);
      })
      .catch(() => {
        // შეცდომის შემთხვევაში უსაფრთხოდ რჩება საწყისი მონაცემი
      });

    return () => {
      isMounted = false;
    };
  }, [city]);

  return (
    <div className="w-full max-w-[320px] text-white font-amindi1 select-none mb-4">
      {/* 1. ქალაქის სახელი */}
      <h1 className="text-[32px] sm:text-[38px] font-bold tracking-tight leading-none text-white m-0">
        {weather.cityName}
      </h1>

      {/* 2. თარიღი (e.g. ორშაბათი, 26 ოქტომბერი) */}
      <div className="text-[13px] sm:text-[14px] text-white/90 mt-1.5 leading-tight font-medium">
        {dateStr}
      </div>

      {/* 3. ცოცხალი საათი წამებით (e.g. 18:53:40) GMT+4 */}
      <div className="text-[13px] sm:text-[14px] text-white font-bold tracking-wider mt-0.5">
        {timeStr}
      </div>

      {/* 4. ამინდის დიდი იკონი, აღწერა და დიდი ტემპერატურა */}
      <div className="flex items-center justify-between mt-3">
        {/* მარცხენა მხარე: იკონი და მის ქვემოთ აღწერა */}
        <div className="flex flex-col items-center">
          <img
            src={`https://amindi.ge/static/img/weather_big_${weather.iconCode}.png`}
            alt={weather.description}
            className="w-[115px] sm:w-[130px] h-auto object-contain drop-shadow"
            onError={(e) => {
              // fallback: თუ weather_big ვერ ჩაიტვირთა
              (e.currentTarget as HTMLImageElement).src =
                `https://amindi.ge/static/img/weather_small_${weather.iconCode}.png`;
            }}
          />
          <span className="text-[13px] sm:text-[14px] font-bold text-white tracking-wide mt-1 text-center">
            {weather.description}
          </span>
        </div>

        {/* მარჯვენა მხარე: დიდი ტემპერატურა */}
        <div className="text-[58px] sm:text-[68px] font-bold text-white leading-none pr-3 sm:pr-4">
          {weather.temp}°
        </div>
      </div>
    </div>
  );
};
