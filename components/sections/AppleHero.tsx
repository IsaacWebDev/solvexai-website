'use client'

import { FloatingOrb } from '@/components/FloatingOrb'
import { Button } from '@/components/ui/button'

export const AppleHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-md sm:px-lg relative">
      {/* 3D Interactive Orb - Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none z-[5]">
        <FloatingOrb />
      </div>
      
      {/* Content - Centered */}
      <div className="max-w-5xl text-center relative z-10">
        {/* Eyebrow */}
        <div className="text-purple-400 text-caption uppercase tracking-wider mb-md animate-fade-in font-semibold">
          AI That Works While You Sleep
        </div>
        
        {/* Headline - MASSIVE */}
        <h1 className="text-display font-light tracking-tight mb-lg animate-fade-in-up">
          Reclaim Your
          <br />
          <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Time
          </span>
        </h1>
        
        {/* Subheadline - Outcome focused */}
        <p className="text-body-lg text-gray-400 font-light leading-normal mb-xl max-w-3xl mx-auto animate-fade-in-delay">
          Transform weeks of work into minutes.
          <br />
          Your business. Automated. Elevated.
        </p>
        
        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-md animate-fade-in-delay-2">
          {/* Primary CTA */}
          <Button 
            variant="primary"
            onClick={() => {
              window.location.href = '/contact'
            }}
          >
            Book Discovery Call
          </Button>
          
          {/* Secondary CTA */}
          <Button 
            variant="secondary"
            onClick={() => {
              window.location.href = '/templates'
            }}
          >
            Explore Templates
          </Button>
        </div>
        
        {/* Scroll indicator - Enhanced */}
        <div className="mt-2xl flex flex-col items-center gap-sm animate-bounce-slow">
          <div className="text-white text-small font-medium tracking-wide">
            Scroll to explore
          </div>
          <svg 
            className="w-6 h-6 text-purple-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
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
