import { useState } from 'react';
import type { SiteLanguage } from '../context/LanguageContext';

interface LanguageSelectorProps {
  language: SiteLanguage;
  onChange: (language: SiteLanguage) => void;
}

const LANGUAGES: { code: SiteLanguage; flag: string; label: string }[] = [
  { code: 'ka', flag: 'ge', label: 'ქართული' },
  { code: 'en', flag: 'gb', label: 'English' },
  { code: 'ru', flag: 'ru', label: 'Русский' },
];

function Flag({ country }: { country: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 rounded-[1px] shadow-sm">
      {country === 'ge' ? (
        <>
          <rect width="24" height="16" fill="white" />
          <path d="M10.25 0h3.5v16h-3.5zM0 6.25h24v3.5H0z" fill="#e32636" />
          <path d="M4.5 1.75h1.25v4H4.5zM3.125 3.125h4v1.25h-4zM18.25 1.75h1.25v4h-1.25zM16.875 3.125h4v1.25h-4zM4.5 10.25h1.25v4H4.5zM3.125 11.625h4v1.25h-4zM18.25 10.25h1.25v4h-1.25zM16.875 11.625h4v1.25h-4z" fill="#e32636" />
        </>
      ) : country === 'ru' ? (
        <><rect width="24" height="5.34" fill="white" /><rect y="5.33" width="24" height="5.34" fill="#2457a7" /><rect y="10.66" width="24" height="5.34" fill="#e32636" /></>
      ) : (
        <>
          <rect width="24" height="16" fill="#1b3f8b" />
          <path d="M0 0l24 16M24 0L0 16" stroke="white" strokeWidth="4" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#cf142b" strokeWidth="1.6" />
          <path d="M12 0v16M0 8h24" stroke="white" strokeWidth="6" />
          <path d="M12 0v16M0 8h24" stroke="#cf142b" strokeWidth="2.8" />
        </>
      )}
      <rect x="0.25" y="0.25" width="23.5" height="15.5" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth=".5" />
    </svg>
  );
}

export default function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  return (
    <div className="relative z-30 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[37px] min-w-[112px] items-center justify-between gap-2 rounded-[4px] bg-[#00a2d8] px-2.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#0094c5] focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        <span className="flex items-center gap-1.5"><Flag country={selected.flag} />{selected.label}</span>
        <span aria-hidden="true" className="text-[10px]">▼</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="აირჩიე ენა / Choose language / Выберите язык"
          className="absolute right-0 top-full mt-1 min-w-full overflow-hidden rounded-[4px] bg-[#00a2d8] py-1 text-white shadow-lg"
        >
          {LANGUAGES.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === language}>
              <button
                type="button"
                onClick={() => {
                  onChange(item.code);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 whitespace-nowrap px-2.5 py-1.5 text-left text-[11px] font-semibold hover:bg-black/15 focus:bg-black/15 focus:outline-none"
              >
                <Flag country={item.flag} />{item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
