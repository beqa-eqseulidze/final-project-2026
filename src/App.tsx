import { WindAndPressure, IWindAndPressureProps } from './features/LeftBarWindAndPressure';

// სტატიკური მონაცემები დროებით
const info: IWindAndPressureProps = {
  windSpeed: 6,
  windUnit: 'kph',
  windDirection: 'ENE',
  pressure: 102.60,
  pressureUnit: 'kpa',
  feelsLikeTemp: '19°',
  feelsLikeWind: '17°',
  humidity: 'SSW',
  visibility: '82 %',
  isLoading: false,
};

import { CurrencyRates } from './components/currency/CurrencyRates';

const Box = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center border-2 border-dashed border-slate-400 bg-white/90 text-center text-[11px] font-bold text-slate-600 ${className}`}>
    {children}
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen bg-sky-200 px-3 py-4 text-slate-700">
      <div className="mx-auto w-full max-w-[960px] bg-white shadow-xl">
        <Box className="h-12">top ad / header here</Box>

        <div className="grid grid-cols-[230px_1fr_150px] gap-2 p-2">

          <aside className="space-y-2">
            <Box className="h-44">weather sidebar here</Box>
            <Box className="h-28">city list here</Box>
            <WindAndPressure {...info} />
            <div className="w-full flex justify-center bg-blue-900 rounded-md overflow-hidden">
              <CurrencyRates />
            </div>

          </aside>

          <main className="space-y-2">
            <Box className="h-16">search / city selector here</Box>
            <Box className="h-28">forecast cards here</Box>
            <Box className="h-6">forecast navigation here</Box>
            <Box className="h-44 bg-slate-100">video here</Box>

            <div className="grid grid-cols-2 gap-2">
              <Box className="h-32">card here</Box>
              <Box className="h-32">card here</Box>
            </div>

            <Box className="h-7">section title here</Box>

            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Box key={i} className="h-28">news card here</Box>
              ))}
            </div>

            <Box className="h-28">bottom info here</Box>
          </main>

          <aside className="space-y-2">
            <Box className="h-24">ad here</Box>
            <Box className="h-36">ad here</Box>
            <Box className="h-28">ad here</Box>
          </aside>
        </div>
      </div>

      <Box className="mx-auto mt-0 h-14 max-w-[1100px] border-slate-500 bg-slate-700/70 text-white">
        footer here
      </Box>
    </div>
  )
}