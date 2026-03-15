'use client'
import { motion } from 'framer-motion'

interface RealisticToggleProps {
  options: [string, string]
  value: string
  onChange: (value: string) => void
}

export function RealisticToggle({ options, value, onChange }: RealisticToggleProps) {
  const isSecondOption = value === options[1]
  
  return (
    <div className="relative inline-flex p-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.1)]">
      {/* Track groove */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-950 to-gray-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]" />
      
      {/* Sliding knob */}
      <motion.div
        className="absolute top-2 h-[calc(100%-16px)] rounded-full bg-gradient-to-b from-purple-500 to-purple-700 shadow-[0_4px_12px_rgba(139,92,246,0.5),0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
        animate={{ 
          x: isSecondOption ? 'calc(100% - 4px)' : '4px',
          width: 'calc(50% - 4px)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Highlight on top of knob */}
        <div className="absolute top-1 left-1/4 right-1/4 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm" />
      </motion.div>
      
      {/* Labels */}
      <div className="relative z-10 flex">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className="px-8 py-3 text-sm font-medium transition-all duration-300"
            style={{ 
              color: value === option ? 'white' : 'rgba(255,255,255,0.5)',
              textShadow: value === option ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
