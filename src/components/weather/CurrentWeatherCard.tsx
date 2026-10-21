/**
 * @file CurrentWeatherCard.tsx
 * @description amindi.ge-ს იდენტური მარცხენა ზედა მთავარი ბლოკი (.weather-current).
 * ზუსტად იმეორებს https://amindi.ge/ka/ ვიზუალს:
 * - ქალაქის სახელი (h1, 30px)
 * - კვირის დღე და თარიღი (12px)
 * - ცოცხალი საათი წამზომით (12px)
 * - დიდი ამინდის ხატულა (https://amindi.ge/static/img/{iconCode}.png) და ტემპერატურა (80px, font1)
 * - მიმდინარე ამინდის ფრაზა (13px)
 * - ქალაქის რედაქტირებისა და წაშლის CRUD ღილაკები
 */

import React, { useEffect, useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { openEditCityModal } from '../../store/slices/uiSlice';
import { deleteCity } from '../../store/slices/weatherSlice';
import { formatTempValue, getLargeIconUrl } from '../../utils/weatherUtils';

export const CurrentWeatherCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);
  const { unit, language } = useAppSelector((state) => state.ui);

  const city = cities.find((c) => c.id === selectedCityId) || cities[0];

  // ცოცხალი საათის სტეიტი
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      const daysKa = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
      const monthsKa = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
      ];
      setCurrentDay(`${daysKa[now.getDay()]}, ${now.getDate()} ${monthsKa[now.getMonth()]}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!city) return null;

  const iconUrl = getLargeIconUrl(city.condition, city.iconCode);

  return (
    <div className="weather-current text-center text-white relative group pt-1">
      {/* CRUD ღილაკები (ჩნდება მაუსის მიტანისას) */}
      <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-10">
        <button
          onClick={() => dispatch(openEditCityModal(city.id))}
          className="p-1 rounded bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
          title="ქალაქის რედაქტირება (Formik/Yup CRUD)"
        >
          <Edit2 className="w-3 h-3" />
        </button>
        {cities.length > 1 && (
          <button
            onClick={() => {
              if (confirm(`დარწმუნებული ხართ, რომ გსურთ ${city.nameKa}-ს წაშლა?`)) {
                dispatch(deleteCity(city.id));
              }
            }}
            className="p-1 rounded bg-rose-600/50 hover:bg-rose-600 text-white transition cursor-pointer"
            title="ქალაქის წაშლა (Delete CRUD)"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* ქალაქის სახელი */}
      <h1 className="text-[30px] font-normal leading-tight m-0 mb-1 text-white">
        {language === 'ka' ? city.nameKa : city.nameEn}
      </h1>

      {/* თარიღი და ცოცხალი დრო */}
      <span className="date block text-[12px] text-white leading-snug">
        {currentDay || 'ორშაბათი, 19 ოქტომბერი'}
      </span>
      <span className="time block text-[12px] text-white leading-snug" id="time">
        {currentTime || city.lastUpdated}
      </span>

      {/* დიდი ამინდის ხატულა და ტემპერატურა */}
      <div className="degrees flex items-center justify-center gap-1 my-1">
        <img
          src={iconUrl}
          alt={city.conditionLabel}
          className="inline-block align-middle max-w-[115px] h-auto"
        />
        <span
          className="font-amindi1 text-[80px] leading-none align-middle text-white"
          data-temp={city.currentTemp}
        >
          {formatTempValue(city.currentTemp, unit)}
        </span>
      </div>

      {/* მიმდინარე ამინდის აღწერა */}
      <span className="current-phrase block text-[13px] text-white">
        {city.conditionLabel}
      </span>
    </div>
  );
};
