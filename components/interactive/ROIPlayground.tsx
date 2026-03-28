'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard } from '@/components/ui'
import { DollarSign, Clock, Zap, Briefcase, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Industry presets with typical data
const industryPresets = {
  dentist: {
    name: 'Dentist',
    hours: 18,
    rate: 150,
    stat: 'Dentists spend 18hrs/week on scheduling & admin',
    icon: '🦷'
  },
  restaurant: {
    name: 'Restaurant',
    hours: 25,
    rate: 40,
    stat: 'Restaurant owners lose 25hrs/week on reservations',
    icon: '🍽️'
  },
  lawyer: {
    name: 'Law Firm',
    hours: 22,
    rate: 200,
    stat: 'Law firms bill $200/hr but waste 22hrs on admin',
    icon: '⚖️'
  },
  fitness: {
    name: 'Fitness Studio',
    hours: 20,
    rate: 60,
    stat: 'Fitness studios spend 20hrs/week on bookings',
    icon: '💪'
  },
  realtor: {
    name: 'Real Estate',
    hours: 16,
    rate: 100,
    stat: 'Realtors lose 16hrs/week to scheduling & follow-ups',
    icon: '🏠'
  },
  plumber: {
    name: 'Home Services',
    hours: 15,
    rate: 75,
    stat: 'Service pros spend 15hrs/week on calls & scheduling',
    icon: '🔧'
  },
  salon: {
    name: 'Salon/Spa',
    hours: 18,
    rate: 55,
    stat: 'Salons waste 18hrs/week on appointment management',
    icon: '💇'
  },
  medical: {
    name: 'Medical Practice',
    hours: 20,
    rate: 180,
    stat: 'Medical practices lose 20hrs/week to admin work',
    icon: '🏥'
  }
}

export function ROIPlayground() {
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [showCustom, setShowCustom] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  }, [])
  
  const yearlyLoss = hoursPerWeek * hourlyRate * 52
  const automationSavings = yearlyLoss * 0.85 // 85% time saved
  const monthlySavings = automationSavings / 12
  const weeksOfWork = Math.floor(hoursPerWeek * 52 / 40)
  const vacations = Math.floor(automationSavings / 3000)
  
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
  
  const handleIndustrySelect = (industryKey: string) => {
    const industry = industryPresets[industryKey as keyof typeof industryPresets]
    setHoursPerWeek(industry.hours)
    setHourlyRate(industry.rate)
    setSelectedIndustry(industryKey)
    setShowCustom(false)
  }
  
  const handleCustomSelect = () => {
    setSelectedIndustry(null)
    setShowCustom(true)
  }
  
  return (
    <LiquidGlassCard intensity="heavy" className="p-8 w-full">
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
        
        {/* Industry Presets */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-400 mb-4 text-center">
            Choose your industry or customize:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {Object.entries(industryPresets).map(([key, industry]) => (
              <motion.button
                key={key}
                onClick={() => handleIndustrySelect(key)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedIndustry === key
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{industry.icon}</div>
                <div className="text-sm font-medium">{industry.name}</div>
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={handleCustomSelect}
            className={`w-full p-3 rounded-xl border transition-all ${
              showCustom
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-white/10 bg-white/5 hover:border-blue-500/50'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-sm font-medium">✏️ Custom Values</span>
          </motion.button>
        </div>
        
        {/* Industry Stat */}
        <AnimatePresence mode="wait">
          {selectedIndustry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center"
            >
              <p className="text-sm text-purple-300">
                💡 {industryPresets[selectedIndustry as keyof typeof industryPresets].stat}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sliders (show when custom selected or after industry preset) */}
        <AnimatePresence mode="wait">
          {(showCustom || selectedIndustry) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-2 gap-8 mb-8"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Results */}
        {(showCustom || selectedIndustry) && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${hoursPerWeek}-${hourlyRate}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6 mb-6"
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
                    <div className="text-gray-400 text-sm mb-3">per year to manual work</div>
                    
                    {/* Enhanced Context */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>= {weeksOfWork} full work weeks per year</div>
                      <div>= {Math.floor(hoursPerWeek * 52)} hours of your life</div>
                    </div>
                    
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
                    <div className="text-gray-400 text-sm mb-3">saved per year</div>
                    
                    {/* Enhanced Context */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>= {vacations > 0 ? `${vacations} family vacations` : 'Multiple vacations'}</div>
                      <div>= {Math.floor(hoursPerWeek * 52 * 0.85)} hours back</div>
                    </div>
                    
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
            
            {/* Competitor Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-xl bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 mb-6"
            >
              <h3 className="text-lg font-bold mb-4 text-center">Compare Your Options</h3>
              <div className="space-y-3">
                <ComparisonRow label="Traditional Receptionist" cost="$3,500/mo" details="+ benefits, sick days, vacation" />
                <ComparisonRow label="Virtual Assistant" cost="$1,200/mo" details="Limited hours, time zones" />
                <ComparisonRow label="Part-time Staff" cost="$1,800/mo" details="No nights/weekends coverage" />
                <ComparisonRow 
                  label="SolvexAI Automation" 
                  cost="$297-997/mo" 
                  details="24/7, unlimited, never sick" 
                  highlight 
                  savings="YOU SAVE 70%+"
                />
              </div>
            </motion.div>
            
            {/* Coin Rain Effect */}
            <CoinRain show={automationSavings > 40000} />
          </div>
        )}
        
        {/* CTAs */}
        {(showCustom || selectedIndustry) && (
          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400 text-center">
              That's <span className="text-white font-bold">${Math.round(monthlySavings).toLocaleString()}/month</span> back in your pocket
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href={automationSavings > 50000 ? "/contact" : "/packages"}>
                <motion.button
                  className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {automationSavings > 50000 
                    ? "Book Free Consultation →"
                    : "See Automation Solutions →"
                  }
                </motion.button>
              </Link>
              
              <Link href="/contact">
                <motion.button
                  className="w-full md:w-auto border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📧 Email Me This Breakdown
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </LiquidGlassCard>
  )
}

function ComparisonRow({ 
  label, 
  cost, 
  details, 
  highlight = false,
  savings
}: { 
  label: string
  cost: string
  details: string
  highlight?: boolean
  savings?: string
}) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-all ${
      highlight 
        ? 'bg-purple-500/20 border border-purple-500/50' 
        : 'bg-white/5'
    }`}>
      <div className="flex-1">
        <div className={`font-medium ${highlight ? 'text-purple-300' : 'text-white'}`}>
          {label}
        </div>
        <div className="text-xs text-gray-500">{details}</div>
      </div>
      <div className="text-right">
        <div className={`font-bold ${highlight ? 'text-2xl gradient-text' : 'text-gray-300'}`}>
          {cost}
        </div>
        {savings && (
          <div className="text-xs text-green-400 font-bold">{savings}</div>
        )}
      </div>
    </div>
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
