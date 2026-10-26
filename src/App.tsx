/**
 * @file App.tsx
 * @description აპლიკაციის მთავარი შესასვლელი ფაილი (Root Application Entrypoint).
 *
 * არქიტექტურა და სტრუქტურა:
 * 1. BackgroundSky (ფონის კონტეინერი):
 *    - უზრუნველყოფს მთელი ეკრანის დაფარვას და დღე-ღამის მიხედვით ფონის ავტომატურ ცვლას.
 *
 * 2. Header (ზედა ნავიგაცია):
 *    - შეიცავს amindi.ge-ს ლოგოს, ნავიგაციის მენიუს და ჩამოსაშლელ პუნქტებს.
 *
 * 3. main (ძირითადი სამუშაო არეალი):
 *    - იკავებს დარჩენილ თავისუფალ ვერტიკალურ სივრცეს ჰედერსა და ფუტერს შორის (`flex-1`).
 *    - შეიცავს Converter კომპონენტს: მობილურზე ცენტრში, sm-დან მარჯვენა მხარეს.
 *
 * 4. Footer (ქვედა ნავიგაცია და მთვლელი):
 *    - შეიცავს ქვედა ბმულებს, ლოგოს და TOP.GE მთვლელს.
 */

import React from 'react';
import { Header } from './components/layout/Header';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';
import { Converter } from './components/Converter';
import { IWindAndPressureProps } from './features/LeftBarWindAndPressure';

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
}

export default function App() {
  return (
    // მთავარი დინამიური ფონის კომპონენტი
    <BackgroundSky>
      {/* 1. ზედა ნავიგაციის პანელი */}
      <Header />

      {/* 2. ცენტრალური ნაწილი: items-center ათავსებს კონტენტს ვერტიკალურად შუაში */}
      <main role="main" className="flex-1 w-full flex items-center">
        {/* justify-center: მობილურზე ცენტრში, sm:justify-end: დიდ ეკრანებზე მარჯვნივ */}
        <div className="amindi-container w-full py-4 flex justify-center sm:justify-end">
          {/* კონვერტორი */}
          <Converter />
        </div>
      </main>

      {/* 3. ქვედა ნავიგაციისა და რეიტინგის პანელი */}
      <Footer />
    </BackgroundSky>
  );
}