import { useEffect, useRef, useState } from 'react';
import shortAdVideo from '../../assets/ads/Palitra-SHORT.mp4';

export function PalitraShortAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleLoad = () => {
      timer = setTimeout(() => setShouldLoad(true), 1500);
    };

    if (!('IntersectionObserver' in window)) {
      scheduleLoad();
      return () => { if (timer) clearTimeout(timer); };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleLoad();
          observer.disconnect();
        }
      },
      { rootMargin: '100px' },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-[#102238]/20">
      {shouldLoad ? (
        <video
          src={shortAdVideo}
          autoPlay
          loop
          preload="metadata"
          muted
          playsInline
          aria-label="რეკლამა: პალიტრა"
          className="w-full h-full object-cover scale-[1]"
        />
      ) : null}
    </div>
  );
}
