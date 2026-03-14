'use client'

import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'

export const OutcomesSimple = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section header - Centered */}
        <div className="text-center mb-24">
          <h2 className="text-6xl font-light mb-6">
            What You Get
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Three transformations. Immediate impact.
          </p>
        </div>
        
        {/* 3 Outcomes - Centered grid with liquid glass */}
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Outcome 1 */}
          <LiquidGlassCard 
            intensity="medium" 
            className="p-12 text-center border border-gray-500/30 hover:border-purple-400/50 transition-all"
          >
            <div className="text-8xl font-light text-purple-400 mb-6">
              10×
            </div>
            <h3 className="text-3xl font-light mb-4">
              Faster
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Complete in minutes what used to take weeks.
            </p>
          </LiquidGlassCard>
          
          {/* Outcome 2 */}
          <LiquidGlassCard 
            intensity="medium" 
            className="p-12 text-center border border-gray-500/30 hover:border-blue-400/50 transition-all"
          >
            <div className="text-8xl font-light text-blue-400 mb-6">
              70%
            </div>
            <h3 className="text-3xl font-light mb-4">
              Lower Costs
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Reduce expenses while scaling output.
            </p>
          </LiquidGlassCard>
          
          {/* Outcome 3 */}
          <LiquidGlassCard 
            intensity="medium" 
            className="p-12 text-center border border-gray-500/30 hover:border-cyan-400/50 transition-all"
          >
            <div className="text-8xl font-light text-cyan-400 mb-6">
              0
            </div>
            <h3 className="text-3xl font-light mb-4">
              Human Error
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Precision execution every single time.
            </p>
          </LiquidGlassCard>
          
        </div>
      </div>
    </section>
  )
}
