'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface WoodButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export function WoodButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: WoodButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'wood-button',
    secondary: 'wood-button opacity-80',
    danger: 'wood-button bg-gradient-to-b from-red-400 via-red-500 to-red-700',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
