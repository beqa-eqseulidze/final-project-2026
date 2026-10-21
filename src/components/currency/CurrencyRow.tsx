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
}) =>{
  const percentChange = (diff * 100).toFixed(1);
  
  const isNegative = diff < 0;
  const diffColor = isNegative ? 'text-white' : diff > 0 ? 'text-green-400' : 'text-white';

  return (
    <div className="grid grid-cols-4 gap-2 py-3.5 border-b border-white/20 text-[15px] text-center items-center">
      <div className="text-left font-semibold text-white">
        {quantity} {code}
      </div>
      <div className="text-white/90">{prevRate}</div>
      <div className="text-white/90">{rateFormated}</div>
      <div className={`font-medium ${diffColor}`}>
        {percentChange}%
      </div>
    </div>
  );
};