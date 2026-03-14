'use client'

import Link from 'next/link'

export const PricingSimple = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-24">
          <h2 className="text-6xl font-light mb-6">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Templates for speed. Custom for precision.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Option 1: Templates */}
          <div className="border border-white/10 rounded-3xl p-12 hover:border-purple-400/50 transition-all hover:scale-105 duration-300">
            <div className="text-sm text-purple-400 uppercase tracking-wider mb-4">
              Launch Fast
            </div>
            <h3 className="text-5xl font-light mb-6">
              Templates
            </h3>
            <p className="text-xl text-gray-400 font-light mb-8 leading-relaxed">
              Industry-proven automation. Deployed in days.
            </p>
            <div className="text-6xl font-light mb-8">
              $497
            </div>
            <Link href="/templates">
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-full transition-all">
                Explore Templates
              </button>
            </Link>
          </div>
          
          {/* Option 2: Custom */}
          <div className="border border-white/10 rounded-3xl p-12 hover:border-blue-400/50 transition-all hover:scale-105 duration-300">
            <div className="text-sm text-blue-400 uppercase tracking-wider mb-4">
              Build Perfect
            </div>
            <h3 className="text-5xl font-light mb-6">
              Custom
            </h3>
            <p className="text-xl text-gray-400 font-light mb-8 leading-relaxed">
              Tailored AI workforce. Designed for your exact needs.
            </p>
            <div className="text-6xl font-light mb-8">
              $1,997
            </div>
            <Link href="/contact">
              <button className="w-full py-4 bg-white text-black hover:bg-gray-100 rounded-full transition-all">
                Start Discovery
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  )
}
