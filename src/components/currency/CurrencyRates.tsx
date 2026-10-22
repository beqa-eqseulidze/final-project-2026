import { useEffect, useState } from 'react';
import { CurrencyRow } from './CurrencyRow';

interface CurrencyData {
  code: string;
  quantity: number;
  rateFormated: string;
  diff: number;
  date: string;
}

interface ApiResponse {
  date: string;
  currencies: CurrencyData[];
}

export function CurrencyRates() {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [dates, setDates] = useState<{ today: string, yesterday: string }>({ today: '', yesterday: '' });

  const targetCurrencies = ['USD', 'EUR', 'RUB'];

  useEffect(()=>{
    const fetchCurrencies = async ()=>{
      try{
        const response = await fetch('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json');
        if(!response.ok)
         throw new Error('failed to fetch');
        
        const data: ApiResponse[] = await response.json();
        
        const filtered = data[0].currencies.filter((c)=> 
          targetCurrencies.includes(c.code)
        );

        const sorted = filtered.sort((a, b)=>{
          return targetCurrencies.indexOf(a.code) - 
          targetCurrencies.indexOf(b.code);
        });
        
        setCurrencies(sorted);

        const apiDate = new Date(data[0].date);
        
        const yesterdayDate = new Date(apiDate);
        yesterdayDate.setDate(apiDate.getDate() - 1);
        
        const formatDate = (d: Date)=>{
          const day = d.getUTCDate();
          const monthNames = ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];
          const month = monthNames[d.getUTCMonth()];
          return `${day} ${month}`;
        };

        setDates({
          yesterday: formatDate(yesterdayDate),
          today: formatDate(apiDate)
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchCurrencies();
  }, []);


  return(
    <div className="w-full min-w-[280px] bg-transparent text-white p-4 font-sans">
      <h3 className="font-sanet text-[17px] font-bold mb-6 tracking-wide">ოფიციალური კურსი</h3>

      {loading ? (
        <div className="font-sanet font-bold text-center text-sm py-4 text-white/70">იტვირთება..</div>
      ) : error ? (
        <div className="font-sanet text-center text-sm py-4 text-red-400">{error}</div>
      ) : (
        <>
          <div className="font-sanet grid grid-cols-4 gap-2 text-[13px] font-semibold text-white/90 mb-4 text-center items-center">
            <div></div>
            <div>{dates.yesterday}</div> 
            <div>{dates.today}</div>
            <div className="flex justify-center text-white/50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
              </svg>
            </div>
          </div>

          <div>
            {currencies.map((currency)=>(
              <CurrencyRow key={currency.code} code={currency.code}
                quantity={currency.quantity} rateFormated={currency.rateFormated}
                prevRate={(parseFloat(currency.rateFormated) - currency.diff).toFixed(4)} diff={currency.diff}/>
            ))}
          </div>
        </>
      )}

      {/* ღილაკი */}
      <div className="mt-8 flex justify-center">
        <a href="https://www.bpn.ge/currency/" target="_blank" rel="noopener noreferrer"
          className="font-sanet font-medium bg-[#00a8e8] hover:bg-[#0086b8] text-white text-[18px] py-2 px-8 rounded-lgtransition-colors duration-200">
          ყველა ვალუტა
        </a>
      </div>
    </div>
  );
};