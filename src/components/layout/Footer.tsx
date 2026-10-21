/**
 * @file Footer.tsx
 * @description amindi.ge-ს იდენტური ქვედა ნაწილი (Footer).
 * შეიცავს header-logo.png-ს, ნავიგაციის ბმულებს და TOP.GE მთვლელის ხატულას.
 */

import React from 'react';
import { useAppDispatch } from '../../store';
import { setViewMode } from '../../store/slices/uiSlice';

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <footer
      className="w-full mt-2 select-none"
      style={{
        minHeight: '60px',
        backgroundColor: 'rgba(25, 55, 92, 0.90)',
      }}
    >
      <div className="max-w-[1220px] mx-auto px-3 sm:px-4 flex flex-wrap items-center justify-between min-h-[60px] py-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-0">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setViewMode('portal'));
            }}
            className="mr-4 flex items-center"
          >
            <img
              src="https://amindi.ge/static/img/header-logo.png"
              alt="amindi.ge"
              style={{ height: '40px' }}
            />
          </a>

          <ul className="flex flex-wrap items-center m-0 p-0 list-none text-[13px]">
            <li>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setViewMode('portal'));
                }}
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                ამინდის პროგნოზი
              </a>
            </li>
            <li>
              <a
                href="#news"
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                ჯანმრთელობა
              </a>
            </li>
            <li>
              <a
                href="#radio"
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                რადიო FM 103.9
              </a>
            </li>
            <li>
              <a
                href="#climate"
                onClick={(e) => e.preventDefault()}
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                ჰავა და კლიმატი
              </a>
            </li>
            <li>
              <a
                href="#wind"
                onClick={(e) => e.preventDefault()}
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                ქარი
              </a>
            </li>
            <li>
              <a
                href="#recommended"
                onClick={(e) => e.preventDefault()}
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                რეკომენდაციები
              </a>
            </li>
            <li>
              <a
                href="#ads"
                onClick={(e) => e.preventDefault()}
                className="block text-white hover:text-[#f9bf3b] px-3 py-2 no-underline transition-colors"
              >
                რეკლამა
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(setViewMode('showcase'))}
            className="text-[12px] text-[#f9bf3b] hover:underline cursor-pointer bg-transparent border-0"
          >
            კომპონენტების ბიბლიოთეკა
          </button>
        </div>
      </div>
    </footer>
  );
};
