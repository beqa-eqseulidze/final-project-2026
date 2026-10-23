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
  
  // ცვლადი რომელიც განსაზღვრავს ტექსტის ფერს diff-ის ნიშნის მიხედვით;
  const isNegative = diff < 0;

  //if(isNegative = true) -> white ///// if(isNegative = false) -> green..
  const diffColor = isNegative ? 'text-white' : diff > 0 ? 'text-green-500' : 'text-white';

  return(
    <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-white/20 text-[15px] text-center items-center">
      <div className="font-sanet text-[18px] text-left font-mediumbold text-white">
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