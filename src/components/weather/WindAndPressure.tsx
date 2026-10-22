import React from 'react';
import Towers from '../assets/Towers.png';
import bigrotor from '../assets/rotorbig.png';
import smallrotor from '../assets/rotorsmall.png';

interface WindAndPressureProps {
    windSpeed?: number;
    windUnit?: string;
    windDirection?: string;
    pressure?: number;
    pressureUnit?: string;
    feelsLikeTemp?: string | number;
    feelsLikeWind?: string | number;
    humidity?: string | number;
    visibility?: string | number;
    isLoading?: boolean;
}

export const WindAndPressure = ({
    windSpeed = 11,
    windUnit = 'kph',
    windDirection = 'ENE',
    pressure = 102.60,
    pressureUnit = 'kpa',
    feelsLikeTemp = '19°',
    feelsLikeWind = '17°',
    humidity = 'SSW',
    visibility = '82 %',
    isLoading = false,
}: WindAndPressureProps) => {

    return (
        <div className="w-full max-w-[320px] bg-[#1a2c42] text-white font-sans shadow-xl border border-slate-700/50 rounded-lg overflow-hidden">

            {isLoading ? (
                <div className="text-center py-6 text-sm text-slate-300">
                    იტვირთება მონაცემები...
                </div>
            ) : (
                <div className="flex flex-col">
                    {/* ზედა მთავარი ბლოკი */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-700/60">

                        {/* მარცხენა მხარე: ქარის ენერგო ტურბინები */}
                        <div className="relative w-20 h-28 flex items-center justify-center shrink-0">

                            {/* სადგამების ფოტო */}
                            <img
                                src={Towers}
                                alt="Windmill Stands"
                                className="absolute bottom-0 h-22 w-full object-contain z-10"
                            />

                            {/* დიდი როტორი */}
                            <img
                                src={bigrotor}
                                alt="Large Rotor"
                                className="absolute top-[16px] left-[-1px] h-12 w-12 object-contain animate-spin  z-20 mix-blend-screen"
                                style={{
                                    animationDuration: `${Math.max(0.5, 1.4 - windSpeed / 15)}s`,
                                }}
                            />

                            {/* პატარა როტორი */}
                            <img
                                src={smallrotor}
                                alt="Small Rotor"
                                className="absolute top-10 right-6 h-8 w-8 object-contain animate-spin z-20 mix-blend-screen"
                                style={{
                                    animationDuration: `${Math.max(0.5, 1.0 - windSpeed / 15)}s`,
                                }}
                            />
                        </div>

                        {/* მარჯვენა მხარე: ტექსტური ინდიკატორები */}
                        <div className="flex flex-col justify-center space-y-2 text-left w-40">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                                ქარი და წნევა
                            </h3>

                            <div className="text-xs">
                                <span className="text-slate-400 block text-[11px]">ქარის სიჩქარე:</span>
                                <span className="text-xs font-semibold text-white">
                                    {windSpeed} {windUnit}, {windDirection}
                                </span>
                            </div>

                            <div className="text-xs">
                                <span className="text-slate-400 block text-[11px]">წნევა:</span>
                                <span className="text-xs font-semibold text-white">
                                    {pressure.toFixed(2)} {pressureUnit}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* ქვედა დამატებითი ველები */}
                    <div className="p-4 bg-[#162438] space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                            <span className="text-slate-400">ტემპერატურის მგრძნობელობა:</span>
                            <span className="font-semibold text-white">{feelsLikeTemp}</span>
                        </div>

                        <div className="flex justify-between text-slate-300">
                            <span className="text-slate-400">ქარში მგრძნობელობა:</span>
                            <span className="font-semibold text-white">{feelsLikeWind}</span>
                        </div>

                        <div className="flex justify-between text-slate-300">
                            <span className="text-slate-400">ტენიანობა:</span>
                            <span className="font-semibold text-white">{humidity}</span>
                        </div>

                        <div className="flex justify-between text-slate-300">
                            <span className="text-slate-400">ხილვადობა:</span>
                            <span className="font-semibold text-white">{visibility}</span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};