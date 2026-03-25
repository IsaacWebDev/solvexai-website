'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'

const CountUp = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, end])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export const OutcomesSimple = () => {
  return (
    <section className="py-2xl px-md sm:px-lg relative z-10 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Section header - Centered */}
        <div className="text-center mb-xl w-full">
          <h2 className="text-headline font-light mb-md">
            What You Get
          </h2>
          <p className="text-body-lg text-gray-400 font-light max-w-3xl mx-auto">
            Three transformations. Immediate impact.
          </p>
        </div>
        
        {/* 3 Outcomes - Centered grid with liquid glass */}
        <div className="grid md:grid-cols-3 gap-lg max-w-6xl w-full">
          
          {/* Outcome 1 */}
          <LiquidGlassCard 
            intensity="medium" 
            className="h-full p-xl text-center border border-gray-500/30 hover:border-purple-400/50 transition-all hover:scale-105"
          >
            <div className="text-8xl font-light text-purple-400 mb-md">
              <CountUp end={10} suffix="×" />
            </div>
            <h3 className="text-title font-light mb-sm">
              Faster
            </h3>
            <p className="text-body text-gray-400 font-light leading-normal">
              Complete in minutes what used to take weeks.
            </p>
          </LiquidGlassCard>
          
          {/* Outcome 2 */}
          <LiquidGlassCard 
            intensity="medium" 
            className="h-full p-xl text-center border border-gray-500/30 hover:border-blue-400/50 transition-all hover:scale-105"
          >
            <div className="text-8xl font-light text-blue-400 mb-md">
              <CountUp end={70} suffix="%" />
            </div>
            <h3 className="text-title font-light mb-sm">
              Lower Costs
            </h3>
            <p className="text-body text-gray-400 font-light leading-normal">
              Reduce expenses while scaling output.
            </p>
          </LiquidGlassCard>
          
          {/* Outcome 3 */}
          <LiquidGlassCard 
            intensity="medium" 
            className="h-full p-xl text-center border border-gray-500/30 hover:border-cyan-400/50 transition-all hover:scale-105"
          >
            <div className="text-8xl font-light text-cyan-400 mb-md">
              <CountUp end={0} />
            </div>
            <h3 className="text-title font-light mb-sm">
              Human Error
            </h3>
            <p className="text-body text-gray-400 font-light leading-normal">
              Precision execution every single time.
            </p>
          </LiquidGlassCard>
          
        </div>
      </div>
    </section>
  )
}
