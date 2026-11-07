/**
 * @file ZodiacDetailPage.tsx
 * @description ზოდიაქოს ნიშნის ცალკე, დეტალური გვერდი.
 *
 * შეიცავს:
 * - ნავიგაცია: "← მთავარ გვერდზე დაბრუნება"
 * - 12 ნიშნის გადამრთველი ზედა ზოლი
 * - ზოდიაქოს ბანერი (სიმბოლო, სახელი, თარიღი/რიცხვი და მის გვერდით პერიოდის ასარჩევი: დღის | თვის | წლის | ზოგადი დახასიათება)
 * - არჩეული პერიოდის ასტროლოგიური პროგნოზი
 * - ზოგადი მიმოხილვა და ხასიათი
 * - დადებითი და უარყოფითი თვისებები
 * - თავსებადი ზოდიაქოს ნიშნები
 */

import React, { useState, useEffect } from 'react';
import {
  ZODIAC_SIGNS,
  ZODIAC_ARRAY,
  ZODIAC_TABS,
  ZodiacSignDetail,
  ZodiacForecastTab,
} from './zodiacData';
import { ZodiacIcon } from './ZodiacIcon';
import { GEO_MONTHS } from '../services/weatherService';

interface ZodiacDetailPageProps {
  signId: string;
  initialTab?: ZodiacForecastTab;
  onBack: () => void;
  onSelectSign: (signId: string) => void;
}

