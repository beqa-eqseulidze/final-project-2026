import { useEffect, useRef, useState } from 'react';
import { InteractiveWeatherMap, type MapWeather } from './InteractiveWeatherMap';

declare global { interface Window { maplibregl?: any } }

let mapLibrePromise: Promise<void> | undefined;

function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve();
  if (!mapLibrePromise) {
    mapLibrePromise = Promise.all([
      new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';
        link.onload = () => resolve();
        link.onerror = () => reject(new Error('Map styles failed to load'));
        document.head.append(link);
      }),
      new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Map library failed to load'));
        document.head.append(script);
      }),
    ]).then(() => undefined);
  }
  return mapLibrePromise;
}

export function LazyWeatherMap({ onWeatherSelect }: { onWeatherSelect: (weather: MapWeather) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    const startLoading = () => {
      void loadMapLibre().then(
        () => { if (!cancelled) setReady(true); },
        () => { if (!cancelled) setFailed(true); },
      );
    };

    if (!('IntersectionObserver' in window)) {
      startLoading();
      return () => { cancelled = true; };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        startLoading();
      }
    }, { rootMargin: '0px' });
    observer.observe(container);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {ready || failed
        ? <InteractiveWeatherMap onWeatherSelect={onWeatherSelect} />
        : <div className="h-full w-full bg-[#d8e4ed]" aria-hidden="true" />}
    </div>
  );
}
