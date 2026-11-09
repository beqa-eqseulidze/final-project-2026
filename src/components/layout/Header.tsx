/**
 * @file Header.tsx
 * @description amindi.ge-ს ზედა ნავიგაციის კომპონენტი
 */

import React, { useState } from 'react';
import { CityDropdown } from '../choiceCity/CityDropdown';

// ქალაქის ტიპი
interface CityItem {
  id: number;
  name: string;
  temp: number;
}

// ქალაქების სია
const CITIES_LIST: CityItem[] = [
  { id: 1, name: 'Tbilisi', temp: 9 },
  { id: 2, name: 'Batumi', temp: 12 },
  { id: 3, name: 'Kutaisi', temp: 10 },
  { id: 4, name: 'Rustavi', temp: 11 },
  { id: 5, name: 'Gori', temp: 7 },
  { id: 6, name: 'Telavi', temp: 9 },
  { id: 7, name: 'Zugdidi', temp: 10 },
  { id: 8, name: 'Poti', temp: 12 },
  { id: 9, name: 'Bakuriani', temp: 3 },
];

export const Header: React.FC = () => {
  const [infoDropdownOpen, setInfoDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CityItem>(CITIES_LIST[0]);

  return (
    <header className="w-full select-none">
      <nav
        className="w-full relative z-50 font-amindi1"
        style={{
          height: '50px',
          backgroundColor: 'rgba(25, 55, 92, 0.75)',
        }}
      >
        <div className="amindi-container h-[50px] flex items-center justify-between">
          
          {/* მარცხენა მხარე: ლოგო და ქალაქების ჩამოშლადი მენიუ */}
        <div className="flex items-center">
            <a
              href="/ka/"
              className="flex items-center shrink-0"
              title="Amindi.ge - მთავარი"
            >
              <img
                src="https://amindi.ge/static/img/header-logo.png"
                alt="amindi.ge"
                className="h-[32px] sm:h-[40px] w-auto object-contain"
              />
            </a>
          </div>
          {/* დესკტოპ ნავიგაცია */}
          <ul className="hidden lg:flex items-center ml-auto m-0 p-0 list-none h-[50px]">
            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a href="/ka/" className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]">
                ამინდის პროგნოზი
              </a>
            </li>

            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a href="https://mkurnali.ge/" target="_blank" rel="noreferrer" className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]">
                ჯანმრთელობა
              </a>
            </li>

            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a href="http://radiopalitra.ge/" target="_blank" rel="noreferrer" className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]">
                რადიო
              </a>
            </li>

            {/* სასარგებლო ინფორმაცია (Dropdown) */}
            <li
              className={`relative h-[50px] flex items-center transition-colors ${
                infoDropdownOpen ? 'bg-[#19375c]' : 'hover:bg-[#19375c]'
              }`}
              onMouseEnter={() => setInfoDropdownOpen(true)}
              onMouseLeave={() => setInfoDropdownOpen(false)}
            >
              <span
                onClick={() => setInfoDropdownOpen((prev) => !prev)}
                className="block px-[8px] py-[14px] text-[14px] text-white cursor-pointer leading-[22px]"
              >
                სასარგებლო ინფორმაცია
              </span>

              {infoDropdownOpen && (
                <div className="dropDown absolute right-0 top-[49px] bg-[#19375c] z-[99999]">
                  <ul className="m-0 p-0 list-none">
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a href="https://amindi.ge/ka/world-clock/" target="_blank" rel="noreferrer" className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors">
                        მსოფლიო დრო
                      </a>
                    </li>
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a href="https://amindi.ge/ka/georgian-holiday/" target="_blank" rel="noreferrer" className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors">
                        საქართველოს დღესასწაულები
                      </a>
                    </li>
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a href="https://www.bpn.ge/currency" target="_blank" rel="noreferrer" className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors">
                        ვალუტა
                      </a>
                    </li>
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a href="https://www.ambebi.ge/astrology/" target="_blank" rel="noreferrer" className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors">
                        ჰოროსკოპი
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a href="http://adline.ge/" target="_blank" rel="noreferrer" className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]">
                რეკლამა
              </a>
            </li>
          </ul>

          {/* მობილური მენიუს ჰამბურგერ ღილაკი */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="lg:hidden px-2.5 py-1 text-white border border-white/30 rounded text-sm cursor-pointer bg-transparent"
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>

        {/* მობილური ჩამოსაშლელი მენიუ */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden absolute left-0 right-0 top-[49px] z-50 px-4 py-3 border-t border-white/15 flex flex-col gap-1 shadow-lg"
            style={{ backgroundColor: '#19375c' }}
          >
            <a href="/ka/" className="py-1.5 text-[14px] text-white no-underline">
              ამინდის პროგნოზი
            </a>
            <a href="https://mkurnali.ge/" target="_blank" rel="noreferrer" className="py-1.5 text-[14px] text-white no-underline">
              ჯანმრთელობა
            </a>
            <a href="http://radiopalitra.ge/" target="_blank" rel="noreferrer" className="py-1.5 text-[14px] text-white no-underline">
              რადიო
            </a>
            <a href="http://adline.ge/" target="_blank" rel="noreferrer" className="py-1.5 text-[14px] text-white no-underline">
              რეკლამა
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};