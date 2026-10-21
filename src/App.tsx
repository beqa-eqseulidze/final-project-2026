import { CurrencyRates } from './components/currency/CurrencyRates';

function App() {
  return (
    <div className="min-h-screen bg-slate-800 flex justify-center py-10 px-4">
      <aside className="w-[320px]">
        <CurrencyRates />
      </aside>
    </div>
  );
}

export default App;