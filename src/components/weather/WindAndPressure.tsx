import React from 'react';

// სადგამების და ტურბინების იმპორტი
import standsImage from '../assets/stands.png';
import turbine1 from '../assets/turbine1.png';
import turbine2 from '../assets/turbine2.png';

interface WindAndPressureProps {
    windSpeed?: number;
    windUnit?: string;
    windDirection?: string;
    pressure?: number;
    pressureUnit?: string;
    isLoading?: boolean;
    variant?: 'large' | 'small';
}

export const WindAndPressure = ({
    windSpeed = 11,
    windUnit = 'kph',
    windDirection = 'ENE',
    pressure = 102.60,
    pressureUnit = 'kpa',
    isLoading = false,
    variant = 'large',
}: WindAndPressureProps) => {

    // ვარჩევთ შესაბამის ტურბინას და სადგამის პოზიციას (object-position)
    const turbineImage = variant === 'large' ? turbine1 : turbine2;
    const standPositionClass = variant === 'large' ? 'object-left' : 'object-right';

    return (
        <div className="w-full max-w-[320px] bg-[#223552]/90 text-white p-4 font-sans border-b border-slate-600/40 shadow-lg">

            {isLoading ? (
                <div className="text-center py-6 text-sm text-slate-300">
                    იტვირთება მონაცემები...
                </div>
            ) : (
                <div className="flex items-center justify-between gap-3">

                    {/* მარცხენა მხარე: ქარის წისქვილის ანიმაცია */}
                    <div className="relative w-24 h-28 flex items-center justify-center shrink-0">

                        {/* სადგამი: stands.png შეიცავს ორს ერთად, ვჭრით object-fit-ით */}
                        <img
                            src={standsImage}
                            alt="Windmill Stand"
                            className={`absolute bottom-0 h-24 w-full object-cover ${standPositionClass} z-10`}
                            style={{ clipPath: variant === 'large' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)' }}
                        />

                        {/* ტურბინის ფრთები - ბრუნავს animate-spin-ით */}
                        <img
                            src={turbineImage}
                            alt="Windmill Turbine"
                            className="absolute top-1 h-14 w-14 object-contain animate-spin z-20 mix-blend-screen"
                            style={{
                                animationDuration: `${Math.max(0.4, 3.5 - windSpeed / 10)}s`,
                            }}
                        />
                    </div>

                    {/* მარჯვენა მხარე: ტექსტური ინფორმაცია */}
                    <div className="flex flex-col justify-center space-y-2 text-left pr-1">

                        <h3 className="text-base font-bold uppercase tracking-wide text-white leading-tight">
                            ქარი და წნევა
                        </h3>

                        <div className="text-xs">
                            <span className="text-slate-300 block text-[11px] font-medium">
                                ქარის სიჩქარე:
                            </span>
                            <span className="text-sm font-semibold text-white">
                                {windSpeed} {windUnit}, {windDirection}
                            </span>
                        </div>

                        <div className="text-xs">
                            <span className="text-slate-300 block text-[11px] font-medium">
                                წნევა:
                            </span>
                            <span className="text-sm font-semibold text-white">
                                {pressure.toFixed(2)} {pressureUnit}
                            </span>
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
};