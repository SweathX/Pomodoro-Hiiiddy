'use client';

import { motion } from 'framer-motion';

export function BackgroundDecorations() {
  return (
    <>
      {/* Bamboo stalks on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-20 opacity-20 pointer-events-none">
        <BambooStalk delay={0} />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-20 opacity-20 pointer-events-none">
        <BambooStalk delay={1} />
      </div>

      {/* Floating leaves */}
      {LEAF_POSITIONS.map((pos, i) => (
        <FloatingLeaf key={`leaf-${i}`} index={i} position={pos} />
      ))}
    </>
  );
}

const LEAF_POSITIONS = [
  { left: '10%', top: '20%' },
  { left: '85%', top: '15%' },
  { left: '15%', top: '70%' },
  { left: '80%', top: '75%' },
  { left: '5%', top: '45%' },
  { left: '90%', top: '50%' },
];

function BambooStalk({ delay }: { delay: number }) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <svg viewBox="0 0 80 800" className="h-full w-full" preserveAspectRatio="none" aria-label="Bamboo stalks" role="img">
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={`bamboo-segment-${i}`}>
            <rect
              x="30"
              y={i * 80}
              width="20"
              height="75"
              fill="url(#bambooGradient)"
              rx="2"
            />
            <ellipse
              cx="40"
              cy={i * 80 + 75}
              rx="12"
              ry="4"
              fill="#654321"
            />
          </g>
        ))}
        <defs>
          <linearGradient id="bambooGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a7c45" />
            <stop offset="50%" stopColor="#6b9b65" />
            <stop offset="100%" stopColor="#4a7c45" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

interface FloatingLeafProps {
  index: number;
  position: { left: string; top: string };
}

function FloatingLeaf({ index, position }: FloatingLeafProps) {
  return (
    <motion.div
      className="absolute w-8 h-6 opacity-30 pointer-events-none"
      style={position}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4 + index,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
        delay: index * 0.5,
      }}
    >
      <svg viewBox="0 0 32 24" fill="none" aria-label="Floating leaf" role="img">
        <path
          d="M2 20C2 20 6 4 16 2C26 0 30 12 30 12C30 12 26 18 16 20C6 22 2 20 2 20Z"
          fill="#4a7c45"
        />
      </svg>
    </motion.div>
  );
}
