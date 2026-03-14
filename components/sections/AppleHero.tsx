'use client'

import { FloatingOrb } from '@/components/FloatingOrb'

export const AppleHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      {/* 3D Interactive Orb - Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <FloatingOrb />
      </div>
      
      {/* Content - Centered */}
      <div className="max-w-5xl text-center relative z-10">
        {/* Eyebrow */}
        <div className="text-purple-400 text-sm uppercase tracking-wider mb-6 animate-fade-in">
          AI That Works While You Sleep
        </div>
        
        {/* Headline - MASSIVE */}
        <h1 className="text-7xl md:text-9xl font-light tracking-tight mb-8 animate-fade-in-up">
          Reclaim Your
          <br />
          <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Time
          </span>
        </h1>
        
        {/* Subheadline - Outcome focused */}
        <p className="text-2xl md:text-3xl text-gray-400 font-light leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-delay">
          Transform weeks of work into minutes.
          <br />
          Your business. Automated. Elevated.
        </p>
        
        {/* Single CTA */}
        <button 
          className="px-12 py-5 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-all hover:scale-105 animate-fade-in-delay-2"
          onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          See How It Works
        </button>
        
        {/* Scroll indicator */}
        <div className="mt-24 text-gray-600 text-sm animate-bounce-slow">
          ↓ Scroll to explore
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out 0.2s both;
        }
        .animate-fade-in-delay {
          animation: fade-in-up 1.2s ease-out 0.4s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in-up 1.2s ease-out 0.6s both;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
