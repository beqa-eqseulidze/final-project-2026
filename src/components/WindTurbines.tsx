import standsImage from '../assets/Towers.png';
import rotorbig from '../assets/rotorbig.png';
import rotorsmall from '../assets/rotorsmall.png';

interface WindTurbinesProps {
    windSpeed: number;
}

export const WindTurbines = ({ windSpeed }: WindTurbinesProps) => {
    return (
        <div className="relative w-20 h-28 flex items-center justify-center shrink-0">
            {/* სადგამების ფოტო */}
            <img
                src={standsImage}
                alt="Windmill Stands"
                className="absolute bottom-0 h-24 w-full object-contain z-10 opacity-90"
            />

            {/* დიდი ტურბინა */}
            <img
                src={rotorbig}
                alt="Large Rotor"
                className="absolute top-[15px] left-[-1px] h-12 w-12 object-contain animate-spin z-20 mix-blend-screen"
                style={{
                    animationDuration: `${Math.max(0.2, 1.7 - (windSpeed || 0) * 0.15)}s`,
                }}
            />

            {/* პატარა ტურბინა */}
            <img
                src={rotorsmall}
                alt="Small Rotor"
                className="absolute top-[38px] right-[25px] h-7 w-7 object-contain animate-spin z-20 mix-blend-screen"
                style={{
                    animationDuration: `${Math.max(0.2, 1.6 - (windSpeed || 0) * 0.15)}s`,
                }}
            />
        </div>
    );
};