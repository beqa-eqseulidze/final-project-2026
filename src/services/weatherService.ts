import { translateCityName, translateCondition } from '../utils/formatters';
import sunnyImg from '../assets/weather/sunny.png';
import clearNightImg from '../assets/weather/clearnight.png';
import cloudyImg from '../assets/weather/cloudy.png';
import partlyCloudyDayImg from '../assets/weather/partlycloudyd.png';
import partlyCloudyNightImg from '../assets/weather/partlycloudyn.png';
import rainImg from '../assets/weather/rainy.png';

export interface HourlyItem {
    time: string;
    temp: string;
    icon: string;
    condition: string;
    wind: string;
}

export interface WeatherData {
    cityName: string;
    temperature: string | number;
    condition: string;
    icon: string;
    windSpeed: number;
    windUnit: string;
    windDirection: string;
    pressure: number;
    pressureUnit: string;
    feelsLikeTemp: string | number;
    feelsLikeWind: string | number;
    humidity: string | number;
    visibility: string | number;
    timezone: number;
    hourly: HourlyItem[];
    fullHourly: HourlyItem[];
}

//დაFETCHვა და ინფორმაციის წამოღება
export const fetchWeatherData = async (cityName: string = 'Tbilisi'): Promise<WeatherData> => {
    const API_KEY = '7815c7800287ebff0c6d3a12cd09557d';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}&lang=ka`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}&lang=ka`;

    const [currentRes, forecastRes] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
    ]);

    //თუ პრობლემა მოხდა ამოაგდოს ERROR მესიჯი
    if (!currentRes.ok || !forecastRes.ok) {
        throw new Error('ვერ მოხერხდა ამინდის მონაცემების წამოღება');
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const rawCityName = currentData.name || cityName;
    const georgianCityName = translateCityName(rawCityName);
    const cityTimezone = forecastData.city.timezone || 0;

    // ქალაქის საათობრივი პროგნოზი ადგილობრივი დროის მიხედვით
    const hourlyList: HourlyItem[] = forecastData.list.map((item: any) => {
        const cityTimeMs = (item.dt + cityTimezone) * 1000;
        const cityDate = new Date(cityTimeMs);
        const hour = cityDate.getUTCHours();
        const hoursText = hour + ' საათი';

        return {
            time: hoursText,
            temp: `${Math.round(item.main.temp)}°`,
            icon: getWeatherImageIcon(item.weather[0].icon, hour),
            condition: translateCondition(item.weather[0].description),
            wind: `${Math.round(item.wind.speed * 3.6)} kph`
        };
    });

    const currentCityTimeMs = (currentData.dt + cityTimezone) * 1000;
    const currentHour = new Date(currentCityTimeMs).getUTCHours();

    //FETCHდან წამოღებული ინფორმაციის ასახვა
    return {
        cityName: georgianCityName,
        temperature: `${Math.round(currentData.main.temp)}°`,
        condition: translateCondition(currentData.weather[0].description),
        icon: getWeatherImageIcon(currentData.weather[0].icon, currentHour),
        windSpeed: Math.round(currentData.wind.speed * 3.6),
        windUnit: 'kph',
        windDirection: getWindDirection(currentData.wind.deg),
        pressure: Number((currentData.main.pressure / 10).toFixed(2)),
        pressureUnit: 'kpa',
        feelsLikeTemp: `${Math.round(currentData.main.feels_like)}°`,
        feelsLikeWind: `${Math.round(currentData.main.feels_like - 1)}°`,
        humidity: `${currentData.main.humidity} %`,
        visibility: `${(currentData.visibility / 1000).toFixed(0)} km`,
        timezone: cityTimezone,
        hourly: hourlyList.slice(0, 5),
        fullHourly: hourlyList.slice(0, 10)
    };
};

function getWeatherImageIcon(iconCode: string, hour?: number): string {
    let isNight = false;

    // თუ საათი არის 06:00-დან 20:00-მდე — დღეა, სხვა შემთხვევაში — ღამე
    if (hour !== undefined) {
        isNight = hour < 6 || hour >= 19;
    } else {
        isNight = iconCode.endsWith('n');
    }

    //ფოტოების გამოსაყენებელი კოდები
    const baseCode = iconCode.slice(0, 2);
    if (baseCode === '01') {
        return isNight ? clearNightImg : sunnyImg;
    }

    if (baseCode === '02' || baseCode === '03') {
        return isNight ? partlyCloudyNightImg : partlyCloudyDayImg;
    }

    if (baseCode === '04') {
        return cloudyImg;
    }

    if (iconCode.includes('09') || iconCode.includes('10')) return rainImg;
    // სამომავლოდ თოვლისთვის თუ დაგვჭირდა: 
    // if (iconCode.includes('13')) return snowImg;

    return isNight ? clearNightImg : sunnyImg;
}

//ქარის მიმართულების გამომთვლელი
function getWindDirection(degree: number): string {
    if (degree === undefined) return 'N';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    return directions[index % 8];
}