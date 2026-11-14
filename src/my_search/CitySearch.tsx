import { useMemo, useState } from 'react';
import type { SiteLanguage } from '../context/LanguageContext';
import type { TemperatureUnit } from '../context/LanguageContext';

export interface CityOption {
  id: number;
  name: string;
  temp: number;
  query: string;
}

interface CitySearchProps {
  cities: CityOption[];
  selectedCity: CityOption | null;
  onSelectCity: (city: CityOption) => void;
  language: SiteLanguage;
  unit: TemperatureUnit;
}

export default function CitySearch({ cities, selectedCity, onSelectCity, language, unit }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return cities;

    return cities.filter((city) =>
      `${city.name} ${city.query}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [cities, query]);

  const chooseCity = (city: CityOption) => {
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative z-20 w-[200px] shrink-0">
      <div className="relative">
        <input
          id="city-search"
          type="text"
          value={query}
          placeholder={language === 'ka' ? 'მოძებნე ქალაქი' : language === 'en' ? 'Search city' : 'Найти город'}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen && query.trim() !== ''}
          aria-controls="city-search-results"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
          className="h-[37px] w-full rounded-[4px] border-0 bg-[#00a2d8] px-3.5 py-1.5 pr-9 text-[13px] font-semibold leading-[22px] text-white shadow-sm outline-none placeholder:text-white/85 focus:ring-2 focus:ring-sky-300"
        />
        {query && (
          <button
            type="button"
            aria-label={language === 'ka' ? 'ძიების გასუფთავება' : language === 'en' ? 'Clear search' : 'Очистить поиск'}
            onClick={() => {
              setQuery('');
              setIsOpen(true);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        )}
        {!query && (
          <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-white">
            ⌕
          </span>
        )}
      </div>

      {isOpen && query.trim() !== '' && (
        <ul
          id="city-search-results"
          role="listbox"
          className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded bg-[#00a2d8] py-1 text-white shadow-xl"
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li key={city.id} role="option" aria-selected={selectedCity?.id === city.id}>
                <button
                  type="button"
                  onClick={() => chooseCity(city)}
                  className="flex w-full items-center justify-between px-3.5 py-1.5 text-left text-[13px] text-white hover:bg-black/15 focus:bg-black/15 focus:outline-none"
                >
                  <span>{city.name}</span>
                  <span className="text-xs text-white/80">{city.temp}°{unit}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-3.5 py-2 text-[13px] text-white/80">
              {language === 'ka' ? 'ქალაქი ვერ მოიძებნა' : language === 'en' ? 'No city found' : 'Город не найден'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
