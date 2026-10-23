import { CurrencyRates } from './components/currency/CurrencyRates';

function App(){
  return(
    <div className="min-h-screen bg-blue-900 flex justify-center py-20 px-4">
      <aside className="w-[320px]">
        <CurrencyRates/>
      </aside>
    </div>
  );
}

export default App;