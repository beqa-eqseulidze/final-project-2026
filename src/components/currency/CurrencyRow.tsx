import React from 'react';

interface CurrencyRowProps {
  code: string;
  quantity: number;
  rateFormated: string;
  diff: number;
  prevRate: string;
}

export const CurrencyRow: React.FC<CurrencyRowProps> = ({ 
  code, quantity, rateFormated, diff, prevRate
}) => {
  const percentChange = (diff * 100).toFixed(2); 
  const isNegative = diff < 0;
  const diffColor = isNegative ? 'text-white' : diff > 0 ? 'text-green-400' : 'text-white';

  return (
    // 🆕 tr და td თეგები (ცხრილის სემანტიკა)
    <tr className="border-t border-b border-white/20 text-[15px] text-center">
      <td className="font-sanet text-left font-bold text-white py-3.5">
        {quantity} {code}
      </td>
      <td className="font-sanet text-white/90 py-3.5">{prevRate}</td>
      <td className="font-sanet text-white/90 py-3.5">{rateFormated}</td>
      <td className={`font-sanet font-medium py-3.5 ${diffColor}`}>
        {percentChange}%
      </td>
    </tr>
  );
};