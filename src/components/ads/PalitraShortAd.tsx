import React, { useEffect, useRef, useState } from 'react';
import shortAdVideo from '../../assets/ads/Palitra-SHORT.mp4';

export function PalitraShortAd() {
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
          src={shortAdVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-label="რეკლამა: პალიტრა"
          className="w-full h-full object-cover scale-[1]"
        />
      ) : null}
    </div>
  );
}