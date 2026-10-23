import { WindAndPressure } from './features/LeftBarWindAndPressure';
import type { IWindAndPressureProps } from './features/LeftBarWindAndPressure'
const info: IWindAndPressureProps = {
  windSpeed: 11,
  windUnit: 'kph',
  windDirection: 'ENE',
  pressure: 102.60,
  pressureUnit: 'kpa',
  feelsLikeTemp: '19°',
  feelsLikeWind: '17°',
  humidity: 'SSW',
  visibility: '82 %',
  isLoading: false,
}

export function App() {
  return (
    <div className="min-h-screen bg-[#182538] flex items-center justify-center p-4">
      <WindAndPressure {...info} />
    </div>
  );
}

export default App;