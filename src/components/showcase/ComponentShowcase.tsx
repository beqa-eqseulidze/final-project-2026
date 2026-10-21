/**
 * @file ComponentShowcase.tsx
 * @description კომპონენტების ბიბლიოთეკა და არქიტექტურის საჩვენებელი პანელი.
 * შექმნილია სპეციალურად გუნდური მუშაობისთვის და დავალების ჩასაბარებლად:
 * 1. "კომპონენტების სია" - თითოეული შექმნილი კომპონენტის დეტალური ბარათი,
 *    ფაილის მისამართით, დანიშნულებით და CRUD ტესტირების ღილაკებით.
 * 2. "სტეკი & არქიტექტურა" - გამოყენებული ტექნოლოგიების (Node, npm, React 19,
 *    TypeScript, Tailwind, Redux Toolkit, Formik, Yup) მიმოხილვა.
 * 3. "Redux State ინსპექტორი" - რეალურ დროში აჩვენებს Redux Store-ის
 *    მიმდინარე მონაცემებს (Weather, Currency, News, UI).
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Code2,
  Database,
  Layers,
  Play,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  openAddCityModal,
  openAddCurrencyModal,
  openAddNewsModal,
  openEditCityModal,
  setApiSettingsModalOpen,
  setViewMode,
} from '../../store/slices/uiSlice';
import { Button } from '../common/Button';

export const ComponentShowcase: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, selectedCityId, apiSettings } = useAppSelector((state) => state.weather);
  const { currencies, converter } = useAppSelector((state) => state.currency);
  const { items: news } = useAppSelector((state) => state.news);

  const [activeTab, setActiveTab] = useState<'components' | 'architecture' | 'state'>('components');

  // შექმნილი მოდულური კომპონენტების სრული კატალოგი
  const componentsList = [
    {
      name: 'CitySelectorBar',
      path: 'src/components/weather/CitySelectorBar.tsx',
      desc: 'ქალაქის არჩევა, ძებნა, ტემპერატურის ერთეულის შეცვლა (C°/F°), ენა და ახალი ქალაქის დამატება.',
      tags: ['Redux', 'Search', 'Dropdown'],
      action: () => dispatch(openAddCityModal()),
      actionLabel: 'ქალაქის დამატების ტესტირება',
    },
    {
      name: 'CurrentWeatherCard',
      path: 'src/components/weather/CurrentWeatherCard.tsx',
      desc: 'მთავარი ვიჯეტი: მიმდინარე ტემპერატურა (24°), ამინდის გრაფიკა, ქალაქის სახელი, ცოცხალი საათი და რედაქტირების ღილაკი.',
      tags: ['Hero', 'Clock', 'CRUD Trigger'],
      action: () => dispatch(openEditCityModal(selectedCityId)),
      actionLabel: 'მიმდინარე ქალაქის რედაქტირება',
    },
    {
      name: 'HourlyForecast',
      path: 'src/components/weather/HourlyForecast.tsx',
      desc: 'საათობრივი პროგნოზის ბლოკი (18 საათი 24°...) და სრული 24-საათიანი მოდალის გამომძახებელი.',
      tags: ['Hourly', 'Forecast', 'Modal'],
    },
    {
      name: 'WindAndPressure',
      path: 'src/components/weather/WindAndPressure.tsx',
      desc: 'ქარი და წნევა: ანიმირებული ქარის ტურბინა (Wind Turbine), სიჩქარე, მიმართულება, წნევა, ტენიანობა, ხილვადობა.',
      tags: ['Atmospheric', 'Animation', 'Metrics'],
    },
    {
      name: 'DaysForecastTabs',
      path: 'src/components/weather/DaysForecastTabs.tsx',
      desc: '5-დღიანი პროგნოზის ბარათები, ტაბები (5 დღის, 10 დღის, 2 კვირის, 1 თვის, მთვარის ფაზები).',
      tags: ['Tabs', 'Daily', 'Forecast'],
    },
    {
      name: 'CurrencyRatesCard',
      path: 'src/components/widgets/CurrencyRatesCard.tsx',
      desc: 'ოფიციალური კურსები (USD, EUR, RUB) დღევანდელი და გუშინდელი მაჩვენებლებით, პროცენტული ცვლილებით და CRUD-ით.',
      tags: ['Currency', 'Table', 'CRUD'],
      action: () => dispatch(openAddCurrencyModal()),
      actionLabel: 'ვალუტის დამატების ტესტირება',
    },
    {
      name: 'CurrencyConverter',
      path: 'src/components/widgets/CurrencyConverter.tsx',
      desc: 'ინტერაქტიული ვალუტის კალკულატორი / კონვერტორი რეალურ დროში გადაყვანით და ვალუტების გაცვლით.',
      tags: ['Calculator', 'Math', 'Interactive'],
    },
    {
      name: 'RadioPalitraWidget',
      path: 'src/components/widgets/RadioPalitraWidget.tsx',
      desc: 'რადიო პალიტრა FM 103.9 მოთამაშე ანიმირებული ხმოვანი ტალღებით (Visualizer), ხმის რეგულატორით და სტრიმით.',
      tags: ['Radio', 'Audio', 'Visualizer'],
    },
    {
      name: 'HotSaleSection',
      path: 'src/components/widgets/HotSaleSection.tsx',
      desc: 'სასტუმროების ფასდაკლების ბარათები (Golden Tulip Borjomi, Esquisse Telavi) ფასებით და სურათებით.',
      tags: ['Cards', 'Deals', 'E-commerce'],
    },
    {
      name: 'NewsSection',
      path: 'src/components/widgets/NewsSection.tsx',
      desc: 'სიახლეების პანელი კატეგორიებით, დროით, სურათებით და ახალი სტატიის დამატების/წაშლის ფუნქციონალით.',
      tags: ['News', 'Feed', 'CRUD'],
      action: () => dispatch(openAddNewsModal()),
      actionLabel: 'სტატიის დამატების ტესტირება',
    },
    {
      name: 'CityFormModal (Formik + Yup)',
      path: 'src/components/crud/CityFormModal.tsx',
      desc: 'ქალაქის ამინდის მონაცემების შეყვანა/რედაქტირება Formik-ით და Yup სქემით (ტემპერატურა, წნევა, ქარი).',
      tags: ['Formik', 'Yup', 'Validation', 'CRUD'],
      action: () => dispatch(openAddCityModal()),
      actionLabel: 'მოდალის გახსნა',
    },
    {
      name: 'CurrencyFormModal (Formik + Yup)',
      path: 'src/components/crud/CurrencyFormModal.tsx',
      desc: 'ვალუტის დამატება/რედაქტირება 3-ასოიანი კოდით, სიმბოლოთი და კურსის ვალიდაციით.',
      tags: ['Formik', 'Yup', 'Validation', 'CRUD'],
      action: () => dispatch(openAddCurrencyModal()),
      actionLabel: 'მოდალის გახსნა',
    },
    {
      name: 'NewsFormModal (Formik + Yup)',
      path: 'src/components/crud/NewsFormModal.tsx',
      desc: 'სტატიის დამატება/რედაქტირება სათაურის, კატეგორიის და სურათის ლინკის ვალიდაციით.',
      tags: ['Formik', 'Yup', 'Validation', 'CRUD'],
      action: () => dispatch(openAddNewsModal()),
      actionLabel: 'მოდალის გახსნა',
    },
    {
      name: 'ApiSettingsModal',
      path: 'src/components/crud/ApiSettingsModal.tsx',
      desc: 'Weather API Key-ს შეყვანა, პროვაიდერის არჩევა, JSON სარეზერვო ექსპორტი და ბაზის გადატვირთვა.',
      tags: ['API Key', 'Settings', 'Backup'],
      action: () => dispatch(setApiSettingsModalOpen(true)),
      actionLabel: 'მოდალის გახსნა',
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6 w-full">
      {/* ზედა საინფორმაციო ბანერი */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>გუნდური პროექტი • კომპონენტების არქიტექტურა</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Amindi.ge პორტალის კომპონენტების ბიბლიოთეკა
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              დამზადებულია შემდეგი სტეკით: <b>React, TypeScript, TailwindCSS, Redux Toolkit, Formik & Yup</b>. 
              ყველა კომპონენტი სრულად მოდულურია, იღებს მონაცემებს Redux Store-დან და უკავშირდება Live API-ს.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="amindi"
              size="md"
              leftIcon={<Play className="w-4 h-4 fill-current" />}
              onClick={() => dispatch(setViewMode('portal'))}
            >
              პორტალის ნახვა (Live UI)
            </Button>
          </div>
        </div>

        {/* ტაბების კონტროლერები */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('components')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'components'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            კომპონენტების სია ({componentsList.length})
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            სტეკი & არქიტექტურა
          </button>
          <button
            onClick={() => setActiveTab('state')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'state'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Redux State ინსპექტორი
          </button>
        </div>
      </div>

      {/* ტაბი 1: კომპონენტების სია */}
      {activeTab === 'components' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {componentsList.map((comp) => (
            <div
              key={comp.name}
              className="bg-white rounded-lg p-5 shadow-xs border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 font-mono flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-600" />
                    <span>&lt;{comp.name} /&gt;</span>
                  </h3>
                </div>

                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  {comp.path}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {comp.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {comp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {comp.action && (
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={comp.action}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {comp.actionLabel}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ტაბი 2: სტეკი და არქიტექტურა */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-sky-50 rounded-lg border border-sky-100">
              <div className="text-xs font-bold text-sky-900 uppercase">React 19 & TypeScript</div>
              <p className="text-xs text-sky-700 mt-1">
                სრულად ტიპიზირებული ინტერფეისები (`CityWeather`, `HourlyForecastItem`, `CurrencyRate`, `NewsItem`).
              </p>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="text-xs font-bold text-indigo-900 uppercase">Redux Toolkit</div>
              <p className="text-xs text-indigo-700 mt-1">
                4 ცალკეული სლაისი (`weather`, `currency`, `news`, `ui`) ასინქრონული თჰანკებით (`createAsyncThunk`).
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="text-xs font-bold text-emerald-900 uppercase">Formik & Yup</div>
              <p className="text-xs text-emerald-700 mt-1">
                CRUD ფორმების მართვა მკაცრი ვალიდაციით, შეცდომების ქართული ტექსტებით და რეაქტიული ველებით.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="text-xs font-bold text-amber-900 uppercase">API & ლოკალური ბაზა</div>
              <p className="text-xs text-amber-700 mt-1">
                Open-Meteo ცოცხალი ამინდის API + Custom API Key-ს მხარდაჭერა და localStorage პერსისტენცია.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-5 font-mono text-xs overflow-x-auto leading-relaxed">
            <div className="text-emerald-400 font-bold mb-2">// პროექტის სტრუქტურა და გუნდური განაწილება</div>
            <div>src/</div>
            <div>├── types/weather.types.ts       <span className="text-slate-400">// TypeScript მოდელები</span></div>
            <div>├── store/                       <span className="text-slate-400">// Redux Toolkit Store & Hooks</span></div>
            <div>│   ├── index.ts</div>
            <div>│   └── slices/ (weather, currency, news, ui)</div>
            <div>├── services/weatherApi.ts       <span className="text-slate-400">// API ინტეგრაცია (Open-Meteo + API Key)</span></div>
            <div>├── data/initialData.ts          <span className="text-slate-400">// ქართული ქალაქების საწყისი მონაცემები</span></div>
            <div>├── components/</div>
            <div>│   ├── layout/ (Header, BackgroundSky, Footer)</div>
            <div>│   ├── weather/ (CitySelectorBar, CurrentWeatherCard, HourlyForecast, DaysForecastTabs...)</div>
            <div>│   ├── widgets/ (CurrencyRatesCard, CurrencyConverter, RadioPalitraWidget, HotSale...)</div>
            <div>│   └── crud/ (CityFormModal, CurrencyFormModal, NewsFormModal, ApiSettingsModal)</div>
          </div>
        </div>
      )}

      {/* ტაბი 3: Redux State ინსპექტორი */}
      {activeTab === 'state' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-600" />
              <span>Redux Toolkit Store-ის მიმდინარე მონაცემები რეალურ დროში</span>
            </h3>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
              სინქრონიზებულია (Local Storage)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1">
                Weather Slice ({cities.length} ქალაქი, არჩეულია: {selectedCityId})
              </div>
              <pre className="bg-slate-900 text-sky-300 p-3 rounded text-[11px] font-mono h-64 overflow-y-auto">
                {JSON.stringify({ selectedCityId, citiesCount: cities.length, apiSettings, citiesSample: cities.map(c => ({ id: c.id, name: c.nameKa, temp: c.currentTemp })) }, null, 2)}
              </pre>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-700 mb-1">
                Currency & News Slices ({currencies.length} ვალუტა, {news.length} სიახლე)
              </div>
              <pre className="bg-slate-900 text-amber-300 p-3 rounded text-[11px] font-mono h-64 overflow-y-auto">
                {JSON.stringify({ currencies: currencies.map(c => ({ code: c.code, rateToday: c.rateToday, change: c.change })), converter, newsCount: news.length }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
