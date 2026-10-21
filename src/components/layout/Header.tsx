/**
 * @file Header.tsx
 * @description amindi.ge-ს ზედა ნავიგაციის კომპონენტი (Header Navigation Component).
 *
 * კომპონენტის სტრუქტურა და ფუნქციონალი:
 * 1. ლოგო (Navbar Brand):
 *    - განთავსებულია მარცხნივ, იყენებს amindi.ge-ს ოფიციალურ ლოგოს: https://amindi.ge/static/img/header-logo.png
 *
 * 2. ნავიგაციის მენიუ (Desktop Menu - lg ეკრანებზე):
 *    - ამინდის პროგნოზი (მთავარი გვერდი)
 *    - ჯანმრთელობა (გადამისამართება mkurnali.ge-ზე)
 *    - რადიო (გადამისამართება radiopalitra.ge-ზე)
 *    - სასარგებლო ინფორმაცია: ჩამოსაშლელი Dropdown მენიუ
 *    - რეკლამა (გადამისამართება adline.ge-ზე)
 *
 * 3. "სასარგებლო ინფორმაცია" ჩამოსაშლელი მენიუ (.dropDown):
 *    - იხსნება მაუსის მიტანისას (Hover) ან კლიკზე
 *    - სია შეიცავს 4 ძირითად პუნქტს:
 *      1) მსოფლიო დრო
 *      2) საქართველოს დღესასწაულები
 *      3) ვალუტა
 *      4) ჰოროსკოპი
 *    - ფონი: amindi.ge-ს მუქი ლურჯი (#19375c), hover-ზე კი თეთრი ფონი შავი ტექსტით.
 *
 * 4. მობილური ნავიგაცია (Mobile Responsive Hamburger Menu):
 *    - მცირე ეკრანებზე (lg-მდე) ჩნდება ჰამბურგერ ღილაკი, რომელზე დაჭერისას იხსნება მობილური მენიუ.
 */

import React, { useState } from 'react';

export const Header: React.FC = () => {
  // სტეიტი დესკტოპზე "სასარგებლო ინფორმაცია"-ს ჩამოსაშლელი მენიუსთვის
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);

  // სტეიტი მობილურ ეკრანებზე ჰამბურგერ მენიუს გახსნა/დახურვისთვის
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full select-none">
      {/* amindi.ge-ს ძირითადი ნავბარი: სიმაღლე 50px, ფონი rgba(25, 55, 92, 0.75), შრიფტი font1 */}
      <nav
        className="w-full relative z-50 font-amindi1"
        style={{
          height: '50px',
          backgroundColor: 'rgba(25, 55, 92, 0.75)',
        }}
      >
        {/* რესპონსიული კონტეინერი გვერდითი დაშორებებით (1220px max-width) */}
        <div className="amindi-container h-[50px] flex items-center justify-between">
          
          {/* მარცხენა მხარე: amindi.ge-ს ოფიციალური ლოგო */}
          <a
            href="/ka/"
            className="flex items-center shrink-0"
            title="Amindi.ge - მთავარი"
          >
            <img
              src="https://amindi.ge/static/img/header-logo.png"
              alt="amindi.ge"
              style={{ height: '40px' }}
            />
          </a>

          {/* დესკტოპ ნავიგაცია: ჩანს დიდ ეკრანებზე (lg-დან ზემოთ) */}
          <ul className="hidden lg:flex items-center ml-auto m-0 p-0 list-none h-[50px]">
            {/* 1. ამინდის პროგნოზი */}
            <li className="relative h-[50px] flex items-center hover:bg-[#19375c] transition-colors">
              <a
                href="/ka/"
                className="block px-[8px] py-[14px] text-[14px] text-white hover:text-white no-underline leading-[22px]"
              >
                ამინდის პროგნოზი
              </a>
            </li>

            {/* 2. ჯანმრთელობა */}
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

            {/* 3. რადიო */}
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

            {/* 4. სასარგებლო ინფორმაცია (Dropdown) */}
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

              {/* ჩამოსაშლელი სია hover-ზე ან კლიკზე */}
              {infoDropdownOpen && (
                <div
                  className="dropDown absolute right-0 top-[49px] bg-[#19375c] z-[99999]"
                >
                  <ul className="m-0 p-0 list-none">
                    {/* პუნქტი: მსოფლიო დრო */}
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
                    {/* პუნქტი: საქართველოს დღესასწაულები */}
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
                    {/* პუნქტი: ვალუტა */}
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
                    {/* პუნქტი: ჰოროსკოპი */}
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

            {/* 5. რეკლამა */}
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

          {/* მობილური მენიუს ჰამბურგერ ღილაკი (ჩანს მხოლოდ lg-ზე დაბალ ეკრანებზე) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="lg:hidden px-2.5 py-1 text-white border border-white/30 rounded text-sm cursor-pointer bg-transparent"
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>

        {/* მობილური ჩამოსაშლელი მენიუს ბლოკი */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden absolute left-0 right-0 top-[49px] z-50 px-4 py-3 border-t border-white/15 flex flex-col gap-1 shadow-lg"
            style={{ backgroundColor: '#19375c' }}
          >
            <a
              href="/ka/"
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
              <div className="mb-1 font-semibold">სასარგებლო ინფორმაცია:</div>
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
