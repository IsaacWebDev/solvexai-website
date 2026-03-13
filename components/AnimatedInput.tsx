'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface AnimatedInputProps {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  pattern?: string
  error?: string
}

export function AnimatedInput({
  label,
  type,
  value,
  onChange,
  required = false,
  pattern,
  error
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [localError, setLocalError] = useState('')
  
  const validate = (val: string) => {
    if (required && !val) {
      return 'This field is required'
    }
    
    if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return 'Please enter a valid email'
    }
    
    if (pattern && val && !new RegExp(pattern).test(val)) {
      return 'Invalid format'
    }
    
    return ''
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    
    if (newValue) {
      const validationError = validate(newValue)
      setLocalError(validationError)
    } else {
      setLocalError('')
    }
  }
  
  const hasError = error || localError
  const isValid = value && !hasError
  
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-purple-400">*</span>}
      </label>
      
      <motion.input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={{
          borderColor: hasError 
            ? '#FF6B6B' 
            : isValid 
              ? '#00F0FF' 
              : isFocused 
                ? '#8B5CF6' 
                : 'rgba(255,255,255,0.1)',
          scale: hasError ? [1, 1.02, 1] : 1
        }}
        transition={{ duration: 0.2 }}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 focus:outline-none transition-all"
        style={{
          boxShadow: isValid 
            ? '0 0 20px rgba(0, 240, 255, 0.2)' 
            : hasError 
              ? '0 0 20px rgba(255, 107, 107, 0.2)' 
              : 'none'
        }}
      />
      
      {hasError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {hasError}
        </motion.div>
      )}
      
      {isValid && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-cyan-400 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Looks good!
        </motion.div>
      )}
    </div>
  )
}
