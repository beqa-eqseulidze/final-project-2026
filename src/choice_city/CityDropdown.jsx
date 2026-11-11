import React, { useState } from 'react';
import './CityDropdown.css';

const CityDropdown = ({ cities, selectedCity, onSelectCity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (city) => {
    onSelectCity(city);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      {/* ღილაკი: "აირჩიე ქალაქი" */}
      <button 
        className="dropdown-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedCity ? selectedCity.name : "აირჩიე ქალაქი"}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* ჩამოშლილი მენიუ */}
      {isOpen && (
        <div className="dropdown-menu">
          <div className="section-title">საქართველოს ქალაქები</div>
          <div className="cities-grid">
            {cities.map((city) => (
              <div
                key={city.id}
                className="city-item"
                onClick={() => handleSelect(city)}
              >
                <span className="city-name">{city.name}</span>
                <span className="city-temp">{city.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDropdown;