'use client'

import { FloatingOrb } from '@/components/FloatingOrb'

export const AppleHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      {/* 3D Interactive Orb - Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none z-[5]">
        <FloatingOrb />
      </div>
      
      {/* Content - Centered */}
      <div className="max-w-5xl text-center relative z-10">
        {/* Eyebrow */}
        <div className="text-purple-400 text-sm uppercase tracking-wider mb-6 animate-fade-in font-semibold">
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
        
        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
          {/* Primary CTA */}
          <button 
            className="px-16 py-6 bg-white text-black rounded-full text-xl font-semibold hover:scale-105 transition-transform shadow-2xl"
            onClick={() => {
              window.location.href = '/contact'
            }}
          >
            Book Discovery Call
          </button>
          
          {/* Secondary CTA */}
          <button 
            className="px-12 py-5 bg-white/10 text-white rounded-full text-lg font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            onClick={() => {
              window.location.href = '/templates'
            }}
          >
            Explore Templates
          </button>
        </div>
        
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
