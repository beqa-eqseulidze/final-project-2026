import { useState, useRef } from 'react';
import { CircleAdProps } from './types';
import adImage from './img/CircleAD.png';

export function CircleAd({ 
  href, size = 60 
}: CircleAdProps) {

  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  // გადათრევის სტატუსი
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // გადაადგილდა თუ არა (რომ click არ მოხდეს)

  // თითის დაჭერისას საწყისი კოორდინატები
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  // მაუსის დაჭერის დაწყება
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsMoving(false);
    
    // ვიმახსოვრებთ სად დააჭირა მომხმარებელმა
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = pos;
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

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

    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

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
  );
}