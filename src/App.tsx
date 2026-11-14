/**
 * @file App.tsx
 * @description Root Application Entrypoint amindi.ge-ს ზუსტი დიზაინით
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/layout/Header';
import { InteractiveWeatherMap, type MapWeather } from './features/InteractiveWeatherMap';
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
import { detectUserCity, fetchCurrentWeather, UserCoordinates } from './services/weatherService';
import { PalitraLongAd } from './components/ads/PalitraLongAd'; //რეკლამა
import { PalitraShortAd } from './components/ads/PalitraShortAd'; //რეკლამა
import { PalitraNewsAd } from './components/ads/PalitraNewsAd'; //რეკლამა
import { CityDropdown } from './components/choiceCity/city';

interface CityOption {
  id: number;
  name: string;
  temp: number;
  query: string;
}

const CITY_OPTIONS: CityOption[] = [
  { id: 1, name: 'თბილისი', temp: 9, query: 'Tbilisi' },
  { id: 2, name: 'ბათუმი', temp: 12, query: 'Batumi' },
  { id: 3, name: 'ქუთაისი', temp: 10, query: 'Kutaisi' },
  { id: 4, name: 'რუსთავი', temp: 11, query: 'Rustavi' },
  { id: 5, name: 'გორი', temp: 7, query: 'Gori' },
  { id: 6, name: 'თელავი', temp: 9, query: 'Telavi' },
  { id: 7, name: 'ზუგდიდი', temp: 10, query: 'Zugdidi' },
  { id: 8, name: 'ფოთი', temp: 12, query: 'Poti' },
  { id: 9, name: 'ბაკურიანი', temp: 3, query: 'Bakuriani' },
  { id: 10, name: 'ახალციხე', temp: 4, query: 'Akhaltsikhe' },
  { id: 11, name: 'ბორჯომი', temp: 3, query: 'Borjomi' },
  { id: 12, name: 'გურჯაანი', temp: 11, query: 'Gurjaani' },
  { id: 13, name: 'ლანჩხუთი', temp: 11, query: 'Lanchkhuti' },
  { id: 14, name: 'მცხეთა', temp: 4, query: 'Mtskheta' },
  { id: 15, name: 'სენაკი', temp: 11, query: 'Senaki' },
  { id: 16, name: 'ქობულეთი', temp: 12, query: 'Kobuleti' },
  { id: 17, name: 'ყვარელი', temp: 8, query: 'Kvareli' },
  { id: 18, name: 'ჩხოროწყუ', temp: 9, query: 'Chkhorotsku' },
  { id: 19, name: 'ჩოხატაური', temp: 8, query: 'Chokhatauri' },
  { id: 20, name: 'ხაშური', temp: 7, query: 'Khashuri' },
  { id: 21, name: 'ხობი', temp: 11, query: 'Khobi' },
  { id: 22, name: 'აბასთუმანი', temp: 1, query: 'Abastumani' },
  { id: 23, name: 'ბოლნისი', temp: 10, query: 'Bolnisi' },
  { id: 24, name: 'მესტია', temp: -6, query: 'Mestia' },
  { id: 25, name: 'ოჩამჩირე', temp: 10, query: 'Ochamchire' },
  { id: 26, name: 'დავით-გარეჯი', temp: 12, query: 'Davit Gareji' },
  { id: 27, name: 'მანგლისი', temp: 3, query: 'Manglisi' },
  { id: 28, name: 'ჟინვალი', temp: 5, query: 'Zhinvali' },
  { id: 29, name: 'ჯვარი', temp: 2, query: 'Jvari' },
  { id: 30, name: 'საჩხერე', temp: 5, query: 'Sachkhere' },
  { id: 31, name: 'სოხუმი', temp: 10, query: 'Sokhumi' },
  { id: 32, name: 'წალენჯიხა', temp: 5, query: 'Tsalenjikha' },
  { id: 33, name: 'წნორი', temp: 9, query: 'Tsnori' },
  { id: 34, name: 'სამტრედია', temp: 4, query: 'Samtredia' },
  { id: 35, name: 'ამბროლაური', temp: 6, query: 'Ambrolauri' },
  { id: 36, name: 'ონი', temp: 5, query: 'Oni' },
  { id: 37, name: 'ცაგერი', temp: 8, query: 'Tsageri' },
  { id: 38, name: 'ლენტეხი', temp: 4, query: 'Lentekhi' },
  { id: 39, name: 'მარნეული', temp: 10, query: 'Marneuli' },
  { id: 40, name: 'ბოლნისი', temp: 10, query: 'Bolnisi' },
  { id: 41, name: 'დმანისი', temp: 1, query: 'Dmanisi' },
  { id: 42, name: 'წალკა', temp: 2, query: 'Tsalka' },
  { id: 43, name: 'გარდაბანი', temp: 11, query: 'Gardabani' },
  { id: 44, name: 'ბაღდათი', temp: 7, query: 'Baghdati' },
  { id: 45, name: 'ვანი', temp: 8, query: 'Vani' },
  { id: 46, name: 'თერჯოლა', temp: 9, query: 'Terjola' },
  { id: 47, name: 'ზესტაფონი', temp: 5, query: 'Zestafoni' },
  { id: 48, name: 'ტყიბული', temp: 5, query: 'Tkibuli' },
  { id: 49, name: 'ჭიათურა', temp: 5, query: 'Chiatura' },
  { id: 50, name: 'ხარაგაული', temp: 7, query: 'Kharagauli' },
  { id: 51, name: 'ბედია', temp: 9, query: 'Bedia' },
  { id: 52, name: 'გალი', temp: 11, query: 'Gali' },
  { id: 53, name: 'გუდაუთა', temp: 8, query: 'Gudauta' },
  { id: 54, name: 'გაგრა', temp: 10, query: 'Gagra' },
  { id: 55, name: 'ახალი ათონი', temp: 10, query: 'New Athos' },
  { id: 56, name: 'ყაზბეგი', temp: -2, query: 'Kazbegi' },
  { id: 57, name: 'სიღნაღი', temp: 11, query: 'Sighnaghi' },
  { id: 58, name: 'დედოფლისწყარო', temp: 10, query: 'Dedoplistskaro' },
  { id: 59, name: 'ლაგოდეხი', temp: 9, query: 'Lagodekhi' },
  { id: 60, name: 'საგარეჯო', temp: 7, query: 'Sagarejo' },
  { id: 61, name: 'გლდანი', temp: 9, query: 'Gldani' },
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
  // მომხმარებლის მიმდინარე ქალაქი (საწყისად Tbilisi, შემდეგ დეტექტირდება ავტომატურად)
  const [city, setCity] = useState<string>('Tbilisi');
  const [coordinates, setCoordinates] = useState<UserCoordinates | null>(null);
  const [mapWeather, setMapWeather] = useState<MapWeather | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [cityOptions, setCityOptions] = useState<CityOption[]>(CITY_OPTIONS);
  const citySelectedByUser = useRef(false);
  // ცენტრალური სექციის ხედი: 'daily' (დღეების პროგნოზი) ან 'hourly' (24-საათიანი ბადე)
  const [centerView, setCenterView] = useState<'daily' | 'hourly'>('daily');

  // არჩეული ზოდიაქოს ნიშნის ცალკე გვერდი (null = მთავარი გვერდი)
  const [activeZodiacPage, setActiveZodiacPage] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/horoscope/')) {
      return window.location.hash.replace('#/horoscope/', '') || null;
    }
    return null;
  });
  const [activeZodiacTab, setActiveZodiacTab] = useState<'daily' | 'monthly' | 'yearly' | 'general'>('daily');

  useEffect(() => {
    let cancelled = false;

    const loadTemperatures = async () => {
      for (const option of CITY_OPTIONS) {
        if (cancelled) return;

        try {
          const weather = await fetchCurrentWeather(option.query);
          if (cancelled) return;

          setCityOptions((current) =>
            current.map((cityOption) =>
              cityOption.id === option.id ? { ...cityOption, temp: weather.temp } : cityOption,
            ),
          );
          setSelectedCity((current) =>
            current?.id === option.id ? { ...current, temp: weather.temp } : current,
          );
        } catch {
          // Keep the existing fallback temperature if the API request fails.
        }

        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 1000);
        });
      }
    };

    void loadTemperatures();
    return () => {
      cancelled = true;
    };
  }, []);
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
      if (cancelled || citySelectedByUser.current) return;
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
      <div className="min-h-screen text-slate-700 flex flex-col">

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
          <div className="mx-auto w-full max-w-[1240px] px-2 sm:px-4 pt-2 sm:pt-3 pb-1 flex-1 flex flex-col">

            {/* Top Banner (რადიო პალიტრა / რეკლამა) */}
            <div className="w-full mb-3">
              <div className="h-[70px] sm:h-[90px] w-full">
                <PalitraNewsAd />
              </div>
            </div>


            {/* 3-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[235px_1fr_235px] xl:grid-cols-[260px_1fr_260px] gap-3 sm:gap-4 flex-1">

              {/* მარცხენა სვეტი: ერთიანი მუქი პანელი amindi.ge-ს სტილში */}
              <aside className="w-full lg:w-[235px] xl:w-[260px] shrink-0 bg-[#2f4058]/90 text-white rounded-[4px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 shadow-lg backdrop-blur-sm h-full">

                {/* 1. მიმდინარე ამინდი */}
                <div className="w-full pb-3 border-b border-white/20">
                  <CurrentWeather city={city} coordinates={coordinates} mapWeather={mapWeather} />
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
                <div className="w-full flex justify-center bg-[#1e2a3b] overflow-hidden rounded">
                  <CurrencyRates />
                </div>

              </aside>

              {/* ცენტრალური სვეტი */}
              <main className="space-y-3 sm:space-y-4 min-w-0">
                <div className="w-full flex justify-start mb-2">
                  <CityDropdown
                    cities={cityOptions}
                    selectedCity={selectedCity}
                    onSelectCity={(chosenCity: CityOption) => {
                      citySelectedByUser.current = true;
                      setSelectedCity(chosenCity);
                      setCity(chosenCity.query);
                      setCoordinates(null);
                      void fetchCurrentWeather(chosenCity.query)
                        .then(({ temp }) => {
                          setSelectedCity((current) =>
                            current?.id === chosenCity.id ? { ...current, temp } : current,
                          );
                        })
                        .catch(() => {});
                      setMapWeather(null);
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
                <div className="w-full h-[260px] sm:h-[340px] overflow-hidden rounded-[4px] border border-slate-500 bg-[#1e2a3b]">
                  <InteractiveWeatherMap onWeatherSelect={(data) => {
                    citySelectedByUser.current = true;
                    setMapWeather(data);
                    setCity(data.name);
                    setCoordinates({ latitude: data.latitude, longitude: data.longitude });
                  }} />
                </div>

                {/* სლაიდერი (შეიძინე დანაზოგით - Hotsale) */}
                <div className="w-full">
                  <Slider slides={sliderData} />
                </div>

                {/* ასტროლოგია / ჰოროსკოპი (სულ ბოლოში) */}
                <div className="w-full">
                  <AstrologyHoroscope onNavigateToZodiac={handleNavigateToZodiac} />
                </div>
              </main>

              {/* მარჯვენა სვეტი */}
              <aside className="space-y-3 sm:space-y-4 flex flex-col">
                {/* ზედა რეკლამა (Palitra News) */}
                <div className="w-full h-[230px] sm:h-[310px]">
                  <PalitraShortAd />
                </div>

                {/* კონვერტორი (ზუსტად ბანერის ქვეშ) */}
                <div className="w-full">
                  <Converter />
                </div>

                {/* ქვედა რეკლამა */}
                <div className="w-full h-[260px] sm:h-[520px]">
                  <PalitraLongAd />
                </div>
              </aside>

            </div>
          </div>
        )}

        {/* 3. Footer */}
        <Footer />

      </div>
    </BackgroundSky>
  );
}