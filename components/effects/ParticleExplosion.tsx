'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function ParticleExplosion() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 100 particles
    const newParticles: Particle[] = Array.from({ length: 100 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 100 + Math.random() * 500; // Random velocity
      const colors = ['#8B5CF6', '#3B82F6', '#00F0FF', '#9F7AEA'];
      
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: '50%',
            top: '50%',
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
