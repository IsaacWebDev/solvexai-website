'use client'

import { ReactNode, CSSProperties } from 'react'
import { clayTokens, getClayStyles, clayClasses } from '@/lib/claymorph-styles'

export interface ClayCardProps {
  children: ReactNode
  variant?: 'soft' | 'hard' | 'inset'
  elevation?: 'sm' | 'md' | 'lg'
  className?: string
  hover?: boolean
  style?: CSSProperties
  onClick?: () => void
}

export function ClayCard({
  children,
  variant = 'soft',
  elevation = 'md',
  className = '',
  hover = true,
  style = {},
  onClick,
}: ClayCardProps) {
  const baseStyles = getClayStyles(elevation, 'light')
  
  // Variant-specific shadow adjustments
  const variantShadow = {
    soft: clayTokens.shadows[elevation].light,
    hard: `
      0 0 0 2px rgba(0, 0, 0, 0.1),
      ${clayTokens.shadows[elevation].light}
    `,
    inset: `
      inset 0 4px 8px rgba(0, 0, 0, 0.1),
      inset 0 8px 16px rgba(0, 0, 0, 0.05),
      0 2px 4px rgba(255, 255, 255, 0.5)
    `,
  }

  return (
    <div
      className={`
        ${clayClasses.card[elevation]}
        ${hover ? clayClasses.hover : ''}
        ${hover ? clayClasses.active : ''}
        dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800
        ${className}
      `}
      style={{
        ...baseStyles,
        boxShadow: variantShadow[variant],
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ClayCard
