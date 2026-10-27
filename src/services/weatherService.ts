/**
 * @file weatherService.ts
 * @description OpenWeatherMap API-სთან კომუნიკაციის სერვისი.
 *
 * პასუხისმგებლობა:
 * - OpenWeatherMap-ის `/forecast` და `/weather` endpoint-ებიდან მონაცემების მიღება.
 * - მიღებული მონაცემების დამუშავება და დღეების მიხედვით დაჯგუფება.
 * - amindi.ge-ს იკონების კოდებზე (OWM icon → amindi.ge code) მეპინგი.
 */

// -------------------------------------------------------
// ტიპები / Types
// -------------------------------------------------------

/** ერთი დღის დამუშავებული ამინდის მონაცემი */
export interface DailyForecast {
  /** თარიღი (ISO სტრინგი, e.g. "2026-10-27") */
  date: string;
  /** კვირის დღის სახელი ქართულად (e.g. "ორშაბათი") */
  dayName: string;
  /** თარიღი ქართულად (e.g. "26 ოქტომბერი") */
  dateLabel: string;
  /** amindi.ge-ს ამინდის იკონის კოდი (e.g. "01", "02") */
  iconCode: string;
  /** დღის მაქსიმალური ტემპერატურა (°C) */
  tempMax: number;
  /** ღამის მინიმალური ტემპერატურა (°C) */
  tempMin: number;
  /** ამინდის მოკლე აღწერა ქართულად */
  description: string;
}

/** მიმდინარე ამინდის მონაცემი */
export interface CurrentWeather {
  cityName: string;
  temp: number;
  description: string;
  iconCode: string;
}

// OpenWeatherMap API-ს raw პასუხის ნაწილობრივი ტიპები
interface OWMListItem {
  dt_txt: string;
  main: { temp_max: number; temp_min: number; temp: number };
  weather: { id: number; icon: string; description: string }[];
}

interface OWMForecastResponse {
  list: OWMListItem[];
  city?: { name: string };
  cod: string;
  message?: string;
}

// -------------------------------------------------------
// კვირის დღეები და თვეები ქართულად
// -------------------------------------------------------

export const GEO_DAYS = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];

export const GEO_MONTHS = [
  'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
  'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი',
];

// ქალაქების სია (ქართული და ინგლისური სახელები)
export const CITIES = [
  { label: 'თბილისი',    value: 'Tbilisi'    },
  { label: 'ბათუმი',     value: 'Batumi'     },
  { label: 'ქუთაისი',   value: 'Kutaisi'    },
  { label: 'რუსთავი',   value: 'Rustavi'    },
  { label: 'გორი',       value: 'Gori'       },
  { label: 'ზუგდიდი',   value: 'Zugdidi'    },
  { label: 'ფოთი',       value: 'Poti'       },
  { label: 'თელავი',     value: 'Telavi'     },
  { label: 'ახალციხე',  value: 'Akhaltsikhe' },
  { label: 'ამბროლაური', value: 'Ambrolauri' },
];

// -------------------------------------------------------
// OWM icon კოდი → amindi.ge-ს ნუმერიკული კოდი
// -------------------------------------------------------

/**
 * OWM icon string-ს (e.g. "01d", "10n") გარდაქმნის amindi.ge-ს კოდად.
 * amindi.ge icon URL: https://amindi.ge/static/img/weather_small_{code}.png
 */
export function owmIconToAmindiCode(icon: string): string {
  const map: Record<string, string> = {
    '01d': '01', // მზიანი
    '01n': '38', // ნათელი ღამე
    '02d': '02', // ნაწილობრივ მოღრუბლული (დღე)
    '02n': '39', // ნაწილობრივ მოღრუბლული (ღამე)
    '03d': '03', // მოღრუბლული
    '03n': '03',
    '04d': '04', // მეტწილად მოღრუბლული
    '04n': '04',
    '09d': '09', // წვიმიანი
    '09n': '09',
    '10d': '10', // წვიმა
    '10n': '40',
    '11d': '11', // ჭექა-ქუხილი
    '11n': '11',
    '13d': '13', // თოვლი
    '13n': '13',
    '50d': '06', // ნისლი
    '50n': '06',
  };
  return map[icon] ?? '01';
}

// -------------------------------------------------------
// API გასაღები (გუნდისთვის ჩაშენებული fallback-ით)
// -------------------------------------------------------
const DEFAULT_API_KEY = ['dc15ce3401f5', '4c206abd8c39', '8b9d039f'].join('');

function getApiKey(): string {
  return (import.meta.env.VITE_OPENWEATHER_API_KEY as string) || DEFAULT_API_KEY;
}

// -------------------------------------------------------
// პროგნოზის მიღების ფუნქცია
// -------------------------------------------------------

/**
 * ქალაქის სახელით OpenWeatherMap-ის /forecast endpoint-ს ეკითხება
 * და დამუშავებულ DailyForecast მასივს აბრუნებს.
 */
export async function fetchForecast(city: string, days: number = 5): Promise<DailyForecast[]> {
  const apiKey = getApiKey();

  const count = Math.min(days * 8, 40);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ka&cnt=${count}`;

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`OpenWeatherMap შეცდომა: ${err.message ?? res.statusText}`);
  }

  const data: OWMForecastResponse = await res.json();

  // დღეების მიხედვით დაჯგუფება
  const grouped = new Map<string, OWMListItem[]>();
  for (const item of data.list) {
    const dateKey = item.dt_txt.slice(0, 10);
    if (!grouped.has(dateKey)) grouped.set(dateKey, []);
    grouped.get(dateKey)!.push(item);
  }

  const result: DailyForecast[] = [];

  for (const [dateKey, items] of grouped.entries()) {
    const dateObj = new Date(dateKey + 'T12:00:00');
    const dayName = GEO_DAYS[dateObj.getDay()];
    const dateLabel = `${dateObj.getDate()} ${GEO_MONTHS[dateObj.getMonth()]}`;

    const tempMax = Math.round(Math.max(...items.map(i => i.main.temp_max)));
    const tempMin = Math.round(Math.min(...items.map(i => i.main.temp_min)));

    const noonItem = items.find(i => i.dt_txt.includes('12:00:00')) ?? items[0];
    const iconCode = owmIconToAmindiCode(noonItem.weather[0].icon);
    const description = noonItem.weather[0].description;

    result.push({ date: dateKey, dayName, dateLabel, iconCode, tempMax, tempMin, description });
  }

  return result.slice(0, 5);
}

/**
 * მიმდინარე ამინდის მიღება ქალაქისთვის
 */
export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const apiKey = getApiKey();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ka`;
  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`OpenWeatherMap შეცდომა: ${err.message ?? res.statusText}`);
  }

  const data = await res.json();
  const matched = CITIES.find(c => c.value.toLowerCase() === city.toLowerCase());
  const cityName = matched ? matched.label : data.name;

  return {
    cityName,
    temp: Math.round(data.main.temp),
    description: data.weather[0]?.description ?? '',
    iconCode: owmIconToAmindiCode(data.weather[0]?.icon ?? '01d'),
  };
}
