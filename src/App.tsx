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
 * 3. <main role="main" className="flex-1 w-full" /> (ძირითადი სამუშაო არეალი):
 *    - იკავებს დარჩენილ თავისუფალ ვერტიკალურ სივრცეს ჰედერსა და ფუტერს შორის (`flex-1`).
 *
 * 4. Footer (ქვედა ნავიგაცია და მთვლელი):
 *    - შეიცავს ქვედა ბმულებს, ლოგოს და TOP.GE მთვლელს.
 */

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';
import { LeftBarCurrentWeather } from './components/LeftBarCurrentWeather';
import { LeftBarHourlyForecast } from './components/LeftBarHourlyForecast';
import { WindAndPressure } from './features/LeftBarWindAndPressure';
import { CitySelector } from './components/CitySelector';
import { HourlyForecastPage } from './routes/HourlyForecastPage';
import { fetchWeatherData, WeatherData } from './services/weatherService';

export default function App() {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState<string>(() => {
    return sessionStorage.getItem('selectedCity') || 'Tbilisi';
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    sessionStorage.setItem('selectedCity', selectedCity);

    const loadWeather = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
      } catch (error) {
        console.error('შეცდომა ამინდის წამოღებისას:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeather();
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    navigate('/');
  };

  return (
    // მთავარი დინამიური ფონის კომპონენტი
    <BackgroundSky>
      {/* 1. ზედა ნავიგაციის პანელი */}
      <Header />

      {/* 2. ცენტრალური ნაწილი (მომავალი კონტენტის განსათავსებლად) */}
      <main role="main" className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">

        {/* მარჯვენა ნაწილი CitySelector და როუტები, მობილურზე პირველია */}
        <div className="flex-1 flex flex-col gap-4 order-1 md:order-2">
          <CitySelector
            selectedCity={selectedCity}
            onSelectCity={handleCitySelect}
          />

          <Routes>
            <Route path="/" element={null} />
            <Route
              path="/hourly"
              element={<HourlyForecastPage hourlyData={weatherData?.fullHourly || []} />}
            />
          </Routes>
        </div>

        {/* მარცხენა სვეტი (მიმდინარე ამინდი, საათობრივი ამინდი, ქარი/წნევა), მობილურზე მეორეა */}
        <aside className="flex flex-col w-full md:w-[320px] shrink-0 order-2 md:order-1">
          {isLoading || !weatherData ? (
            <div className="bg-[#1a2c42]/60 backdrop-blur-md p-6 text-white text-center rounded-lg text-xs shadow-xl">
              იტვირთება მონაცემები...
            </div>
          ) : (
            <>
              {/* ამჟამინდელი ამინდის მონაცემები */}
              <LeftBarCurrentWeather
                cityName={weatherData.cityName}
                temperature={weatherData.temperature}
                condition={weatherData.condition}
                icon={weatherData.icon}
                timezone={weatherData.timezone}
              />
              {/* საათობრივი ამინდის მონაცემები */}
              <LeftBarHourlyForecast hourlyData={weatherData.hourly} />
              {/* ქარის და წნევის მონაცემები */}
              <WindAndPressure
                windSpeed={weatherData.windSpeed}
                windUnit={weatherData.windUnit}
                windDirection={weatherData.windDirection}
                pressure={weatherData.pressure}
                pressureUnit={weatherData.pressureUnit}
                feelsLikeTemp={weatherData.feelsLikeTemp}
                feelsLikeWind={weatherData.feelsLikeWind}
                humidity={weatherData.humidity}
                visibility={weatherData.visibility}
                isLoading={false}
              />
            </>
          )}
        </aside>
      </main>

      {/* 3. ქვედა ნავიგაციისა და რეიტინგის პანელი */}
      <Footer />
    </BackgroundSky>
  );
}