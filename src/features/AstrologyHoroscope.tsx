/**
 * @file AstrologyHoroscope.tsx
 * @description amindi.ge-ს ასტროლოგიის / ჰოროსკოპის ვიჯეტი ("Astrologi") მთავარ გვერდზე.
 *
 * ფუნქციონალი:
 * 1. მაუსის მიტანისას (Hover): ნიშნის ქვეშ ჩნდება ლურჯი ბეჯი ქართული სახელით (მაგ: "ტყუპები").
 * 2. დაკლიკებისას: გადადის არჩეული ზოდიაქოს ნიშნის ცალკე, დეტალურ გვერდზე.
 * 3. სუფთა SVG ვექტორული ხატულები სისტემური emoji-ების გარეშე, სქროლის გარეშე.
 */

import React, { useState, useRef } from 'react';
import { ZODIAC_ARRAY, ZODIAC_SIGNS } from './zodiacData';
import { ZodiacIcon } from './ZodiacIcon';
import { GEO_MONTHS } from '../services/weatherService';
import { tr, useLanguage } from '../context/LanguageContext';

interface AstrologyHoroscopeProps {
  onNavigateToZodiac?: (signId: string, tab?: string) => void;
}

/* ამინდი.ჯი-ს ჰამბურგერ მენიუს ვექტორული ხატულები წრეში */
const YinYangIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white shrink-0" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="10" />
    <path
      d="M12 2a10 10 0 0 1 0 20 5 5 0 0 1 0-10 5 5 0 0 0 0-10z"
      fill="currentColor"
    />
    <circle cx="12" cy="7" r="1.6" fill="#083b6f" />
    <circle cx="12" cy="17" r="1.6" fill="currentColor" />
  </svg>
);

const NumerologyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white shrink-0" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4.2" strokeWidth="1.4" />
    <path
      d="M12 2v5.8M12 16.2v5.8M2 12h5.8M16.2 12h5.8M4.93 4.93l4.1 4.1M14.97 14.97l4.1 4.1M4.93 19.07l4.1-4.1M14.97 9.03l4.1-4.1"
      strokeLinecap="round"
      strokeWidth="1.2"
    />
  </svg>
);

const ZodiacRamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white shrink-0" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="10" />
    <path
      d="M7.5 9.5a2.5 2.5 0 0 1 4.5 1.8V17M16.5 9.5a2.5 2.5 0 0 0-4.5 1.8V17"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const HoroscopeEyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white shrink-0" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="10" />
    <path
      d="M5.5 12s2.8-4.2 6.5-4.2 6.5 4.2 6.5 4.2-2.8 4.2-6.5 4.2-6.5-4.2-6.5-4.2z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
  </svg>
);

