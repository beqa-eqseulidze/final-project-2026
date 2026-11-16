import React, { useState, useEffect } from 'react';
import { WindTurbines } from '../components/WindTurbines';
import { fetchCurrentWeather } from '../services/weatherService';
import { formatTemperature, tr, useLanguage, useTemperatureUnit } from '../context/LanguageContext';

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

interface Props {
    city: string;
}

export const WindAndPressure = ({ city }: Props) => {
    const language = useLanguage();
    const temperatureUnit = useTemperatureUnit();
    const [data, setData] = useState<IWindAndPressureProps>({
        windSpeed: 0,
        windUnit: 'კმ/სთ',
        windDirection: '',
        pressure: 0,
        pressureUnit: 'ჰექტოპასკალი',
        feelsLikeTemp: '',
        feelsLikeWind: '',
        humidity: '',
        visibility: '',
        isLoading: true,
    });

    // ქალაქის შეცვლისას მონაცემების დინამიურად ჩამოტვირთვა API-დან
    useEffect(() => {
        let isMounted = true;
        setData(prev => ({ ...prev, isLoading: true }));

        fetchCurrentWeather(city)
            .then((weatherData) => {
                if (isMounted) {
                    setData({
                        windSpeed: weatherData.windSpeed,
                        windUnit: 'კმ/სთ',
                        windDirection: weatherData.windDirectionText,
                        pressure: weatherData.pressure,
                        pressureUnit: 'ჰპა',
                        feelsLikeTemp: weatherData.temp,
                        feelsLikeWind: weatherData.temp,
                        humidity: `${weatherData.humidity}%`,
                        visibility: weatherData.visibility,
                        isLoading: false,
                    });
                }
            })
            .catch(() => {
                if (isMounted) {
                    setData(prev => ({ ...prev, isLoading: false }));
                }
            });

        return () => {
            isMounted = false;
        };
    }, [city]);

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
    } = data;

    return (
        <div className="w-full bg-[#1a2c42]/60 backdrop-blur-md text-white font-sans shadow-xl border-t border-white/10 overflow-hidden">
            {isLoading ? (
                <div className="font-sanet text-center py-6 text-sm text-slate-300">
                    {tr(language, 'იტვირთება მონაცემები...', 'Loading weather data...', 'Загрузка погоды...')}
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                        <WindTurbines windSpeed={windSpeed} />

                        <div className="flex flex-col justify-center space-y-1.5 text-left w-full pl-2">
                            <h3 className="text-sm font-medium font-sanet uppercase tracking-wide text-white">
                                {tr(language, 'ქარი და წნევა', 'Wind and pressure', 'Ветер и давление')}
                            </h3>

                            <div className="text-xs">
                                <span className="text-slate-300 font-sanet block text-[11px]">{tr(language, 'ქარის სიჩქარე:', 'Wind speed:', 'Скорость ветра:')}</span>
                                <span className="text-xs font-normal font-sanet text-white">
                                    {windSpeed} {windUnit}, {windDirection}
                                </span>
                            </div>

                            <div className="text-xs">
                                <span className="text-slate-300 block font-sanet text-[11px]">{tr(language, 'წნევა:', 'Pressure:', 'Давление:')}</span>
                                <span className="text-xs font-sanet font-normal text-white">
                                    {typeof pressure === 'number' ? pressure.toFixed(2) : pressure} {pressureUnit}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-black/20 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300 font-sanet">{tr(language, 'ტემპერატურის მგრძნობელობა:', 'Feels like:', 'Ощущается как:')}</span>
                            <span className="font-medium font-sanet text-white">{typeof feelsLikeTemp === 'number' ? `${formatTemperature(feelsLikeTemp, temperatureUnit)}°${temperatureUnit}` : feelsLikeTemp}</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300 font-sanet">{tr(language, 'ქარში მგრძნობელობა:', 'Wind chill:', 'С учетом ветра:')}</span>
                            <span className="font-medium font-sanet text-white">{typeof feelsLikeWind === 'number' ? `${formatTemperature(feelsLikeWind, temperatureUnit)}°${temperatureUnit}` : feelsLikeWind}</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300 font-sanet">{tr(language, 'ტენიანობა:', 'Humidity:', 'Влажность:')}</span>
                            <span className="font-medium font-sanet text-white">{humidity}</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300 font-sanet">{tr(language, 'ხილვადობა:', 'Visibility:', 'Видимость:')}</span>
                            <span className="font-medium font-sanet text-white">{visibility}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
