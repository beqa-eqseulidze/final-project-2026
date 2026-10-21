/**
 * @file DaysForecastTabs.tsx
 * @description amindi.ge-ს იდენტური "ამინდი დღეების მიხედვით" ბლოკი (.weather-days).
 * მოიცავს:
 * - თითოეული დღის ამინდის ინდივიდუალურ ბარათებს (.card) 5-კოლონიან მწკრივებად:
 *   - 5 დღის: 5 ქარდი (1 მწკრივი)
 *   - 10 დღის: 10 ქარდი (2 მწკრივი)
 *   - 2 კვირის: 15 ქარდი (3 მწკრივი)
 *   - 1 თვის: 25 ქარდი (5 მწკრივი)
 *   - მთვარის ფაზების კალენდარი: 4 ქარდი ზუსტად amindi.ge-ს მთვარის ხატულებით
 *     (https://amindi.ge/static/img/moon/{full,last,new,first}.png)
 * - ზუსტად amindi.ge-ს დღის ხატულებს: https://amindi.ge/static/img/weather_small_{iconCode}.png
 */

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ForecastTab, setActiveTab, setHourlyModalOpen } from '../../store/slices/uiSlice';
import { DailyForecastItem } from '../../types/weather.types';
import { formatTempValue, getSmallIconUrl } from '../../utils/weatherUtils';
import { TBILISI_25_DAYS } from '../../data/initialData';

const MOON_PHASES = [
  {
    id: 'moon-full',
    title: 'სავსე მთვარე',
    date: '26 ოქტომბერი',
    img: 'https://amindi.ge/static/img/moon/full.png',
  },
  {
    id: 'moon-last',
    title: 'ბოლო მეოთხედი',
    date: '01 ნოემბერი',
    img: 'https://amindi.ge/static/img/moon/last.png',
  },
  {
    id: 'moon-new',
    title: 'ახალი მთვარე',
    date: '09 ნოემბერი',
    img: 'https://amindi.ge/static/img/moon/new.png',
  },
  {
    id: 'moon-first',
    title: 'პირველი მეოთხედი',
    date: '17 ნოემბერი',
    img: 'https://amindi.ge/static/img/moon/first.png',
  },
];

export const DaysForecastTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);
  const { unit, activeTab } = useAppSelector((state) => state.ui);

  const city = cities.find((c) => c.id === selectedCityId) || cities[0];

  if (!city) return null;

  // ტაბების სია ზუსტად amindi.ge-ს მიხედვით
  const tabs: { id: ForecastTab; label: string }[] = [
    { id: '5days', label: '5 დღის' },
    { id: '10days', label: '10 დღის' },
    { id: '2weeks', label: '2 კვირის' },
    { id: '1month', label: '1 თვის' },
    { id: 'moon', label: 'მთვარის ფაზების კალენდარი' },
  ];

  /** აქტიური ტაბის მიხედვით დღიური სიის მიღება (5, 10, 15 ან 25 დღე) */
  const getDailyList = (): DailyForecastItem[] => {
    const base = city.daily && city.daily.length >= 25 ? city.daily : TBILISI_25_DAYS;
    if (activeTab === '5days') return base.slice(0, 5);
    if (activeTab === '10days') return base.slice(0, 10);
    if (activeTab === '2weeks') return base.slice(0, 15);
    if (activeTab === '1month') return base.slice(0, 25);
    return base.slice(0, 5);
  };

  const currentDaily = getDailyList();

  // დავყოთ 5-5 ქარდად თითოეულ მწკრივში (ზუსტად როგორც amindi.ge-ზეა .card-group)
  const rows: DailyForecastItem[][] = [];
  for (let i = 0; i < currentDaily.length; i += 5) {
    rows.push(currentDaily.slice(i, i + 5));
  }

  return (
    <div className="weather-days w-full mb-2">
      {/* .weather-days-right: background: #eeeeee; border-radius: 5px 5px 0 0 */}
      <div className="weather-days-right bg-[#eeeeee] rounded-t-[5px]">
        <span className="block text-center text-[#363636] pt-[8px] text-[16px]">
          {activeTab === 'moon' ? 'მთვარის ფაზების კალენდარი' : 'ამინდი დღეების მიხედვით'}
        </span>

        {activeTab === 'moon' ? (
          /* მთვარის ფაზების კალენდრის 4 ქარდი (https://amindi.ge/ka/moon/) */
          <div className="card-group grid grid-cols-2 sm:grid-cols-4 gap-[3px] text-center p-2">
            {MOON_PHASES.map((phase) => (
              <div
                key={phase.id}
                className="card bg-white rounded-[4px] p-2.5 flex flex-col items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                <div className="card-body w-full p-1">
                  <span className="week-day block text-[12px] text-[#363636]">
                    {phase.title}
                  </span>
                  <span className="month-day block text-[10px] text-[#898989] mt-0.5">
                    {phase.date}
                  </span>
                  <img
                    src={phase.img}
                    alt={phase.title}
                    className="mx-auto my-[10px]"
                    style={{ width: '65px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* დღიური ამინდის ქარდები 5-კოლონიან მწკრივებად */
          <div className="pb-1">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="card-group grid grid-cols-2 sm:grid-cols-5 gap-[3px] text-center p-2 pt-1.5"
              >
                {row.map((day) => (
                  <div
                    key={day.id}
                    onClick={() => dispatch(setHourlyModalOpen(true))}
                    className="card bg-white rounded-[4px] p-2 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-between"
                  >
                    <div className="card-body w-full p-0.5">
                      <span className="week-day block text-[12px] text-[#363636]">
                        {day.dayName}
                      </span>
                      <span className="month-day block text-[10px] text-[#898989]">
                        {day.date}
                      </span>
                      <img
                        src={getSmallIconUrl(day.condition, day.iconCode)}
                        alt={day.conditionLabel}
                        className="mx-auto my-[10px] h-auto"
                      />
                      <div className="day-night flex items-center justify-center gap-1.5">
                        <span
                          className="font-amindi1 text-[16px] text-[#363636]"
                          data-temp={day.tempMax}
                        >
                          {formatTempValue(day.tempMax, unit)}
                        </span>
                        <span
                          className="night font-amindi1 text-[16px] text-[#707070]"
                          data-temp={day.tempMin}
                        >
                          {formatTempValue(day.tempMin, unit)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* .weather-days-nav: background: #15aadc; border-radius: 0 0 5px 5px */}
      <div className="weather-days-nav bg-[#15aadc] rounded-b-[5px] min-h-[35px] leading-[35px] text-[13px] px-2">
        <ul className="list-none m-0 p-0 flex flex-wrap items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className={isActive ? 'active' : ''}>
                <button
                  type="button"
                  onClick={() => dispatch(setActiveTab(tab.id))}
                  className={`block px-[10px] text-[13px] bg-transparent border-0 cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#f9bf3b]'
                      : 'text-white hover:text-[#f9bf3b]'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
