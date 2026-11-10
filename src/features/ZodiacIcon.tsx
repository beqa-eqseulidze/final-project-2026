/**
 * @file ZodiacIcon.tsx
 * @description 12 ზოდიაქოს ნიშნის სუფთა SVG ვექტორული ხატულები amindi.ge-ს ზუსტი სტილით.
 * იცავს სისტემური emoji-ებისგან (Apple purple square emojis) და უზრუნველყოფს სწორ ფერსა და ზომას.
 */

import React from 'react';

interface ZodiacIconProps {
  signId: string;
  className?: string;
}

export const ZodiacIcon: React.FC<ZodiacIconProps> = ({ signId, className = 'w-5 h-5' }) => {
  const normalizedId = signId.toLowerCase();

  const renderPath = () => {
    switch (normalizedId) {
      case 'aries':
        return (
          <path
            d="M12 21V10 M12 10C10.5 6 6 5.5 4.5 9C3.5 11.5 5 14 7 13 M12 10C13.5 6 18 5.5 19.5 9C20.5 11.5 19 14 17 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'taurus':
        return (
          <path
            d="M6 4C7.5 7.5 9.5 8.5 12 8.5C14.5 8.5 16.5 7.5 18 4 M12 20.5A6 6 0 1 0 12 8.5A6 6 0 1 0 12 20.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'gemini':
        return (
          <path
            d="M5 4.5C9.5 6.5 14.5 6.5 19 4.5 M5 19.5C9.5 17.5 14.5 17.5 19 19.5 M9 5.5V18.5 M15 5.5V18.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'cancer':
        return (
          <>
            <circle cx="7.5" cy="9.5" r="3" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path
              d="M10.5 9.5C10.5 6 14 5 18 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="16.5" cy="14.5" r="3" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path
              d="M13.5 14.5C13.5 18 10 19 6 16.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </>
        );
      case 'leo':
        return (
          <>
            <circle cx="6.5" cy="15.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path
              d="M8.5 14C9.5 8 13 4 16 5C19 6 18.5 10.5 16 12.5C14 14 14.5 18 17 19C19 19.8 20 18.5 20.5 17.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case 'virgo':
        return (
          <path
            d="M4 6V17.5 M4 9C5 6.5 7.5 6.5 8.5 9V17.5 M8.5 9C9.5 6.5 12 6.5 13 9V17.5C13 19.5 14.5 20.5 16 19.5C17.5 18.5 17.5 15.5 14.5 16 M15 19L19.5 13.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'libra':
        return (
          <path
            d="M3 19.5H21 M3 15.5H7.5C8 11.5 9.8 9 12 9C14.2 9 16 11.5 16.5 15.5H21"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'scorpio':
        return (
          <path
            d="M3 6V17 M3 9C4 6.5 6.5 6.5 7.5 9V17 M7.5 9C8.5 6.5 11 6.5 12 9V17.5C12 18.8 13.5 19.5 15 19L20.5 19 M18 16.5L21 19L18 21.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'sagittarius':
        return (
          <path
            d="M4.5 19.5L19.5 4.5 M13 4.5H19.5V11 M9.5 10.5L13.5 14.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'capricorn':
        return (
          <path
            d="M4 6.5L8 16L12 8C13.5 5 15.5 5.5 16.5 8C17.2 10.5 14.5 13.5 14.5 16.5C14.5 19 16 20.5 18 19.5C19.5 18.5 19.5 16.5 18.5 15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'aquarius':
        return (
          <path
            d="M3 8.5L6.5 5.5L10 8.5L13.5 5.5L17 8.5L21 5.5 M3 15.5L6.5 12.5L10 15.5L13.5 12.5L17 15.5L21 12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'pisces':
        return (
          <path
            d="M6 4C8.5 9 8.5 15 6 20 M18 4C15.5 9 15.5 15 18 20 M3.5 12H20.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {renderPath()}
    </svg>
  );
};
