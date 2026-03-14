'use client';

import { motion } from 'framer-motion';

interface JellyfishProps {
  delay: number;
  duration: number;
  x: number;
  y: number;
  scale?: number;
  color?: string;
}

const Jellyfish = ({ 
  delay, 
  duration, 
  x, 
  y, 
  scale = 1,
  color = '#8B5CF6' // Purple
}: JellyfishProps) => {
  // Generate random path for organic movement
  const pathX = [
    x,
    x + (Math.random() * 300 - 150),
    x + (Math.random() * 200 - 100),
    x
  ];
  
  const pathY = [
    y,
    y - (Math.random() * 400 + 200),
    y + (Math.random() * 150),
    y
  ];

  return (
    <motion.div
      className="absolute will-change-transform"
      initial={{ x: pathX[0], y: pathY[0], opacity: 0 }}
      animate={{
        x: pathX,
        y: pathY,
        opacity: [0, 0.5, 0.7, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ scale }}
    >
      {/* Jellyfish SVG */}
      <svg 
        width={Math.floor(120 * scale)} 
        height={Math.floor(180 * scale)} 
        viewBox="0 0 120 180"
        style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))' }}
      >
        {/* Dome with pulsing animation */}
        <ellipse
          cx="60"
          cy="50"
          rx="50"
          ry="40"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        
        {/* Inner dome glow */}
        <ellipse
          cx="60"
          cy="50"
          rx="40"
          ry="30"
          fill={color}
          opacity="0.2"
        />
        
        {/* Tentacles (12 total) */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 60 + Math.cos(angle) * 45;
          const y1 = 90;
          const x2 = 60 + Math.cos(angle) * 50;
          const y2 = 170;
          
          // Control points for bezier curve
          const cp1x = x2 + Math.sin(angle) * 20;
          const cp1y = (y1 + y2) / 2;
          
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cp1x} ${cp1y} ${x2} ${y2}`}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.7"
            />
          );
        })}
        
        {/* LED dots on dome */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const radius = 35 + (Math.floor(i / 4) * 8);
          const cx = 60 + Math.cos(angle) * radius;
          const cy = 50 - Math.sin(angle) * (radius * 0.6);
          
          return (
            <circle
              key={`dot-${i}`}
              cx={cx}
              cy={cy}
              r="2"
              fill={color}
              opacity="0.8"
            />
          );
        })}
        
        {/* Outer glow */}
        <ellipse
          cx="60"
          cy="50"
          rx="55"
          ry="45"
          fill={color}
          opacity="0.1"
          style={{ filter: 'blur(15px)' }}
        />
      </svg>
    </motion.div>
  );
};

export const AnimatedJellyfishBG = () => {
  // Define jellyfish with varied positions, sizes, and colors
  const jellyfishConfig: JellyfishProps[] = [
    { delay: 0, duration: 20, x: 100, y: 100, scale: 1.2, color: '#8B5CF6' },
    { delay: 3, duration: 25, x: 800, y: 300, scale: 0.8, color: '#3B82F6' },
    { delay: 6, duration: 22, x: 300, y: 500, scale: 1.0, color: '#8B5CF6' },
    { delay: 9, duration: 24, x: 1200, y: 200, scale: 0.9, color: '#3B82F6' },
    { delay: 12, duration: 21, x: 600, y: 600, scale: 1.1, color: '#8B5CF6' },
    { delay: 15, duration: 23, x: 1000, y: 400, scale: 0.7, color: '#3B82F6' },
    { delay: 18, duration: 26, x: 1400, y: 100, scale: 1.0, color: '#8B5CF6' },
    { delay: 21, duration: 19, x: 200, y: 700, scale: 0.85, color: '#3B82F6' },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      
      {/* Jellyfish swarm */}
      {jellyfishConfig.map((config, i) => (
        <Jellyfish key={i} {...config} />
      ))}
      
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
};
