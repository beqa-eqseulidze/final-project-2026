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
import type { MapWeather } from './InteractiveWeatherMap';
import { formatTemperature, useLanguage, useTemperatureUnit } from '../context/LanguageContext';
import {
  fetchCurrentWeather,
  GEO_DAYS,
  GEO_MONTHS,
  localizeCityName,
  localizeWeatherDescription,
  CurrentWeather as ICurrentWeatherData,
  UserCoordinates,
} from '../services/weatherService';

interface CurrentWeatherProps {
  city?: string;
  coordinates?: UserCoordinates | null;
  mapWeather?: MapWeather | null;
  cityNameOverride?: string;
}

/**
 * ითვლის მიმდინარე თარიღსა და დროს GMT+4 დროის სარტყელში
 */
const getGmt4DateTime = (language: string) => {
  const now = new Date();
  const tbilisiDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tbilisi' }));
  const locale = language === 'en' ? 'en-GB' : 'ru-RU';
  const dateStr = language === 'ka'
    ? `${GEO_DAYS[tbilisiDate.getDay()]}, ${tbilisiDate.getDate()} ${GEO_MONTHS[tbilisiDate.getMonth()]}`
    : new Intl.DateTimeFormat(locale, {
      timeZone: 'Asia/Tbilisi', weekday: 'long', day: 'numeric', month: 'long',
    }).format(now);

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

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city = 'Tbilisi', coordinates, mapWeather, cityNameOverride }) => {
  const language = useLanguage();
  const temperatureUnit = useTemperatureUnit();
  // საწყისი მნიშვნელობები ზუსტად სქრინშოტის იდენტურია
  const [weather, setWeather] = useState<ICurrentWeatherData>({
    cityName: 'თბილისი',
    temp: 14,
    description: 'ღრუბლიანი',
    iconCode: '04',
    windSpeed: 11,
    windDirectionText: 'ჩრდ',
    pressure: 1018,
    humidity: 67,
    visibility: '10 კმ',
  });

  const [{ dateStr, timeStr }, setDateTime] = useState(() => getGmt4DateTime(language));

  // ცოცხალი საათის ტაიმერი (ყოველ წამში ახლდება)
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getGmt4DateTime(language));
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  // OpenWeatherMap API-დან მიმდინარე მონაცემების მიღება
  useEffect(() => {
    if (mapWeather) {
      const code = mapWeather.code;
      const description = code === 0
        ? localizeWeatherDescription(800, '', language)
        : code <= 3 ? localizeWeatherDescription(803, '', language)
          : code <= 48 ? localizeWeatherDescription(741, '', language)
            : code <= 67 ? localizeWeatherDescription(500, '', language)
              : code <= 77 ? localizeWeatherDescription(600, '', language)
                : code <= 82 ? localizeWeatherDescription(500, '', language)
                  : localizeWeatherDescription(200, '', language);
      setWeather({
        cityName: cityNameOverride ?? localizeCityName(mapWeather.name, language),
        temp: Math.round(mapWeather.temperature),
        description,
        iconCode: code === 0 ? '01' : code <= 2 ? '02' : code === 3 ? '04' : code <= 48 ? '50' : code <= 67 ? '10' : code <= 77 ? '13' : '11',
        windSpeed: mapWeather.wind, windDirectionText: '', pressure: 0,
        humidity: mapWeather.humidity, visibility: '',
      });
      return;
    }
    let isMounted = true;
    fetchCurrentWeather(city, coordinates, language)
      .then((data) => {
        if (isMounted) setWeather({ ...data, cityName: cityNameOverride ?? data.cityName });
      })
      .catch(() => {
        // შეცდომის შემთხვევაში უსაფრთხოდ რჩება საწყისი მონაცემი
      });

    return () => {
      isMounted = false;
    };
  }, [city, coordinates, mapWeather, language, cityNameOverride]);

  return (
    <div className="w-full max-w-full sm:max-w-[320px] text-white font-amindi1 select-none mb-3 sm:mb-4">
      {/* 1. ქალაქის სახელი */}
      <h1 className="text-[28px] sm:text-[38px] font-sanet tracking-tight leading-none text-white m-0">
        {weather.cityName}
      </h1>

      {/* 2. თარიღი (e.g. ორშაბათი, 26 ოქტომბერი) */}
      <div className="text-[12px] font-sanet sm:text-[14px] text-white/90 mt-1.5 leading-tight font-medium">
        {dateStr}
      </div>

      {/* 3. ცოცხალი საათი წამებით (e.g. 18:53:40) GMT+4 */}
      <div className="text-[12px] sm:text-[14px] text-white font-bold tracking-wider mt-0.5">
        {timeStr}
      </div>

      {/* 4. ამინდის დიდი იკონი, აღწერა და დიდი ტემპერატურა */}
      <div className="flex items-center justify-between mt-2.5 sm:mt-3">
        {/* მარცხენა მხარე: იკონი და მის ქვემოთ აღწერა */}
        <div className="flex flex-col items-center">
          <img
            src={`https://amindi.ge/static/img/weather_big_${weather.iconCode}.png`}
            alt={weather.description}
            className="w-[95px] sm:w-[130px] h-auto object-contain drop-shadow"
            onError={(e) => {
              // fallback: თუ weather_big ვერ ჩაიტვირთა
              (e.currentTarget as HTMLImageElement).src =
                `https://amindi.ge/static/img/weather_small_${weather.iconCode}.png`;
            }}
          />
          <span className="text-[12px] font-sanet sm:text-[14px] font-bold text-white tracking-wide mt-1 text-center">
            {weather.description}
          </span>
        </div>

        {/* მარჯვენა მხარე: დიდი ტემპერატურა */}
        <div className="text-[48px] sm:text-[68px] font-sanet font-bold text-white leading-none pr-2 sm:pr-4">
          {formatTemperature(weather.temp, temperatureUnit)}°{temperatureUnit}
        </div>
      </div>
    </div>
  );
};
