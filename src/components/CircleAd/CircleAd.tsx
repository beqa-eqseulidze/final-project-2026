import { useRef, useState } from 'react';
import { CircleAdProps } from './types';
import adImage from './img/CircleAD.png';

export function CircleAd({ href, size = 60 }: CircleAdProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
<<<<<<< HEAD
=======
<<<<<<< HEAD
  
  // გადათრევის სტატუსი
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // გადაადგილდა თუ არა (რომ click არ მოხდეს)

  // თითის დაჭერისას საწყისი კოორდინატები
=======
>>>>>>> master
  const [isDragging, setIsDragging] = useState(false);
  const [showDeleteTarget, setShowDeleteTarget] = useState(false);
  const [isOverDeleteTarget, setIsOverDeleteTarget] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const deleteTargetRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
=======
>>>>>>> 8567b9ff214f7eff194b004bc90b3a2cab273f98
>>>>>>> master
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const initialCenter = useRef({ x: 0, y: 0 });
  const isOverTargetRef = useRef(false);
  const didDrag = useRef(false);

<<<<<<< HEAD
=======
<<<<<<< HEAD
  // მაუსის დაჭერის დაწყება
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsMoving(false);
    
    // ვიმახსოვრებთ სად დააჭირა მომხმარებელმა
    dragStart.current = { x: e.clientX, y: e.clientY };
=======
>>>>>>> master
  const isInDeleteTarget = (x: number, y: number) => {
    const target = deleteTargetRef.current;
    if (!target) return false;
    const bounds = target.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    return Math.hypot(x - centerX, y - centerY) <= bounds.width / 2 + size / 2;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDismissed) return;
    const bounds = adRef.current?.getBoundingClientRect();
    if (!bounds) return;

    dragStart.current = { x: event.clientX, y: event.clientY };
<<<<<<< HEAD
=======
>>>>>>> 8567b9ff214f7eff194b004bc90b3a2cab273f98
>>>>>>> master
    initialPos.current = pos;
    initialCenter.current = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
    didDrag.current = false;
    isOverTargetRef.current = false;
    setIsDragging(true);
    setShowDeleteTarget(true);
    setIsOverDeleteTarget(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

<<<<<<< HEAD
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
=======
<<<<<<< HEAD
  // მაუსის მოძრაობა (თრევა)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    // ვითვლით რამდენად გადაადგილდა მაუსი
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    // თუ მოძრაობა 5 პიქსელზე მეტია -- ვთვლით რომ გადაათრია
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setIsMoving(true);
    }

    // ვაყენებთ ბურთის ახალ პოზიციას
    setPos({
      x: initialPos.current.x + dx,
      y: initialPos.current.y + dy,
    });
  };

  // მაუსზე ხელის გაშვება
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // ეკრანის სიგანის ნახევრის პოვნა
    const halfScreen = window.innerWidth / 2;
        
    // თუ მაუსი ეკრანის მარცხენა ნახევარშია
    if (e.clientX < halfScreen) {
      // ბურთი მიდის მარცხენა კიდეში
      // (მარცხნივ 20px არის CSS-ში, ამიტომ აქ x: 0 ნიშნავს იქ დარჩენას)
      setPos({ x: 0, y: pos.y }); 
    } else {
      // თუ მაუსი მარჯვენა ნახევარშია
      // ბურთი უნდა გადავიდეს მარჯვენა კიდეში.
      // ვითვლით მანძილს: ეკრანის სიგანეს ვაკლებთ ბურთის ზომას და მარცხენა დაშორებას (20px)
      const rightEdgePosition = window.innerWidth - size - 20; 
      setPos({ x: rightEdgePosition, y: pos.y });
    }
=======
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
>>>>>>> 8567b9ff214f7eff194b004bc90b3a2cab273f98
>>>>>>> master

    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) didDrag.current = true;

    setPos({ x: initialPos.current.x + dx, y: initialPos.current.y + dy });
    const overTarget = isInDeleteTarget(initialCenter.current.x + dx, initialCenter.current.y + dy);
    isOverTargetRef.current = overTarget;
    setIsOverDeleteTarget(overTarget);
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // თუ ბურთი გადაადგილდა, კლიკი არ მუშაობს
    if (isMoving) return; 
    
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return(
    <div 
      className={`fixed z-[9999] rounded-full shadow-lg border-2 border-white/50 overflow-hidden bg-[#2b3a1e] flex items-center justify-center select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ 
        width: size, 
        height: size, 
        left: '20px',
        top: '50%', 
        marginTop: -size / 2,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        // ანიმაცია: 0.5 წამი, რომ ლამაზად გადავიდეს ახალ ადგილას
        transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      {/* 🆕 დავამატეთ აღწერითი alt ტექსტი */}
      <img 
        src={adImage} 
        alt="რადიო პალიტრა - FM 103.9" 
        className="w-full h-full object-cover pointer-events-none" 
      />
    </div>
=======
>>>>>>> master
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    const overTarget = isOverTargetRef.current || isInDeleteTarget(
      initialCenter.current.x + dx,
      initialCenter.current.y + dy,
    );

    setIsDragging(false);
    setShowDeleteTarget(false);
    setIsOverDeleteTarget(false);
    isOverTargetRef.current = false;

    if (overTarget) {
      setIsDismissed(true);
    } else {
      const releaseY = initialPos.current.y + dy;
      const rightPosition = Math.max(0, window.innerWidth - size - 40);
      setPos({ x: event.clientX < window.innerWidth / 2 ? 0 : rightPosition, y: releaseY });
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      event.preventDefault();
      didDrag.current = false;
      return;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const deleteTargetBounds = isOverDeleteTarget
    ? deleteTargetRef.current?.getBoundingClientRect()
    : undefined;
  const adDockedStyle = deleteTargetBounds
    ? {
        left: deleteTargetBounds.left + deleteTargetBounds.width / 2 - size / 2,
        top: deleteTargetBounds.top + deleteTargetBounds.height / 2 - size / 2,
        marginTop: 0,
        transform: 'scale(0.85)',
      }
    : {
        left: 20,
        top: '50%',
        marginTop: -size / 2,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      };

  if (isDismissed) return null;

  return (
    <>
      {showDeleteTarget && (
        <div
          ref={deleteTargetRef}
          aria-label="Drop here to close ad"
          className={`pointer-events-none fixed left-1/2 z-[10000] flex h-[92px] w-[92px] -translate-x-1/2 items-center justify-center rounded-full transition-all duration-150 ${
            isOverDeleteTarget
              ? 'scale-110 border-white bg-transparent text-white'
              : 'border-white bg-transparent text-white'
          }`}
          style={{ bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 78,
              height: 78,
              border: '2px solid #fff',
              borderRadius: '50%',
              background: 'transparent',
              pointerEvents: 'none',
            }}
          />
          <svg aria-hidden="true" viewBox="0 0 24 24" className="relative z-10 h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </div>
      )}

      <div
        ref={adRef}
        className={`fixed z-[9999] flex select-none touch-none items-center justify-center overflow-hidden rounded-full border-2 border-white/50 bg-[#2b3a1e] shadow-lg ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          width: size,
          height: size,
          ...adDockedStyle,
          transition: isDragging
            ? isOverDeleteTarget
              ? 'left 180ms ease-out, top 180ms ease-out, transform 180ms ease-out'
              : 'none'
            : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
      >
        <img
          src={adImage}
          alt="Radio Palitra"
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
    </>
<<<<<<< HEAD
=======
>>>>>>> 8567b9ff214f7eff194b004bc90b3a2cab273f98
>>>>>>> master
  );
}