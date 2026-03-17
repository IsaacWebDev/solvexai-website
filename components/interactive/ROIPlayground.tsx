'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard } from '@/components/ui'
import { DollarSign, Clock, Zap } from 'lucide-react'

export function ROIPlayground() {
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  }, [])
  
  const yearlyLoss = hoursPerWeek * hourlyRate * 52
  const automationSavings = yearlyLoss * 0.85 // 85% time saved
  const monthlySavings = automationSavings / 12
  
  const hoursSliderRef = useRef<HTMLInputElement>(null)
  const rateSliderRef = useRef<HTMLInputElement>(null)
  
  // Touch handler for mobile
  const handleTouch = (
    e: React.TouchEvent<HTMLInputElement>,
    setter: (value: number) => void,
    min: number,
    max: number
  ) => {
    const touch = e.touches[0]
    const slider = e.currentTarget
    const rect = slider.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
    const value = Math.round(percentage * (max - min) + min)
    setter(value)
  }
  
  return (
    <LiquidGlassCard intensity="heavy" className="p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Calculate Your Time Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          See how much you're losing to manual work
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Hours Slider */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Clock className="w-4 h-4 text-blue-400" />
              Hours on admin/week
            </label>
            <div className="relative">
              <input
                ref={hoursSliderRef}
                type="range"
                min="5"
                max="40"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                onTouchMove={(e) => handleTouch(e, setHoursPerWeek, 5, 40)}
                aria-label="Hours spent on admin per week"
                aria-valuemin={5}
                aria-valuemax={40}
                aria-valuenow={hoursPerWeek}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-br
                  [&::-webkit-slider-thumb]:from-blue-500
                  [&::-webkit-slider-thumb]:to-purple-600
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-blue-500/50
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-gradient-to-br
                  [&::-moz-range-thumb]:from-blue-500
                  [&::-moz-range-thumb]:to-purple-600
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <motion.div
                className="absolute -top-10 left-0 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold"
                style={{ left: `${((hoursPerWeek - 5) / 35) * 100}%` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {hoursPerWeek} hrs
              </motion.div>
            </div>
          </div>
          
          {/* Rate Slider */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <DollarSign className="w-4 h-4 text-green-400" />
              Your hourly rate
            </label>
            <div className="relative">
              <input
                ref={rateSliderRef}
                type="range"
                min="25"
                max="200"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                onTouchMove={(e) => handleTouch(e, setHourlyRate, 25, 200)}
                aria-label="Your hourly rate in dollars"
                aria-valuemin={25}
                aria-valuemax={200}
                aria-valuenow={hourlyRate}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-br
                  [&::-webkit-slider-thumb]:from-green-500
                  [&::-webkit-slider-thumb]:to-emerald-600
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-green-500/50
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-gradient-to-br
                  [&::-moz-range-thumb]:from-green-500
                  [&::-moz-range-thumb]:to-emerald-600
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <motion.div
                className="absolute -top-10 left-0 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold"
                style={{ left: `${((hourlyRate - 25) / 175) * 100}%` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                ${hourlyRate}/hr
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${hoursPerWeek}-${hourlyRate}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Loss Card */}
              <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm text-red-400 font-medium">YOU'RE LOSING</span>
                  </div>
                  <motion.div
                    className="text-5xl font-bold text-red-400 mb-1"
                    key={yearlyLoss}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    ${yearlyLoss.toLocaleString()}
                  </motion.div>
                  <div className="text-gray-400 text-sm">per year to manual work</div>
                  
                  {/* Animated Money Burning */}
                  <motion.div
                    className="absolute -right-4 -bottom-4 text-6xl opacity-20"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💸
                  </motion.div>
                </div>
              </div>
              
              {/* Savings Card */}
              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">WITH AUTOMATION</span>
                  </div>
                  <motion.div
                    className="text-5xl font-bold text-green-400 mb-1"
                    key={automationSavings}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    ${Math.round(automationSavings).toLocaleString()}
                  </motion.div>
                  <div className="text-gray-400 text-sm">saved per year</div>
                  
                  {/* Animated Money Growing */}
                  <motion.div
                    className="absolute -right-4 -bottom-4 text-6xl opacity-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💰
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Coin Rain Effect */}
          <CoinRain show={automationSavings > 40000} />
        </div>
        
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 mb-4">
            That's <span className="text-white font-bold">${Math.round(monthlySavings).toLocaleString()}/month</span> back in your pocket
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Fix This →
          </motion.button>
        </motion.div>
      </motion.div>
    </LiquidGlassCard>
  )
}

function CoinRain({ show }: { show: boolean }) {
  if (!show) return null
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{ 
            top: -50, 
            left: `${Math.random() * 100}%`,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            top: '120%', 
            rotate: 360,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          💰
        </motion.div>
      ))}
    </div>
  )
}
