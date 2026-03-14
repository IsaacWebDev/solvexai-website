'use client'

export const TestimonialSingle = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        
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
          <div className="text-left">
            <div className="text-xl font-medium">Sarah Johnson</div>
            <div className="text-gray-400">CEO, TechStart Inc</div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