export const AstrologyHoroscope: React.FC<AstrologyHoroscopeProps> = ({
  onNavigateToZodiac,
}) => {
  const language = useLanguage();
  // მაუსის მიტანისას (Hover) ნიშნის ID
  const [hoveredZodiacId, setHoveredZodiacId] = useState<string | null>(null);

  // არჩეული ნიშანი (საწყისად ვერძი)
  const [selectedZodiacId, setSelectedZodiacId] = useState<string>('aries');

  // ჰამბურგერ მენიუს ხილვადობა
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // მიმდინარე თარიღი
  const today = new Date();
  const dayNumber = today.getDate();
  const monthName = GEO_MONTHS[today.getMonth()];

  const activeZodiac = ZODIAC_SIGNS[selectedZodiacId] ?? ZODIAC_ARRAY[0];

  const handleSignClick = (signId: string, tab?: string) => {
    setSelectedZodiacId(signId);
    if (onNavigateToZodiac) {
      onNavigateToZodiac(signId, tab);
    }
  };

  return (
    <div className="w-full select-none shadow-md rounded-[4px] border border-black/10">
      {/* 1. ზედა თეთრი ზოლი ნიშნების ჩამონათვალით */}
      <div className="bg-white px-1.5 sm:px-2.5 h-11 sm:h-12 border-b-2 border-[#083b6f] relative z-20 flex items-center justify-between gap-1 sm:gap-1.5">
        {/* ლოგო: Astrologi */}
        <div className="flex items-center gap-0.5 shrink-0 pr-0.5">
          <span className="text-[#0e5aa7] text-sm xs:text-base sm:text-lg xl:text-2xl font-black font-amindi1 tracking-tight flex items-center">
            <span className="text-base xs:text-xl sm:text-2xl xl:text-3xl leading-none mr-0.5">♃</span>
            strologi
          </span>
        </div>

        {/* 12 ზოდიაქოს ნიშნის სია (თანაბრად განაწილებული, სრულ სიმაღლეზე) */}
        <div className="flex items-stretch justify-between flex-1 h-full min-w-0 gap-0.5">
          {ZODIAC_ARRAY.map((zodiac) => {
            const isHovered = hoveredZodiacId === zodiac.id;
            const isSelected = selectedZodiacId === zodiac.id;
            const showBadge = isHovered;

            return (
              <div
                key={zodiac.id}
                className="flex flex-col items-center justify-center relative cursor-pointer group flex-1 h-full min-w-0"
                onMouseEnter={() => setHoveredZodiacId(zodiac.id)}
                onMouseLeave={() => setHoveredZodiacId(null)}
                onClick={() => handleSignClick(zodiac.id)}
              >
                {/* SVG ვექტორული ხატულა რესპონსიული ზომით */}
                <ZodiacIcon
                  signId={zodiac.id}
                  className={`
                    w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-[17px] sm:h-[17px] xl:w-5 xl:h-5 max-w-full transition-colors
                    ${isHovered || isSelected ? 'text-[#083b6f]' : 'text-[#0e5aa7] group-hover:text-[#083b6f]'}
                  `}
                />

                {/* მაუსის მიტანისას (Hover) გამოსული ლურჯი ბეჯი ქართული სახელით — ზუსტად ნიშნის ქვეშ, ნიშნის დაუფარავად (Image 4-ის მიხედვით) */}
                {showBadge && (
                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2 z-30
                      bg-[#083b6f] text-white text-[10px] sm:text-[11px]
                      font-amindi1 font-bold px-2 py-0.5 rounded-b-[3px]
                      whitespace-nowrap shadow-md pointer-events-none
                    "
                  >
                    {zodiac.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* მარჯვნივ: ჰამბურგერ მენიუს ხატულა + Dropdown */}
        <div
          className="relative shrink-0 flex items-center h-full"
          ref={menuRef}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            type="button"
            className="text-[#0e5aa7] hover:text-[#083b6f] text-base sm:text-xl px-1 cursor-pointer border-0 bg-transparent leading-none transition-colors"
            aria-label={tr(language, 'მენიუ', 'Menu', 'Меню')}
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          {/* Dropdown მენიუ amindi.ge სტილში: მუქი ლურჯი ფონი და თეთრი ვექტორული ხატულები */}
          {menuOpen && (
            <div className="absolute right-0 top-full z-50 w-52 sm:w-56 bg-[#083b6f] shadow-2xl rounded-b-[4px] overflow-hidden border border-[#0e5aa7]">
              {[
                { Icon: YinYangIcon, label: tr(language, 'ასტრო-შეთავსება', 'Astro compatibility', 'Совместимость'), signId: selectedZodiacId, tab: 'general' },
                { Icon: NumerologyIcon, label: tr(language, 'ნუმეროლოგია', 'Numerology', 'Нумерология'), signId: selectedZodiacId, tab: 'general' },
                { Icon: ZodiacRamIcon, label: tr(language, 'ზოდიაქო', 'Zodiac', 'Зодиак'), signId: selectedZodiacId, tab: 'general' },
                { Icon: HoroscopeEyeIcon, label: tr(language, 'ჰოროსკოპი', 'Horoscope', 'Гороскоп'), signId: selectedZodiacId, tab: 'daily' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    handleSignClick(item.signId, item.tab);
                  }}
                  className="
                    w-full flex items-center gap-3 px-3.5 py-2.5
                    text-white font-amindi1 text-xs sm:text-sm font-bold text-left
                    hover:bg-[#0e5aa7] transition-colors cursor-pointer
                    border-0 border-b border-white/10 last:border-b-0 bg-transparent
                  "
                >
                  <item.Icon />
                  <span className="tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. ქვედა მუქი ლურჯი კონტენტ-ბლოკი */}
      <div
        className="bg-[#083b6f] text-white p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 md:gap-5 cursor-pointer hover:bg-[#073462] transition-colors"
        onClick={() => handleSignClick(selectedZodiacId)}
        title="დააწკაპეთ სრული გვერდის სანახავად"
      >
        {/* მარცხენა კალენდარული კვადრატი */}
        <div className="bg-[#0e5aa7] w-full sm:w-[105px] md:w-[120px] xl:w-[130px] shrink-0 rounded-[3px] p-2.5 sm:p-4 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1 text-center shadow-inner">
          <span className="text-2xl sm:text-4xl xl:text-5xl font-black font-bpg font-medium leading-none text-white tracking-tight">
            {dayNumber}
          </span>
          <span className="text-xs sm:text-sm font-bpg font-medium uppercase tracking-wider text-white/95">
            {monthName}
          </span>
        </div>

        {/* მარჯვენა ტექსტური არეალი */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* სათაური თეთრი ქვედა ხაზით */}
          <div className="pb-1.5 mb-2.5 border-b border-white/30 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm md:text-[15px] font-medium font-sanet uppercase tracking-wide text-white m-0">
              {tr(language, 'დღის ზოგადი ასტროლოგიური პროგნოზი', 'Daily horoscope', 'Гороскоп на день')} ({activeZodiac.name})
            </h3>
            <span className=" font-bpg font-medium text-[11px] text-sky-200 hidden sm:inline">
              {tr(language, 'ვრცლად', 'Read more', 'Подробнее')} →
            </span>
          </div>

          {/* პროგნოზის დეტალური ტექსტი */}
          <p className="text-xs sm:text-[13px] md:text-[13.5px] font-bpg font-medium text-white/95 leading-relaxed m-0 text-justify">
            {activeZodiac.prediction}
          </p>
        </div>
      </div>
    </div>
  );
};
