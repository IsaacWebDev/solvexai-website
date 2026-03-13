'use client';

import { motion } from 'framer-motion';

interface LiquidBlobProps {
  color1?: string;
  color2?: string;
}

export default function LiquidBlob({ 
  color1 = '#8B5CF6', 
  color2 = '#3B82F6' 
}: LiquidBlobProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <filter id="blob-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" />
          </filter>
        </defs>

        {/* Blob 1 */}
        <motion.circle
          fill="url(#blob-gradient)"
          filter="url(#blob-filter)"
          animate={{
            cx: ['30%', '70%', '30%'],
            cy: ['50%', '30%', '50%'],
            r: [200, 300, 200],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blob 2 */}
        <motion.circle
          fill="url(#blob-gradient)"
          filter="url(#blob-filter)"
          animate={{
            cx: ['70%', '30%', '70%'],
            cy: ['40%', '60%', '40%'],
            r: [250, 180, 250],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blob 3 */}
        <motion.ellipse
          fill="url(#blob-gradient)"
          filter="url(#blob-filter)"
          animate={{
            cx: ['50%', '60%', '50%'],
            cy: ['70%', '50%', '70%'],
            rx: [150, 200, 150],
            ry: [200, 150, 200],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
