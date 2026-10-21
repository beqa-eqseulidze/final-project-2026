/**
 * @file weather.types.ts
 * @description TypeScript ინტერფეისები და ტიპები ამინდის პორტალისთვის.
 * განსაზღვრავს ქალაქების, საათობრივი და დღიური პროგნოზების, ვალუტის კურსების,
 * სიახლეებისა და API პარამეტრების მონაცემთა სტრუქტურას.
 */

/** ამინდის შესაძლო მდგომარეობების ტიპი */
export type WeatherCondition =
  | 'sunny'          // მზიანი
  | 'partly-cloudy'   // ნაწილობრივ მზიანი / ცვალებადი
  | 'cloudy'         // მოღრუბლული
  | 'rainy'          // წვიმიანი
  | 'thunderstorm'   // ჭექა-ქუხილი
  | 'snowy'          // თოვლიანი
  | 'windy';         // ქარიანი

/** საათობრივი პროგნოზის ელემენტის ინტერფეისი */
export interface HourlyForecastItem {
  id: string;              // უნიკალური იდენტიფიკატორი
  hour: string;            // საათი (მაგ. "18 საათი" ან "18:00")
  temp: number;            // ტემპერატურა ცელსიუსში
  condition: WeatherCondition; // ამინდის ტიპი
  conditionLabel: string;  // ქართული აღწერილობა (მაგ. "ნაწილობრივ ღრუბლიანი")
  iconCode?: string;       // amindi.ge-ს ხატულის კოდი (მაგ. "39", "07", "06", "12")
  pop?: number;            // ნალექის ალბათობა (%)
}

/** დღიური პროგნოზის ელემენტის ინტერფეისი */
export interface DailyForecastItem {
  id: string;              // უნიკალური იდენტიფიკატორი
  dayName: string;         // კვირის დღე (მაგ. "ორშაბათი")
  date: string;            // თარიღი (მაგ. "19 ოქტომბერი")
  tempMin: number;         // მინიმალური ტემპერატურა
  tempMax: number;         // მაქსიმალური ტემპერატურა
  condition: WeatherCondition; // ამინდის ტიპი
  conditionLabel: string;  // ქართული აღწერა (მაგ. "მზიანი")
  iconCode?: string;       // amindi.ge-ს ხატულის კოდი (მაგ. "17", "12", "14", "05")
}

/** ქალაქის ამინდის სრული მონაცემთა მოდელი (გამოიყენება Redux-სა და CRUD-ში) */
export interface CityWeather {
  id: string;              // ქალაქის იდენტიფიკატორი (მაგ. "tbilisi", "batumi")
  nameKa: string;          // სახელი ქართულად (მაგ. "თბილისი")
  nameEn: string;          // სახელი ინგლისურად (მაგ. "Tbilisi")
  region?: string;         // რეგიონი/მხარე (მაგ. "ქართლი", "აჭარა")
  isForeign?: boolean;     // უცხოეთის ქალაქია თუ საქართველოსი
  lat: number;             // გეოგრაფიული განედი API-სთვის
  lon: number;             // გეოგრაფიული გრძედი API-სთვის
  currentTemp: number;     // მიმდინარე ტემპერატურა (°C)
  tempMin: number;         // დღის მინიმალური ტემპერატურა
  tempMax: number;         // დღის მაქსიმალური ტემპერატურა
  condition: WeatherCondition; // ამინდის ტიპი ხატულისთვის
  conditionLabel: string;  // მდგომარეობის ტექსტი ქართულად
  iconCode?: string;       // amindi.ge-ს მთავარი ხატულის კოდი (მაგ. "38", "01", "36")
  bgImage?: string;        // amindi.ge-ს ფონის სურათი (მაგ. "sun2.jpg", "bg/clouds_night2.jpg")
  windSpeed: number;       // ქარის სიჩქარე (კმ/სთ)
  windDirection: string;   // ქარის მიმართულება (მაგ. "NW", "ჩრ-დას")
  pressure: number;        // ატმოსფერული წნევა
  pressureUnit: string;    // წნევის ერთეული (მაგ. "kpa")
  feelsLike: number;       // ტემპერატურის მგრძნობელობა (°C)
  feelsLikeWind: number;   // ქარში მგრძნობელობა (°C)
  humidity: number;        // ჰაერის ტენიანობა (%)
  visibility: number;      // ხილვადობა (კმ)
  lastUpdated: string;     // ბოლო განახლების დრო ("17:23:40")
  hourly: HourlyForecastItem[]; // საათობრივი მონაცემების სია
  daily: DailyForecastItem[];   // დღიური მონაცემების სია
  isCustom?: boolean;      // მიუთითებს, რომ ქალაქი მომხმარებელმა დაამატა CRUD-ით
}

/** ეროვნული ბანკის ვალუტის კურსის ინტერფეისი */
export interface CurrencyRate {
  id: string;              // იდენტიფიკატორი (მაგ. "usd")
  code: string;            // ვალუტის საერთაშორისო კოდი ("USD", "EUR", "RUB")
  nameKa: string;          // დასახელება ქართულად ("აშშ დოლარი")
  multiplier: number;      // ერთეული (1 ან 100)
  rateToday: number;       // დღევანდელი ოფიციალური კურსი ლარში
  rateYesterday: number;   // გუშინდელი კურსი
  change: number;          // ცვლილება პროცენტებში (+0.41% ან -0.01%)
  symbol: string;          // ვალუტის სიმბოლო ($, €, ₾, ₽)
}

/** სიახლეების ელემენტის ინტერფეისი (პალიტრა ნიუსი) */
export interface NewsItem {
  id: string;              // უნიკალური ID
  title: string;           // სიახლის სათაური
  category: string;        // კატეგორია ("ამინდი", "საზოგადოება", "ეკონომიკა")
  time: string;            // გამოქვეყნების დრო ("17:15")
  imageUrl?: string;       // სურათის ბმული
  source: string;          // წყარო ("პალიტრა ნიუსი")
  link?: string;           // გარე ბმული
}

/** Hotsale-ის ფასდაკლების ბარათის ინტერფეისი */
export interface HotSaleItem {
  id: string;
  title: string;           // შეთავაზების სათაური
  hotelName: string;       // სასტუმროს სახელი
  location: string;        // ლოკაცია (მაგ. "ბორჯომი", "თელავი")
  description: string;     // აღწერა
  oldPrice: number;        // ძველი ფასი
  newPrice: number;        // ფასდაკლებული ფასი
  currency: string;        // ვალუტა (₾)
  imageUrl: string;        // სასტუმროს ფოტოსურათი
}

/** API პარამეტრების ინტერფეისი */
export interface ApiSettings {
  apiKey: string;          // მომხმარებლის მიერ შეყვანილი API გასაღები
  provider: 'open-meteo' | 'openweathermap' | 'custom'; // პროვაიდერი
  customEndpointUrl?: string; // პირადი ბექენდის მისამართი
  useLiveApi: boolean;     // ცოცხალი API-ს ჩართვა/გამორთვა
  autoRefreshInterval: number; // განახლების ინტერვალი წუთებში
}
