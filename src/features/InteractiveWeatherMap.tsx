import { useEffect, useRef, useState } from 'react';

export type MapWeather = { name: string; country: string; latitude: number; longitude: number; temperature: number; apparent: number; humidity: number; wind: number; code: number };
declare global { interface Window { maplibregl?: any } }

export function InteractiveWeatherMap({ onWeatherSelect }: { onWeatherSelect: (weather: MapWeather) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  const callback = useRef(onWeatherSelect);
  callback.current = onWeatherSelect;
  const request = useRef(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const select = useRef<(lat: number, lon: number) => void>(() => {});

  select.current = async (lat, lon) => {
    const id = ++request.current;
    setLoading(true);
    setError('');
    const lib = window.maplibregl;
    if (lib && map.current) {
      if (marker.current) marker.current.setLngLat([lon, lat]);
      else marker.current = new lib.Marker({ color: '#e63946' }).setLngLat([lon, lat]).addTo(map.current);
    }
    try {
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`);
      if (!weatherResponse.ok) throw new Error('Weather service is unavailable.');
      const forecast = await weatherResponse.json();
      if (id !== request.current) return;
      // Reverse geocoding is optional: weather must still work when it is rate-limited.
      let address: Record<string, string> = {};
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`, { headers: { 'Accept-Language': 'en' } });
        if (response.ok) address = (await response.json()).address ?? {};
      } catch { /* Coordinates remain a valid fallback. */ }
      if (id !== request.current) return;
      callback.current({
        name: address.city || address.town || address.village || address.municipality || address.county || `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
        country: address.country || 'Selected location', latitude: lat, longitude: lon,
        temperature: forecast.current.temperature_2m,
        apparent: forecast.current.apparent_temperature,
        humidity: forecast.current.relative_humidity_2m,
        wind: forecast.current.wind_speed_10m,
        code: forecast.current.weather_code,
      });
    } catch (err) {
      if (id === request.current) setError(err instanceof Error ? err.message : 'Could not load weather.');
    } finally {
      if (id === request.current) setLoading(false);
    }
  };

  useEffect(() => {
    const lib = window.maplibregl;
    if (!container.current || !lib) {
      setError('Map could not load. Check your connection and refresh.');
      return;
    }
    const instance = new lib.Map({
      container: container.current,
      style: {
        version: 8,
        sources: { osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OpenStreetMap contributors' } },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [44.8271, 41.7151], zoom: 5.5, minZoom: 2, maxZoom: 18,
      attributionControl: false,
      fadeDuration: 0,
    });
    map.current = instance;
    instance.addControl(new lib.NavigationControl({ showCompass: false }), 'top-left');
    instance.addControl(new lib.AttributionControl({ compact: true }), 'bottom-right');
    instance.on('click', (event: { lngLat: { lat: number; lng: number } }) => select.current(event.lngLat.lat, event.lngLat.lng));
    const resize = new ResizeObserver(() => instance.resize());
    resize.observe(container.current);
    return () => { resize.disconnect(); request.current++; instance.remove(); map.current = null; marker.current = null; };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#d8e4ed]">
      <div ref={container} aria-label="Interactive weather map: zoom and click to place a pin" className="weather-map h-full w-full" />
      <div className="pointer-events-none absolute top-2 right-2 z-10 max-w-[175px] rounded bg-[#2f4058]/90 px-2 py-1 text-[10px] text-white">Zoom and click to place a pin</div>
      {(loading || error) && <div className="pointer-events-none absolute bottom-6 left-2 z-10 rounded bg-white/95 px-2 py-1 text-xs text-slate-800">{error || 'Loading city weather…'}</div>}
    </div>
  );
}