export const ZodiacDetailPage: React.FC<ZodiacDetailPageProps> = ({
  signId,
  initialTab = 'daily',
  onBack,
  onSelectSign,
}) => {
  const zodiac: ZodiacSignDetail = ZODIAC_SIGNS[signId] ?? ZODIAC_SIGNS['aries'];

  // არჩეული პერიოდის ტაბი: 'daily' | 'monthly' | 'yearly' | 'general'
  const [activeTab, setActiveTab] = useState<ZodiacForecastTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const today = new Date();
  const dayNumber = today.getDate();
  const monthName = GEO_MONTHS[today.getMonth()];
  const currentYear = today.getFullYear();

  const getForecastHeading = () => {
    switch (activeTab) {
      case 'daily':
        return 'დღის ასტროლოგიური პროგნოზი';
      case 'monthly':
        return `${monthName}ს ასტროლოგიური პროგნოზი`;
      case 'yearly':
        return `${currentYear} წლის სრული ასტროლოგიური პროგნოზი`;
      case 'general':
        return 'ზოგადი დახასიათება და ასტროლოგიური პროფილი';
    }
  };

  const getForecastBadge = () => {
    switch (activeTab) {
      case 'daily':
        return `${dayNumber} ${monthName}`;
      case 'monthly':
        return `${monthName} ${currentYear}`;
      case 'yearly':
        return `${currentYear} წელი`;
      case 'general':
        return `${zodiac.name} (${zodiac.element})`;
    }
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-2 sm:px-4 py-4 select-none">
      {/* 1. ზედა ნავიგაციის ზოლი */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="
            flex items-center gap-2 bg-[#0e5aa7] hover:bg-[#0b4885] active:bg-[#083b6f]
            text-white text-xs sm:text-sm font-amindi1 font-bold px-4 py-2 rounded-[4px]
            transition-colors cursor-pointer border-0 shadow-md
          "
        >
          <span>←</span>
          <span>მთავარ გვერდზე დაბრუნება</span>
        </button>

        <span className="text-white/80 font-amindi2 text-xs sm:text-sm">
          ჰოროსკოპი • {dayNumber} {monthName}
        </span>
      </div>

      {/* 2. 12 ნიშნის ჰორიზონტალური გადამრთველი */}
      <div className="bg-white rounded-[4px] shadow-md p-1.5 sm:p-2 mb-3 sm:mb-4 overflow-x-auto no-scrollbar touch-pan-x">
        <div className="flex items-center justify-between min-w-[580px] gap-1">
          {ZODIAC_ARRAY.map((z) => {
            const isSelected = z.id === zodiac.id;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => onSelectSign(z.id)}
                className={`
                  flex flex-col items-center py-1.5 px-2 rounded cursor-pointer border-0 transition-all flex-1
                  ${isSelected
                    ? 'bg-[#083b6f] text-white font-bold shadow-xs'
                    : 'bg-transparent text-[#0e5aa7] hover:bg-slate-100'
                  }
                `}
                title={z.name}
              >
                <ZodiacIcon
                  signId={z.id}
                  className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 ${isSelected ? 'text-white' : 'text-[#0e5aa7]'}`}
                />
                <span className="text-[10px] sm:text-[11px] font-amindi1 mt-0.5 whitespace-nowrap">{z.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. მთავარი ბარათი (Hero Banner) */}
      <div className="bg-gradient-to-r from-[#083b6f] to-[#0e5aa7] rounded-[4px] shadow-lg p-4 sm:p-6 text-white mb-4 sm:mb-5">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-5">
          {/* დიდი სიმბოლო */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <ZodiacIcon signId={zodiac.id} className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
          </div>

          {/* სახელწოდება, თარიღი/რიცხვი, ტაბები და პარამეტრები */}
          <div className="flex-1 w-full text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl font-amindi1 font-black tracking-wide mb-1 text-white">
              {zodiac.name}
            </h1>

            {/* რიცხვი/თარიღი და მის გვერდით პერიოდის ასარჩევი ტაბები: დღის | თვის | წლის | ზოგადი დახასიათება */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 mb-3 sm:mb-3.5 mt-1">
              {/* რიცხვი/თარიღის დიაპაზონი */}
              <div className="inline-flex items-center gap-1.5 text-white/90 font-amindi2 text-xs sm:text-base font-semibold">
                <span>📅</span>
                <span>{zodiac.dateRange}</span>
              </div>

              {/* გამყოფი ხაზი desktop-ზე */}
              <span className="hidden md:inline-block text-white/30 text-sm">|</span>

              {/* ტაბები: დღის | თვის | წლის | ზოგადი დახასიათება */}
              <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-black/25 p-1 rounded-[5px] backdrop-blur-xs">
                {ZODIAC_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        px-2 sm:px-3 py-1 text-[11px] sm:text-[13px] font-amindi1 font-bold rounded-[3px]
                        transition-all cursor-pointer border-0 whitespace-nowrap
                        ${isActive
                          ? 'bg-[#15aadc] text-white shadow-xs'
                          : 'bg-transparent text-white/80 hover:bg-white/15 hover:text-white'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* პარამეტრების ბეჯები */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
              <span className="bg-white/15 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded text-[11px] sm:text-sm font-amindi1">
                🔥 სტიქია: <strong className="text-amber-300">{zodiac.element}</strong>
              </span>
              <span className="bg-white/15 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded text-[11px] sm:text-sm font-amindi1">
                🪐 პლანეტა: <strong className="text-sky-300">{zodiac.rulingPlanet}</strong>
              </span>
              <span className="bg-white/15 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded text-[11px] sm:text-sm font-amindi1">
                ✨ იღბლიანი რიცხვები: <strong>{zodiac.luckyNumbers}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ორსვეტიანი კონტენტი */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-5 sm:mb-6">
        {/* მარცხენა 2 სვეტი: არჩეული პერიოდის პროგნოზი და მიმოხილვა */}
        <div className="lg:col-span-2 space-y-3.5 sm:space-y-5">
          {/* არჩეული ტაბის პროგნოზის ბარათი */}
          <div className="bg-[#eeeeee] rounded-[4px] p-4 sm:p-6 shadow-md border border-black/10">
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-black/15">
              <h2 className="font-amindi1 text-[#19375c] text-sm sm:text-lg font-bold uppercase tracking-wide">
                {getForecastHeading()}
              </h2>
              <span className="text-[11px] sm:text-xs bg-[#0e5aa7] text-white font-amindi1 px-2 sm:px-2.5 py-0.5 rounded">
                {getForecastBadge()}
              </span>
            </div>
            <p className="font-amindi2 text-[#222222] text-xs sm:text-base leading-relaxed text-justify">
              {zodiac.forecasts[activeTab]}
            </p>
          </div>

          {/* ზოგადი მიმოხილვა (თუ აქტიური ტაბი არ არის 'general') */}
          {activeTab !== 'general' && (
            <div className="bg-[#eeeeee] rounded-[4px] p-4 sm:p-6 shadow-md border border-black/10">
              <h2 className="font-amindi1 text-[#19375c] text-sm sm:text-lg font-bold uppercase tracking-wide pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-black/15">
                ზოგადი მიმოხილვა და ხასიათი
              </h2>
              <p className="font-amindi2 text-[#333333] text-xs sm:text-base leading-relaxed text-justify">
                {zodiac.overview}
              </p>
            </div>
          )}
        </div>

        {/* მარჯვენა სვეტი: თვისებები და თავსებადობა */}
        <div className="space-y-3.5 sm:space-y-5">
          {/* დადებითი და უარყოფითი თვისებები */}
          <div className="bg-[#eeeeee] rounded-[4px] p-4 sm:p-5 shadow-md border border-black/10">
            <h3 className="font-amindi1 text-[#19375c] text-xs sm:text-base font-bold uppercase tracking-wide pb-2 mb-2.5 sm:mb-3 border-b border-black/15">
              ხასიათის თვისებები
            </h3>

            <div className="space-y-2.5 sm:space-y-3">
              <div>
                <span className="text-xs font-amindi1 font-bold text-emerald-700 block mb-1">
                  ✓ დადებითი:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {zodiac.traits.positive.map((t, i) => (
                    <span
                      key={i}
                      className="bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs px-2 py-0.5 rounded font-amindi2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-amindi1 font-bold text-rose-700 block mb-1">
                  ✗ უარყოფითი:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {zodiac.traits.negative.map((t, i) => (
                    <span
                      key={i}
                      className="bg-rose-100 text-rose-800 text-[11px] sm:text-xs px-2 py-0.5 rounded font-amindi2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* თავსებადობა */}
          <div className="bg-[#eeeeee] rounded-[4px] p-4 sm:p-5 shadow-md border border-black/10">
            <h3 className="font-amindi1 text-[#19375c] text-xs sm:text-base font-bold uppercase tracking-wide pb-2 mb-2 border-b border-black/15">
              თავსებადი ნიშნები
            </h3>
            <p className="font-amindi2 text-xs sm:text-sm text-[#444444]">
              საუკეთესო ურთიერთგაგება და ჰარმონია:
            </p>
            <div className="mt-1.5 sm:mt-2 font-amindi1 text-xs sm:text-sm font-bold text-[#0e5aa7]">
              {zodiac.compatibleSigns}
            </div>
          </div>
        </div>
      </div>

      {/* 5. ქვედა დაბრუნების ღილაკი */}
      <div className="flex justify-center pt-2 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="
            flex items-center gap-2 bg-[#0e5aa7] hover:bg-[#0b4885] active:bg-[#083b6f]
            text-white text-sm font-amindi1 font-bold px-6 py-2.5 rounded-[4px]
            transition-colors cursor-pointer border-0 shadow-md
          "
        >
          <span>← მთავარ გვერდზე დაბრუნება</span>
        </button>
      </div>
    </div>
  );
};
