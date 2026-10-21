/**
 * @file Modal.tsx
 * @description უნივერსალური მოდალური ფანჯრის კომპონენტი.
 * გამოიყენება CRUD ფორმების (ქალაქის, ვალუტის, სიახლის დამატება/რედაქტირება)
 * და დეტალური ცხრილების გამოსატანად.
 * გააჩნია დაბნელებული ფონი (Backdrop), Escape ღილაკზე დახურვა და სქროლის დაბლოკვა.
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;            // გახსნილია თუ არა მოდალი
  onClose: () => void;        // დახურვის callback ფუნქცია
  title: string;              // მოდალის სათაური
  subtitle?: string;          // ქვესათაური
  children: React.ReactNode;  // შიგთავსი (ფორმები, ცხრილები და ა.შ.)
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // მაქსიმალური სიგანე
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  // Escape ღილაკზე მოდალის დახურვა და body-ს სქროლის კონტროლი
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ზომების შესაბამისი Tailwind კლასები
  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* დაბნელებული ფონი (Backdrop) */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* მოდალური დიალოგი */}
      <div
        className={`relative w-full ${widthClasses} bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* მოდალის ჰედერი ლურჯი გრადიენტით */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-sky-700 to-sky-900 text-white">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            {subtitle && <p className="text-xs text-sky-200 mt-0.5">{subtitle}</p>}
          </div>
          {/* დახურვის ღილაკი (X) */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            aria-label="დახურვა"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* მოდალის სხეული (Body) */}
        <div className="p-5 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
