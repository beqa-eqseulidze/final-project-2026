import React, { useState } from 'react';

export const CityDropdown = ({ cities, selectedCity, onSelectCity, language = 'ka', unit = 'C' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (city) => {
    onSelectCity(city);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', fontFamily: 'sans-serif' }}>
      {/* მთავარი ღილაკი */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#00a2d8',
          color: 'white',
          border: 'none',
          padding: '6px 14px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px'
        }}
      >
        <span>{selectedCity ? selectedCity.name : language === 'ka' ? 'აირჩიე ქალაქი' : language === 'en' ? 'Choose a city' : 'Выберите город'}</span>
        <span>▼</span>
      </button>

      {/* ჩამოშლილი მენიუ */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '5px',
          backgroundColor: '#00a2d8',
          width: '420px',
          padding: '12px',
          borderRadius: '4px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 9999,
          color: 'white'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', textTransform: 'uppercase' }}>
            {language === 'ka' ? 'საქართველოს ქალაქები' : language === 'en' ? 'Cities in Georgia' : 'Города Грузии'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            {cities.map((city) => (
              <div
                key={city.id}
                onClick={() => handleSelect(city)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '5px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'background 0.15s, color 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span>{city.name}</span>
                <span>{city.temp}°{unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
