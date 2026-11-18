import { useEffect, useRef, useState } from 'react';

export function ViewportVideo({ src, className }: { src: string; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: '250px' });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      {shouldLoad && <video src={src} autoPlay loop preload="none" muted playsInline className={className} />}
    </div>
  );
}
