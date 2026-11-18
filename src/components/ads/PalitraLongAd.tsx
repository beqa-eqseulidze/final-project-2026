import React, { useEffect, useRef, useState } from 'react';
import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';

export function PalitraLongAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
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