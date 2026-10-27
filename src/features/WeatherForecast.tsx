/**
 * @file WeatherForecast.tsx
 * @description amindi.ge-ს სტილის ამინდის პროგნოზის ბლოკი ("ამინდი დღეების მიხედვით").
 *
 * ვიზუალური შესაბამისობა:
 * - ღია ნაცრისფერი ფონი (#eee / #f4f4f4)
 * - სათაური: "ამინდი დღეების მიხედვით"
 * - 5 დღის სვეტები (დღე, თარიღი, amindi.ge-ს იკონი, ღამის° დღის°)
 * - აქტიური/არჩეული დღის თეთრი ფონით (#fff) და ჩრდილით გამოკვეთა
 * - ცისფერი (#15aadc) ტაბ-ბარი ქვემოთ: 5 დღის / 10 დღის / 2 კვირის / 1 თვის / მთვარის ფაზების კალენდარი
 */

import React, { useState, useEffect, useCallback } from 'react';
import { fetchForecast, DailyForecast } from '../services/weatherService';

type TabId = '5days' | '10days' | '2weeks' | '1month' | 'moon';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: '5days',   label: '5 დღის' },
  { id: '10days',  label: '10 დღის' },
  { id: '2weeks',  label: '2 კვირის' },
  { id: '1month',  label: '1 თვის' },
  { id: 'moon',    label: 'მთვარის ფაზების კალენდარი' },
];

interface MoonPhase {
  name: string;
  imgSlug: string;
  description: string;
}

const MOON_PHASES: MoonPhase[] = [
  { name: 'ახალმთვარე',  imgSlug: 'new',   description: 'მთვარე არ ჩანს ცაზე' },
  { name: 'მომატება (I)', imgSlug: 'first', description: 'მთვარის მომატება' },
  { name: 'სავსემთვარე', imgSlug: 'full',  description: 'მთლიანად ნათელია' },
  { name: 'კლება (III)',  imgSlug: 'last',  description: 'მთვარის კლება' },
];

interface WeatherForecastProps {
  /** არჩეული ქალაქი (ნაგულისხმევი: Tbilisi) */
  city?: string;
  /** დღის არჩევის callback */
  onSelectDay?: (day: DailyForecast) => void;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  city = 'Tbilisi',
  onSelectDay,
}) => {
  const [activeTab, setActiveTab]         = useState<TabId>('5days');
  const [forecast, setForecast]           = useState<DailyForecast[]>([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [loading, setLoading]             = useState<boolean>(false);
  const [error, setError]                 = useState<string | null>(null);

  // მონაცემების მიღება OpenWeatherMap-იდან
  const loadForecast = useCallback(async (targetCity: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchForecast(targetCity, 5);
      setForecast(data);
      if (data.length > 0) {
        setSelectedDayIdx(0);
        onSelectDay?.(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'პროგნოზის მიღება ვერ მოხერხდა');
    } finally {
      setLoading(false);
    }
  }, [onSelectDay]);

  useEffect(() => {
    if (activeTab !== 'moon') {
      loadForecast(city);
    }
  }, [city, activeTab, loadForecast]);

  const handleCardClick = (day: DailyForecast, index: number) => {
    setSelectedDayIdx(index);
    onSelectDay?.(day);
  };

  return (
    <div className="w-full select-none shadow-md overflow-hidden rounded-t-[4px] border border-black/10">

      {/* 1. ზედა ბლოკი: ღია ნაცრისფერი ფონი amindi.ge (#eee) */}
      <div className="bg-[#eeeeee] p-3 sm:p-4 pb-0">
        
        {/* სათაური */}
        <h2 className="font-amindi1 text-[#222222] text-[13px] sm:text-[15px] font-bold uppercase tracking-wide mb-2 sm:mb-3">
          ამინდი დღეების მიხედვით
        </h2>

        {/* კონტენტი: დღეების ბარათები ან მთვარის ფაზები ან Skeleton */}
        {activeTab === 'moon' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3">
            {MOON_PHASES.map((phase) => (
              <div
                key={phase.imgSlug}
                className="flex flex-col items-center bg-white p-2 rounded shadow-sm text-center"
              >
                <img
                  src={`https://amindi.ge/static/img/moon/${phase.imgSlug}.png`}
                  alt={phase.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="font-amindi1 text-[12px] font-bold text-[#222] mt-1">
                  {phase.name}
                </span>
                <span className="font-amindi2 text-[10px] text-[#666]">
                  {phase.description}
                </span>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-5 gap-1 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-[120px] bg-black/5 animate-pulse rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="font-amindi2 text-red-600 text-xs sm:text-sm mb-2">{error}</p>
            <button
              onClick={() => loadForecast(city)}
              className="font-amindi1 text-xs px-3 py-1 bg-[#15aadc] text-white rounded cursor-pointer"
            >
              ხელახლა ცდა
            </button>
          </div>
        ) : (
          /* 5 დღის სვეტები - ზუსტად როგორც amindi.ge-ზე */
          <div className="grid grid-cols-5 items-stretch">
            {forecast.map((day, idx) => {
              const isSelected = selectedDayIdx === idx;
              return (
                <div
                  key={day.date}
                  onClick={() => handleCardClick(day, idx)}
                  className={`
                    flex flex-col items-center justify-between cursor-pointer
                    py-2 px-1 transition-all duration-150 rounded-t-[3px]
                    ${isSelected
                      ? 'bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] relative z-10'
                      : 'bg-transparent hover:bg-white/60'
                    }
                  `}
                >
                  {/* კვირის დღე */}
                  <span className="font-amindi1 text-[11px] sm:text-[13px] font-bold text-[#222222] text-center leading-tight">
                    {day.dayName}
                  </span>

                  {/* თარიღი */}
                  <span className="font-amindi2 text-[10px] sm:text-[11px] text-[#666666] text-center mt-0.5 leading-tight">
                    {day.dateLabel}
                  </span>

                  {/* amindi.ge-ს იკონი */}
                  <img
                    src={`https://amindi.ge/static/img/weather_small_${day.iconCode}.png`}
                    alt={day.description}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain my-1.5"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://amindi.ge/static/img/weather_small_01.png';
                    }}
                  />

                  {/* ტემპერატურა: ღამე° დღე° გვერდიგვერდ */}
                  <div className="font-amindi1 text-[11px] sm:text-[13px] font-bold text-[#333333] flex items-center justify-center gap-1.5 sm:gap-2.5 pb-1">
                    <span>{day.tempMin}°</span>
                    <span>{day.tempMax}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. ქვედა ტაბ-ბარი: amindi.ge-ს ცისფერი (#15aadc) */}
      <nav
        className="flex flex-wrap items-center bg-[#15aadc] overflow-x-auto"
        role="tablist"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 min-w-[70px] sm:min-w-0 py-2 sm:py-2.5 px-1 sm:px-3 text-center
                font-amindi1 text-[11px] sm:text-[13px] transition-colors whitespace-nowrap cursor-pointer border-0
                ${isActive
                  ? 'bg-[#0a8ab5] text-white font-bold'
                  : 'text-white hover:bg-[#129ac6]'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
