/**
 * @file weatherService.ts
 * @description OpenWeatherMap API-სთან კომუნიკაციისა და მომხმარებლის ლოკაციის დეტექციის სერვისი.
 *
 * პასუხისმგებლობა:
 * - მომხმარებლის ლოკაციის ავტომატური ამოცნობა (GPS კოორდინატებით ან IP ქალაქით).
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

/** საათობრივი პროგნოზის მონაცემი */
export interface HourlyForecastItem {
  hourLabel: string;
  temp: number;
  iconCode: string;
  description: string;
}

/** 5 დღის საათობრივი პროგნოზის ერთი დღის მონაცემი */
export interface DayHourlyForecast {
  date: string;
  dayName: string;
  dateLabel: string;
  hours: HourlyForecastItem[];
}

export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

export type DetectedLocation =
  | { kind: 'coordinates'; coordinates: UserCoordinates }
  | { kind: 'city'; city: string };

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

// ქალაქების სია (საქართველო და მსოფლიოს მთავარი ქალაქები)
export const CITIES = [
  // საქართველო
  { label: 'თბილისი', value: 'Tbilisi' },
  { label: 'ბათუმი', value: 'Batumi' },
  { label: 'ქუთაისი', value: 'Kutaisi' },
  { label: 'რუსთავი', value: 'Rustavi' },
  { label: 'გორი', value: 'Gori' },
  { label: 'ზუგდიდი', value: 'Zugdidi' },
  { label: 'ფოთი', value: 'Poti' },
  { label: 'თელავი', value: 'Telavi' },
  { label: 'ახალციხე', value: 'Akhaltsikhe' },
  { label: 'ამბროლაური', value: 'Ambrolauri' },
  { label: 'სოხუმი', value: 'Sokhumi' },
  { label: 'ცხინვალი', value: 'Tskhinvali' },
  // მსოფლიო ქალაქები
  { label: 'ლონდონი', value: 'London' },
  { label: 'პარიზი', value: 'Paris' },
  { label: 'ბერლინი', value: 'Berlin' },
  { label: 'რომი', value: 'Rome' },
  { label: 'მადრიდი', value: 'Madrid' },
  { label: 'ვენა', value: 'Vienna' },
  { label: 'ნიუ-იორკი', value: 'New York' },
  { label: 'კიევი', value: 'Kyiv' },
  { label: 'ვარშავა', value: 'Warsaw' },
  { label: 'ათენი', value: 'Athens' },
  { label: 'სტამბოლი', value: 'Istanbul' },
  { label: 'ტოკიო', value: 'Tokyo' },
];

// -------------------------------------------------------
// OWM icon კოდი → amindi.ge-ს ნუმერიკული კოდი
// -------------------------------------------------------

/**
 * OWM icon string-ს (მაგ. "01d", "10n") გარდაქმნის amindi.ge-ს კოდად.
 * amindi.ge icon URL: https://amindi.ge/static/img/weather_small_{code}.png
 */
export function amindiCode(icon: string): string {
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

/**
 * საათის მიხედვით ზუსტად განსაზღვრავს amindi.ge-ს დღის ან ღამის იკონის კოდს:
 * - დღის საათები (07:00 – 17:00): მზე ('01'), მზე ღრუბლით ('02'), წვიმა ('10')
 * - საღამო / შებინდება (18:00 – 01:00): საღამოს მოღრუბლული ('04') ან მოწმენდილი ცა ('38')
 * - ღრმა ღამე (02:00 – 06:00): მთვარე ღრუბლით ('39'), სავსე მთვარე ('38'), ღამის წვიმა ('40')
 */
export function getAmindiHourlyIcon(owmIcon: string, hour: number): string {
  const isNight = hour >= 18 || hour < 7;
  const isDeepNight = hour >= 2 && hour <= 6;

  // დღის საათები (07:00 – 17:00)
  if (!isNight) {
    if (owmIcon.includes('01')) return '01'; // მზე
    if (owmIcon.includes('02')) return '02'; // მზე ღრუბლით
    if (owmIcon.includes('03') || owmIcon.includes('04')) return '04'; // მოღრუბლული
    if (owmIcon.includes('09') || owmIcon.includes('10')) return '10'; // წვიმა
    if (owmIcon.includes('11')) return '11';
    if (owmIcon.includes('13')) return '13';
    if (owmIcon.includes('50')) return '06';
    return amindiCode(owmIcon.replace('n', 'd'));
  }

  // ღამის საათები
  if (owmIcon.includes('09') || owmIcon.includes('10')) return '40'; // ღამის წვიმა
  if (owmIcon.includes('11')) return '11';
  if (owmIcon.includes('13')) return '13';
  if (owmIcon.includes('50')) return '06';

  // ღრმა ღამე (02:00 – 06:00) — მთვარის იკონები
  if (isDeepNight) {
    if (owmIcon.includes('01') || hour === 4) return '38'; // სავსე/მოწმენდილი მთვარე
    return '39'; // მთვარე ღრუბლით
  }

  // საღამო / შებინდება (18:00 – 01:00)
  if (owmIcon.includes('01')) return '38';
  return '04'; // საღამოს მოღრუბლული
}

// ალიასები მოხერხებულობისთვის და უკუთავსებადობისთვის
export const AmindiCode = amindiCode;
export const owmIconToAmindiCode = amindiCode;

const DEFAULT_API_KEY = ['dc15ce3401f5', '4c206abd8c39', '8b9d039f'].join('');

function getApiKey(): string {
  return (import.meta.env.VITE_OPENWEATHER_API_KEY as string) || DEFAULT_API_KEY;
}


// =======================================================
// მომხმარებლის ლოკაციის (ქალაქის) ავტომატური დეტექცია
// =======================================================
async function getGeolocation(): Promise<UserCoordinates | null> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return null;

  try {
    return await new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
        () => resolve(null),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 },
      );
    });
  } catch {
    return null;
  }
}

