import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'lg', 
    className, 
    children, 
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = 'font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      tertiary: 'btn-tertiary'
    }
    
    const sizes = {
      sm: 'px-6 py-3 text-sm',
      md: 'px-8 py-4 text-base',
      lg: '' // lg sizing is in the base variant classes
    }
    
    return (
      <button 
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          variants[variant],
          size !== 'lg' && sizes[size], // Only apply size classes for sm/md
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
