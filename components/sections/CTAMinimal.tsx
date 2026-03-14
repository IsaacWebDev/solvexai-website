'use client'

import Link from 'next/link'

export const CTAMinimal = () => {
  return (
    <section className="py-48 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-7xl md:text-8xl font-light mb-12">
          Ready to
          <br />
          <span className="font-semibold">Reclaim Your Time?</span>
        </h2>
        
        <p className="text-2xl text-gray-400 font-light mb-16">
          One conversation. Unlimited potential.
        </p>
        
        <Link href="/contact">
          <button className="px-16 py-6 bg-white text-black rounded-full text-xl font-medium hover:bg-gray-100 transition-all hover:scale-105">
            Book Discovery Call
          </button>
        </Link>
        
      </div>
    </section>
  )
}