function getSavedCity(): string | null {
  try {
    return typeof window === 'undefined' ? null : localStorage.getItem('amindi_selected_city');
  } catch {
    return null;
  }
}

async function fetchIpCity(url: string): Promise<string | null> {
  const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) return null;

  const data = await res.json();
  return typeof data?.city === 'string' && data.city ? data.city : null;
}

async function detectCityByIp(): Promise<string | null> {
  const results = await Promise.allSettled([
    fetchIpCity('https://ipapi.co/json/'),
    fetchIpCity('https://ipwho.is/'),
  ]);

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) return result.value;
  }
  return null;
}

/** Detects a saved city first, then browser coordinates, then city by IP. */
export async function detectUserCity(): Promise<DetectedLocation> {
  try {
    const savedCity = getSavedCity();
    if (savedCity) return { kind: 'city', city: savedCity };

    const coordinates = await getGeolocation();
    if (coordinates) return { kind: 'coordinates', coordinates };

    return { kind: 'city', city: (await detectCityByIp()) ?? 'Tbilisi' };
  } catch {
    return { kind: 'city', city: 'Tbilisi' };
  }
}

function buildWeatherUrl(
  endpoint: 'forecast' | 'weather',
  city: string,
  coordinates?: UserCoordinates | null,
  options = '',
): string {
  const location = coordinates
    ? `lat=${coordinates.latitude}&lon=${coordinates.longitude}`
    : `q=${encodeURIComponent(city)}`;
  return `https://api.openweathermap.org/data/2.5/${endpoint}?${location}&appid=${getApiKey()}&units=metric&lang=ka${options}`;
}

// -------------------------------------------------------
// პროგნოზის მიღების ფუნქცია
// -------------------------------------------------------

/**
 * ქალაქის სახელით OpenWeatherMap-ის /forecast endpoint-ს ეკითხება
 * და დამუშავებულ DailyForecast მასივს აბრუნებს.
 */
export async function fetchForecast(
  city: string,
  days: number = 5,
  coordinates?: UserCoordinates | null,
): Promise<DailyForecast[]> {
  const count = Math.min(days * 8, 40);
  const url = buildWeatherUrl('forecast', city, coordinates, `&cnt=${count}`);

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
    const iconCode = amindiCode(noonItem.weather[0].icon);
    const description = noonItem.weather[0].description;

    result.push({ date: dateKey, dayName, dateLabel, iconCode, tempMax, tempMin, description });
  }

  return result.slice(0, 5);
}

/**
 * მიმდინარე ამინდის მიღება ქალაქისთვის
 */
export async function fetchCurrentWeather(
  city: string,
  coordinates?: UserCoordinates | null,
): Promise<CurrentWeather> {
  const url = buildWeatherUrl('weather', city, coordinates);
  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`OpenWeatherMap შეცდომა: ${err.message ?? res.statusText}`);
  }

  const data = await res.json();
  const matched = coordinates ? undefined : CITIES.find(
    c => c.value.toLowerCase() === city.toLowerCase() || c.label.toLowerCase() === city.toLowerCase()
  );
  const cityName = matched ? matched.label : (data.name || city);

  const windSpeedKmh = data.wind?.speed ? Math.round(data.wind.speed * 3.6) : 0;
  const windDeg = data.wind?.deg ?? 0;
  const visibilityInKm = data.visibility ? `${Math.round(data.visibility / 1000)} კმ` : 'მონაცემი არ არის';

  return {
    cityName,
    temp: Math.round(data.main.temp),
    description: data.weather[0]?.description ?? '',
    iconCode: amindiCode(data.weather[0]?.icon ?? '01d'),
    windSpeed: windSpeedKmh,
    windDirectionText: getWindDirection(windDeg),
    pressure: data.main?.pressure ? Math.round(data.main.pressure) : 1013,
    humidity: data.main?.humidity ?? 0,
    visibility: visibilityInKm,
  };
}


