/**
 * @file App.tsx
 * @description Root Application Entrypoint amindi.ge-ს ზუსტი დიზაინით
 */

import React from 'react';
import { Header } from './components/layout/Header';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';
import { Converter } from './components/Converter';
import { WindAndPressure, IWindAndPressureProps } from './features/LeftBarWindAndPressure';
import { WeatherForecast } from './features/WeatherForecast';
import { CurrentWeather } from './features/CurrentWeather';
import { CurrencyRates } from './components/currency/CurrencyRates';

const info: IWindAndPressureProps = {
  windSpeed: 11,
  windUnit: 'kph',
  windDirection: 'ENE',
  pressure: 102.60,
  pressureUnit: 'kpa',
  feelsLikeTemp: '19°',
  feelsLikeWind: '17°',
  humidity: 'SSW',
  visibility: '82 %',
  isLoading: false,
};

const Box = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center border-2 border-dashed border-slate-400 bg-white/90 text-center text-[11px] font-bold text-slate-600 ${className}`}>
    {children}
  </div>
);

export default function App() {
  return (
    <BackgroundSky>
      <div className="min-h-screen text-slate-700 flex flex-col justify-between">

        {/* 1. Header (სრული სიგანით ზემოთ) */}
        <Header />

        {/* 2. ცენტრალური შეფუთვა (Container) */}
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
              <div className="w-full pb-4 border-b border-white/20">
                <CurrentWeather />
              </div>

              {/* 2. ამინდი საათების მიხედვით */}
              <div className="w-full bg-[#2c3e55]/85 text-white p-4 rounded-[4px] shadow-sm">
                <div className="h-44 w-full flex items-center justify-center text-white/70 text-sm">
                  ამინდი საათების მიხედვით
                </div>
              </div>

              {/* 3. ქარი და წნევა */}
              <div className="w-full">
                <WindAndPressure {...info} />
              </div>

              {/* 4. ვალუტის კურსები */}
              <div className="w-full flex justify-center bg-blue-900 rounded-md overflow-hidden">
                <CurrencyRates />
              </div>

            </aside>

            {/* ცენტრალური სვეტი */}
            <main className="space-y-4 min-w-0">
              {/* ამინდი დღეების მიხედვით (პროგნოზი) */}
              <div className="w-full">
                <WeatherForecast />
              </div>

              {/* ვიდეო / ლაივ კამერა */}
              <Box className="h-[340px] w-full bg-slate-900 text-white">
                Live Video / კამერა (თბილისი)
              </Box>
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

        {/* 3. Footer */}
        <footer className="w-full mt-8">
          <Footer />
        </footer>

      </div>
    </BackgroundSky>
  );
}