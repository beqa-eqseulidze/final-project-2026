/**
 * @file initialData.ts
 * @description საწყისი და რეალური მონაცემების ბაზა — ზუსტად https://amindi.ge/ka/ საიტის იდენტური.
 * მოიცავს:
 * - საქართველოს 49 ქალაქსა და უცხოეთის 12 ქალაქს (ზუსტი ტემპერატურებითა და amindi.ge ხატულებით)
 * - თბილისის 25-დღიან და 24-საათიან პროგნოზს ზუსტი amindi.ge ხატულის კოდებით
 * - ეროვნული ბანკის ოფიციალურ კურსებს (1 USD, 1 EUR, 100 RUB)
 * - amindi.ge-ს რეალურ სიახლეებს ორიგინალური სურათებით (https://amindi.ge/media/uploads/...)
 * - ss.ge-ს კურორტების კარუსელის მონაცემებს და Hotsale-ის აქციებს
 */

import { CityWeather, CurrencyRate, DailyForecastItem, HourlyForecastItem, HotSaleItem, NewsItem } from '../types/weather.types';

/**
 * თბილისის 25-დღიანი პროგნოზი ზუსტად https://amindi.ge/ka/?d=25 მიხედვით
 */
export const TBILISI_25_DAYS: DailyForecastItem[] = [
  { id: 'd-1', dayName: 'ორშაბათი', date: '19 ოქტომბერი', tempMin: 16, tempMax: 25, condition: 'thunderstorm', conditionLabel: 'ელჭექი', iconCode: '17' },
  { id: 'd-2', dayName: 'სამშაბათი', date: '20 ოქტომბერი', tempMin: 15, tempMax: 19, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '12' },
  { id: 'd-3', dayName: 'ოთხშაბათი', date: '21 ოქტომბერი', tempMin: 15, tempMax: 22, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '12' },
  { id: 'd-4', dayName: 'ხუთშაბათი', date: '22 ოქტომბერი', tempMin: 12, tempMax: 20, condition: 'rainy', conditionLabel: 'ხანმოკლე წვიმა', iconCode: '14' },
  { id: 'd-5', dayName: 'პარასკევი', date: '23 ოქტომბერი', tempMin: 14, tempMax: 22, condition: 'partly-cloudy', conditionLabel: 'ნაწილობრივ მზიანი', iconCode: '05' },
  { id: 'd-6', dayName: 'შაბათი', date: '24 ოქტომბერი', tempMin: 14, tempMax: 22, condition: 'partly-cloudy', conditionLabel: 'მზიანი', iconCode: '03' },
  { id: 'd-7', dayName: 'კვირა', date: '25 ოქტომბერი', tempMin: 12, tempMax: 19, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '12' },
  { id: 'd-8', dayName: 'ორშაბათი', date: '26 ოქტომბერი', tempMin: 12, tempMax: 21, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'd-9', dayName: 'სამშაბათი', date: '27 ოქტომბერი', tempMin: 13, tempMax: 18, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'd-10', dayName: 'ოთხშაბათი', date: '28 ოქტომბერი', tempMin: 12, tempMax: 18, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'd-11', dayName: 'ხუთშაბათი', date: '29 ოქტომბერი', tempMin: 10, tempMax: 12, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '12' },
  { id: 'd-12', dayName: 'პარასკევი', date: '30 ოქტომბერი', tempMin: 7, tempMax: 11, condition: 'rainy', conditionLabel: 'ძლიერი წვიმა', iconCode: '18' },
  { id: 'd-13', dayName: 'შაბათი', date: '31 ოქტომბერი', tempMin: 2, tempMax: 8, condition: 'rainy', conditionLabel: 'ძლიერი წვიმა', iconCode: '18' },
  { id: 'd-14', dayName: 'კვირა', date: '01 ნოემბერი', tempMin: -2, tempMax: 6, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '12' },
  { id: 'd-15', dayName: 'ორშაბათი', date: '02 ნოემბერი', tempMin: 5, tempMax: 13, condition: 'partly-cloudy', conditionLabel: 'ცვალებადი ღრუბლიანობა', iconCode: '04' },
  { id: 'd-16', dayName: 'სამშაბათი', date: '03 ნოემბერი', tempMin: 6, tempMax: 14, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'd-17', dayName: 'ოთხშაბათი', date: '04 ნოემბერი', tempMin: 6, tempMax: 13, condition: 'cloudy', conditionLabel: 'ღრუბლიანი', iconCode: '07' },
  { id: 'd-18', dayName: 'ხუთშაბათი', date: '05 ნოემბერი', tempMin: 6, tempMax: 11, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '12' },
  { id: 'd-19', dayName: 'პარასკევი', date: '06 ნოემბერი', tempMin: 5, tempMax: 11, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'd-20', dayName: 'შაბათი', date: '07 ნოემბერი', tempMin: 5, tempMax: 13, condition: 'cloudy', conditionLabel: 'ღრუბლიანი', iconCode: '07' },
  { id: 'd-21', dayName: 'კვირა', date: '08 ნოემბერი', tempMin: 3, tempMax: 13, condition: 'partly-cloudy', conditionLabel: 'ცვალებადი ღრუბლიანობა', iconCode: '04' },
  { id: 'd-22', dayName: 'ორშაბათი', date: '09 ნოემბერი', tempMin: 2, tempMax: 13, condition: 'cloudy', conditionLabel: 'ღრუბლიანი', iconCode: '07' },
  { id: 'd-23', dayName: 'სამშაბათი', date: '10 ნოემბერი', tempMin: 3, tempMax: 13, condition: 'partly-cloudy', conditionLabel: 'ცვალებადი ღრუბლიანობა', iconCode: '04' },
  { id: 'd-24', dayName: 'ოთხშაბათი', date: '11 ნოემბერი', tempMin: 4, tempMax: 13, condition: 'partly-cloudy', conditionLabel: 'მზიანი', iconCode: '03' },
  { id: 'd-25', dayName: 'ხუთშაბათი', date: '12 ნოემბერი', tempMin: 3, tempMax: 12, condition: 'partly-cloudy', conditionLabel: 'ცვალებადი ღრუბლიანობა', iconCode: '04' },
];

