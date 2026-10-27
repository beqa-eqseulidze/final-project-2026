interface CurrencyRowProps{
  code: string;
  quantity: number;
  rateFormated: string;
  diff: number;
  prevRate: string;
}

export function CurrencyRow({ 
  code, 
  quantity, 
  rateFormated, 
  diff,
  prevRate
}: CurrencyRowProps) {
  
  const percentChange = (diff * 100).toFixed(2);
  
  const isNegative = diff < 0;
  const diffColor = isNegative ? 'text-white' : diff > 0 ? 'text-green-500' : 'text-white';

  return(
    <div className="grid grid-cols-4 gap-1 py-2 border-t border-b border-white/20 text-[11px] text-center items-center">
      <div className="font-sanet text-left font-bold text-white text-[12px] truncate">
        {quantity} {code}
      </div>
      <div className="font-sanet text-white/90 truncate">{prevRate}</div>
      <div className="font-sanet text-white/90 truncate">{rateFormated}</div>
      <div className={`font-sanet font-medium ${diffColor} truncate`}>
        {percentChange}%
      </div>
    </div>
  );
};