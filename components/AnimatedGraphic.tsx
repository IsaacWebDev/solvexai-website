'use client';

import { motion } from 'framer-motion';

export default function AnimatedGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Rotating rings */}
      <motion.div
        className="absolute w-96 h-96"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 border-2 border-[#00F0FF]/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute w-80 h-80"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 border-2 border-[#0066FF]/20 rounded-full" />
      </motion.div>

      {/* Central glass cube */}
      <motion.div
        className="relative w-64 h-64 glass-card flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Brain/Neural network representation */}
        <div className="relative w-48 h-48">
          {/* Central node */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00F0FF] pulse-glow"
            style={{
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 102, 255, 0.4)'
            }}
          />

          {/* Orbital nodes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
            const radian = (angle * Math.PI) / 180;
            const radius = 60;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            return (
              <motion.div
                key={angle}
                className="absolute w-4 h-4 rounded-full bg-[#e040fb]"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 10px rgba(224, 64, 251, 0.6)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const radian = (angle * Math.PI) / 180;
              const radius = 60;
              const x = Math.cos(radian) * radius + 96;
              const y = Math.sin(radian) * radius + 96;

              return (
                <motion.line
                  key={`line-${angle}`}
                  x1="96"
                  y1="96"
                  x2={x}
                  y2={y}
                  stroke="#00F0FF"
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00F0FF]" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#00F0FF]"
          style={{
            left: `${50 + (Math.random() - 0.5) * 100}%`,
            top: `${50 + (Math.random() - 0.5) * 100}%`,
            boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)'
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
