/**
 * @file App.tsx
 * @description აპლიკაციის მთავარი შესასვლელი ფაილი (Root Application Entrypoint).
 *
 * არქიტექტურა და სტრუქტურა:
 * 1. BackgroundSky (ფონის კონტეინერი):
 *    - უზრუნველყოფს მთელი ეკრანის დაფარვას და GMT+4 დროით დღე-ღამის მიხედვით ფონის ავტომატურ ცვლას.
 * 2. Header (ზედა ნავიგაცია):
 *    - amindi.ge-ს ოფიციალური ნავიგაციის პანელი.
 * 3. main (ძირითადი სამუშაო არეალი):
 *    - მარცხნივ: CurrentWeather (მიმდინარე ამინდი: ქალაქი, საათი, დიდი იკონი, ტემპერატურა) და WindAndPressure (ქარი, წნევა, ტურბინები)
 *    - ცენტრში/მარჯვნივ: WeatherForecast (ამინდი დღეების მიხედვით) და Converter (კონვერტორი) გვერდიგვერდ ზედა პოზიციაზე
 * 4. Footer (ქვედა ნავიგაცია და მთვლელი):
 *    - ქვედა ბმულები, ლოგო და TOP.GE მთვლელი.
 */

import React from 'react';
import { Header } from './components/layout/Header';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';
import { Converter } from './components/Converter';
import { WindAndPressure, IWindAndPressureProps } from './features/LeftBarWindAndPressure';
import { WeatherForecast } from './features/WeatherForecast';
import { CurrentWeather } from './features/CurrentWeather';

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

export default function App() {
  return (
    <BackgroundSky>
      {/* 1. ზედა ნავიგაციის პანელი */}
      <Header />

      {/* 2. ცენტრალური ნაწილი (მთავარი კონტენტი) */}
      <main role="main" className="flex-1 w-full py-6">
        <div className="amindi-container">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">

            {/* მარცხენა მხარე: მიმდინარე ამინდი + ქარი და წნევა */}
            <aside className="w-full lg:w-auto shrink-0 flex flex-col items-center lg:items-start">
              <CurrentWeather />
              <WindAndPressure {...info} />
            </aside>

            {/* ცენტრალური და მარჯვენა მხარე: პროგნოზი და კონვერტორი ზემოთ გვერდიგვერდ */}
            <div className="flex-1 w-full min-w-0 flex flex-col md:flex-row items-start gap-4">
              {/* ამინდი დღეების მიხედვით */}
              <div className="flex-1 w-full min-w-0">
                <WeatherForecast />
              </div>

              {/* კონვერტორი */}
              <div className="w-full md:w-auto shrink-0 flex justify-center md:justify-start">
                <Converter />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 3. ქვედა ნავიგაციისა და რეიტინგის პანელი */}
      <Footer />
    </BackgroundSky>
  );
}