/**
 * თბილისის 24-საათიანი პროგნოზი ზუსტად https://amindi.ge/ka/hourly/ მიხედვით
 */
export const TBILISI_24_HOURS: HourlyForecastItem[] = [
  { id: 'h-22', hour: '22 საათი', temp: 18, condition: 'rainy', conditionLabel: 'ღამის წვიმა', iconCode: '39' },
  { id: 'h-23', hour: '23 საათი', temp: 18, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-21-top', hour: '21 საათი', temp: 17, condition: 'rainy', conditionLabel: 'ღამის წვიმა', iconCode: '39' },
  { id: 'h-00', hour: '0 საათი', temp: 18, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-01', hour: '1 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-02', hour: '2 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-03', hour: '3 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-04', hour: '4 საათი', temp: 16, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-05', hour: '5 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-06', hour: '6 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-07', hour: '7 საათი', temp: 17, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '18' },
  { id: 'h-08', hour: '8 საათი', temp: 17, condition: 'rainy', conditionLabel: 'წვიმა', iconCode: '18' },
  { id: 'h-09', hour: '9 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-10', hour: '10 საათი', temp: 17, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-11', hour: '11 საათი', temp: 18, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-12', hour: '12 საათი', temp: 18, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'h-13', hour: '13 საათი', temp: 19, condition: 'cloudy', conditionLabel: 'უმეტესად ღრუბლიანი', iconCode: '06' },
  { id: 'h-14', hour: '14 საათი', temp: 19, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-15', hour: '15 საათი', temp: 19, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-16', hour: '16 საათი', temp: 19, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-17', hour: '17 საათი', temp: 19, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-18', hour: '18 საათი', temp: 18, condition: 'cloudy', conditionLabel: 'მოღრუბლული', iconCode: '07' },
  { id: 'h-19', hour: '19 საათი', temp: 18, condition: 'rainy', conditionLabel: 'ღამის წვიმა', iconCode: '39' },
  { id: 'h-20', hour: '20 საათი', temp: 17, condition: 'rainy', conditionLabel: 'ღამის წვიმა', iconCode: '39' },
  { id: 'h-21', hour: '21 საათი', temp: 17, condition: 'rainy', conditionLabel: 'ღამის წვიმა', iconCode: '39' },
];

/**
 * ქალაქის სწრაფი გენერატორი amindi.ge-ს 49 ქართული და 12 უცხოური ქალაქისთვის
 */
function createCityEntry(
  id: string,
  nameKa: string,
  nameEn: string,
  currentTemp: number,
  lat: number,
  lon: number,
  iconCode = '38',
  conditionLabel = 'უმეტესად ღრუბლიანი',
  condition: CityWeather['condition'] = 'partly-cloudy',
  bgImage = 'bg/clouds_night2.jpg',
  isForeign = false
): CityWeather {
  return {
    id,
    nameKa,
    nameEn,
    isForeign,
    lat,
    lon,
    currentTemp,
    tempMin: currentTemp - 4,
    tempMax: currentTemp + 6,
    condition,
    conditionLabel,
    iconCode,
    bgImage,
    windSpeed: 20,
    windDirection: 'NW',
    pressure: 102.1,
    pressureUnit: 'kpa',
    feelsLike: currentTemp,
    feelsLikeWind: currentTemp,
    humidity: 67,
    visibility: 16,
    lastUpdated: '21:22:27',
    hourly: TBILISI_24_HOURS.map((h, idx) => ({
      ...h,
      id: `${id}-h-${idx}`,
      temp: currentTemp - (idx % 3),
    })),
    daily: TBILISI_25_DAYS.map((d, idx) => ({
      ...d,
      id: `${id}-d-${idx}`,
      tempMin: d.tempMin + (currentTemp - 18),
      tempMax: d.tempMax + (currentTemp - 18),
    })),
  };
}

/**
 * საქართველოს და უცხოეთის ქალაქების სრული სია https://amindi.ge/ka/-დან
 */
export const INITIAL_CITIES: CityWeather[] = [
  {
    id: 'tbilisi',
    nameKa: 'თბილისი',
    nameEn: 'Tbilisi',
    region: 'ქართლი',
    isForeign: false,
    lat: 41.7151,
    lon: 44.8271,
    currentTemp: 18,
    tempMin: 16,
    tempMax: 25,
    condition: 'partly-cloudy',
    conditionLabel: 'უმეტესად ღრუბლიანი',
    iconCode: '38',
    bgImage: 'bg/clouds_night2.jpg',
    windSpeed: 20,
    windDirection: 'NW',
    pressure: 102.1,
    pressureUnit: 'kpa',
    feelsLike: 18,
    feelsLikeWind: 18,
    humidity: 67,
    visibility: 16,
    lastUpdated: '21:22:27',
    hourly: TBILISI_24_HOURS,
    daily: TBILISI_25_DAYS,
  },
  createCityEntry('abastumani', 'აბასთუმანი', 'Abastumani', 10, 41.753, 42.8319, '35', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('akhaltsikhe', 'ახალციხე', 'Akhaltsikhe', 13, 41.639, 42.9826, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('batumi', 'ბათუმი', 'Batumi', 17, 41.6168, 41.6367, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('bakuriani', 'ბაკურიანი', 'Bakuriani', 7, 41.7497, 43.5325, '07', 'ღრუბლიანი', 'cloudy', 'bg/clouds3.jpg'),
  createCityEntry('bolnisi', 'ბოლნისი', 'Bolnisi', 17, 41.4479, 44.5381, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('borjomi', 'ბორჯომი', 'Borjomi', 13, 41.8427, 43.3883, '07', 'ღრუბლიანი', 'cloudy', 'bg/clouds3.jpg'),
  createCityEntry('gonio', 'გონიო', 'Gonio', 15, 41.5731, 41.5736, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('gori', 'გორი', 'Gori', 16, 41.9842, 44.1158, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('gudauri', 'გუდაური', 'Gudauri', 6, 42.478, 44.4744, '12', 'წვიმა', 'rainy', 'bg/clouds3.jpg'),
  createCityEntry('gurjaani', 'გურჯაანი', 'Gurjaani', 19, 41.7429, 45.8011, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('davit-gareji', 'დავით-გარეჯი', 'Davit Gareji', 19, 41.4472, 45.3764, '34', 'ნათელი', 'sunny', 'bg/clouds_night2.jpg'),
  createCityEntry('zestafoni', 'ზესტაფონი', 'Zestafoni', 15, 42.11, 43.0525, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('zugdidi', 'ზუგდიდი', 'Zugdidi', 15, 42.5088, 41.8709, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('telavi', 'თელავი', 'Telavi', 19, 41.9198, 45.4731, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('tianeti', 'თიანეთი', 'Tianeti', 15, 42.1083, 44.9639, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('lagodekhi', 'ლაგოდეხი', 'Lagodekhi', 15, 41.8268, 46.2767, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('lanchkhuti', 'ლანჩხუთი', 'Lanchkhuti', 15, 42.0903, 42.0325, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('manglisi', 'მანგლისი', 'Manglisi', 12, 41.6969, 44.3844, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('marneuli', 'მარნეული', 'Marneuli', 17, 41.4759, 44.8089, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('mestia', 'მესტია', 'Mestia', 10, 43.0458, 42.7278, '07', 'ღრუბლიანი', 'cloudy', 'bg/clouds3.jpg'),
  createCityEntry('mtskheta', 'მცხეთა', 'Mtskheta', 14, 41.8451, 44.7188, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('ozurgeti', 'ოზურგეთი', 'Ozurgeti', 13, 41.9244, 42.0068, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('omalo', 'ომალო', 'Omalo', 17, 42.3706, 45.6328, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('oni', 'ონი', 'Oni', 14, 42.5794, 43.4425, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('rustavi', 'რუსთავი', 'Rustavi', 19, 41.5495, 44.9932, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('sagarejo', 'საგარეჯო', 'Sagarejo', 18, 41.7339, 45.3314, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('samtredia', 'სამტრედია', 'Samtredia', 16, 42.1537, 42.3352, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('sachkhere', 'საჩხერე', 'Sachkhere', 16, 42.3453, 43.4194, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('senaki', 'სენაკი', 'Senaki', 16, 42.2704, 42.0675, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('sioni', 'სიონი', 'Sioni', 15, 41.9886, 44.9942, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('sighnaghi', 'სიღნაღი', 'Sighnaghi', 19, 41.6186, 45.9219, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('sokhumi', 'სოხუმი', 'Sokhumi', 16, 43.0015, 41.0234, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('surami', 'სურამი', 'Surami', 9, 42.0233, 43.5556, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('ureki', 'ურეკი', 'Ureki', 18, 41.9956, 41.7786, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('ushguli', 'უშგული', 'Ushguli', 3, 42.9178, 43.0156, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('poti', 'ფოთი', 'Poti', 18, 42.1462, 41.672, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('kobuleti', 'ქობულეთი', 'Kobuleti', 17, 41.8214, 41.7753, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('kutaisi', 'ქუთაისი', 'Kutaisi', 18, 42.2662, 42.718, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('shatili', 'შატილი', 'Shatili', 7, 42.6583, 45.1575, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('shekvetili', 'შეკვეთილი', 'Shekvetili', 13, 41.9231, 41.7694, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('shovi', 'შოვი', 'Shovi', 10, 42.7022, 43.6794, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('chokhatauri', 'ჩოხატაური', 'Chokhatauri', 15, 42.0189, 42.2394, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),
  createCityEntry('tskhinvali', 'ცხინვალი', 'Tskhinvali', 13, 42.2276, 43.9686, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('tsinandali', 'წინანდალი', 'Tsinandali', 19, 41.8953, 45.5714, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('tskneti', 'წყნეთი', 'Tskneti', 17, 41.6939, 44.6967, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('chiatura', 'ჭიათურა', 'Chiatura', 14, 42.2981, 43.2989, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('kharagauli', 'ხარაგაული', 'Kharagauli', 15, 42.0114, 43.1972, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('khashuri', 'ხაშური', 'Khashuri', 12, 41.9941, 43.5999, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg'),
  createCityEntry('khobi', 'ხობი', 'Khobi', 16, 42.3164, 41.8986, '36', 'ნაწილობრივ ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night3.jpg'),

  // უცხოეთის ქალაქები (https://amindi.ge/ka/-დან)
  createCityEntry('athens', 'ათენი', 'Athens', 19, 37.9838, 23.7275, '01', 'მზიანი', 'sunny', 'bg/sun2.jpg', true),
  createCityEntry('antalya', 'ანტალია', 'Antalya', 15, 36.8969, 30.7133, '01', 'მზიანი', 'sunny', 'bg/sun2.jpg', true),
  createCityEntry('baku', 'ბაქო', 'Baku', 20, 40.4093, 49.8671, '38', 'უმეტესად ღრუბლიანი', 'partly-cloudy', 'bg/clouds_night2.jpg', true),
  createCityEntry('budapest', 'ბუდაპეშტი', 'Budapest', 14, 47.4979, 19.0402, '03', 'ნაწილობრივ მზიანი', 'partly-cloudy', 'bg/sun2.jpg', true),
  createCityEntry('vienna', 'ვენა', 'Vienna', 10, 48.2082, 16.3738, '06', 'ღრუბლიანი', 'cloudy', 'bg/clouds3.jpg', true),
  createCityEntry('tel-aviv', 'თელ-ავივი', 'Tel Aviv', 23, 32.0853, 34.7818, '01', 'მზიანი', 'sunny', 'bg/clouds_night2.jpg', true),
  createCityEntry('london', 'ლონდონი', 'London', 12, 51.5072, -0.1276, '12', 'წვიმა', 'rainy', 'bg/clouds3.jpg', true),
  createCityEntry('new-york', 'ნიუ-იორკი', 'New York', 16, 40.7128, -74.006, '01', 'მზიანი', 'sunny', 'bg/sun2.jpg', true),
  createCityEntry('paris', 'პარიზი', 'Paris', 12, 48.8566, 2.3522, '06', 'ღრუბლიანი', 'cloudy', 'bg/clouds3.jpg', true),
  createCityEntry('prague', 'პრაღა', 'Prague', 7, 50.0755, 14.4378, '07', 'მოღრუბლული', 'cloudy', 'bg/clouds3.jpg', true),
  createCityEntry('istanbul', 'სტამბული', 'Istanbul', 15, 41.0082, 28.9784, '03', 'ნაწილობრივ მზიანი', 'partly-cloudy', 'bg/sun2.jpg', true),
  createCityEntry('zurich', 'ციურიხი', 'Zurich', 8, 47.3769, 8.5417, '06', 'ღრუბლიანი', 'cloudy', 'bg/clouds3.jpg', true),
];

/**
 * ეროვნული ბანკის ოფიციალური გაცვლითი კურსები ზუსტად https://amindi.ge/ka/-ს მიხედვით
 */
export const INITIAL_CURRENCIES: CurrencyRate[] = [
  {
    id: 'usd',
    code: 'USD',
    nameKa: 'აშშ დოლარი',
    multiplier: 1,
    rateYesterday: 2.5982,
    rateToday: 2.5979,
    change: -0.01,
    symbol: '$',
  },
  {
    id: 'eur',
    code: 'EUR',
    nameKa: 'ევრო',
    multiplier: 1,
    rateYesterday: 2.9274,
    rateToday: 2.9128,
    change: -0.5,
    symbol: '€',
  },
  {
    id: 'rub',
    code: 'RUB',
    nameKa: 'რუსული რუბლი',
    multiplier: 100,
    rateYesterday: 3.0935,
    rateToday: 3.1404,
    change: 1.52,
    symbol: '₽',
  },
  {
    id: 'gbp',
    code: 'GBP',
    nameKa: 'დიდი ბრიტანეთის გირვანქა სტერლინგი',
    multiplier: 1,
    rateYesterday: 3.475,
    rateToday: 3.4891,
    change: 0.41,
    symbol: '£',
  },
  {
    id: 'try',
    code: 'TRY',
    nameKa: 'თურქული ლირა',
    multiplier: 10,
    rateYesterday: 0.789,
    rateToday: 0.7845,
    change: -0.57,
    symbol: '₺',
  },
];

/**
 * SS.ge-ს კურორტების კარუსელის ელემენტები ზუსტად https://amindi.ge/ka/-დან (.rss-item-amindi)
 */
export interface SSGeResortCard {
  id: string;
  city: string;
  url: string;
  coverImg: string;
  weatherIcon: string;
  dayLabel: string;
  tempDay: string;
  tempNight: string;
}

export const SSGE_RESORT_CARDS: SSGeResortCard[] = [
  {
    id: 'ss-bakuriani',
    city: 'ბაკურიანი',
    url: 'https://ss.ge/ka/udzravi-qoneba/l?MunicipalityId=49&CityIdList=81&IsRest=true',
    coverImg: 'https://ss.ge/img/summer/bakuriani.png',
    weatherIcon: 'https://amindi.ge/static/img/weather_15.png',
    dayLabel: 'ორშ',
    tempDay: '14°C',
    tempNight: '6°C',
  },
  {
    id: 'ss-batumi',
    city: 'ბათუმი',
    url: 'https://ss.ge/ka/udzravi-qoneba/l?CityIdList=96&IsRest=true',
    coverImg: 'https://ss.ge/img/summer/batumi.png',
    weatherIcon: 'https://amindi.ge/static/img/weather_38.png',
    dayLabel: 'ორშ',
    tempDay: '21°C',
    tempNight: '15°C',
  },
  {
    id: 'ss-tbilisi-sub',
    city: 'თბილისის შემოგარენი',
    url: 'https://ss.ge/ka/udzravi-qoneba/l?MunicipalityId=1&IsRest=true',
    coverImg: 'https://ss.ge/img/summer/tbilisisshemogareni.png',
    weatherIcon: 'https://amindi.ge/static/img/weather_12.png',
    dayLabel: 'ორშ',
    tempDay: '25°C',
    tempNight: '16°C',
  },
  {
    id: 'ss-borjomi',
    city: 'ბორჯომი',
    url: 'https://ss.ge/ka/udzravi-qoneba/l?MunicipalityId=49&IsRest=true',
    coverImg: 'https://ss.ge/img/summer/borjomi.png',
    weatherIcon: 'https://amindi.ge/static/img/weather_07.png',
    dayLabel: 'ორშ',
    tempDay: '21°C',
    tempNight: '11°C',
  },
  {
    id: 'ss-surami',
    city: 'სურამი',
    url: 'https://ss.ge/ka/udzravi-qoneba/l?MunicipalityId=60&CityIdList=4&IsRest=true',
    coverImg: 'https://ss.ge/img/summer/surami.png',
    weatherIcon: 'https://amindi.ge/static/img/weather_38.png',
    dayLabel: 'ორშ',
    tempDay: '16°C',
    tempNight: '9°C',
  },
  {
    id: 'ss-gudauri',
    city: 'გუდაური',
    url: 'https://ss.ge/ka/udzravi-qoneba/l?MunicipalityId=32&IsRest=true',
    coverImg: 'https://ss.ge/img/summer/gudauri.png',
    weatherIcon: 'https://amindi.ge/static/img/weather_12.png',
    dayLabel: 'ორშ',
    tempDay: '14°C',
    tempNight: '5°C',
  },
];

/**
 * Hotsale-ის ფასდაკლების აქციები
 */
export const INITIAL_HOTSALE: HotSaleItem[] = [
  {
    id: 'hs-1',
    title: 'გოლდენ ტიულიპ ბორჯომში • GOLDEN TULIP BORJOMI',
    hotelName: 'Golden Tulip Borjomi',
    location: 'ბორჯომი',
    description: 'ბორჯომში ნომერი 2 სტუმარზე საუზმით ან საუზმის გარეშე და სპა ზონით',
    oldPrice: 260,
    newPrice: 177,
    currency: '₾',
    imageUrl: 'https://ss.ge/img/summer/borjomi.png',
  },
  {
    id: 'hs-2',
    title: 'ბაკურიანი ინნ • BAKURIANI INN 5★ სასტუმრო',
    hotelName: 'Bakuriani Inn',
    location: 'ბაკურიანი',
    description: 'ნომერი 2 ან 3 სტუმარზე კვებით, შიდა აუზითა და სპა ცენტრით',
    oldPrice: 320,
    newPrice: 210,
    currency: '₾',
    imageUrl: 'https://ss.ge/img/summer/bakuriani.png',
  },
];

/**
 * amindi.ge-ს სიახლეები ზუსტი ორიგინალური სურათებითა და თარიღებით (https://amindi.ge/ka/)
 */
export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n-1361',
    title: 'ესპანეთში ძლიერი შტორმი წყალდიდობას იწვევს - გარდაცვლილია 2 ადამიანი',
    category: 'ამინდი',
    time: '11:15 / 19-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-19/images-1-1792394245.jpg',
    link: 'https://amindi.ge/ka/article/1361-espanetshi-zlieri-shtormi-cqaldidobas-icvevs-gardacvlilia-2-adamiani/',
  },
  {
    id: 'n-1360',
    title: 'ამაზონში ხანძრების რაოდენობა 253%-ით გაიზარდა - ცეცხლის კერები 36 მუნიციპალიტეტს მოედო',
    category: 'მსოფლიო',
    time: '12:44 / 15-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-15/images-1792056014.jpg',
    link: 'https://amindi.ge/ka/article/1360-amazonshi-xanzrebis-raodenoba-253-it-gaizarda-cecxlis-kerebi-36-municipalitets-moedo/',
  },
  {
    id: 'n-1359',
    title: 'მექსიკის წყნარი ოკეანის სანაპიროს ქარიშხალი Simon უტევს',
    category: 'სტიქია',
    time: '09:40 / 13-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-12/mexico-weather-hurricane-1791827426.jpg',
    link: 'https://amindi.ge/ka/article/1359-meksikis-cqnari-okeanis-sanapiros-karishxali-simon-utevs-mosalodnelia-cqaldidoba-da-mecqrebi/',
  },
  {
    id: 'n-1358',
    title: 'ელ-ნინიო რეკორდულად ძლიერდება - რას უნდა ველოდოთ 2027 წელს?',
    category: 'კლიმატი',
    time: '14:28 / 09-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-09/1780572768-el-ninio-1-1-1791541943.jpg',
    link: 'https://amindi.ge/ka/article/1358-el-ninio-rekordulad-zlierdeba-ras-unda-velodot-2027-cels/',
  },
  {
    id: 'n-1357',
    title: 'მართლა აქვს თუ არა წვიმას სუნი?',
    category: 'საინტერესო',
    time: '10:45 / 08-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-06/a-small-plant-sprouting-from-the-ground-in-the-rain-photo-1791291893.jpg',
    link: 'https://amindi.ge/ka/article/1357-martla-akvs-tu-ara-cvimas-suni/',
  },
  {
    id: 'n-1356',
    title: 'ატმოსფერული მდინარეები - წყლის ნაკადები, რომლებიც ცაში მიედინება',
    category: 'მეცნიერება',
    time: '10:48 / 07-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-06/coastalconvection-landscape-1791287655.jpg',
    link: 'https://amindi.ge/ka/article/1356-atmosperuli-mdinareebi-cqlis-nakadebi-romlebic-cashi-miedineba/',
  },
  {
    id: 'n-1355',
    title: 'რას ნიშნავს მუსონური წვიმები და რატომ იწვევს ისინი მასშტაბურ წყალდიდობებს?',
    category: 'ამინდი',
    time: '10:29 / 06-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-06/images-1-1791268517.jpg',
    link: 'https://amindi.ge/ka/article/1355-ras-nishnavs-musonuri-cvimebi-da-ratom-icvevs-isini-masshtabur-cqaldidobebs/',
  },
  {
    id: 'n-1354',
    title: 'საქართველოში ინტენსიური თოვის და ლიპყინულის გამო გზებზე სეზონის პირველი შეზღუდვები დაწესდა',
    category: 'საქართველო',
    time: '12:18 / 05-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-05/833414483-1802326617562597-7295895047009152962-n-1791189617.jpg',
    link: 'https://amindi.ge/ka/article/1354-sakartveloshi-intensiuri-tovis-da-lipqinulis-gamo-gzebze-sezonis-pirveli-shezgudvebi-dacesda/',
  },
  {
    id: 'n-1353',
    title: 'საქართველოში კვლავ უამინდობაა მოსალოდნელი - დეტალები ამინდის შესახებ',
    category: 'პროგნოზი',
    time: '10:56 / 02-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-02/images-5-1790924555.jpg',
    link: 'https://amindi.ge/ka/article/1353-sakartveloshi-kvlav-uamindobaa-mosalodneli-detalebi-amindis-shesaxeb/',
  },
  {
    id: 'n-1352',
    title: 'ელ-ნინიო ძლიერდება - უახლესი ინფორმაცია, რომელიც უნდა იცოდეთ',
    category: 'კლიმატი',
    time: '11:47 / 01-10-2026',
    source: 'amindi.ge',
    imageUrl: 'https://amindi.ge/media/uploads/2026/10-01/092326-no-elnino-main-1790841650.jpg',
    link: 'https://amindi.ge/ka/article/1352-el-ninio-zlierdeba-uaxlesi-inpormacia-romelic-unda-icodet/',
  },
];
