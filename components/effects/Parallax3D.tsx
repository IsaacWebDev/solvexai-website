'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface Parallax3DProps {
  children: ReactNode;
  layers?: number; // How many parallax layers (1-3)
}

export default function Parallax3D({ children, layers = 3 }: Parallax3DProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    setMousePos({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    });
  };

  // Calculate parallax offset based on layer depth
  const getLayerOffset = (depth: number) => {
    const intensity = depth * 0.02; // 0.02, 0.04, 0.06
    return {
      x: mousePos.x * intensity,
      y: mousePos.y * intensity,
    };
  };

  return (
    <div 
      className="relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background layer (slowest) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
        style={{
          x: getLayerOffset(1).x,
          y: getLayerOffset(1).y,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
      />

      {/* Middle layer (medium speed) */}
      {layers >= 2 && (
        <motion.div
          className="absolute inset-0"
          style={{
            x: getLayerOffset(2).x,
            y: getLayerOffset(2).y,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          {/* Optional middle layer content */}
        </motion.div>
      )}

      {/* Foreground layer (fastest) - Main content */}
      <motion.div
        className="relative z-10"
        style={{
          x: layers >= 3 ? getLayerOffset(3).x : 0,
          y: layers >= 3 ? getLayerOffset(3).y : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
