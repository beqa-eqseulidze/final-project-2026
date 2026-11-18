import { createContext, useContext, type ReactNode } from 'react';

export type SiteLanguage = 'ka' | 'en' | 'ru';
export type TemperatureUnit = 'C' | 'F';
const LanguageContext = createContext<{ language: SiteLanguage; unit: TemperatureUnit }>({ language: 'ka', unit: 'C' });

export function LanguageProvider({ language, unit, children }: { language: SiteLanguage; unit: TemperatureUnit; children: ReactNode }) {
  return <LanguageContext.Provider value={{ language, unit }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext).language;
}

export function useTemperatureUnit() {
  return useContext(LanguageContext).unit;
}

export function formatTemperature(celsius: number, unit: TemperatureUnit) {
  return Math.round(unit === 'F' ? (celsius * 9) / 5 + 32 : celsius);
}

export function tr(language: SiteLanguage, ka: string, en: string, ru: string) {
  return language === 'ka' ? ka : language === 'en' ? en : ru;
}
