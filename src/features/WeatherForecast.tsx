/**
 * @file WeatherForecast.tsx
 * @description amindi.ge-ს სტილის ამინდის პროგნოზის ბლოკი:
 * - "5 დღის" (დღეების პროგნოზი)
 * - "5 დღის საათობრივი ამინდის პროგნოზი" (ზუსტად 1 დღის საათობრივი პროგნოზის დიზაინითა და ბადით)
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchForecast,
  fetch5DayHourlyForecast,
  DailyForecast,
  DayHourlyForecast,
  UserCoordinates,
} from '../services/weatherService';
import { formatTemperature, useLanguage, useTemperatureUnit } from '../context/LanguageContext';

interface WeatherForecastProps {
  /** არჩეული ქალაქი (ნაგულისხმევი: Tbilisi) */
  city?: string;
  coordinates?: UserCoordinates | null;
  /** დღის არჩევის callback */
  onSelectDay?: (day: DailyForecast) => void;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  city = 'Tbilisi',
  coordinates,
  onSelectDay,
}) => {
  const language = useLanguage();
  const temperatureUnit = useTemperatureUnit();
  // ხედვის რეჟიმი: 'daily' (5 დღის) ან 'hourly' (5 დღის საათობრივი)
  const [viewMode, setViewMode] = useState<'daily' | 'hourly'>('daily');

  // 5 დღის დღიური პროგნოზი
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [loadingDaily, setLoadingDaily] = useState<boolean>(false);
  const [errorDaily, setErrorDaily] = useState<string | null>(null);

  // 5 დღის საათობრივი პროგნოზი
  const [hourlyDays, setHourlyDays] = useState<DayHourlyForecast[]>([]);
  const [selectedHourlyDayIdx, setSelectedHourlyDayIdx] = useState<number>(0);
  const [selectedHourIdx, setSelectedHourIdx] = useState<number>(11); // 12:00 (შუადღე)
  const [loadingHourly, setLoadingHourly] = useState<boolean>(false);
  const [errorHourly, setErrorHourly] = useState<string | null>(null);

  // დღიური პროგნოზის ჩატვირთვა
  const loadDailyForecast = useCallback(async (targetCity: string, targetCoordinates?: UserCoordinates | null) => {
    setLoadingDaily(true);
    setErrorDaily(null);
    try {
      const data = await fetchForecast(targetCity, 5, targetCoordinates, language);
      setForecast(data);
      if (data.length > 0) {
        setSelectedDayIdx(0);
        onSelectDay?.(data[0]);
      }
    } catch (err) {
      setErrorDaily(err instanceof Error ? err.message : 'პროგნოზის მიღება ვერ მოხერხდა');
    } finally {
      setLoadingDaily(false);
    }
  }, [onSelectDay, language]);

  // საათობრივი პროგნოზის ჩატვირთვა
  const loadHourlyForecast = useCallback(async (targetCity: string, targetCoordinates?: UserCoordinates | null) => {
    setLoadingHourly(true);
    setErrorHourly(null);
    try {
      const data = await fetch5DayHourlyForecast(targetCity, targetCoordinates, language);
      setHourlyDays(data);
      if (data.length > 0) {
        setSelectedHourlyDayIdx(0);
      }
    } catch (err) {
      setErrorHourly(err instanceof Error ? err.message : 'საათობრივი პროგნოზის მიღება ვერ მოხერხდა');
    } finally {
      setLoadingHourly(false);
    }
  }, [language]);

  // ქალაქის ან კოორდინატების შეცვლისას მონაცემების მიღება
  useEffect(() => {
    loadDailyForecast(city, coordinates);
    loadHourlyForecast(city, coordinates);
  }, [city, coordinates, loadDailyForecast, loadHourlyForecast]);

  const handleCardClick = (day: DailyForecast, index: number) => {
    setSelectedDayIdx(index);
    onSelectDay?.(day);
  };

  const selectedDayHourly = hourlyDays[selectedHourlyDayIdx] ?? hourlyDays[0];

  return (
    <div className="w-full select-none shadow-md overflow-hidden rounded-[4px] border border-black/10">

      {/* 1. ზედა ბლოკი: ღია ნაცრისფერი ფონი amindi.ge (#eee) */}
      <div className="bg-[#eeeeee] p-3 sm:p-5 pb-3">
        
        {/* სათაური */}
        <div className="mb-3 sm:mb-4">
          <h2 className="font-amindi1 text-[#19375c] text-[14px] sm:text-[18px] font-bold uppercase tracking-wide">
            {viewMode === 'daily'
              ? (language === 'ka' ? 'ამინდი დღეების მიხედვით' : language === 'en' ? 'Daily forecast' : 'Прогноз по дням')
              : (language === 'ka' ? 'ამინდი საათების მიხედვით' : language === 'en' ? 'Hourly forecast' : 'Почасовой прогноз')}
          </h2>
        </div>

        {/* --- რეჟიმი 1: 5 დღის დღიური პროგნოზი --- */}
        {viewMode === 'daily' && (
          <>
            {loadingDaily ? (
              <div className="grid grid-cols-5 gap-1 py-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-[120px] bg-black/5 animate-pulse rounded" />
                ))}
              </div>
            ) : errorDaily ? (
              <div className="py-6 text-center">
                <p className="font-amindi2 text-red-600 text-xs sm:text-sm mb-2">{errorDaily}</p>
                <button
                  onClick={() => loadDailyForecast(city, coordinates)}
                  className="font-amindi1 text-xs px-3 py-1 bg-[#15aadc] text-white rounded cursor-pointer"
                >
                  {language === 'ka' ? 'ხელახლა ცდა' : language === 'en' ? 'Try again' : 'Повторить'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-5 items-stretch">
                {forecast.map((day, idx) => {
                  const isSelected = selectedDayIdx === idx;
                  return (
                    <div
                      key={day.date}
                      onClick={() => handleCardClick(day, idx)}
                      className={`
                        flex flex-col items-center justify-between cursor-pointer
                        py-1.5 sm:py-2 px-0.5 sm:px-1 transition-all duration-150 rounded-t-[3px]
                        ${isSelected
                          ? 'bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] relative z-10'
                          : 'bg-transparent hover:bg-white/60'
                        }
                      `}
                    >
                      {/* კვირის დღე */}
                      <span className="font-amindi1 text-[10px] sm:text-[13px] font-bold text-[#222222] text-center leading-tight">
                        {day.dayName}
                      </span>

                      {/* თარიღი */}
                      <span className="font-amindi2 text-[9px] sm:text-[11px] text-[#666666] text-center mt-0.5 leading-tight">
                        {day.dateLabel}
                      </span>

                      {/* amindi.ge-ს იკონი */}
                      <img
                        src={`https://amindi.ge/static/img/weather_small_${day.iconCode}.png`}
                        alt={day.description}
                        className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain my-1 sm:my-1.5"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://amindi.ge/static/img/weather_small_01.png';
                        }}
                      />

                      {/* ტემპერატურა: ღამე° დღე° */}
                      <div className="font-amindi1 text-[10px] sm:text-[13px] font-bold text-[#333333] flex items-center justify-center gap-1 sm:gap-2.5 pb-1">
                        <span>{formatTemperature(day.tempMin, temperatureUnit)}°{temperatureUnit}</span>
                        <span>{formatTemperature(day.tempMax, temperatureUnit)}°{temperatureUnit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* --- რეჟიმი 2: 5 დღის საათობრივი პროგნოზი (ზუსტად 1 დღის საათობრივი პროგნოზის სტილით) --- */}
        {viewMode === 'hourly' && (
          <div className="space-y-4">
            {/* 5 დღის არჩევა */}
            {forecast.length > 0 && (
              <div className="grid grid-cols-5 items-stretch border-b border-black/10 pb-2.5">
                {forecast.map((day, idx) => {
                  const isSelected = selectedHourlyDayIdx === idx;
                  return (
                    <div
                      key={day.date}
                      onClick={() => setSelectedHourlyDayIdx(idx)}
                      className={`
                        flex flex-col items-center justify-between cursor-pointer
                        py-1 sm:py-2 px-0.5 sm:px-1 transition-all duration-150 rounded
                        ${isSelected
                          ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] relative z-10 font-bold'
                          : 'bg-transparent hover:bg-white/60 text-[#444]'
                        }
                      `}
                    >
                      <span className="font-amindi1 text-[10px] sm:text-[13px] text-[#222222] text-center leading-tight">
                        {day.dayName}
                      </span>
                      <span className="font-amindi2 text-[9px] sm:text-[11px] text-[#666666] text-center mt-0.5 leading-tight">
                        {day.dateLabel}
                      </span>
                      <img
                        src={`https://amindi.ge/static/img/weather_small_${day.iconCode}.png`}
                        alt={day.description}
                        className="w-7 h-7 sm:w-9 sm:h-9 object-contain my-1"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://amindi.ge/static/img/weather_small_01.png';
                        }}
                      />
                      <div className="font-amindi1 text-[10px] sm:text-[12px] text-[#333333] flex items-center justify-center gap-1 sm:gap-2">
                        <span>{formatTemperature(day.tempMin, temperatureUnit)}°{temperatureUnit}</span>
                        <span>{formatTemperature(day.tempMax, temperatureUnit)}°{temperatureUnit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* საათობრივი ბადე: ზუსტად ისევე როგორც FullHourlyForecast */}
            {loadingHourly ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 py-4 sm:py-6">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="h-[95px] sm:h-[105px] bg-black/5 animate-pulse rounded" />
                ))}
              </div>
            ) : errorHourly ? (
              <div className="py-6 text-center">
                <p className="font-amindi2 text-red-600 text-xs sm:text-sm mb-2">{errorHourly}</p>
                <button
                  onClick={() => loadHourlyForecast(city, coordinates)}
                  className="font-amindi1 text-xs px-3 py-1 bg-[#15aadc] text-white rounded cursor-pointer"
                >
                  ხელახლა ცდა
                </button>
              </div>
            ) : (
              selectedDayHourly && (
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                  {selectedDayHourly.hours.map((item, idx) => {
                    const isSelected = selectedHourIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedHourIdx(idx)}
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
                          {formatTemperature(item.temp, temperatureUnit)}°{temperatureUnit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* 2. ქვედა ტაბ-ბარი: amindi.ge-ს ცისფერი (#15aadc) */}
      <nav
        className="bg-[#15aadc] w-full flex items-stretch overflow-x-auto"
        role="tablist"
      >
        {/* 1. "5 დღის" ღილაკი */}
        <button
          role="tab"
          aria-selected={viewMode === 'daily'}
          onClick={() => setViewMode('daily')}
          className={`
            py-1.5 sm:py-2 px-3 sm:px-5 text-center font-amindi1 text-[10px] sm:text-[12px] md:text-[13px] 
            transition-colors cursor-pointer border-0 shrink-0
            ${viewMode === 'daily'
              ? 'bg-[#0a8ab5] text-white font-bold'
              : 'text-white hover:bg-[#129ac6]'
            }
          `}
        >
          {language === 'ka' ? '5 დღის' : language === 'en' ? '5 days' : '5 дней'}
        </button>

        {/* 2. "5 დღის საათობრივი ამინდის პროგნოზი" ღილაკი */}
        <button
          role="tab"
          aria-selected={viewMode === 'hourly'}
          onClick={() => setViewMode('hourly')}
          className={`
            py-1.5 sm:py-2 px-3 sm:px-5 text-center font-amindi1 text-[10px] sm:text-[12px] md:text-[13px] 
            transition-colors cursor-pointer border-0 shrink-0
            ${viewMode === 'hourly'
              ? 'bg-[#0a8ab5] text-white font-bold'
              : 'text-white hover:bg-[#129ac6]'
            }
          `}
        >
          {language === 'ka' ? '5 დღის საათობრივი ამინდის პროგნოზი' : language === 'en' ? '5-day hourly forecast' : 'Почасовой прогноз на 5 дней'}
        </button>
      </nav>
    </div>
  );
};
