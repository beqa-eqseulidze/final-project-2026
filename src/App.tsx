/**
 * @file App.tsx
 * @description Root Application Entrypoint amindi.ge-ს ზუსტი დიზაინით
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';
import { Converter } from './components/Converter';
import { WindAndPressure } from './features/LeftBarWindAndPressure';
import { WeatherForecast } from './features/WeatherForecast';
import { CurrentWeather } from './features/CurrentWeather';
import { HourlyWeatherForecast } from './features/HourlyWeatherForecast';
import { FullHourlyForecast } from './features/FullHourlyForecast';
import { AstrologyHoroscope } from './features/AstrologyHoroscope';
import { ZodiacDetailPage } from './features/ZodiacDetailPage';
import { CurrencyRates } from './components/currency/CurrencyRates';
import { Slider } from './features/Slider';
import { sliderData } from './services/data';
import { detectUserCity, UserCoordinates } from './services/weatherService';
import { CityDropdown } from './components/choiceCity/CityDropdown';

// ქალაქების სია
const CITIES_LIST = [
  { id: 1, name: 'თბილისი', temp: 9 },
  { id: 2, name: 'ბათუმი', temp: 12 },
  { id: 3, name: 'ქუთაისი', temp: 10 },
  { id: 4, name: 'რუსთავი', temp: 11 },
  { id: 5, name: 'გორი', temp: 7 },
  { id: 6, name: 'თელავი', temp: 9 },
  { id: 7, name: 'ზუგდიდი', temp: 10 },
  { id: 8, name: 'ფოთი', temp: 12 },
  { id: 9, name: 'ბაკურიანი', temp: 3 },
  { id: 10, name: 'ახალციხე', temp: 4 },
  { id: 11, name: 'ბორჯომი', temp: 3 },
  { id: 12, name: 'გურჯაანი', temp: 11 },
  { id: 13, name: 'ლანჩხუთი', temp: 11 },
  { id: 14, name: 'მცხეთა', temp: 4 },
  { id: 15, name: 'სენაკი', temp: 11 },
  { id: 16, name: 'ქობულეთი', temp: 12 },
  { id: 17, name: 'ყვარელი', temp: 8 },
  { id: 18, name: 'ჩხოროწყუ', temp: 9 },
  { id: 19, name: 'ჩოხატაური', temp: 8 },
  { id: 20, name: 'ხაშური', temp: 7 },
  { id: 21, name: 'ხობი', temp: 11 },
  { id: 22, name: 'აბასთუმანი', temp: 1 },
  { id: 23, name: 'ბოლნისი', temp: 10 },
  { id: 24, name: 'მესტია', temp: -6 },
  { id: 25, name: 'ოჩამჩირე', temp: 10 },
  { id: 26, name: 'დავით-გარეჯი', temp: 12 },
  { id: 27, name: 'მანგლისი', temp: 3 },
  { id: 28, name: 'ჟინვალი', temp: 5 },
  { id: 29, name: 'ჯვარი', temp: 2 },
  { id: 30, name: 'საჩხერე', temp: 5 },
  { id: 31, name: 'სოხუმი', temp: 10 },
  { id: 32, name: 'წალენჯიხა', temp: 5 },
  { id: 33, name: 'წნორი', temp: 9 },
  { id: 34, name: 'სამტრედია', temp: 4 },
  { id: 35, name: 'ამბროლაური', temp: 6 },
  { id: 36, name: 'ონი', temp: 5 },
  { id: 37, name: 'ცაგერი', temp: 8 },
  { id: 38, name: 'ლენტეხი', temp: 4 },
  { id: 39, name: 'მარნეული', temp: 10 },
  { id: 40, name: 'ბოლნისი', temp: 10 },
  { id: 41, name: 'დმანისი', temp: 1 },
  { id: 42, name: 'წალკა', temp: 2 },
  { id: 43, name: 'გარდაბანი', temp: 11 },
  { id: 44, name: 'ბაღდათი', temp: 7 },
  { id: 45, name: 'ვანი', temp: 8 },
  { id: 46, name: 'თერჯოლა', temp: 9 },
  { id: 47, name: 'ზესტაფონი', temp: 5 },
  { id: 48, name: 'ტყიბული', temp: 5 },
  { id: 49, name: 'ჭიათურა', temp: 5 },
  { id: 50, name: 'ხარაგაული', temp: 7 },
  { id: 51, name: 'ბედია', temp: 9 },
  { id: 52, name: 'გალი', temp: 11 },
  { id: 53, name: 'გუდაუთა', temp: 8 },
  { id: 54, name: 'გაგრა', temp: 10 },
  { id: 55, name: 'ახალი ათონი', temp: 10 },
  { id: 56, name: 'ყაზბეგი', temp: -2 },
  { id: 57, name: 'სიღნაღი', temp: 11 },
  { id: 58, name: 'დედოფლისწყარო', temp: 10 },
  { id: 59, name: 'ლაგოდეხი', temp: 9 },
  { id: 60, name: 'საგარეჯო', temp: 7 },
  { id: 61, name: 'გლდანი', temp: 9 }
];

const Box = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => {
  const hasBg = className.includes('bg-');
  const hasText = className.includes('text-');
  const hasBorder = className.includes('border-');
  return (
    <div
      className={`flex items-center justify-center text-center text-[11px] font-bold rounded-[4px] ${
        hasBorder ? '' : 'border-2 border-dashed border-slate-400'
      } ${hasBg ? '' : 'bg-white/90'} ${hasText ? '' : 'text-slate-600'} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [city, setCity] = useState<string>('Tbilisi');
  const [coordinates, setCoordinates] = useState<UserCoordinates | null>(null);
  const [selectedCityObj, setSelectedCityObj] = useState(CITIES_LIST[0]);
  const [centerView, setCenterView] = useState<'daily' | 'hourly'>('daily');

  // არჩეული ზოდიაქოს ნიშნის ცალკე გვერდი (null = მთავარი გვერდი)
  const [activeZodiacPage, setActiveZodiacPage] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/horoscope/')) {
      return window.location.hash.replace('#/horoscope/', '') || null;
    }
    return null;
  });
  const [activeZodiacTab, setActiveZodiacTab] = useState<'daily' | 'monthly' | 'yearly' | 'general'>('daily');

  // URL hash-ის მოსმენა (ბრაუზერის Back/Forward ღილაკებისთვის)
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/horoscope/')) {
        const sign = hash.replace('#/horoscope/', '');
        setActiveZodiacPage(sign || null);
      } else if (
        hash === '#/zodiac' ||
        hash === '#/astro-compatibility' ||
        hash === '#/numerology'
      ) {
        // hash მხოლოდ URL-ში ვცვლით, გვერდი არ გადაადგილდება
      } else {
        setActiveZodiacPage(null);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigateToZodiac = (signId: string, tab?: string) => {
    setActiveZodiacPage(signId);
    if (tab && ['daily', 'monthly', 'yearly', 'general'].includes(tab)) {
      setActiveZodiacTab(tab as 'daily' | 'monthly' | 'yearly' | 'general');
    }
    window.location.hash = `/horoscope/${signId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setActiveZodiacPage(null);
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // აპლიკაციის ჩატვირთვისას ავტომატურად ვადგენთ მომხმარებლის ქვეყანას/ქალაქს
  useEffect(() => {
    let cancelled = false;
    detectUserCity().then((detected) => {
      if (cancelled) return;
      if (detected.kind === 'coordinates') {
        setCoordinates(detected.coordinates);
      } else {
        setCoordinates(null);
        setCity(detected.city);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <BackgroundSky>
      <div className="min-h-screen text-slate-700 flex flex-col justify-between">

        {/* 1. Header (სრული სიგანით ზემოთ) */}
        <Header />

        {/* 2. ცენტრალური შეფუთვა: ზოდიაქოს ცალკე გვერდი ან მთავარი პანელი */}
        {activeZodiacPage ? (
          <main role="main" className="flex-1 w-full">
            <ZodiacDetailPage
              signId={activeZodiacPage}
              initialTab={activeZodiacTab}
              onBack={handleBackToMain}
              onSelectSign={handleNavigateToZodiac}
            />
          </main>
        ) : (
          <div className="mx-auto w-full max-w-[1240px] px-2 sm:px-4 py-2 sm:py-3 flex-1">
            {/* 3-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[235px_1fr_235px] xl:grid-cols-[260px_1fr_260px] gap-3 sm:gap-4">

              {/* მარცხენა სვეტი */}
             <aside className="w-full lg:w-[235px] xl:w-[260px] shrink-0 bg-[#2f4058]/90 text-white rounded-[4px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 shadow-lg backdrop-blur-sm self-start">
                {/* 1. მიმდინარე ამინდი */}
                <div className="w-full pb-3 border-b border-white/20">
                  <CurrentWeather city={city} coordinates={coordinates} />
                </div>

                {/* 2. ამინდი საათების მიხედვით */}
                <div className="w-full pb-3 border-b border-white/20">
                  <HourlyWeatherForecast
                    city={city}
                    coordinates={coordinates}
                    isFullHourlyOpen={centerView === 'hourly'}
                    onViewFullHourly={() => setCenterView((prev) => (prev === 'hourly' ? 'daily' : 'hourly'))}
                  />
                </div>

                {/* 3. ქარი და წნევა */}
                <div className="w-full">
                  <WindAndPressure city={city} />
                </div>

                {/* 4. ვალუტის კურსები */}
                <div className="w-full flex justify-center bg-[#1e2a3b] overflow-hidden rounded">
                  <CurrencyRates />
                </div>

              </aside>

              {/* ცენტრალური სვეტი */}
             <main className="space-y-3 sm:space-y-4 min-w-0">
                
                {/* === ქალაქების ჩამოშლადი მენიუ (ცენტრალური სვეტის სათავეში, "ამინდი დღეების მიხედვით"-ის თავზე) === */}
                <div className="w-full">
                  <CityDropdown 
                    cities={CITIES_LIST}
                    selectedCity={selectedCityObj}
                    onSelectCity={(cityObj: any) => {
                      setSelectedCityObj(cityObj);
                      setCity(cityObj.name);
                      setCoordinates(null);
                    }}
                  />
                </div>

                {/* ამინდის პროგნოზი: დღეების მიხედვით ან 24-საათიანი სრული ბადე */}
                <div className="w-full">
                  {centerView === 'hourly' ? (
                    <FullHourlyForecast city={city} coordinates={coordinates} />
                  ) : (
                    <WeatherForecast city={city} coordinates={coordinates} />
                  )}
                </div>

                {/* ვიდეო / ლაივ კამერა */}
                <Box className="h-[220px] sm:h-[340px] w-full bg-slate-900 text-white text-xs sm:text-base">
                  Live Video / კამერა
                </Box>

                {/* სლაიდერი */}
                <div className="w-full">
                  <Slider slides={sliderData} />
                </div>

                {/* ასტროლოგია / ჰოროსკოპი */}
                <div className="w-full">
                  <AstrologyHoroscope onNavigateToZodiac={handleNavigateToZodiac} />
                </div>
              </main>

              {/* მარჯვენა სვეტი */}
              <aside className="space-y-3 sm:space-y-4 flex flex-col">
                <Box className="h-[180px] sm:h-[280px] w-full bg-[#c9252c] text-white text-xs sm:text-base">
                  Palitra News Ad Banner
                </Box>
                <div className="w-full">
                  <Converter />
                </div>
                <Box className="h-[160px] sm:h-[260px] w-full bg-[#1e3d2f] text-white text-xs sm:text-base">
                  Bottom Ad Banner
                </Box>
              </aside>

            </div>
          </div>
        )}

        {/* 3. Footer */}
        <footer className="w-full mt-8">
          <Footer />
        </footer>

      </div>
    </BackgroundSky>
  );
}