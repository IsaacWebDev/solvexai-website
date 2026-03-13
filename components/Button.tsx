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
  const baseStyles = "relative px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 overflow-hidden group"
  
  const variantStyles = variant === 'primary'
    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
    : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }
  
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </>
  )
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  )
}
