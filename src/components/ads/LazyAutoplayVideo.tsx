import { useEffect, useRef } from 'react';

interface LazyAutoplayVideoProps {
  src: string;
  className: string;
}

export function LazyAutoplayVideo({ src, className }: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let sourceAssigned = false;

    const startPlayback = () => {
      if (!sourceAssigned) {
        video.src = src;
        video.load();
        sourceAssigned = true;
      }
      void video.play().catch(() => undefined);
    };

    if (!('IntersectionObserver' in window)) {
      startPlayback();
      return () => video.pause();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startPlayback();
      else video.pause();
    }, { rootMargin: '150px' });
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src]);

  return <video ref={videoRef} loop preload="none" muted playsInline className={className} />;
}