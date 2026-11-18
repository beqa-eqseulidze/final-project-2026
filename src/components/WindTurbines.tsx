import { tr, useLanguage } from '../context/LanguageContext';

import standsImage from '../assets/Towers.png';
import rotorbig from '../assets/rotorbig.png';
import rotorsmall from '../assets/rotorsmall.png';

interface WindTurbinesProps {
    windSpeed: number;
}

export const WindTurbines = ({ windSpeed }: WindTurbinesProps) => {
    const language = useLanguage();

    return (
        <div className="relative w-20 h-28 flex items-center justify-center shrink-0">
            {/* სადგამების ფოტო */}
            <img
                src={standsImage}
                alt={tr(language, 'ქარის ტურბინის საყრდენი', 'Wind turbine support tower', 'Опора ветряной турбины')}
                width={80}
                height={96}
                decoding="async"
                className="absolute bottom-0 h-24 w-full object-contain z-10 opacity-90"
            />

            {/* დიდი ტურბინა */}
            <img
                src={rotorbig}
                alt={tr(language, 'დიდი ქარის ტურბინის მბრუნავი ფრთა', 'Large wind turbine rotor', 'Большой ротор ветряной турбины')}
                width={48}
                height={48}
                decoding="async"
                className="absolute top-[15px] left-[-1px] h-12 w-12 object-contain animate-spin z-20 mix-blend-screen"
                style={{
                    animationDuration: `${Math.min(6, Math.max(0.2, 6 * 0.15))}s`,
                }}
            />

            {/* პატარა ტურბინა */}
            <img
                src={rotorsmall}
                alt={tr(language, 'პატარა ქარის ტურბინის მბრუნავი ფრთა', 'Small wind turbine rotor', 'Малый ротор ветряной турбины')}
                width={28}
                height={28}
                decoding="async"
                className="absolute top-[38px] right-[25px] h-7 w-7 object-contain animate-spin z-20 mix-blend-screen"
                style={{
                    animationDuration: `${Math.min(6, Math.max(0.2, 5 * 0.15))}s`,
                }}
            />
        </div>
    );
};