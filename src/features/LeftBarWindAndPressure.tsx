import React from 'react';
import { WindTurbines } from '../components/WindTurbines';

// ყველა ველი უკვე სავალდებულოა (? აღარ წერია)
export interface IWindAndPressureProps {
    windSpeed: number;
    windUnit: string;
    windDirection: string;
    pressure: number;
    pressureUnit: string;
    feelsLikeTemp: string | number;
    feelsLikeWind: string | number;
    humidity: string | number;
    visibility: string | number;
    isLoading: boolean;
}

export const WindAndPressure = (props: IWindAndPressureProps) => {
    const {
        windSpeed,
        windUnit,
        windDirection,
        pressure,
        pressureUnit,
        feelsLikeTemp,
        feelsLikeWind,
        humidity,
        visibility,
        isLoading,
    } = props;

    return (
        <div className="w-full max-w-[320px] mx-auto bg-[#1a2c42]/60 backdrop-blur-md text-white font-sans shadow-xl border-t border-white/10 overflow-hidden">

            {isLoading ? (
                <div className="text-center py-6 text-sm text-slate-300">
                    იტვირთება მონაცემები...
                </div>
            ) : (
                <div className="flex flex-col">

                    {/* ზედა მთავარი ბლოკი */}
                    <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                        {/* ტურბინების ცალკე კომპონენტი */}
                        <WindTurbines windSpeed={windSpeed} />

                        {/* მარჯვენა მხარე: ტექსტური ინდიკატორები */}
                        <div className="flex flex-col justify-center space-y-1.5 text-left w-full pl-2">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                                ქარი და წნევა
                            </h3>

                            <div className="text-xs">
                                <span className="text-slate-300 block text-[11px]">ქარის სიჩქარე:</span>
                                <span className="text-xs font-semibold text-white">
                                    {windSpeed} {windUnit}, {windDirection}
                                </span>
                            </div>

                            <div className="text-xs">
                                <span className="text-slate-300 block text-[11px]">წნევა:</span>
                                <span className="text-xs font-semibold text-white">
                                    {pressure.toFixed(2)} {pressureUnit}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* ქვედა დამატებითი ველები */}
                    <div className="p-4 bg-black/20 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-200">
                            <span className="text-slate-300">ტემპერატურის მგრძნობელობა:</span>
                            <span className="font-semibold text-white">{feelsLikeTemp}</span>
                        </div>

                        <div className="flex justify-between text-slate-200">
                            <span className="text-slate-300">ქარში მგრძნობელობა:</span>
                            <span className="font-semibold text-white">{feelsLikeWind}</span>
                        </div>

                        <div className="flex justify-between text-slate-200">
                            <span className="text-slate-300">ტენიანობა:</span>
                            <span className="font-semibold text-white">{humidity}</span>
                        </div>

                        <div className="flex justify-between text-slate-200">
                            <span className="text-slate-300">ხილვადობა:</span>
                            <span className="font-semibold text-white">{visibility}</span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};