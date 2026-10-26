import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HourlyItem } from '../services/weatherService';

interface HourlyPageProps {
    hourlyData: HourlyItem[];
}

//საათობრივი ამინდების წამოღება ამინდებს აჩვენებს ყოველი 3 საათის ინტერვალით
export const HourlyForecastPage = ({ hourlyData }: HourlyPageProps) => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#1a2c42]/80 backdrop-blur-md text-white p-6 rounded-lg shadow-xl border border-white/10">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 bg-[#0ea5e9] hover:bg-[#0284c7] px-4 py-2 rounded text-xs font-semibold transition flex items-center space-x-1 cursor-pointer"
            >
                <span>← უკან დაბრუნება</span>
            </button>

            <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-cyan-300">
                ამინდი საათების მიხედვით
            </h2>

            {/* ბადისებრი განლაგება (5-5-ზე) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {hourlyData.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition text-center shadow-lg"
                    >
                        {/* საათი სურათი ტემპერატურა თანმიმდევრობა*/}
                        <span className="text-xs font-medium text-slate-300">{item.time}</span>
                        <img src={item.icon} alt="Weather Icon" className="w-12 h-12 object-contain my-2" />
                        <span className="text-xl font-bold text-white">{item.temp}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};