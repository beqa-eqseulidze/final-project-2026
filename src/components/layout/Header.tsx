/**
 * @file Header.tsx
 * @description amindi.ge-ს იდენტური ზედა ნავიგაცია (Header).
 * მოიცავს:
 * - amindi.ge-ს ორიგინალურ ლოგოს: https://amindi.ge/static/img/header-logo.png
 * - ნავიგაციის ლინკებს (ამინდის პროგნოზი, ჯანმრთელობა, რადიო, სასარგებლო ინფორმაცია, რეკლამა)
 * - "სასარგებლო ინფორმაცია" ჩამოსაშლელ მენიუს (.dropDown):
 *   1. მსოფლიო დრო
 *   2. საქართველოს დღესასწაულები
 *   3. ვალუტა
 *   4. ჰოროსკოპი
 */

import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { setViewMode } from '../../store/slices/uiSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full select-none">
      {/* amindi.ge-ს იდენტური ზედა ნავიგაციის ზოლი: height: 50px, background: rgba(25, 55, 92, 0.75), font-family: font1 */}
      <nav
        className="w-full relative z-50 font-amindi1"
        style={{
          height: '50px',
          backgroundColor: 'rgba(25, 55, 92, 0.75)',
        }}
      >
        <div className="max-w-[1220px] mx-auto px-[15px] flex items-center justify-between h-[50px]">
          {/* ლოგო: https://amindi.ge/static/img/header-logo.png */}
          <a
            href="/ka/"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setViewMode('portal'));
            }}
            className="flex items-center shrink-0"
          >
            <img
              src="https://amindi.ge/static/img/header-logo.png"
              alt="amindi.ge"
              style={{ height: '40px' }}
            />
          </a>

          {/* ნავიგაციის მენიუ მარჯვნივ (ml-auto), ზუსტად amindi.ge-ს სტრუქტურით */}
          <ul className="hidden lg:flex items-center ml-auto m-0 p-0 list-none h-[50px]">
            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a
                href="/ka/"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setViewMode('portal'));
                }}
                className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]"
              >
                ამინდის პროგნოზი
              </a>
            </li>

            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a
                href="https://mkurnali.ge/"
                target="_blank"
                rel="noreferrer"
                className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]"
              >
                ჯანმრთელობა
              </a>
            </li>

            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a
                href="http://radiopalitra.ge/"
                target="_blank"
                rel="noreferrer"
                className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]"
              >
                რადიო
              </a>
            </li>

            {/* სასარგებლო ინფორმაცია + .dropDown */}
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
                <div
                  className="dropDown absolute right-0 top-[49px] bg-[#19375c] z-[99999]"
                >
                  <ul className="m-0 p-0 list-none">
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a
                        href="https://amindi.ge/ka/world-clock/"
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors"
                      >
                        მსოფლიო დრო
                      </a>
                    </li>
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a
                        href="https://amindi.ge/ka/georgian-holiday/"
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors"
                      >
                        საქართველოს დღესასწაულები
                      </a>
                    </li>
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a
                        href="https://www.bpn.ge/currency"
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors"
                      >
                        ვალუტა
                      </a>
                    </li>
                    <li className="bg-[#19375c] text-white text-[14px] leading-[30px] block w-[300px]">
                      <a
                        href="https://www.ambebi.ge/astrology/"
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-[5px] px-[10px] text-white hover:bg-white hover:text-black no-underline transition-colors"
                      >
                        ჰოროსკოპი
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a
                href="http://adline.ge/advertisements/internet?filter[id]=2&filter[start_age]=&filter[end_age]=&filter[sex]=&filter[interest]=&filter[regions]="
                target="_blank"
                rel="noreferrer"
                className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]"
              >
                რეკლამა
              </a>
            </li>
          </ul>

          {/* მობილური მენიუს ღილაკი */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="lg:hidden px-2.5 py-1 text-white border border-white/30 rounded text-sm cursor-pointer bg-transparent"
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>

        {/* მობილური მენიუ */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden absolute left-0 right-0 top-[49px] z-50 px-4 py-3 border-t border-white/15 flex flex-col gap-1 shadow-lg"
            style={{ backgroundColor: '#19375c' }}
          >
            <a
              href="/ka/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setViewMode('portal'));
                setMobileMenuOpen(false);
              }}
              className="py-1.5 text-[14px] text-white no-underline"
            >
              ამინდის პროგნოზი
            </a>
            <a
              href="https://mkurnali.ge/"
              target="_blank"
              rel="noreferrer"
              className="py-1.5 text-[14px] text-white no-underline"
            >
              ჯანმრთელობა
            </a>
            <a
              href="http://radiopalitra.ge/"
              target="_blank"
              rel="noreferrer"
              className="py-1.5 text-[14px] text-white no-underline"
            >
              რადიო
            </a>
            <div className="py-1 text-[14px] text-white">
              <div className="mb-1">სასარგებლო ინფორმაცია</div>
              <div className="pl-3 flex flex-col border-l border-white/20">
                <a
                  href="https://amindi.ge/ka/world-clock/"
                  target="_blank"
                  rel="noreferrer"
                  className="py-1 text-[13px] text-white hover:bg-white hover:text-black px-2 no-underline"
                >
                  მსოფლიო დრო
                </a>
                <a
                  href="https://amindi.ge/ka/georgian-holiday/"
                  target="_blank"
                  rel="noreferrer"
                  className="py-1 text-[13px] text-white hover:bg-white hover:text-black px-2 no-underline"
                >
                  საქართველოს დღესასწაულები
                </a>
                <a
                  href="https://www.bpn.ge/currency"
                  target="_blank"
                  rel="noreferrer"
                  className="py-1 text-[13px] text-white hover:bg-white hover:text-black px-2 no-underline"
                >
                  ვალუტა
                </a>
                <a
                  href="https://www.ambebi.ge/astrology/"
                  target="_blank"
                  rel="noreferrer"
                  className="py-1 text-[13px] text-white hover:bg-white hover:text-black px-2 no-underline"
                >
                  ჰოროსკოპი
                </a>
              </div>
            </div>
            <a
              href="http://adline.ge/advertisements/internet?filter[id]=2&filter[start_age]=&filter[end_age]=&filter[sex]=&filter[interest]=&filter[regions]="
              target="_blank"
              rel="noreferrer"
              className="py-1.5 text-[14px] text-white no-underline"
            >
              რეკლამა
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
