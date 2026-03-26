'use client'
import { motion } from 'framer-motion'
import { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({ children, href, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = "relative px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 overflow-hidden group min-h-[48px] min-w-[48px]"
  
  const variantStyles = variant === 'primary'
    ? "text-white border border-white/15 hover:border-white/25"
    : "bg-white/5 backdrop-blur-sm text-white border border-white/12 hover:bg-white/8 hover:border-white/20"
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }
  
  const content = (
    <>
      {/* Liquid glass base with backdrop blur */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: variant === 'primary' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      />
      
      {/* Subtle accent glow (hover) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Flowing shine effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </>
  )
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        onClick={handleClick}
        whileHover={{ 
          scale: 1.02, 
          y: -2,
          boxShadow: '0 12px 40px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ cursor: 'pointer' }}
      >
        {content}
      </motion.a>
    )
  }
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: '0 12px 40px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {content}
    </motion.button>
  )
}
