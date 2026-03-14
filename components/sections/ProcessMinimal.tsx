'use client'

export const ProcessMinimal = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-black/20 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-24">
          <h2 className="text-6xl font-light mb-6">
            Effortless Integration
          </h2>
          <p className="text-xl text-gray-400 font-light">
            From conversation to transformation in days, not months.
          </p>
        </div>
        
        {/* 3 steps - vertical timeline */}
        <div className="space-y-24">
          
          {/* Step 1 */}
          <div className="flex gap-12 items-start group">
            <div className="text-8xl font-light text-purple-400/30 group-hover:text-purple-400/60 transition-colors">
              01
            </div>
            <div className="flex-1 pt-4">
              <h3 className="text-4xl font-light mb-4">
                Discover
              </h3>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                A single conversation reveals where AI can save you 20+ hours per week.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex gap-12 items-start group">
            <div className="text-8xl font-light text-blue-400/30 group-hover:text-blue-400/60 transition-colors">
              02
            </div>
            <div className="flex-1 pt-4">
              <h3 className="text-4xl font-light mb-4">
                Deploy
              </h3>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                We build, integrate, and launch your custom AI workforce in days.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex gap-12 items-start group">
            <div className="text-8xl font-light text-cyan-400/30 group-hover:text-cyan-400/60 transition-colors">
              03
            </div>
            <div className="flex-1 pt-4">
              <h3 className="text-4xl font-light mb-4">
                Expand
              </h3>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Scale effortlessly as your business grows. No new hires needed.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
