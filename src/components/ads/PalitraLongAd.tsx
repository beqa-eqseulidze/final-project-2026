import { useEffect, useRef, useState } from 'react';
import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';

export function PalitraLongAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleLoad = () => {
      timer = setTimeout(() => setIsInView(true), 1500);
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
      { rootMargin: '150px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-[#102238]/20">
      {isInView ? (
        <video
          src={longAdVideo}
          autoPlay
          loop
          preload="metadata"
          muted
          playsInline
          aria-label="რეკლამა: რადიო პალიტრა"
          className="w-full h-full object-contain scale-[1.02]"
        />
      ) : null}
    </div>
  );
}
