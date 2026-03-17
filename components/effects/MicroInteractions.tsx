'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export function RippleButton({ children, onClick, className = '', variant = 'primary' }: RippleButtonProps) {
  const baseClass = variant === 'primary' 
    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
    : 'bg-white/5 text-white border border-white/10'
  
  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium ${baseClass} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 1 }}
        whileHover={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface ShakeOnErrorProps {
  children: ReactNode
  error?: boolean
}

export function ShakeOnError({ children, error }: ShakeOnErrorProps) {
  return (
    <motion.div
      animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        rotateX: 5,
        rotateY: 5,
        scale: 1.02
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export function Confetti() {
  const particles = Array.from({ length: 50 })
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: '50%',
            top: '50%'
          }}
          initial={{ 
            x: 0, 
            y: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}

interface TypewriterProps {
  text: string
  delay?: number
  className?: string
}

export function Typewriter({ text, delay = 0, className = '' }: TypewriterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + (i * 0.05) }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface FloatOnHoverProps {
  children: ReactNode
  className?: string
}

export function FloatOnHover({ children, className = '' }: FloatOnHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}

interface PulseProps {
  children: ReactNode
  className?: string
}

export function Pulse({ children, className = '' }: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}
