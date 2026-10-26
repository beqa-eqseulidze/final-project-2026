import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HourlyItem } from '../services/weatherService';

interface LeftBarHourlyProps {
    hourlyData: HourlyItem[];
}

export const LeftBarHourlyForecast = ({ hourlyData }: LeftBarHourlyProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1a2c42]/80 backdrop-blur-md text-white p-4 rounded-lg shadow-xl border border-white/10 mb-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                ამინდი საათების მიხედვით
            </h3>

            <div className="space-y-3">
                {hourlyData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                        {/* ქარდის განლაგება დრო, ამინდი და ტემპერატურა*/}
                        <span className="w-16 text-slate-300">{item.time}</span>
                        <img src={item.icon} alt="Weather Icon" className="w-6 h-6 object-contain" />
                        <span className="font-bold text-white">{item.temp}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/hourly')}
                className="w-full mt-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-2 rounded text-xs font-semibold transition cursor-pointer"
            >
                იხილეთ სრულად
            </button>
        </div>
    );
};