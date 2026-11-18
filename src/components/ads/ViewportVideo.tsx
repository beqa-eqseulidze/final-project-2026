import { useEffect, useRef, useState } from 'react';

interface ViewportVideoProps {
  src: string;
  className: string;
}

export function ViewportVideo({ src, className }: ViewportVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) void videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      {shouldLoad && <video ref={videoRef} src={src} autoPlay loop muted playsInline preload="none" className={className} />}
    </div>
  );
}
