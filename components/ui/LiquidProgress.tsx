'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LiquidProgressProps {
  progress: number // 0-100
  variant?: 'water' | 'fire' | 'galaxy'
  height?: number
  className?: string
}

export function LiquidProgress({ 
  progress, 
  variant = 'water',
  height = 40,
  className = ''
}: LiquidProgressProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const colors = {
    water: {
      gradient: 'from-blue-400 via-cyan-400 to-blue-500',
      glow: 'shadow-blue-500/50'
    },
    fire: {
      gradient: 'from-orange-500 via-red-500 to-yellow-500',
      glow: 'shadow-orange-500/50'
    },
    galaxy: {
      gradient: 'from-purple-500 via-pink-500 to-blue-500',
      glow: 'shadow-purple-500/50'
    }
  }
  
  const { gradient, glow } = colors[variant]
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-white/5 ${className}`}
      style={{ height }}
    >
      {/* Liquid Fill */}
      <motion.div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient}`}
        initial={{ width: 0 }}
        animate={{ width: mounted ? `${progress}%` : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      
      {/* Wave Animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'url(#goo)' }}
      >
        <defs>
          {/* Goo Effect for Liquid */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
          
          {/* Gradient for Wave */}
          <linearGradient id={`wave-gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={variant === 'water' ? 'text-blue-400' : variant === 'fire' ? 'text-orange-500' : 'text-purple-500'} stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" className={variant === 'water' ? 'text-cyan-400' : variant === 'fire' ? 'text-red-500' : 'text-pink-500'} stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" className={variant === 'water' ? 'text-blue-500' : variant === 'fire' ? 'text-yellow-500' : 'text-blue-500'} stopColor="currentColor" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Animated Wave Path */}
        <motion.path
          d={`M 0 ${height / 2} Q ${height / 4} ${height / 4}, ${height / 2} ${height / 2} T ${height} ${height / 2} V ${height} H 0 Z`}
          fill={`url(#wave-gradient-${variant})`}
          initial={{ x: -height }}
          animate={{ 
            x: mounted ? (progress / 100) * 300 : -height,
            d: [
              `M 0 ${height / 2} Q ${height / 4} ${height / 4}, ${height / 2} ${height / 2} T ${height} ${height / 2} V ${height} H 0 Z`,
              `M 0 ${height / 2} Q ${height / 4} ${height * 0.75}, ${height / 2} ${height / 2} T ${height} ${height / 2} V ${height} H 0 Z`,
              `M 0 ${height / 2} Q ${height / 4} ${height / 4}, ${height / 2} ${height / 2} T ${height} ${height / 2} V ${height} H 0 Z`
            ]
          }}
          transition={{ 
            x: { duration: 2, ease: 'easeOut' },
            d: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
      </svg>
      
      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-30 blur-xl ${glow}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted && progress > 0 ? 0.3 : 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-white font-bold text-sm drop-shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  )
}
