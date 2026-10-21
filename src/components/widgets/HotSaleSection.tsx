/**
 * @file HotSaleSection.tsx
 * @description amindi.ge-ს იდენტური ასტროლოგიის ვიჯეტი (.astrology), რომელიც მდებარეობს
 * სიახლეების ქვემოთ (https://amindi.ge/ka/).
 * იყენებს ზუსტად amindi.ge-ს ასტროლოგიის ხატულებს:
 * - https://amindi.ge/static/img/astrology/ast-logo.svg
 * - https://amindi.ge/static/img/astrology/{aries..pisces}.svg
 * - https://amindi.ge/static/img/astrology/burger-btn.svg
 */

import React, { useState } from 'react';

const ZODIAC_SIGNS = [
  { id: 'aries', name: 'ვერძი', icon: 'https://amindi.ge/static/img/astrology/aries.svg', slug: 'verdzi' },
  { id: 'taurus', name: 'კურო', icon: 'https://amindi.ge/static/img/astrology/taurus.svg', slug: 'kuro' },
  { id: 'gemini', name: 'ტყუპები', icon: 'https://amindi.ge/static/img/astrology/gemini.svg', slug: 'tyupebi' },
  { id: 'cancer', name: 'კირჩხიბი', icon: 'https://amindi.ge/static/img/astrology/cancer.svg', slug: 'kirchxibi' },
  { id: 'leo', name: 'ლომი', icon: 'https://amindi.ge/static/img/astrology/leo.svg', slug: 'lomi' },
  { id: 'virgo', name: 'ქალწული', icon: 'https://amindi.ge/static/img/astrology/virgo.svg', slug: 'qalwuli' },
  { id: 'libra', name: 'სასწორი', icon: 'https://amindi.ge/static/img/astrology/libra.svg', slug: 'saswori' },
  { id: 'scorpio', name: 'მორიელი', icon: 'https://amindi.ge/static/img/astrology/scorpio.svg', slug: 'morieli' },
  { id: 'sagittarius', name: 'მშვილდოსანი', icon: 'https://amindi.ge/static/img/astrology/sagittarius.svg', slug: 'mshvildosani' },
  { id: 'capricorn', name: 'თხის რქა', icon: 'https://amindi.ge/static/img/astrology/capricorn.svg', slug: 'txis-rqa' },
  { id: 'aquarius', name: 'მერწყული', icon: 'https://amindi.ge/static/img/astrology/aquarius.svg', slug: 'merwyuli' },
  { id: 'pisces', name: 'თევზები', icon: 'https://amindi.ge/static/img/astrology/pisces.svg', slug: 'tevzebi' },
];

export const HotSaleSection: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="astrology mt-[8px] border-t-[5px] border-[#0058a8] pt-[15px]">
      {/* .ast_header */}
      <div className="ast_header flex items-center justify-between mb-[15px] gap-2">
        <a
          href="https://astrology.ambebi.ge/"
          target="_blank"
          rel="noreferrer"
          className="logo shrink-0"
        >
          <img
            src="https://amindi.ge/static/img/astrology/ast-logo.svg"
            alt="Astrology.ambebi.ge"
          />
        </a>

        {/* 12 ზოდიაქოს ნიშანი */}
        <div className="zodiaqo_list hidden sm:flex items-center justify-between flex-1 px-2 overflow-x-auto">
          {ZODIAC_SIGNS.map((sign) => (
            <a
              key={sign.id}
              href={`https://astrology.ambebi.ge/zodiaqos-nishnebi/${sign.slug}/`}
              target="_blank"
              rel="noreferrer"
              className="zodiaqo_item flex flex-col items-center text-center no-underline group px-0.5"
            >
              <div className="img w-[29px] h-[29px] rounded-full bg-[#e6eef7] group-hover:bg-[#0058a8] flex items-center justify-center transition-colors">
                <img
                  src={sign.icon}
                  alt={sign.name}
                  className="max-w-[16px] max-h-[16px] group-hover:brightness-0 group-hover:invert transition-all"
                />
              </div>
              <div className="name text-[8px] text-[#363636] mt-[4px] whitespace-nowrap">
                {sign.name}
              </div>
            </a>
          ))}
        </div>

        {/* ბურგერ-მენიუ */}
        <div className="ast_dropdown relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
            className="dropbtn w-[24px] h-[24px] bg-transparent border-0 p-0 cursor-pointer"
          >
            <img
              src="https://amindi.ge/static/img/astrology/burger-btn.svg"
              alt="burger-menu"
              className="w-full h-full object-contain"
            />
          </button>

          {menuOpen && (
            <div className="dropdown-content absolute right-0 top-[24px] bg-[#033d7a] min-w-[205px] rounded-[5px] py-[10px] px-[16px] z-40 shadow-lg">
              <a
                href="https://astrology.ambebi.ge/horoskopi/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 border-b border-white/20 no-underline"
              >
                ჰოროსკოპი
              </a>
              <a
                href="https://astrology.ambebi.ge/shethavsebadi-horoskopi/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 border-b border-white/20 no-underline"
              >
                შეთავსების ჰოროსკოპი
              </a>
              <a
                href="https://astrology.ambebi.ge/piradi-horoskopi/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 border-b border-white/20 no-underline"
              >
                პირადი ჰოროსკოპი
              </a>
              <a
                href="https://astrology.ambebi.ge/mtvaris-kalendari/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 border-b border-white/20 no-underline"
              >
                მთვარის კალენდარი
              </a>
              <a
                href="https://astrology.ambebi.ge/numerologia/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 border-b border-white/20 no-underline"
              >
                ნუმეროლოგია
              </a>
              <a
                href="https://astrology.ambebi.ge/taro/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 border-b border-white/20 no-underline"
              >
                ტარო
              </a>
              <a
                href="https://astrology.ambebi.ge/astrologia/"
                target="_blank"
                rel="noreferrer"
                className="block text-[14px] text-white hover:text-[#4ca4ff] py-1 no-underline"
              >
                ასტროლოგია
              </a>
            </div>
          )}
        </div>
      </div>

      {/* .ast_day: დღის ასტროლოგიური პროგნოზი */}
      <a
        href="https://astrology.ambebi.ge/"
        target="_blank"
        rel="noreferrer"
        className="ast_day bg-[#033d7a] min-h-[112px] flex items-center rounded-[5px] py-2 no-underline"
      >
        <div className="ast_date w-[115px] h-[83px] bg-[#005bae] rounded-[5px] ml-[16px] flex flex-col items-center justify-center shrink-0">
          <div className="num text-[38px] leading-[46px] text-white font-bold">
            19
          </div>
          <div className="month text-[14px] leading-[17px] text-white uppercase">
            ოქტომბერი
          </div>
        </div>
        <p className="txt text-[13px] leading-[17px] text-white mx-[16px] my-0 max-h-[85px] overflow-hidden">
          19 ოქტომბერი ახალი იდეებისა და მნიშვნელოვანი გადაწყვეტილებების დღეა. შესაძლოა მოულოდნელმა ამბავმა ან შეთავაზებამ თქვენი გეგმები შეცვალოს და საინტერესო შესაძლებლობა გაგიხსნათ. ურთიერთობებში ეცადეთ, ემოციებს არ აჰყვეთ და სათქმელი მშვიდად გამოხატოთ.
        </p>
      </a>
    </div>
  );
};
