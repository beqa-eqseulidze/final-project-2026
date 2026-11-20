import { useEffect, useRef } from 'react';

interface LazyAutoplayVideoProps {
  src: string;
  className: string;
  ariaLabel?: string;
  delayMs?: number;
}

export function LazyAutoplayVideo({ src, className, ariaLabel, delayMs = 1500 }: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let sourceAssigned = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const startPlayback = () => {
      if (!sourceAssigned) {
        video.src = src;
        video.load();
        sourceAssigned = true;
      }
      void video.play().catch(() => undefined);
    };

    const schedulePlayback = () => {
      if (sourceAssigned || delayMs <= 0) {
        startPlayback();
        return;
      }
      if (!timer) {
        timer = setTimeout(() => {
          timer = undefined;
          startPlayback();
        }, delayMs);
      }
    };

    if (!('IntersectionObserver' in window)) {
      schedulePlayback();
      return () => {
        if (timer) clearTimeout(timer);
        video.pause();
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) schedulePlayback();
      else {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        video.pause();
      }
    }, { rootMargin: '150px' });
    observer.observe(video);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      video.pause();
    };
  }, [src, delayMs]);

  return <video ref={videoRef} loop preload="none" muted playsInline aria-label={ariaLabel} className={className} />;
}