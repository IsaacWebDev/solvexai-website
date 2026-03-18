import { motion } from 'framer-motion'

interface StatCardProps {
  value: string | number
  label: string
  sublabel?: string
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'yellow' | 'red'
  delay?: number
}

const colorMap = {
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  yellow: 'text-yellow-400',
  red: 'text-red-400'
} as const

/**
 * Reusable StatCard component for displaying metrics
 * Reduces duplication across hero sections and case studies
 */
export function StatCard({ 
  value, 
  label, 
  sublabel, 
  color = 'blue',
  delay = 0 
}: StatCardProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className={`text-4xl font-bold ${colorMap[color]} mb-2`}>
        {value}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
      {sublabel && (
        <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
      )}
    </motion.div>
  )
}
