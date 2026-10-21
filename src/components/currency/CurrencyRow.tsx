import React from 'react';

interface CurrencyRowProps {
  code: string;
  quantity: number;
  rateFormated: string;
  diff: number;
  prevRate: string;
}

export const CurrencyRow: React.FC<CurrencyRowProps> = ({ 
  code, 
  quantity, 
  rateFormated, 
  diff,
  prevRate
})=>{
  const percentChange = (diff * 100).toFixed(2);
  
  const isNegative = diff < 0;
  const diffColor = isNegative ? 'text-white' : diff > 0 ? 'text-green-400' : 'text-white';

  return (
    <div className="grid grid-cols-4 gap-2 py-3.5 border-t border-b border-white/20 text-[15px] text-center items-center">
      <div className="font-sanet text-left font-bold text-white">
        {quantity} {code}
      </div>
      <div className="font-sanet text-white/90">{prevRate}</div>
      <div className="font-sanet text-white/90">{rateFormated}</div>
      <div className={`font-sanet font-medium ${diffColor}`}>
        {percentChange}%
      </div>
    </div>
  );
};