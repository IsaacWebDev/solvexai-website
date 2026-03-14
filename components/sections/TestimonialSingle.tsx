'use client'

import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'

export const TestimonialSingle = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <LiquidGlassCard 
        intensity="light" 
        className="max-w-4xl mx-auto p-16 text-center border border-gray-500/30"
      >
        {/* Quote */}
        <blockquote className="text-4xl md:text-5xl font-light leading-relaxed mb-12">
          "SolveXAI gave us back 40 hours per week.
          <br />
          Our team finally focuses on
          <span className="text-purple-400"> growth</span>, not admin."
        </blockquote>
        
        {/* Attribution */}
        <div className="flex items-center justify-center gap-6">
          <div className="text-6xl">👩‍💼</div>
          <div className="text-center">
            <div className="text-xl font-semibold text-white">Sarah Johnson</div>
            <div className="text-gray-400">CEO, TechStart Inc</div>
          </div>
        </div>
      </LiquidGlassCard>
    </section>
  )
}
