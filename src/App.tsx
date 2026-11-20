/**
 * @file App.tsx
 * @description Root Application Entrypoint amindi.ge-ს ზუსტი დიზაინით
 */

import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { Header } from './components/layout/Header';
import { LazySection } from './components/LazySection';
import { LazyWeatherMap as InteractiveWeatherMap } from './features/LazyWeatherMap';
import type { MapWeather } from './features/InteractiveWeatherMap';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';
import { Converter } from './components/Converter';
import { WindAndPressure } from './features/LeftBarWindAndPressure';
import { WeatherForecast } from './features/WeatherForecast';
import { CurrentWeather } from './features/CurrentWeather';
import { HourlyWeatherForecast } from './features/HourlyWeatherForecast';
const FullHourlyForecast = lazy(() => import('./features/FullHourlyForecast').then(m => ({ default: m.FullHourlyForecast })));
const AstrologyHoroscope = lazy(() => import('./features/AstrologyHoroscope').then((module) => ({ default: module.AstrologyHoroscope })));
const ZodiacDetailPage = lazy(() => import('./features/ZodiacDetailPage').then(m => ({ default: m.ZodiacDetailPage })));
import { CurrencyRates } from './components/currency/CurrencyRates';
const Slider = lazy(() => import('./features/Slider').then((module) => ({ default: module.Slider })));
import { sliderData } from './services/data';
import { detectUserCity, fetchCurrentWeather, UserCoordinates } from './services/weatherService';
import { PalitraLongAd } from './components/ads/PalitraLongAd'; //რეკლამა
import { PalitraShortAd } from './components/ads/PalitraShortAd'; //რეკლამა
import { PalitraNewsAd } from './components/ads/PalitraNewsAd'; //რეკლამა
import { CityDropdown } from './components/choiceCity/city';
import CitySearch from './my_search/CitySearch';
import LanguageSelector from './my_search/LanguageSelector';
import TemperatureUnitSelector from './my_search/TemperatureUnitSelector';
import { LanguageProvider, formatTemperature, type SiteLanguage, type TemperatureUnit } from './context/LanguageContext';
const NewsSection = lazy(() => import('./features/News/NewsSection').then((module) => ({ default: module.NewsSection })));
import { CircleAd } from './components/CircleAd/CircleAd';

interface CityOption {
  id: number;
  name: string;
  temp: number | null;
  query: string;
}

