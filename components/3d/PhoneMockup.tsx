'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function PhoneMockup() {
  const [talking, setTalking] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTalking(prev => !prev)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Sound Wave Rings */}
      {talking && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SoundWaveRing delay={0} color="rgba(139, 92, 246, 0.4)" />
          <SoundWaveRing delay={0.3} color="rgba(59, 130, 246, 0.4)" />
          <SoundWaveRing delay={0.6} color="rgba(0, 240, 255, 0.4)" />
        </div>
      )}
      
      {/* iPhone Mockup with Floating Animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateY: [-5, 5, -5],
          rotateX: [2, -2, 2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <img 
          src="/iphone-pro-mockup.png" 
          alt="SolveXAI AI Receptionist"
          className="w-full max-w-[350px] h-auto drop-shadow-2xl"
          style={{
            filter: talking ? 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.6))' : 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
            transition: 'filter 0.3s ease-in-out'
          }}
        />
      </motion.div>
    </div>
  )
}

function SoundWaveRing({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full border-2"
      style={{
        borderColor: color,
        width: '300px',
        height: '300px',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.5, 0.8],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  )
}
