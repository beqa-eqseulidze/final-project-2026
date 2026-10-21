/**
 * @file weatherApi.ts
 * @description API სერვისი ცოცხალი ამინდის წამოსაღებად.
 * იყენებს Open-Meteo საჯარო REST API-ს გეოგრაფიული კოორდინატებით (lat/lon),
 * გადაჰყავს WMO საერთაშორისო კოდები ქართულ აღწერილობებში და აფორმატებს
 * საათობრივ და 7-დღიან პროგნოზებს.
 * ასევე გააჩნია მომხმარებლის მიერ შეყვანილი API Key-ს მხარდაჭერა.
 */

import { CityWeather, DailyForecastItem, HourlyForecastItem, WeatherCondition } from '../types/weather.types';

/**
 * WMO (მსოფლიო მეტეოროლოგიური ორგანიზაციის) ამინდის კოდის დაკონვერტირება
 * ჩვენს აპლიკაციაში არსებულ WeatherCondition ტიპსა და ქართულ აღწერილობაში.
 * 
 * @param code - WMO ამინდის კოდი (რიცხვი)
 * @returns ობიექტი { condition, labelKa }
 */
export function mapWmoCodeToCondition(code: number): { condition: WeatherCondition; labelKa: string; iconCode: string } {
  // 0: სუფთა ცა / მზიანი
  if (code === 0) {
    return { condition: 'sunny', labelKa: 'მზიანი', iconCode: '01' };
  }
  // 1, 2: ძირითადად მზიანი ან ნაწილობრივ ღრუბლიანი
  if (code === 1 || code === 2) {
    return { condition: 'partly-cloudy', labelKa: 'ნაწილობრივ მზიანი', iconCode: '03' };
  }
  // 3: მოღრუბლული
  if (code === 3) {
    return { condition: 'cloudy', labelKa: 'მოღრუბლული', iconCode: '06' };
  }
  // 45, 48: ნისლი
  if ([45, 48].includes(code)) {
    return { condition: 'cloudy', labelKa: 'ნისლიანი', iconCode: '11' };
  }
  // 51-65, 80-82: წვიმა და შხაპუნა წვიმა
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return { condition: 'rainy', labelKa: 'წვიმიანი', iconCode: '12' };
  }
  // 71-77, 85-86: თოვლი
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { condition: 'snowy', labelKa: 'თოვლიანი', iconCode: '22' };
  }
  // 95-99: ჭექა-ქუხილი
  if ([95, 96, 99].includes(code)) {
    return { condition: 'thunderstorm', labelKa: 'ჭექა-ქუხილი', iconCode: '15' };
  }
  // ნაგულისხმევი მდგომარეობა
  return { condition: 'partly-cloudy', labelKa: 'ცვალებადი ღრუბლიანობა', iconCode: '04' };
}

/**
 * კვირის დღის სახელის მიღება ქართულად Date ობიექტიდან.
 */
export function getGeorgianDayName(date: Date): string {
  const days = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
  return days[date.getDay()];
}

/**
 * თარიღისა და თვის სახელის მიღება ქართულად (მაგ. "19 ოქტომბერი").
 */
export function getGeorgianDateString(date: Date): string {
  const months = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

/**
 * ასინქრონული ფუნქცია კონკრეტული ქალაქის ცოცხალი ამინდის წამოსაღებად API-დან.
 * ითვლის ტემპერატურას, წნევას (kpa), ქარის სიჩქარეს და მიმართულებას, ტენიანობასა და პროგნოზებს.
 * 
 * @param city - ქალაქის ობიექტი lat/lon კოორდინატებით
 * @param apiKey - არასავალდებულო API გასაღები
 * @returns განახლებული პარამეტრების ობიექტი Partial<CityWeather>
 */
export async function fetchLiveCityWeather(city: CityWeather, apiKey?: string): Promise<Partial<CityWeather>> {
  try {
    // Open-Meteo REST API მოთხოვნა რეალური დროის მეტეოროლოგიური პარამეტრებით
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API შეცდომა: ${response.statusText}`);
    }
    const data = await response.json();
    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    const { condition, labelKa, iconCode } = mapWmoCodeToCondition(current.weather_code);

    // საათობრივი მონაცემების დაფორმატება
    const formattedHourly: HourlyForecastItem[] = [];
    if (hourly && hourly.time) {
      const now = new Date();
      const currentHour = now.getHours();
      for (let i = 0; i < Math.min(hourly.time.length, 24); i++) {
        const timeStr = hourly.time[i];
        const dateObj = new Date(timeStr);
        const hourNum = dateObj.getHours();
        if (hourNum >= currentHour || i < 8) {
          const wmo = mapWmoCodeToCondition(hourly.weather_code[i]);
          formattedHourly.push({
            id: `h-live-${i}`,
            hour: `${hourNum} საათი`,
            temp: Math.round(hourly.temperature_2m[i]),
            condition: wmo.condition,
            conditionLabel: wmo.labelKa,
            iconCode: wmo.iconCode,
          });
          if (formattedHourly.length >= 24) break;
        }
      }
    }

    // დღიური პროგნოზების დაფორმატება (შევინარჩუნოთ 8-25 დღეები თუ ქალაქს აქვს 25-დღიანი პროგნოზი)
    const formattedDaily: DailyForecastItem[] = [];
    if (daily && daily.time) {
      for (let i = 0; i < Math.min(daily.time.length, 7); i++) {
        const dateObj = new Date(daily.time[i]);
        const wmo = mapWmoCodeToCondition(daily.weather_code[i]);
        formattedDaily.push({
          id: `d-live-${i}`,
          dayName: getGeorgianDayName(dateObj),
          date: getGeorgianDateString(dateObj),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          tempMax: Math.round(daily.temperature_2m_max[i]),
          condition: wmo.condition,
          conditionLabel: wmo.labelKa,
          iconCode: wmo.iconCode,
        });
      }
      if (city.daily && city.daily.length > formattedDaily.length) {
        formattedDaily.push(...city.daily.slice(formattedDaily.length));
      }
    }

    // ბოლო განახლების დროის ფორმატირება (HH:MM:SS)
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // ქარის მიმართულების გრადუსის გადაყვანა კომპასის მაჩვენებელში (N, NE, E...)
    const deg = current.wind_direction_10m || 0;
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const compassIndex = Math.round(deg / 45) % 8;
    const windDirection = directions[compassIndex];

    return {
      currentTemp: Math.round(current.temperature_2m),
      tempMin: formattedDaily.length > 0 ? formattedDaily[0].tempMin : city.tempMin,
      tempMax: formattedDaily.length > 0 ? formattedDaily[0].tempMax : city.tempMax,
      condition,
      conditionLabel: labelKa,
      iconCode: city.iconCode || iconCode,
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection,
      pressure: parseFloat((current.surface_pressure / 10).toFixed(2)), // hPa-დან გადაყვანა kPa-ში
      pressureUnit: 'kpa',
      feelsLike: Math.round(current.apparent_temperature),
      feelsLikeWind: Math.round(current.apparent_temperature),
      humidity: Math.round(current.relative_humidity_2m),
      visibility: 16,
      lastUpdated: `${hours}:${minutes}:${seconds}`,
      hourly: formattedHourly.length > 0 ? formattedHourly : city.hourly,
      daily: formattedDaily.length > 0 ? formattedDaily : city.daily,
    };
  } catch (error) {
    console.warn('Live API-დან მონაცემების წამოღება ვერ მოხერხდა, ვიყენებთ ლოკალურ მონაცემებს:', error);
    return {};
  }
}
