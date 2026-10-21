/**
 * @file App.tsx
 * @description აპლიკაციის მთავარი შესასვლელი კომპონენტი (Root Application Entrypoint).
 * ზუსტად იმეორებს https://amindi.ge/ka/ სტრუქტურასა და განლაგებას:
 * - BackgroundSky: amindi.ge-ს ფონის სურათი (clouds_night2.jpg / sun2.jpg)
 * - Header: 50px სიმაღლის ნავიგაცია rgba(25, 55, 92, 0.75) ფონით და header-logo.png-ით
 * - მთავარი კონტეინერი (.container-bg): max-width: 1220px, background: rgba(25, 55, 92, 0.75), padding-top: 8px
 *   - მარცხენა სვეტი (col-md-3):
 *     1. CurrentWeatherCard (.weather-current) + <hr class="amindi-hr" />
 *     2. HourlyForecast (.weather-hours) + <hr class="amindi-hr" />
 *     3. WindAndPressure (.wind + .more-info)
 *     4. CurrencyRatesCard (.currency)
 *   - მარჯვენა სვეტი (col-md-9):
 *     1. CitySelectorBar (.tool-bars + .cities მეგა-მენიუ)
 *     2. თეთრი შიდა კონტეინერი (.bg-white.inner-container, border-radius: 5px 0 5px 0, margin-top: 8px):
 *        - მარცხენა 8 სვეტი (col-md-8 p-2):
 *          - DaysForecastTabs (.weather-days: 5 დღის, 10 დღის, 2 კვირის, 1 თვის, მთვარის ფაზების კალენდარი)
 *          - VideoPromoCard (.video-container)
 *          - RadioPalitraWidget (.radio)
 *          - NewsSection (.article_header + .article_blocks_container + SS.ge კურორტების კარუსელი)
 *          - HotSaleSection (.astrology ვიჯეტი)
 *        - მარჯვენა 4 სვეტი (col-md-4 p-2):
 *          - PalitraVerticalBanner (ბანერი)
 *          - CurrencyConverter (.converter: C°/F°, კმ/მილი, USD/GEL)
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store';
import { fetchWeatherForCity } from './store/slices/weatherSlice';

// განლაგების (Layout) კომპონენტები
import { Header } from './components/layout/Header';
import { BackgroundSky } from './components/layout/BackgroundSky';
import { Footer } from './components/layout/Footer';

// ამინდის (Weather) კომპონენტები
import { CitySelectorBar } from './components/weather/CitySelectorBar';
import { CurrentWeatherCard } from './components/weather/CurrentWeatherCard';
import { HourlyForecast } from './components/weather/HourlyForecast';
import { WindAndPressure } from './components/weather/WindAndPressure';
import { DaysForecastTabs } from './components/weather/DaysForecastTabs';
import { AllHourlyModal } from './components/weather/AllHourlyModal';

// ვიჯეტების (Widgets) კომპონენტები
import { CurrencyRatesCard } from './components/widgets/CurrencyRatesCard';
import { CurrencyConverter } from './components/widgets/CurrencyConverter';
import { RadioPalitraWidget } from './components/widgets/RadioPalitraWidget';
import { PalitraVerticalBanner } from './components/widgets/PalitraVerticalBanner';
import { VideoPromoCard } from './components/widgets/VideoPromoCard';
import { HotSaleSection } from './components/widgets/HotSaleSection';
import { NewsSection } from './components/widgets/NewsSection';
import { AllCurrenciesModal } from './components/widgets/AllCurrenciesModal';

// CRUD მოდალური ფანჯრები (Formik & Yup)
import { CityFormModal } from './components/crud/CityFormModal';
import { CurrencyFormModal } from './components/crud/CurrencyFormModal';
import { NewsFormModal } from './components/crud/NewsFormModal';
import { ApiSettingsModal } from './components/crud/ApiSettingsModal';

// გუნდური კომპონენტების ბიბლიოთეკის ხედი
import { ComponentShowcase } from './components/showcase/ComponentShowcase';

/**
 * მთავარი პორტალის შიდა კომპონენტი (მოთავსებულია Redux Provider-ის ქვეშ)
 */
const MainPortalContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCityId, apiSettings } = useAppSelector((state) => state.weather);
  const { viewMode } = useAppSelector((state) => state.ui);

  // აპლიკაციის ჩატვირთვისას ცოცხალი ამინდის წამოღება API-დან (თუ ჩართულია Live API)
  useEffect(() => {
    if (selectedCityId && apiSettings.useLiveApi) {
      dispatch(fetchWeatherForCity(selectedCityId));
    }
  }, [dispatch, selectedCityId, apiSettings.useLiveApi]);

  return (
    <BackgroundSky>
      {/* საიტის ზედა ჰედერი */}
      <Header />

      {/* ხედვის რეჟიმის პირობითი რენდერი (პორტალი ან კომპონენტების ბიბლიოთეკა) */}
      {viewMode === 'showcase' ? (
        <main className="flex-1">
          <ComponentShowcase />
        </main>
      ) : (
        <main
          role="main"
          className="container-bg max-w-[1220px] w-full mx-auto px-[15px] pt-[8px] pb-[15px]"
          style={{ backgroundColor: 'rgba(25, 55, 92, 0.75)' }}
        >
          <div className="flex flex-col lg:flex-row -mx-[15px]">
            {/* მარცხენა სვეტი (col-md-3 - 25% დესკტოპზე) */}
            <div className="w-full lg:w-3/12 px-[15px]">
              <CurrentWeatherCard />
              <hr className="amindi-hr" />
              <HourlyForecast />
              <hr className="amindi-hr" />
              <WindAndPressure />
              <CurrencyRatesCard />
            </div>

            {/* მარჯვენა სვეტი (col-md-9 - 75% დესკტოპზე) */}
            <div className="w-full lg:w-9/12 px-[15px] mt-4 lg:mt-0">
              {/* ზედა ხელსაწყოების ზოლი (.tool-bars) და ქალაქების მეგა-მენიუ */}
              <CitySelectorBar />

              {/* თეთრი შიდა კონტეინერი (.bg-white.inner-container) */}
              <div
                className="bg-white inner-container mt-[8px] flex flex-col lg:flex-row"
                style={{ borderRadius: '5px 0 5px 0' }}
              >
                {/* შიდა მარცხენა 8 სვეტი (col-md-8 p-2) */}
                <div className="w-full lg:w-8/12 p-2">
                  <DaysForecastTabs />
                  <VideoPromoCard />
                  <RadioPalitraWidget />
                  <NewsSection />
                  <HotSaleSection />
                </div>

                {/* შიდა მარჯვენა 4 სვეტი (col-md-4 p-2) */}
                <div className="w-full lg:w-4/12 p-2">
                  <PalitraVerticalBanner />
                  <CurrencyConverter />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* საიტის ქვედა ნაწილი */}
      <Footer />

      {/* CRUD და დეტალური მოდალური ფანჯრები */}
      <CityFormModal />
      <CurrencyFormModal />
      <NewsFormModal />
      <ApiSettingsModal />
      <AllHourlyModal />
      <AllCurrenciesModal />
    </BackgroundSky>
  );
};

/**
 * ძირითადი App კომპონენტი Redux Store Provider-ით
 */
export default function App() {
  return (
    <Provider store={store}>
      <MainPortalContent />
    </Provider>
  );
}
