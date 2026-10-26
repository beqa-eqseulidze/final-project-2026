import React, { useState, useEffect } from 'react';
import { geoCitiesList, foreignCitiesList, CityItem } from '../data/citiesData';

interface CitySelectorProps {
    selectedCity: string;
    onSelectCity: (cityQuery: string) => void;
}

export const CitySelector = ({ selectedCity, onSelectCity }: CitySelectorProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [geoCities, setGeoCities] = useState<CityItem[]>(geoCitiesList);
    const [foreignCities, setForeignCities] = useState<CityItem[]>(foreignCitiesList);

    const API_KEY = '7815c7800287ebff0c6d3a12cd09557d';

    //ქართული და უცხოური ქალაქების ინფომრაციის დაfetchვა და წამოღება
    useEffect(() => {
        const fetchAllTemps = async () => {
            const fetchList = async (list: CityItem[]) => {
                return await Promise.all(
                    list.map(async (city) => {
                        try {
                            const res = await fetch(
                                `https://api.openweathermap.org/data/2.5/weather?q=${city.query}&units=metric&appid=${API_KEY}`
                            );
                            if (res.ok) {
                                const data = await res.json();
                                return { ...city, temp: `${Math.round(data.main.temp)}°` };
                            }
                        } catch (e) {
                            console.error(e);
                        }
                        return { ...city, temp: '--' };
                    })
                );
            };

            //დაFETCHილი ინფორმაციის ტიპიზაცია ქართულ და უცხოურ ქალაქებად
            const updatedGeo = await fetchList(geoCitiesList);
            setGeoCities(updatedGeo);

            const updatedForeign = await fetchList(foreignCitiesList);
            setForeignCities(updatedForeign);
        };

        fetchAllTemps();
    }, []);

    const currentCityObj = [...geoCities, ...foreignCities].find(c => c.query === selectedCity);
    const displayName = currentCityObj ? currentCityObj.name : selectedCity;

    const handleSelect = (query: string) => {
        onSelectCity(query);
        setIsOpen(false);
    };

    return (
        //აირჩიე ქალაქი ღილაკი და ჩამოსაშლელი ფონი
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2.5 rounded-md font-semibold text-sm flex items-center justify-between shadow-lg cursor-pointer transition"
            >
                <span>{displayName || 'აირჩიე ქალაქი'}</span>
                <span className="text-xs ml-2">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <>
                    {/* აირჩიე ქალაქი ჩამოსაშლელი მობილური ვერსია*/}
                    <div className="absolute top-full left-0 w-full mt-1 bg-[#d1d5db] text-slate-900 rounded-b-lg shadow-2xl z-50 overflow-hidden border border-slate-400 md:hidden">
                        <div className="bg-[#2563eb] text-white py-2.5 px-4 font-bold text-xs uppercase tracking-wider">
                            აირჩიე ქალაქი
                        </div>
                        <div className="max-h-72 overflow-y-auto divide-y divide-slate-300">
                            <div className="bg-slate-400 text-slate-900 px-4 py-1 text-[10px] font-bold uppercase tracking-wider">
                                საქართველოს ქალაქები
                            </div>
                            {geoCities.map((city) => (
                                <button
                                    key={city.query}
                                    onClick={() => handleSelect(city.query)}
                                    className={`w-full text-left py-2.5 px-4 text-xs font-medium transition cursor-pointer flex justify-between items-center ${selectedCity === city.query
                                        ? 'bg-[#1e3a5f] text-white font-bold'
                                        : 'hover:bg-slate-300 text-slate-800'
                                        }`}
                                >
                                    <span>{city.name}</span>
                                    <span className="font-bold opacity-90">{city.temp !== null ? city.temp : '...'}</span>
                                </button>
                            ))}

                            <div className="bg-slate-400 text-slate-900 px-4 py-1 text-[10px] font-bold uppercase tracking-wider">
                                უცხოეთის ქალაქები
                            </div>
                            {foreignCities.map((city) => (
                                <button
                                    key={city.query}
                                    onClick={() => handleSelect(city.query)}
                                    className={`w-full text-left py-2.5 px-4 text-xs font-medium transition cursor-pointer flex justify-between items-center ${selectedCity === city.query
                                        ? 'bg-[#1e3a5f] text-white font-bold'
                                        : 'hover:bg-slate-300 text-slate-800'
                                        }`}
                                >
                                    <span>{city.name}</span>
                                    <span className="font-bold opacity-90">{city.temp !== null ? city.temp : '...'}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/*  აირჩიე ქალაქი ჩამოსაშლელი დესკტოპის ვერსია */}
                    <div className="hidden md:block absolute top-12 left-0 z-50 w-full max-w-5xl p-6 bg-[#0284c7]/95 backdrop-blur-md rounded-lg text-white shadow-2xl border border-white/10">
                        <h2 className="text-xs font-bold mb-3 uppercase tracking-wider text-cyan-200 border-b border-white/20 pb-1">
                            საქართველოს ქალაქები
                        </h2>
                        <div className="grid grid-cols-4 gap-2 mb-6">
                            {geoCities.map((city) => (
                                <button
                                    key={city.query}
                                    onClick={() => handleSelect(city.query)}
                                    className={`p-2.5 rounded text-left transition text-xs font-semibold flex justify-between items-center cursor-pointer ${selectedCity === city.query
                                        ? 'bg-cyan-700 text-white shadow ring-1 ring-white'
                                        : 'bg-white/10 hover:bg-white/20 text-slate-100'
                                        }`}
                                >
                                    <span className="truncate pr-1">{city.name}</span>
                                    <span className="font-bold text-cyan-200">{city.temp !== null ? city.temp : '...'}</span>
                                </button>
                            ))}
                        </div>

                        <h2 className="text-xs font-bold mb-3 uppercase tracking-wider text-cyan-200 border-b border-white/20 pb-1">
                            უცხოეთის ქალაქები
                        </h2>
                        <div className="grid grid-cols-4 gap-2">
                            {foreignCities.map((city) => (
                                <button
                                    key={city.query}
                                    onClick={() => handleSelect(city.query)}
                                    className={`p-2.5 rounded text-left transition text-xs font-semibold flex justify-between items-center cursor-pointer ${selectedCity === city.query
                                        ? 'bg-cyan-700 text-white shadow ring-1 ring-white'
                                        : 'bg-white/10 hover:bg-white/20 text-slate-100'
                                        }`}
                                >
                                    <span className="truncate pr-1">{city.name}</span>
                                    <span className="font-bold text-cyan-200">{city.temp !== null ? city.temp : '...'}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};