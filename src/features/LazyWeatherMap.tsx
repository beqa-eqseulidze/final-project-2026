import { useEffect, useRef, useState } from 'react';
import { InteractiveWeatherMap, type MapWeather } from './InteractiveWeatherMap';

declare global { interface Window { maplibregl?: any } }

let mapLibrePromise: Promise<void> | undefined;

function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve();
  if (!mapLibrePromise) {
    if (!document.querySelector('link[rel="preconnect"][href="https://tile.openstreetmap.org"]')) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://tile.openstreetmap.org';
      preconnect.crossOrigin = 'anonymous';
      document.head.append(preconnect);
    }
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
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const startLoading = () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
        idleId = undefined;
      }
      if (timerId !== undefined) {
        clearTimeout(timerId);
        timerId = undefined;
      }
      void loadMapLibre().then(
        () => { if (!cancelled) setReady(true); },
        () => { if (!cancelled) setFailed(true); },
      );
    };

    const scheduleLoading = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => startLoading(), { timeout: 1200 });
      } else {
        timerId = setTimeout(startLoading, 1000);
      }
    };

    if (!('IntersectionObserver' in window)) {
      scheduleLoading();
      return () => {
        cancelled = true;
        if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
        if (timerId !== undefined) clearTimeout(timerId);
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        scheduleLoading();
      }
    }, { rootMargin: '0px' });
    observer.observe(container);
    return () => {
      cancelled = true;
      observer.disconnect();
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) clearTimeout(timerId);
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
