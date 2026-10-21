/**
 * @file Button.tsx
 * @description მრავალჯერადი გამოყენების ღილაკის კომპონენტი (Reusable Button).
 * მხარს უჭერს სხვადასხვა ვარიანტს (primary, secondary, danger, amindi, outline),
 * ზომებს (sm, md, lg), ჩატვირთვის ინდიკატორს (isLoading) და ხატულებს.
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'amindi';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded transition-all cursor-pointer focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed select-none';

  // ზომების კლასები
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }[size];

  // ვიზუალური სტილების ვარიანტები
  const variantClasses = {
    primary: 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-xs',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs',
    outline: 'border border-sky-600 text-sky-700 hover:bg-sky-50 active:bg-sky-100',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    amindi:
      'bg-gradient-to-r from-cyan-600 to-sky-700 hover:from-cyan-500 hover:to-sky-600 text-white shadow-sm border border-cyan-400/30 font-semibold',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* ჩატვირთვის სპინერი */}
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </button>
  );
};
