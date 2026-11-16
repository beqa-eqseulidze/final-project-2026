import React, { useState } from 'react';
import CityDropdown from './CityDropdown';

// ქალაქების და ამინდის მონაცემები
const CITIES_DATA = [
  { id: 1, name: 'თბილისი', temp: 9, status: 'მზიანი', hourly: ['9°', '8°', '7°', '5°', '5°'] },
  { id: 2, name: 'ბათუმი', temp: 12, status: 'მოღრუბლული', hourly: ['12°', '11°', '10°', '9°', '9°'] },
  { id: 3, name: 'ქუთაისი', temp: 10, status: 'მზიანი', hourly: ['10°', '9°', '8°', '7°', '6°'] },
  { id: 4, name: 'რუსთავი', temp: 11, status: 'მზიანი', hourly: ['11°', '10°', '8°', '7°', '6°'] },
  { id: 5, name: 'გორი', temp: 7, status: 'წვიმიანი', hourly: ['7°', '6°', '6°', '5°', '4°'] },
  { id: 6, name: 'თელავი', temp: 9, status: 'მზიანი', hourly: ['9°', '8°', '7°', '5°', '4°'] },
  { id: 7, name: 'ზუგდიდი', temp: 10, status: 'მზიანი', hourly: ['10°', '9°', '8°', '7°', '6°'] },
  { id: 8, name: 'ფოთი', temp: 12, status: 'მოღრუბლული', hourly: ['12°', '11°', '11°', '10°', '9°'] },
  { id: 9, name: 'ბაკურიანი', temp: 3, status: 'თოვლი', hourly: ['3°', '2°', '1°', '0°', '-1°'] },
];

function App() {
  const [selectedCity, setSelectedCity] = useState(CITIES_DATA[0]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#eef2f5', minHeight: '100vh' }}>
      
      {/* ჩამოშლილი ქალაქების კომპონენტი */}
      <CityDropdown 
        cities={CITIES_DATA} 
        selectedCity={selectedCity} 
        onSelectCity={(city) => setSelectedCity(city)} 
      />

      {/* არჩეული ქალაქის ამინდის ბლოკი */}
      <div style={{
        marginTop: '20px',
        width: '320px',
        backgroundColor: '#00a2d8',
        color: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>{selectedCity.name}</h1>
        <p style={{ margin: '5px 0 15px 0', opacity: 0.8, fontSize: '13px' }}>ორშაბათი, 09 ნოემბერი</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '50px', fontWeight: 'bold' }}>{selectedCity.temp}°</span>
          <span style={{ fontSize: '18px' }}>{selectedCity.status}</span>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '15px 0' }} />

        <div>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '13px' }}>ამინდი საათების მიხედვით</h4>
          {selectedCity.hourly.map((hTemp, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '14px' }}>
              <span>{16 + index}:00 საათი</span>
              <strong>{hTemp}</strong>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;