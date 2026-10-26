import React, { useState, useEffect } from 'react';
import { getCityDateTime } from '../utils/formatters';

interface LeftBarCurrentWeatherProps {
    cityName: string;
    temperature: string | number;
    condition: string;
    icon: string;
    timezone: number;
}

export const LeftBarCurrentWeather = ({
    cityName,
    temperature,
    condition,
    icon,
    timezone,
}: LeftBarCurrentWeatherProps) => {
    const [dateTime, setDateTime] = useState(() => getCityDateTime(timezone));

    // ქალაქის შეცვლისას დროის განახლება
    useEffect(() => {
        setDateTime(getCityDateTime(timezone));

        const timer = setInterval(() => {
            setDateTime(getCityDateTime(timezone));
        }, 1000);

        return () => clearInterval(timer);
    }, [timezone]);

    return (
        // განლაგება სტქუქტურა სახელი, თარიღი, საათი, ამინდი და ტემპერატურა
        <div className="bg-[#1a2c42]/80 backdrop-blur-md text-white p-6 rounded-lg shadow-xl border border-white/10 mb-4">
            <h1 className="text-2xl font-bold mb-1">{cityName}</h1>
            <p className="text-xs text-slate-300 mb-1">{dateTime.date}</p>
            <p className="text-xs text-slate-300 mb-6 font-mono">{dateTime.time}</p>

            <div className="flex items-center justify-between">
                <img src={icon} alt="Weather Icon" className="w-16 h-16 object-contain" />
                <div className="text-5xl font-light">{temperature}</div>
            </div>
            <p className="mt-4 text-sm text-slate-200 font-medium">{condition}</p>
        </div>
    );
};