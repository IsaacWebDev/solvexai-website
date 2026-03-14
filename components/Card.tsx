'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Card({ children, delay = 0, className = '' }: CardProps) {
  return (
    <motion.div
      className={`glass-card p-8 rounded-3xl ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </motion.div>
  )
}
