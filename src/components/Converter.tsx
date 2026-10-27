import { useState } from 'react';

/** ერთი კონვერტაციის წყვილის Props */
interface ConverterRowProps {
  from: React.ReactNode;
  to: React.ReactNode;
  forward: (v: number) => number;
  backward: (v: number) => number;
}

/** კონვერტაციის წყვილი: Input (თეთრი) ↔ Output (ლურჯი) + swap ღილაკი */
const ConverterRow = ({ from, to, forward, backward }: ConverterRowProps) => {
  const [value, setValue] = useState('');
  const [reversed, setReversed] = useState(false);

  // შედეგის გამოთვლა მიმართულების მიხედვით
  const num = parseFloat(value);
  const result = isNaN(num)
    ? ''
    : String(Number((reversed ? backward(num) : forward(num)).toFixed(2)));

  // swap-ის დროს Label-ები ადგილს ცვლიან
  const [leftLabel, rightLabel] = reversed ? [to, from] : [from, to];

  return (
    <div className="mb-3 sm:mb-4">
      <div className="flex justify-between text-[12px] sm:text-[14px] font-bold text-[#19375c] mb-1">
        <span className="flex items-center gap-1 w-[100px] sm:w-[110px]">{leftLabel}</span>
        <span className="flex items-center gap-1 w-[100px] sm:w-[110px]">{rightLabel}</span>
      </div>

      <div className="flex items-center justify-between">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[100px] sm:w-[110px] h-[36px] sm:h-[46px] px-2 text-[14px] bg-white border border-[#2da9e0] rounded outline-none"
        />

        {/* swap ღილაკი */}
        <button
          type="button"
          onClick={() => setReversed((p) => !p)}
          aria-label="Swap"
          className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full bg-[#2da9e0] flex items-center justify-center cursor-pointer border-0"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M21 12a9 9 0 0 1-15 6.7M3 12a9 9 0 0 1 15-6.7M18 2v4h-4M6 22v-4h4" />
          </svg>
        </button>

        <input
          readOnly
          value={result}
          className="w-[100px] sm:w-[110px] h-[36px] sm:h-[46px] px-2 text-[14px] bg-[#cde9f6] border border-[#2da9e0] rounded outline-none"
        />
      </div>
    </div>
  );
};

/** Flag + კოდი (USD / GEL) */
const Currency = ({ flag, code }: { flag: string; code: string }) => (
  <>
    <img src={`https://flagcdn.com/w40/${flag}.png`} alt={code} className="h-[12px] sm:h-[14px]" />
    {code}
  </>
);

/** USD → GEL კურსი (ფიქსირებული მნიშვნელობა, API-ზე მოგვიანებით დავაკავშირებთ) */
const USD_GEL_RATE = 2.7;

export const Converter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[240px] sm:w-[280px] font-amindi1 select-none">
      {/* სათაური / toggle */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full h-[38px] sm:h-[46px] px-4 text-[14px] sm:text-[16px] bg-[#2da9e0] text-white font-bold rounded flex items-center justify-between cursor-pointer border-0"
      >
        <span className="flex-1 text-center">კონვერტორი</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          className={`transition-transform ${open ? '' : 'rotate-180'}`}
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>

      {open && (
        <div className="pt-3 sm:pt-4">
          <ConverterRow
            from="C°"
            to="F°"
            forward={(c) => (c * 9) / 5 + 32}
            backward={(f) => ((f - 32) * 5) / 9}
          />
          <ConverterRow
            from="კილომეტრი"
            to="მილი"
            forward={(km) => km * 0.621371}
            backward={(mi) => mi / 0.621371}
          />
          <ConverterRow
            from={<Currency flag="us" code="USD" />}
            to={<Currency flag="ge" code="GEL" />}
            forward={(usd) => usd * USD_GEL_RATE}
            backward={(gel) => gel / USD_GEL_RATE}
          />
        </div>
      )}
    </div>
  );
};