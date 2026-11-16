import { useState } from 'react';
import type { TemperatureUnit } from '../context/LanguageContext';

interface TemperatureUnitSelectorProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

export default function TemperatureUnitSelector({ unit, onChange }: TemperatureUnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-30 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[37px] min-w-[52px] items-center justify-between gap-2 rounded-[4px] bg-[#00a2d8] px-2.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#0094c5] focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        <span>{unit}°</span><span aria-hidden="true" className="text-[10px]">▼</span>
      </button>
      {isOpen && (
        <ul role="listbox" aria-label="Temperature unit" className="absolute right-0 top-full mt-1 min-w-full overflow-hidden rounded-[4px] bg-[#00a2d8] py-1 text-white shadow-lg">
          {(['C', 'F'] as TemperatureUnit[]).map((option) => (
            <li key={option} role="option" aria-selected={option === unit}>
              <button
                type="button"
                onClick={() => { onChange(option); setIsOpen(false); }}
                className="w-full px-2.5 py-1.5 text-left text-[11px] font-semibold hover:bg-black/15 focus:bg-black/15 focus:outline-none"
              >{option}°</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
