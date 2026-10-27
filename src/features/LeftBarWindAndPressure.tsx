import { WindTurbines } from '../components/WindTurbines';

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

    //ქარი და წნევის ასახვა html ში
    return (
        <div className="w-full bg-[#1a2c42]/60 backdrop-blur-md text-white font-sans shadow-xl border-t border-white/10 overflow-hidden">
            {isLoading ? (
                <div className="text-center py-6 text-sm text-slate-300">
                    იტვირთება მონაცემები...
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                        <WindTurbines windSpeed={windSpeed} />

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
                                    {typeof pressure === 'number' ? pressure.toFixed(2) : pressure} {pressureUnit}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-black/20 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300">ტემპერატურის მგრძნობელობა:</span>
                            <span className="font-semibold text-white">{feelsLikeTemp}</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300">ქარში მგრძნობელობა:</span>
                            <span className="font-semibold text-white">{feelsLikeWind}</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300">ტენიანობა:</span>
                            <span className="font-semibold text-white">{humidity}</span>
                        </div>

                        <div className="flex justify-between items-center text-slate-200">
                            <span className="text-slate-300">ხილვადობა:</span>
                            <span className="font-semibold text-white">{visibility}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};