const CITY_OPTIONS: CityOption[] = [
  { id: 1, name: 'თბილისი', temp: null, query: 'Tbilisi' },
  { id: 2, name: 'ბათუმი', temp: null, query: 'Batumi' },
  { id: 3, name: 'ქუთაისი', temp: null, query: 'Kutaisi' },
  { id: 4, name: 'რუსთავი', temp: null, query: 'Rustavi' },
  { id: 5, name: 'გორი', temp: null, query: 'Gori' },
  { id: 6, name: 'თელავი', temp: null, query: 'Telavi' },
  { id: 7, name: 'ზუგდიდი', temp: null, query: 'Zugdidi' },
  { id: 8, name: 'ფოთი', temp: null, query: 'Poti' },
  { id: 9, name: 'ბაკურიანი', temp: null, query: 'Bakuriani' },
  { id: 10, name: 'ახალციხე', temp: null, query: 'Akhaltsikhe' },
  { id: 11, name: 'ბორჯომი', temp: null, query: 'Borjomi' },
  { id: 12, name: 'გურჯაანი', temp: null, query: 'Gurjaani' },
  { id: 13, name: 'ლანჩხუთი', temp: null, query: 'Lanchkhuti' },
  { id: 14, name: 'მცხეთა', temp: null, query: 'Mtskheta' },
  { id: 15, name: 'სენაკი', temp: null, query: 'Senaki' },
  { id: 16, name: 'ქობულეთი', temp: null, query: 'Kobuleti' },
  { id: 17, name: 'ყვარელი', temp: null, query: 'Kvareli' },
  { id: 18, name: 'ჩხოროწყუ', temp: null, query: 'Chkhorotsku' },
  { id: 19, name: 'ჩოხატაური', temp: null, query: 'Chokhatauri' },
  { id: 20, name: 'ხაშური', temp: null, query: 'Khashuri' },
  { id: 21, name: 'ხობი', temp: null, query: 'Khobi' },
  { id: 22, name: 'აბასთუმანი', temp: null, query: 'Abastumani' },
  { id: 23, name: 'ბოლნისი', temp: null, query: 'Bolnisi' },
  { id: 24, name: 'მესტია', temp: null, query: 'Mestia' },
  { id: 25, name: 'ოჩამჩირე', temp: null, query: 'Ochamchire' },
  { id: 27, name: 'მანგლისი', temp: null, query: 'Manglisi' },
  { id: 28, name: 'ჟინვალი', temp: null, query: 'Zhinvali' },
  { id: 29, name: 'ჯვარი', temp: null, query: 'Jvari' },
  { id: 30, name: 'საჩხერე', temp: null, query: 'Sachkhere' },
  { id: 31, name: 'სოხუმი', temp: null, query: 'Sokhumi' },
  { id: 32, name: 'წალენჯიხა', temp: null, query: 'Tsalenjikha' },
  { id: 33, name: 'წნორი', temp: null, query: 'Tsnori' },
  { id: 34, name: 'სამტრედია', temp: null, query: 'Samtredia' },
  { id: 35, name: 'ამბროლაური', temp: null, query: 'Ambrolauri' },
  { id: 36, name: 'ონი', temp: null, query: 'Oni' },
  { id: 37, name: 'ცაგერი', temp: null, query: 'Tsageri' },
  { id: 38, name: 'ლენტეხი', temp: null, query: 'Lentekhi' },
  { id: 39, name: 'მარნეული', temp: null, query: 'Marneuli' },
  { id: 40, name: 'ბოლნისი', temp: null, query: 'Bolnisi' },
  { id: 41, name: 'დმანისი', temp: null, query: 'Dmanisi' },
  { id: 42, name: 'წალკა', temp: null, query: 'Tsalka' },
  { id: 43, name: 'გარდაბანი', temp: null, query: 'Gardabani' },
  { id: 44, name: 'ბაღდათი', temp: null, query: 'Baghdati' },
  { id: 45, name: 'ვანი', temp: null, query: 'Vani' },
  { id: 46, name: 'თერჯოლა', temp: null, query: 'Terjola' },
  { id: 48, name: 'ტყიბული', temp: null, query: 'Tkibuli' },
  { id: 49, name: 'ჭიათურა', temp: null, query: 'Chiatura' },
  { id: 50, name: 'ხარაგაული', temp: null, query: 'Kharagauli' },
  { id: 51, name: 'ბედია', temp: null, query: 'Bedia' },
  { id: 52, name: 'გალი', temp: null, query: 'Gali' },
  { id: 53, name: 'გუდაუთა', temp: null, query: 'Gudauta' },
  { id: 54, name: 'გაგრა', temp: null, query: 'Gagra' },
  { id: 55, name: 'ახალი ათონი', temp: null, query: 'New Athos' },
  { id: 57, name: 'სიღნაღი', temp: null, query: 'Sighnaghi' },
  { id: 58, name: 'დედოფლისწყარო', temp: null, query: 'Dedoplistskaro' },
  { id: 59, name: 'ლაგოდეხი', temp: null, query: 'Lagodekhi' },
  { id: 60, name: 'საგარეჯო', temp: null, query: 'Sagarejo' },
];
const Box = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => {
  const hasBg = className.includes('bg-');
  const hasText = className.includes('text-');
  const hasBorder = className.includes('border-');
  return (
    <div
      className={`flex items-center justify-center text-center text-[11px] font-bold rounded-[4px] ${hasBorder ? '' : 'border-2 border-dashed border-slate-400'
        } ${hasBg ? '' : 'bg-white/90'} ${hasText ? '' : 'text-slate-600'} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [language, setLanguage] = useState<SiteLanguage>(() => {
    try {
      const saved = localStorage.getItem('amindi_language');
      return saved === 'en' || saved === 'ru' ? saved : 'ka';
    } catch {
      return 'ka';
    }
  });
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
    try {
      return localStorage.getItem('amindi_temperature_unit') === 'F' ? 'F' : 'C';
    } catch {
      return 'C';
    }
  });
  // მომხმარებლის მიმდინარე ქალაქი (საწყისად Tbilisi, შემდეგ დეტექტირდება ავტომატურად)
  const [city, setCity] = useState<string>('Tbilisi');
  const [cityOptions, setCityOptions] = useState<CityOption[]>(CITY_OPTIONS);
  const [coordinates, setCoordinates] = useState<UserCoordinates | null>(null);
  const [mapWeather, setMapWeather] = useState<MapWeather | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const citySelectedByUser = useRef(false);
  const cityTemperaturesStarted = useRef(false);
  const cancelled = useRef(false);
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
    document.documentElement.lang = language;
    try {
      localStorage.setItem('amindi_language', language);
    } catch {
      // Language selection remains active for this session when storage is unavailable.
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('amindi_temperature_unit', temperatureUnit);
    } catch {
      // Unit selection remains active for this session when storage is unavailable.
    }
  }, [temperatureUnit]);

  const localizedCityOptions = cityOptions.map((item) => ({
    ...item,
    temp: item.temp === null ? '…' : formatTemperature(item.temp, temperatureUnit),
    name: language === 'ka' ? item.name : language === 'en' ? item.query : ({
      Tbilisi: 'Тбилиси', Batumi: 'Батуми', Kutaisi: 'Кутаиси', Rustavi: 'Рустави',
      Gori: 'Гори', Telavi: 'Телави', Zugdidi: 'Зугдиди', Poti: 'Поти',
      Bakuriani: 'Бакуриани', Akhaltsikhe: 'Ахалцихе', Borjomi: 'Боржоми',
    } as Record<string, string>)[item.query] ?? item.query,
  }));

  const citySearchOptions: Array<Omit<CityOption, 'temp'> & { temp: number }> = localizedCityOptions.map((item) => ({
    ...item,
    temp: typeof item.temp === 'number' ? item.temp : 0,
  }));

  useEffect(() => () => { cancelled.current = true; }, []);

  const loadCityTemperatures = () => {
    if (cityTemperaturesStarted.current) return;
    cancelled.current = false;
    cityTemperaturesStarted.current = true;

    const loadTemperatures = async () => {
      let nextIndex = 0;
      const temperatureCache = new Map<string, Promise<number>>();

      const loadNextTemperature = async () => {
        while (!cancelled.current) {
          const option = CITY_OPTIONS[nextIndex++];
          if (!option) return;

          try {
            let temperatureRequest = temperatureCache.get(option.query);
            if (!temperatureRequest) {
              temperatureRequest = fetchCurrentWeather(option.query).then((weather) => weather.temp);
              temperatureCache.set(option.query, temperatureRequest);
            }
            const temperature = await temperatureRequest;
            if (cancelled.current) return;

            setCityOptions((current) =>
              current.map((cityOption) =>
                cityOption.id === option.id ? { ...cityOption, temp: temperature } : cityOption,
              ),
            );
            setSelectedCity((current) =>
              current?.id === option.id ? { ...current, temp: temperature } : current,
            );
          } catch {
            // Keep the placeholder if the API request fails.
          }
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(8, CITY_OPTIONS.length) }, () => loadNextTemperature()),
      );
    };

    void loadTemperatures();
  };
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

  const handleSelectCity = (chosenCity: CityOption) => {
    citySelectedByUser.current = true;
    setSelectedCity(chosenCity);
    setCity(chosenCity.query);
    setCoordinates(null);
    setMapWeather(null);
  };

  const cityToolbar = (
    <div className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:flex-wrap sm:justify-between sm:gap-3">
      <div className="flex w-full justify-center sm:w-auto sm:justify-start [&>div]:!w-full [&>div>button]:!h-[37px] [&>div>button]:!w-full [&>div>button]:!max-w-full [&>div>button]:!justify-center [&>div>button]:!box-border [&>div>button]:!gap-1 [&>div>button]:!px-2 [&>div>button]:!text-[11px] sm:[&>div]:!w-auto sm:[&>div>button]:!w-auto sm:[&>div>button]:!justify-between sm:[&>div>button]:!gap-[6px] sm:[&>div>button]:!px-[14px] sm:[&>div>button]:!text-[13px]">
        <CityDropdown
          cities={localizedCityOptions}
          selectedCity={localizedCityOptions.find((item) => item.id === selectedCity?.id) ?? null}
          language={language}
          unit={temperatureUnit}
          onOpen={loadCityTemperatures}
          onSelectCity={handleSelectCity}
        />
      </div>
      <div className="contents sm:ml-auto sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
        <div className="w-full min-w-0 [&>div]:!w-full sm:w-[170px] sm:flex-none">
          <CitySearch
            cities={citySearchOptions}
            selectedCity={citySearchOptions.find((item) => item.id === selectedCity?.id) ?? null}
            language={language}
            unit={temperatureUnit}
            onSelectCity={handleSelectCity}
          />
        </div>
        <div className="w-full [&>div]:!w-full [&>div>button]:!w-full [&>div>button]:!justify-center sm:w-auto sm:[&>div]:!w-auto sm:[&>div>button]:!w-auto">
          <LanguageSelector language={language} onChange={setLanguage} />
        </div>
        <div className="w-full [&>div]:!w-full [&>div>button]:!w-full [&>div>button]:!justify-center sm:w-auto sm:[&>div]:!w-auto sm:[&>div>button]:!w-auto">
          <TemperatureUnitSelector unit={temperatureUnit} onChange={setTemperatureUnit} />
        </div>
      </div>
    </div>
  );

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
    <LanguageProvider language={language} unit={temperatureUnit}>
      <BackgroundSky>
        <div className="min-h-screen text-slate-700 flex flex-col">

          {/* 1. Header (სრული სიგანით ზემოთ) */}
          <Header />

          {/* 2. ცენტრალური შეფუთვა: ზოდიაქოს ცალკე გვერდი ან მთავარი პანელი */}
          {activeZodiacPage ? (
            <main role="main" className="flex-1 w-full">
              <Suspense fallback={<div className="p-4" role="status">Loading...</div>}><ZodiacDetailPage
                signId={activeZodiacPage}
                initialTab={activeZodiacTab}
                onBack={handleBackToMain}
                onSelectSign={handleNavigateToZodiac}
              /></Suspense>
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
              <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_260px] xl:grid-cols-[310px_minmax(0,1fr)_260px] gap-3 sm:gap-4 flex-1">

                <div className="rounded-[4px] bg-[rgba(25,55,92,0.88)] px-2 py-1.5 sm:px-4 lg:col-start-2 lg:col-end-4 lg:row-start-1">
                  {cityToolbar}
                </div>

                {/* მარცხენა სვეტი: ერთიანი მუქი პანელი amindi.ge-ს სტილში */}
                <aside className="w-full shrink-0 bg-[#2f4058]/90 text-white rounded-[4px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 shadow-lg backdrop-blur-sm lg:self-start lg:sticky lg:top-3 lg:col-start-1 lg:row-start-1 lg:row-span-3">

                  {/* 1. მიმდინარე ამინდი */}
                  <div className="w-full min-h-[210px] pb-3 border-b border-white/20">
                    <CurrentWeather city={city} coordinates={coordinates} mapWeather={mapWeather} />
                  </div>

                  {/* 2. ამინდი საათების მიხედვით */}
                  <div className="w-full min-h-[260px] pb-3 border-b border-white/20">
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
                  <div className="w-full min-h-[160px] flex justify-center bg-[#1e2a3b] overflow-hidden rounded">
                    <CurrencyRates />
                  </div>

                </aside>

                {/* ცენტრალური სვეტი */}
                <main className="space-y-3 sm:space-y-4 min-w-0 lg:col-start-2 lg:row-start-2">
                  {/* ამინდის პროგნოზი: დღეების მიხედვით ან 24-საათიანი სრული ბადე */}
                  <div className="w-full">
                    {centerView === 'hourly' ? (
                      <Suspense fallback={<div className="min-h-[120px]" role="status">Loading forecast...</div>}><FullHourlyForecast city={city} coordinates={coordinates} /></Suspense>
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
                  <LazySection fallback={<div className="h-[400px] sm:h-[460px] w-full" />}>
                    <Slider slides={sliderData} />
                  </LazySection>

                  {/* 🆕 სიახლეები */}
                  <LazySection fallback={<div className="min-h-[650px] w-full" />}>
                    <NewsSection />
                  </LazySection>

                  {/* ასტროლოგია / ჰოროსკოპი (სულ ბოლოში) */}
                </main>

                {/* მარჯვენა სვეტი */}
                <aside className="space-y-3 sm:space-y-4 flex flex-col lg:self-start lg:sticky lg:top-3 lg:col-start-3 lg:row-start-2 lg:row-span-2">
                  {/* ზედა რეკლამა (Palitra News) */}
                  <div className="w-full h-[230px] sm:h-[310px]">
                    <PalitraShortAd />
                  </div>

                  {/* კონვერტორი (ზუსტად ბანერის ქვეშ) */}
                  <div className="w-full">
                    <Converter />
                  </div>

                  {/* ქვედა რეკლამა */}
                  <div className="hidden w-full sm:block sm:h-[520px]">
                    <PalitraLongAd />
                  </div>

                  {/* დამატებითი რეკლამა ქვედა თავისუფალ სივრცეში */}
                  <div className="hidden w-full lg:block lg:h-[520px]">
                    <PalitraLongAd />
                  </div>
                </aside>

                <div className="w-full lg:col-start-2 lg:row-start-3">
                  <LazySection fallback={<div className="min-h-[500px] w-full" />}>
                    <AstrologyHoroscope onNavigateToZodiac={handleNavigateToZodiac} />
                  </LazySection>
                </div>

              </div>
            </div>
          )}

          {/* 3. Footer */}
          <Footer />

          {/* Circle AD  */}
          <CircleAd href="https://radiopalitra.ge/" size={75} />

<<<<<<< HEAD
              <div className="rounded-[4px] bg-[rgba(25,55,92,0.88)] px-2 py-1.5 sm:px-4 lg:col-start-2 lg:col-end-4 lg:row-start-1">
                {cityToolbar}
              </div>

              {/* მარცხენა სვეტი: ერთიანი მუქი პანელი amindi.ge-ს სტილში */}
              <aside className="w-full shrink-0 bg-[#2f4058]/90 text-white rounded-[4px] p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 shadow-lg backdrop-blur-sm h-full lg:col-start-1 lg:row-start-1 lg:row-span-2">

                {/* 1. მიმდინარე ამინდი */}
                <div className="w-full min-h-[210px] pb-3 border-b border-white/20">
                  <CurrentWeather city={city} coordinates={coordinates} mapWeather={mapWeather} />
                </div>

                {/* 2. ამინდი საათების მიხედვით */}
                <div className="w-full min-h-[260px] pb-3 border-b border-white/20">
                  <HourlyWeatherForecast
                    city={city}
                    coordinates={coordinates}
                    isFullHourlyOpen={centerView === 'hourly'}
                    onViewFullHourly={() => setCenterView((prev) => (prev === 'hourly' ? 'daily' : 'hourly'))}
                  />
                </div>

                {/* 3. ქარი და წნევა (დინამიური მონაცემებით) */}
                <div className="w-full">
                  <WindAndPressure city={city} coordinates={coordinates} />
                </div>

                {/* 4. ვალუტის კურსები */}
                <div className="w-full min-h-[160px] flex justify-center bg-[#1e2a3b] overflow-hidden rounded">
                  <CurrencyRates />
                </div>

              </aside>

              {/* ცენტრალური სვეტი */}
              <main className="space-y-3 sm:space-y-4 min-w-0 lg:col-start-2 lg:row-start-2">
                {/* ამინდის პროგნოზი: დღეების მიხედვით ან 24-საათიანი სრული ბადე */}
                <div className="w-full">
                  {centerView === 'hourly' ? (
                    <Suspense fallback={<div className="min-h-[120px]" role="status">Loading forecast...</div>}><FullHourlyForecast city={city} coordinates={coordinates} /></Suspense>
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
                <LazySection fallback={<div className="h-[400px] sm:h-[460px] w-full" />}>
                  <Slider slides={sliderData} />
                </LazySection>

                 {/* 🆕 სიახლეები */}
                <LazySection fallback={<div className="min-h-[650px] w-full" />}>
                  <NewsSection />
                </LazySection>

                {/* ასტროლოგია / ჰოროსკოპი (სულ ბოლოში) */}
              </main>

              {/* მარჯვენა სვეტი */}
              <aside className="space-y-3 sm:space-y-4 flex flex-col lg:col-start-3 lg:row-start-2">
                {/* ზედა რეკლამა (Palitra News) */}
                <div className="w-full h-[230px] sm:h-[310px]">
                  <PalitraShortAd />
                </div>

                {/* კონვერტორი (ზუსტად ბანერის ქვეშ) */}
                <div className="w-full">
                  <Converter />
                </div>

                {/* ქვედა რეკლამა */}
                <div className="hidden w-full sm:block sm:h-[520px]">
                  <PalitraLongAd />
                </div>

                {/* დამატებითი რეკლამა ქვედა თავისუფალ სივრცეში */}
                <div className="hidden w-full lg:block lg:h-[520px]">
                  <PalitraLongAd />
                </div>
              </aside>

              <div className="w-full lg:col-start-2 lg:row-start-3">
                <LazySection fallback={<div className="min-h-[500px] w-full" />}>
                  <AstrologyHoroscope onNavigateToZodiac={handleNavigateToZodiac} />
                </LazySection>
              </div>

            </div>
          </div>
        )}

        {/* 3. Footer */}
        <Footer />

        {/* Circle AD  */}
         <CircleAd href="https://radiopalitra.ge/" size={75} />

      </div>
    </BackgroundSky>
=======
        </div>
      </BackgroundSky>
>>>>>>> origin
    </LanguageProvider>
  );
}
