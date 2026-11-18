import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  minHeight: number;
  className?: string;
}

export function DeferredSection({ children, minHeight, className = '' }: DeferredSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '500px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={className} style={{ minHeight }}>
      {isNearViewport ? children : null}
    </div>
  );
}
