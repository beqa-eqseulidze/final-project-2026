/**
 * @file CitySelectorBar.tsx
 * @description amindi.ge-ს იდენტური ზედა ხელსაწყოების ზოლი (.tool-bars) და ქალაქების მეგა-მენიუ (.cities).
 * მოიცავს:
 * - "აირჩიე ქალაქი" ღილაკს (#show-cities, background: #15aadc), რომელიც ხსნის ყველა ქალაქის სიას
 *   (საქართველოს 49 ქალაქი და უცხოეთის 12 ქალაქი ტემპერატურებით)
 * - საძიებო ველს (#search) ზუსტად https://amindi.ge/static/img/search.png ხატულით და ჩამოსაშლელი სიით
 * - ენის გადამრთველს (geo.png, eng.png, rus.png)
 * - ტემპერატურის ერთეულის გადამრთველს (C° / F°)
 */

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchWeatherForCity, setSelectedCity } from '../../store/slices/weatherSlice';
import {
  setLanguage,
  setSearchQuery,
  setUnit,
} from '../../store/slices/uiSlice';
import { formatTempValue } from '../../utils/weatherUtils';

export const CitySelectorBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);
  const { unit, language, searchQuery } = useAppSelector((state) => state.ui);

  const [isCitiesOpen, setIsCitiesOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const georgianCities = cities.filter((c) => !c.isForeign);
  const foreignCities = cities.filter((c) => c.isForeign);

  /** ქალაქის არჩევა სიიდან */
  const handleCitySelect = (cityId: string) => {
    dispatch(setSelectedCity(cityId));
    setIsCitiesOpen(false);
    setIsSearchFocused(false);
    dispatch(setSearchQuery(''));
    dispatch(fetchWeatherForCity(cityId));
  };

  /** ქალაქების გაფილტვრა საძიებო ტექსტის მიხედვით */
  const filteredCities = searchQuery.trim()
    ? cities.filter(
        (c) =>
          c.nameKa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full">
      {/* .tool-bars ზოლი */}
      <div className="tool-bars flex flex-wrap items-center justify-between gap-2">
        {/* მარცხენა მხარე: "აირჩიე ქალაქი" */}
        <div className="flex items-center">
          <button
            id="show-cities"
            type="button"
            onClick={() => setIsCitiesOpen((prev) => !prev)}
            className="h-[30px] px-3 bg-[#15aadc] hover:bg-[#1298c5] text-white text-[12px] rounded-[4px] border border-[#15aadc] cursor-pointer transition-colors"
          >
            აირჩიე ქალაქი
          </button>
        </div>

        {/* მარჯვენა მხარე: .search, ენის dropdown, ტემპერატურის ერთეულის dropdown */}
        <div className="flex items-center">
          {/* .search */}
          <div className="search relative inline-block w-[160px] h-[30px] bg-[#15aadc] rounded-[6px]">
            <input
              id="search"
              type="text"
              placeholder="მოძებნე ქალაქი"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 180)}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-[155px] border-0 bg-transparent text-white placeholder-white text-[12px] h-[30px] pl-[30px] pr-2 focus:outline-none"
              style={{
                backgroundImage: "url('https://amindi.ge/static/img/search.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '7px 7px',
              }}
            />

            {/* .cities-list საძიებო შედეგების ჩამოსაშლელი სია */}
            {isSearchFocused && filteredCities.length > 0 && (
              <div className="cities-list absolute left-0 top-[34px] w-[190px] bg-[#15aadc] rounded-[4px] py-2 z-50 shadow-lg max-h-72 overflow-y-auto">
                <ul className="list-none m-0 p-0">
                  {filteredCities.map((city) => (
                    <li
                      key={city.id}
                      className="px-2.5 py-1 border-b border-[#068bb7] last:border-b-0 hover:bg-[#0e93bf]"
                    >
                      <button
                        type="button"
                        onMouseDown={() => handleCitySelect(city.id)}
                        className="w-full text-left text-white text-[13px] flex items-center justify-between cursor-pointer bg-transparent border-0 p-0"
                      >
                        <span>{language === 'ka' ? city.nameKa : city.nameEn}</span>
                        <span>{formatTempValue(city.currentTemp, unit)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ენის Dropdown (amindi.ge-ს geo.png, eng.png, rus.png) */}
          <div className="relative inline-block ml-[10px] group">
            <button
              type="button"
              className="bg-transparent text-white h-[30px] text-[12px] border-0 cursor-pointer flex items-center gap-1.5"
            >
              <img
                src={
                  language === 'ka'
                    ? 'https://amindi.ge/static/img/geo.png'
                    : 'https://amindi.ge/static/img/eng.png'
                }
                alt="lang"
                className="inline-block"
              />
              <span>{language === 'ka' ? 'ქართული' : 'ინგლისური'}</span>
              <span className="text-[8px] ml-0.5">▼</span>
            </button>
            <div className="hidden group-hover:block absolute left-0 top-[30px] bg-[#15aadc] min-w-[115px] rounded-[6px] shadow-md z-50 overflow-hidden">
              <button
                type="button"
                onClick={() => dispatch(setLanguage('ka'))}
                className="w-full text-left text-white px-2.5 py-2 text-[12px] hover:bg-[#1298c5] flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
              >
                <img src="https://amindi.ge/static/img/geo.png" alt="geo" />
                <span>ქართული</span>
              </button>
              <button
                type="button"
                onClick={() => dispatch(setLanguage('en'))}
                className="w-full text-left text-white px-2.5 py-2 text-[12px] hover:bg-[#1298c5] flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
              >
                <img src="https://amindi.ge/static/img/eng.png" alt="eng" />
                <span>ინგლისური</span>
              </button>
              <button
                type="button"
                onClick={() => dispatch(setLanguage('ka'))}
                className="w-full text-left text-white px-2.5 py-2 text-[12px] hover:bg-[#1298c5] flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
              >
                <img src="https://amindi.ge/static/img/rus.png" alt="rus" />
                <span>რუსული</span>
              </button>
            </div>
          </div>

          {/* C° / F° Dropdown */}
          <div className="relative inline-block ml-[10px] group">
            <button
              type="button"
              onClick={() => dispatch(setUnit(unit === 'C' ? 'F' : 'C'))}
              className="bg-transparent text-white h-[30px] text-[12px] border-0 cursor-pointer flex items-center gap-1"
            >
              <span>{unit}°</span>
              <span className="text-[8px]">▼</span>
            </button>
            <div className="hidden group-hover:block absolute right-0 top-[30px] bg-[#15aadc] min-w-[50px] rounded-[6px] shadow-md z-50 overflow-hidden">
              <button
                type="button"
                onClick={() => dispatch(setUnit(unit === 'C' ? 'F' : 'C'))}
                className="w-full text-center text-white px-2.5 py-1.5 text-[12px] hover:bg-[#1298c5] cursor-pointer bg-transparent border-0"
              >
                {unit === 'C' ? 'F°' : 'C°'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* .cities მეგა-მენიუ (იხსნება "აირჩიე ქალაქი"-ზე დაჭერისას, ზუსტად amindi.ge-ს მსგავსად) */}
      {isCitiesOpen && (
        <div className="cities w-full bg-[#15aadc] rounded-[5px] p-[15px] mt-[8px] text-white shadow-lg">
          <span className="block text-[16px] font-medium mb-2">საქართველოს ქალაქები</span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-0.5 mt-2">
            {georgianCities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleCitySelect(city.id)}
                className={`text-left text-[13px] py-0.5 hover:text-[#f9bf3b] transition-colors flex items-center justify-between cursor-pointer bg-transparent border-0 ${
                  city.id === selectedCityId ? 'text-[#f9bf3b] font-bold' : 'text-white'
                }`}
              >
                <span>{language === 'ka' ? city.nameKa : city.nameEn}</span>
                <span className="ml-2">{formatTempValue(city.currentTemp, unit)}</span>
              </button>
            ))}
          </div>

          <hr className="amindi-hr my-3" />

          <span className="block text-[16px] font-medium mb-2">უცხოეთის ქალაქები</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-0.5 mt-2">
            {foreignCities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleCitySelect(city.id)}
                className={`text-left text-[13px] py-0.5 hover:text-[#f9bf3b] transition-colors flex items-center justify-between cursor-pointer bg-transparent border-0 ${
                  city.id === selectedCityId ? 'text-[#f9bf3b] font-bold' : 'text-white'
                }`}
              >
                <span>{language === 'ka' ? city.nameKa : city.nameEn}</span>
                <span className="ml-2">{formatTempValue(city.currentTemp, unit)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
