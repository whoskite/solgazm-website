'use client';

import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<ButtonProps> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`wallet-adapter-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 