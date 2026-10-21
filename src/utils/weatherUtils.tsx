/**
 * @file weatherUtils.tsx
 * @description ამინდის დამხმარე უტილიტები:
 * - ტემპერატურის გადაყვანა და ფორმატირება (°C / °F)
 * - amindi.ge-ს ორიგინალური ამინდის ხატულების (PNG სურათების) გენერირება
 * - მთავარი ვიჯეტისთვის (Hero Card) amindi.ge-ს დიდი ხატულების რენდერი
 */

import React from 'react';
import { TempUnit } from '../store/slices/uiSlice';
import { WeatherCondition } from '../types/weather.types';

/**
 * ტემპერატურის დაფორმატება არჩეული ერთეულის მიხედვით.
 * თუ არჩეულია 'F', გადაჰყავს ცელსიუსიდან ფარენჰაიტში: (C * 9/5) + 32.
 *
 * @param celsius - ტემპერატურა ცელსიუსში
 * @param unit - ერთეული ('C' ან 'F')
 * @returns ფორმატირებული სტრიქონი, მაგ. "18°" ან "64°"
 */
export function formatTemp(celsius: number, unit: TempUnit): string {
  if (unit === 'F') {
    const fahrenheit = Math.round((celsius * 9) / 5 + 32);
    return `${fahrenheit}°`;
  }
  return `${celsius}°`;
}

/**
 * მხოლოდ რიცხვითი მნიშვნელობის დაბრუნება (° სიმბოლოს გარეშე)
 */
export function formatTempValue(celsius: number, unit: TempUnit): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return celsius;
}

/**
 * WeatherCondition-ის გადაყვანა amindi.ge-ს ხატულის კოდში (01, 02, 06, 07, 12, 15, 29, 38...)
 */
export function conditionToAmindiCode(condition: WeatherCondition, isNight = false): string {
  switch (condition) {
    case 'sunny':
      return isNight ? '34' : '01';
    case 'partly-cloudy':
      return isNight ? '38' : '03';
    case 'cloudy':
      return '07';
    case 'rainy':
      return isNight ? '39' : '12';
    case 'thunderstorm':
      return '17';
    case 'snowy':
      return '29';
    case 'windy':
      return '06';
    default:
      return '03';
  }
}

/**
 * amindi.ge-ს პატარა ხატულის (weather_small_XX.png) URL-ის მიღება
 */
export function getSmallIconUrl(condition: WeatherCondition, iconCode?: string): string {
  const code = iconCode || conditionToAmindiCode(condition);
  return `https://amindi.ge/static/img/weather_small_${code}.png`;
}

/**
 * amindi.ge-ს საშუალო ხატულის (weather_XX.png) URL-ის მიღება (საათობრივი გვერდისთვის და კარუსელისთვის)
 */
export function getMediumIconUrl(condition: WeatherCondition, iconCode?: string): string {
  const code = iconCode || conditionToAmindiCode(condition);
  return `https://amindi.ge/static/img/weather_${code}.png`;
}

/**
 * amindi.ge-ს დიდი მთავარი ხატულის (XX.png) URL-ის მიღება
 */
export function getLargeIconUrl(condition: WeatherCondition, iconCode?: string): string {
  const code = iconCode || conditionToAmindiCode(condition);
  return `https://amindi.ge/static/img/${code}.png`;
}

/**
 * ამინდის შესაბამისი ხატულის დაბრუნება ზუსტად amindi.ge-ს ორიგინალური სურათებით.
 *
 * @param condition - ამინდის მდგომარეობა
 * @param className - დამატებითი კლასები
 * @param iconCode - არასავალდებულო ზუსტი კოდი amindi.ge-დან (მაგ. "17", "12", "14", "05", "39")
 */
export function getWeatherIcon(
  condition: WeatherCondition,
  className = 'w-[50px] h-auto',
  iconCode?: string
): React.ReactNode {
  const src = getSmallIconUrl(condition, iconCode);
  return (
    <img
      src={src}
      alt={condition}
      className={className}
      style={{ margin: '0 auto', display: 'block' }}
    />
  );
}

/**
 * მთავარი ბარათის (CurrentWeatherCard) ილუსტრაცია — ზუსტად amindi.ge-ს ორიგინალური სურათი (/static/img/38.png, 01.png და ა.შ.).
 */
export function WeatherHeroIllustration({
  condition,
  iconCode,
}: {
  condition: WeatherCondition;
  iconCode?: string;
}) {
  const src = getLargeIconUrl(condition, iconCode);
  return (
    <img
      src={src}
      alt={condition}
      className="select-none"
    />
  );
}
