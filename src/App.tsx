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

const Box = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center border-2 border-dashed border-slate-400 bg-white/90 text-center text-[11px] font-bold text-slate-600 ${className}`}>
    {children}
  </div>
);

export default function App() {
  // მომხმარებლის მიმდინარე ქალაქი (საწყისად Tbilisi, შემდეგ დეტექტირდება ავტომატურად)
  const [city, setCity] = useState<string>('Tbilisi');
  const [coordinates, setCoordinates] = useState<UserCoordinates | null>(null);
  // ცენტრალური სექციის ხედი: 'daily' (დღეების პროგნოზი) ან 'hourly' (24-საათიანი ბადე)
  const [centerView, setCenterView] = useState<'daily' | 'hourly'>('daily');

  // არჩეული ზოდიაქოს ნიშნის ცალკე გვერდი (null = მთავარი გვერდი)
  const [activeZodiacPage, setActiveZodiacPage] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/horoscope/')) {
      return window.location.hash.replace('#/horoscope/', '') || null;
    }
    return null;
  });

  // URL hash-ის მოსმენა (ბრაუზერის Back/Forward ღილაკებისთვის)
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/horoscope/')) {
        const sign = hash.replace('#/horoscope/', '');
        setActiveZodiacPage(sign || null);
      } else if (
        // ასტროლოგიური სექციების hash-ები — მთავარ გვერდზე ვრჩებით (zodiac widget-ამდე სქროლი)
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

  const handleNavigateToZodiac = (signId: string) => {
    setActiveZodiacPage(signId);
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
              onBack={handleBackToMain}
              onSelectSign={handleNavigateToZodiac}
            />
          </main>
        ) : (
          <div className="mx-auto w-full max-w-[1240px] px-2 sm:px-4 py-3 flex-1">

            {/* Top Banner (რადიო პალიტრა / რეკლამა) */}
            <div className="w-full mb-3">
              <Box className="h-[90px] w-full bg-[#3d4b3c] text-white text-base">
                Top Banner (რადიო პალიტრა FM 103.9)
              </Box>
            </div>

            {/* 3-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-4">

              {/* მარცხენა სვეტი: ერთიანი მუქი პანელი amindi.ge-ს სტილში */}
              <aside className="w-full lg:w-[260px] shrink-0 bg-[#2f4058]/90 text-white rounded-[4px] p-4 flex flex-col gap-4 shadow-lg backdrop-blur-sm self-start">

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

                {/* 3. ქარი და წნევა (დინამიური მონაცემებით) */}
                <div className="w-full">
                  <WindAndPressure city={city} />
                </div>

                {/* 4. ვალუტის კურსები */}
                <div className="w-full flex justify-center bg-[#1e2a3b] overflow-hidden">
                  <CurrencyRates />
                </div>

              </aside>

              {/* ცენტრალური სვეტი */}
              <main className="space-y-4 min-w-0">
                {/* ამინდის პროგნოზი: დღეების მიხედვით ან 24-საათიანი სრული ბადე */}
                <div className="w-full">
                  {centerView === 'hourly' ? (
                    <FullHourlyForecast city={city} coordinates={coordinates} />
                  ) : (
                    <WeatherForecast city={city} coordinates={coordinates} />
                  )}
                </div>

                {/* ვიდეო / ლაივ კამერა */}
                <Box className="h-[340px] w-full bg-slate-900 text-white">
                  Live Video / კამერა
                </Box>

                {/* სლაიდერი */}
                <div className="w-full">
                  <Slider slides={sliderData} />
                </div>

                {/* ასტროლოგია / ჰოროსკოპი (სულ ბოლოში) */}
                <div className="w-full">
                  <AstrologyHoroscope onNavigateToZodiac={handleNavigateToZodiac} />
                </div>
              </main>
              {/* მარჯვენა სვეტი */}
              <aside className="space-y-4 flex flex-col">
                {/* ზედა რეკლამა (Palitra News) */}
                <Box className="h-[280px] w-full bg-[#c9252c] text-white">
                  Palitra News Ad Banner
                </Box>

                {/* კონვერტორი (ზუსტად ბანერის ქვეშ) */}
                <div className="w-full">
                  <Converter />
                </div>

                {/* ქვედა რეკლამა */}
                <Box className="h-[260px] w-full bg-[#1e3d2f] text-white">
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