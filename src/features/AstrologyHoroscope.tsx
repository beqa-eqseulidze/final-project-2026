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

interface AstrologyHoroscopeProps {
  onNavigateToZodiac?: (signId: string) => void;
}

export const AstrologyHoroscope: React.FC<AstrologyHoroscopeProps> = ({
  onNavigateToZodiac,
}) => {
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

  const handleSignClick = (signId: string) => {
    setSelectedZodiacId(signId);
    if (onNavigateToZodiac) {
      onNavigateToZodiac(signId);
    }
  };

  return (
    <div className="w-full select-none shadow-md rounded-[4px] border border-black/10">
      {/* 1. ზედა თეთრი ზოლი ნიშნების ჩამონათვალით */}
      <div className="bg-white px-2 sm:px-3 pt-3 pb-0 border-b border-slate-200 relative">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {/* ლოგო: Astrologi */}
          <div className="flex items-center gap-1 shrink-0 pr-1">
            <span className="text-[#0e5aa7] text-xl sm:text-2xl font-black font-amindi1 tracking-tight flex items-center">
              <span className="text-2xl sm:text-3xl leading-none mr-0.5">♃</span>
              strologi
            </span>
          </div>

          {/* 12 ზოდიაქოს ნიშნის სია (სქროლის გარეშე, თანაბრად განაწილებული) */}
          <div className="flex items-center justify-between flex-1 gap-0.5 sm:gap-1.5 py-2">
            {ZODIAC_ARRAY.map((zodiac) => {
              const isHovered = hoveredZodiacId === zodiac.id;
              const isSelected = selectedZodiacId === zodiac.id;
              // ბეჯი მხოლოდ hover-ისას გამოჩნდება
              const showBadge = isHovered;

              return (
                <div
                  key={zodiac.id}
                  className="flex flex-col items-center justify-center relative cursor-pointer group px-0.5 sm:px-1 pt-1.5 pb-3 shrink-0"
                  onMouseEnter={() => setHoveredZodiacId(zodiac.id)}
                  onMouseLeave={() => setHoveredZodiacId(null)}
                  onClick={() => handleSignClick(zodiac.id)}
                >
                  {/* SVG ვექტორული ხატულა */}
                  <ZodiacIcon
                    signId={zodiac.id}
                    className={`
                      w-5 h-5 sm:w-6 sm:h-6 transition-colors
                      ${isHovered || isSelected ? 'text-[#083b6f]' : 'text-[#0e5aa7] group-hover:text-[#083b6f]'}
                    `}
                  />

                  {/* მაუსის მიტანისას (Hover) გამოსული ლურჯი ბეჯი ქართული სახელით */}
                  {showBadge && (
                    <div
                      className="
                        absolute bottom-0 z-30 bg-[#083b6f] text-white
                        text-[10px] sm:text-[11px] font-amindi1 font-bold px-1.5 sm:px-2 py-0.5
                        rounded-t-[3px] whitespace-nowrap shadow-xs pointer-events-none
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
            className="relative shrink-0"
            ref={menuRef}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              className="text-[#0e5aa7] hover:text-[#083b6f] text-lg sm:text-xl px-1 cursor-pointer border-0 bg-transparent leading-none transition-colors"
              aria-label="მენიუ"
              aria-expanded={menuOpen}
            >
              ☰
            </button>

            {/* Dropdown მენიუ */}
            {menuOpen && (
              <div className="absolute right-0 top-full z-50 w-52 bg-[#0e5aa7] shadow-xl rounded-b-[4px] overflow-hidden border border-white/10">
                {([
                  { icon: '☯', label: 'ასტრო-შეთავსება', signId: selectedZodiacId },
                  { icon: '🔢', label: 'ნუმეროლოგია',     signId: selectedZodiacId },
                  { icon: '♈', label: 'ზოდიაქო',          signId: selectedZodiacId },
                  { icon: '🔮', label: 'ჰოროსკოპი',        signId: selectedZodiacId },
                ] as const).map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleSignClick(item.signId);
                    }}
                    className="
                      w-full flex items-center gap-3 px-4 py-2.5
                      text-white font-amindi1 text-sm text-left
                      hover:bg-[#083b6f] transition-colors cursor-pointer
                      border-0 border-b border-white/10 last:border-b-0 bg-transparent
                    "
                  >
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-base shrink-0">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. ქვედა მუქი ლურჯი კონტენტ-ბლოკი */}
      <div
        className="bg-[#083b6f] text-white p-3 sm:p-5 flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 cursor-pointer hover:bg-[#073462] transition-colors"
        onClick={() => handleSignClick(selectedZodiacId)}
        title="დააწკაპეთ სრული გვერდის სანახავად"
      >
        {/* მარცხენა კალენდარული კვადრატი */}
        <div className="bg-[#0e5aa7] w-full sm:w-[130px] shrink-0 rounded-[3px] p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-inner">
          <span className="text-4xl sm:text-5xl font-black font-amindi1 leading-none text-white tracking-tight">
            {dayNumber}
          </span>
          <span className="text-xs sm:text-sm font-bold font-amindi1 uppercase tracking-wider text-white/95 mt-1 sm:mt-1.5">
            {monthName}
          </span>
        </div>

        {/* მარჯვენა ტექსტური არეალი */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* სათაური თეთრი ქვედა ხაზით */}
          <div className="pb-1.5 mb-2.5 border-b border-white/30 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm md:text-[15px] font-bold font-amindi1 uppercase tracking-wide text-white m-0">
              დღის ზოგადი ასტროლოგიური პროგნოზი ({activeZodiac.name})
            </h3>
            <span className="text-[11px] text-sky-200 font-amindi1 hidden sm:inline">
              ვრცლად →
            </span>
          </div>

          {/* პროგნოზის დეტალური ტექსტი */}
          <p className="text-xs sm:text-[13px] md:text-[13.5px] font-amindi2 text-white/95 leading-relaxed m-0 text-justify">
            {activeZodiac.prediction}
          </p>
        </div>
      </div>
    </div>
  );
};
