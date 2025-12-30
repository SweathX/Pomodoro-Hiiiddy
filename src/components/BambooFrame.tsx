'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BambooFrameProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function BambooFrame({ children, className = '', compact = false }: BambooFrameProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`bamboo-frame ${compact ? 'p-4' : 'p-8'} ${className}`}
    >
      {/* Feuilles décoratives aux coins */}
      <Leaf position="top-left" />
      <Leaf position="top-right" />
      <Leaf position="bottom-left" />
      <Leaf position="bottom-right" />

      {children}
    </motion.div>
  );
}

interface LeafProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

function Leaf({ position }: LeafProps) {
  const positionClasses = {
    'top-left': '-top-6 -left-6 rotate-[-30deg]',
    'top-right': '-top-6 -right-6 rotate-[30deg]',
    'bottom-left': '-bottom-6 -left-6 rotate-[-150deg]',
    'bottom-right': '-bottom-6 -right-6 rotate-[150deg]',
  };

  const animationDelay = {
    'top-left': 0,
    'top-right': 0.5,
    'bottom-left': 1,
    'bottom-right': 1.5,
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-12 h-8 z-10`}
      animate={{
        y: [0, -5, 0],
        rotate: position.includes('left') ? [-30, -25, -30] : [30, 25, 30],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
        delay: animationDelay[position],
      }}
    >
      {/* Feuille SVG */}
      <svg viewBox="0 0 48 32" fill="none" className="w-full h-full drop-shadow-md" aria-label="Leaf" role="img">
        <path
          d="M4 28C4 28 8 8 24 4C40 0 44 16 44 16C44 16 40 24 24 28C8 32 4 28 4 28Z"
          fill="#4a7c45"
        />
        <path
          d="M4 28C4 28 8 8 24 4"
          stroke="#2d5a27"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 20C14 20 18 12 28 10"
          stroke="#2d5a27"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M10 24C10 24 16 16 30 12"
          stroke="#2d5a27"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
}
