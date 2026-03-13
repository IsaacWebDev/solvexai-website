'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticCursorProps {
  children: ReactNode;
  strength?: number; // 0-1, how strong the magnetic pull is
  distance?: number; // pixels, activation distance
}

export default function MagneticCursor({ 
  children, 
  strength = 0.3, 
  distance = 200 
}: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Magnetic pull when within activation distance
      if (distanceFromCenter < distance) {
        const pull = (distance - distanceFromCenter) / distance;
        setPosition({
          x: distanceX * pull * strength,
          y: distanceY * pull * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength, distance]);

  return (
    <motion.div
      ref={ref}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
