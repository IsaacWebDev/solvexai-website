'use client'

export const OutcomesSimple = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section header */}
        <div className="text-center mb-24">
          <h2 className="text-6xl font-light mb-6">
            What You Get
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Three transformations. Immediate impact.
          </p>
        </div>
        
        {/* 3 outcomes (NOT features) */}
        <div className="grid md:grid-cols-3 gap-16">
          
          {/* Outcome 1 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-8xl font-light text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              10×
            </div>
            <h3 className="text-3xl font-light mb-4">
              Faster
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Complete in minutes what used to take weeks. Your AI workforce operates 24/7.
            </p>
          </div>
          
          {/* Outcome 2 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-8xl font-light text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              70%
            </div>
            <h3 className="text-3xl font-light mb-4">
              Lower Costs
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Reduce operational expenses while scaling output. No hiring, training, or overhead.
            </p>
          </div>
          
          {/* Outcome 3 */}
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="text-8xl font-light text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              0
            </div>
            <h3 className="text-3xl font-light mb-4">
              Human Error
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Precision execution every time. AI follows instructions perfectly, consistently.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
