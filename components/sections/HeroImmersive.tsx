'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const FloatingOrb = dynamic(() => import('@/components/FloatingOrb').then(mod => ({ default: mod.FloatingOrb })), { 
  ssr: false,
  loading: () => (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
      zIndex: 1
    }} />
  )
})

// Shock factor effects
const ParticleExplosion = dynamic(() => import('@/components/effects/ParticleExplosion'), { ssr: false })
const CodeRain = dynamic(() => import('@/components/effects/CodeRain'), { ssr: false })
const Parallax3D = dynamic(() => import('@/components/effects/Parallax3D'), { ssr: false })
const LiquidBlob = dynamic(() => import('@/components/effects/LiquidBlob'), { ssr: false })
const MagneticCursor = dynamic(() => import('@/components/effects/MagneticCursor'), { ssr: false })

export function HeroImmersive() {
  return (
    <Parallax3D layers={3}>
      <section 
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: '100vh',
          width: '100vw',
          maxWidth: 'none',
          margin: 0,
          padding: 0,
          background: '#0a0a0a'
        }}
      >
        {/* Code Rain Background Effect */}
        <CodeRain />
        
        {/* Liquid Blob Morphing */}
        <LiquidBlob />
        
        {/* Particle Explosion on load */}
        <ParticleExplosion />
        
        {/* 3D Floating Orb Background */}
        <FloatingOrb />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            zIndex: 1
          }}
        />
      
      {/* Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          padding: '0 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <h1 
          className="font-bold leading-tight mb-6 animate-fade-in"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            background: 'linear-gradient(135deg, #fff 0%, #8B5CF6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your Business,
          <br />
          Fully Automated
        </h1>
        
        <p 
          className="mb-12 animate-fade-in"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            animationDelay: '0.1s'
          }}
        >
          We build AI systems that work 24/7 so you don't have to
        </p>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <MagneticCursor strength={0.3} distance={200}>
            <Link href="/packages">
              <button 
                className="group relative overflow-hidden rounded-full transition-all duration-500 transform hover:scale-105"
                style={{
                  padding: '1.5rem 4rem',
                  fontSize: '1.25rem',
                  background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
                }}
              >
                <span className="relative z-10">Start Automating →</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #9F7AEA, #60A5FA)',
                  }}
                />
              </button>
            </Link>
          </MagneticCursor>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm">Discover More</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
    </Parallax3D>
  )
}