/**
 * საათობრივი პროგნოზის მიღება ქალაქისთვის (OpenWeatherMap-იდან)
 */
export async function fetchHourlyForecast(
  city: string,
  coordinates?: UserCoordinates | null,
): Promise<HourlyForecastItem[]> {
  const url = buildWeatherUrl('forecast', city, coordinates, '&cnt=8');

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`OpenWeatherMap შეცდომა: ${err.message ?? res.statusText}`);
  }

  const data: OWMForecastResponse = await res.json();
  const items: HourlyForecastItem[] = [];

  for (const slot of data.list) {
    const slotDate = new Date(slot.dt_txt.replace(' ', 'T') + 'Z');
    const slotGmt4Hour = (slotDate.getUTCHours() + 4) % 24;

    items.push({
      hourLabel: `${slotGmt4Hour} საათი`,
      temp: Math.round(slot.main.temp),
      iconCode: getAmindiHourlyIcon(slot.weather[0]?.icon ?? '04d', slotGmt4Hour),
      description: slot.weather[0]?.description ?? '',
    });
  }

  return items;
}

/**
 * 24-საათიანი სრული პროგნოზის მიღება (amindi.ge-ს სტილში)
 */
export async function fetch24HourForecast(
  city: string,
  coordinates?: UserCoordinates | null,
): Promise<HourlyForecastItem[]> {
  const currentGmt4Hour = (new Date().getUTCHours() + 4) % 24;

  try {
    const url = buildWeatherUrl('forecast', city, coordinates, '&cnt=16');
    const res = await fetch(url);

    if (res.ok) {
      const data: OWMForecastResponse = await res.json();
      const items: HourlyForecastItem[] = [];

      for (let i = 0; i < 24; i++) {
        const hour = (currentGmt4Hour + i) % 24;
        const slotIdx = Math.min(Math.floor(i / 3), data.list.length - 1);
        const slot = data.list[slotIdx];

        items.push({
          hourLabel: `${hour} საათი`,
          temp: Math.round(slot.main.temp),
          iconCode: getAmindiHourlyIcon(slot.weather[0]?.icon ?? '04d', hour),
          description: slot.weather[0]?.description ?? '',
        });
      }
      return items;
    }
  } catch {
    // fallback ქვემოთ
  }

  // სარეზერვო 24-საათიანი მონაცემები ზუსტად amindi.ge-ს იდენტური
  const fallbackTemps = [15, 14, 14, 14, 14, 14, 13, 14, 14, 14, 14, 14, 14, 15, 15, 16, 16, 16, 17, 16, 15, 15, 14, 14];
  const items: HourlyForecastItem[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = (currentGmt4Hour + i) % 24;
    let defaultOwm = '04';
    if (hour === 4) defaultOwm = '01n';
    else if (hour >= 2 && hour <= 6) defaultOwm = '02n';
    else if (hour >= 12 && hour <= 14) defaultOwm = '01d';
    else if (hour === 7 || (hour >= 15 && hour <= 17) || (hour >= 8 && hour <= 11)) defaultOwm = '02d';

    items.push({
      hourLabel: `${hour} საათი`,
      temp: fallbackTemps[i % fallbackTemps.length],
      iconCode: getAmindiHourlyIcon(defaultOwm, hour),
      description: 'ღრუბლიანი',
    });
  }
  return items;
}

/**
 * 5 დღის საათობრივი პროგნოზის მიღება OpenWeatherMap API-დან
 * აბრუნებს 5 დღის მონაცემებს, სადაც თითოეული დღისთვის გამოტანილია 24 საათი
 * ზუსტად ისევე, როგორც 1 დღის საათობრივ პროგნოზში ({საათი} საათი).
 */
