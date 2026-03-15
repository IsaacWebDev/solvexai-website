'use client'

import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react'
import { clayTokens, getClayStyles, clayClasses } from '@/lib/claymorph-styles'

export interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: CSSProperties
  fullWidth?: boolean
}

export function ClayButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style = {},
  fullWidth = false,
  disabled = false,
  ...props
}: ClayButtonProps) {
  const sizeMap = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      color: '#ffffff',
      boxShadow: clayTokens.shadows.md.light,
    },
    secondary: {
      background: clayTokens.backgrounds.light.secondary,
      color: '#1F2937',
      boxShadow: clayTokens.shadows.sm.light,
    },
    ghost: {
      background: 'transparent',
      color: '#8B5CF6',
      boxShadow: 'none',
      border: '2px solid rgba(139, 92, 246, 0.2)',
    },
  }

  return (
    <button
      className={`
        font-semibold
        ${clayClasses.card.md}
        ${clayClasses.hover}
        ${clayClasses.active}
        ${sizeMap[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-purple-500/20
        dark:focus:ring-purple-400/30
        ${className}
      `}
      style={{
        ...variantStyles[variant],
        ...style,
      }}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default ClayButton