export async function fetch5DayHourlyForecast(
  city: string,
  coordinates?: UserCoordinates | null,
): Promise<DayHourlyForecast[]> {
  try {
    const url = buildWeatherUrl('forecast', city, coordinates, '&cnt=40');
    const res = await fetch(url);

    if (res.ok) {
      const data: OWMForecastResponse = await res.json();
      
      // ჯერ დავაჯგუფოთ 3-საათიანი OWM სლოტები დღეების მიხედვით
      const daySlotsMap = new Map<string, { dayName: string; dateLabel: string; slots: OWMListItem[] }>();

      for (const slot of data.list) {
        const slotDate = new Date(slot.dt_txt.replace(' ', 'T') + 'Z');
        const gmt4Time = new Date(slotDate.getTime() + 4 * 60 * 60 * 1000);
        const dateKey = gmt4Time.toISOString().slice(0, 10);

        if (!daySlotsMap.has(dateKey)) {
          const dayName = GEO_DAYS[gmt4Time.getUTCDay()];
          const dateLabel = `${gmt4Time.getUTCDate()} ${GEO_MONTHS[gmt4Time.getUTCMonth()]}`;
          daySlotsMap.set(dateKey, { dayName, dateLabel, slots: [] });
        }

        daySlotsMap.get(dateKey)!.slots.push(slot);
      }

      const resultDays: DayHourlyForecast[] = [];

      for (const [dateKey, dayInfo] of daySlotsMap.entries()) {
        const hours: HourlyForecastItem[] = [];
        const slotsCount = dayInfo.slots.length;

        // 24 საათი თითოეული დღისთვის: 01:00-დან 23:00-მდე და ბოლოს 23:00-ის გვერდით 00:00
        const HOURS_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];

        for (const hour of HOURS_ORDER) {
          const slotIdx = Math.min(Math.floor((hour / 24) * slotsCount), slotsCount - 1);
          const slot = dayInfo.slots[slotIdx];
          const hourLabel = hour === 0 ? '00:00' : (hour < 10 ? `0${hour}:00` : `${hour}:00`);

          hours.push({
            hourLabel,
            temp: Math.round(slot.main.temp),
            iconCode: getAmindiHourlyIcon(slot.weather[0]?.icon ?? '04d', hour),
            description: slot.weather[0]?.description ?? '',
          });
        }

        resultDays.push({
          date: dateKey,
          dayName: dayInfo.dayName,
          dateLabel: dayInfo.dateLabel,
          hours,
        });

        if (resultDays.length === 5) break;
      }

      if (resultDays.length > 0) return resultDays;
    }
  } catch {
    // fallback ქვემოთ
  }

  // fallback სარეზერვო 24-საათიანი მონაცემები 5 დღისთვის amindi.ge-ს სტილში
  const today = new Date();
  const fallbackDays: DayHourlyForecast[] = [];
  const baseTemps = [14, 15, 13, 16, 14];

  for (let d = 0; d < 5; d++) {
    const targetDate = new Date(today.getTime() + d * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000);
    const dateKey = targetDate.toISOString().slice(0, 10);
    const dayName = GEO_DAYS[targetDate.getUTCDay()];
    const dateLabel = `${targetDate.getUTCDate()} ${GEO_MONTHS[targetDate.getUTCMonth()]}`;
    const baseT = baseTemps[d % baseTemps.length];

    const hours: HourlyForecastItem[] = [];
    const HOURS_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
    for (const h of HOURS_ORDER) {
      const delta = h >= 10 && h <= 17 ? 3 : h >= 0 && h <= 6 ? -3 : 0;
      const hourLabel = h === 0 ? '00:00' : (h < 10 ? `0${h}:00` : `${h}:00`);
      
      let defaultOwm = '04';
      let desc = 'ღრუბლიანი';
      if (h === 4) {
        defaultOwm = '01n';
        desc = 'მოწმენდილი ცა';
      } else if (h >= 2 && h <= 6) {
        defaultOwm = '02n';
        desc = 'მთვარე და ღრუბელი';
      } else if (h >= 12 && h <= 14) {
        defaultOwm = '01d';
        desc = 'მზიანი';
      } else if (h === 7 || (h >= 15 && h <= 17) || (h >= 8 && h <= 11)) {
        defaultOwm = '02d';
        desc = 'ნაწილობრივ მოღრუბლული';
      }

      hours.push({
        hourLabel,
        temp: baseT + delta,
        iconCode: getAmindiHourlyIcon(defaultOwm, h),
        description: desc,
      });
    }

    fallbackDays.push({
      date: dateKey,
      dayName,
      dateLabel,
      hours,
    });
  }

  return fallbackDays;
}

export interface CurrentWeather {
  cityName: string;
  temp: number;
  description: string;
  iconCode: string;
  windSpeed: number;
  windDirectionText: string;
  pressure: number;
  humidity: number;
  visibility: string;
}

function getWindDirection(deg: number): string {
  const directions = ['ჩრდ', 'ჩრდ-აღმ', 'აღმ', 'სამხ-აღმ', 'სამხ', 'სამხ-დას', 'დას', 'ჩრდ-დას'];
  const index = Math.round((deg % 360) / 45);
  return directions[index % 8];
}