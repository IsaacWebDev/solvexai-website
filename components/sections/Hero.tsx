'use client'

import React from 'react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Main Headline */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Your Business, Fully Automated
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          We build AI systems that work 24/7 so you don't have to
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Stat value="20+" label="Hours Saved" />
          <Stat value="$10K+" label="Revenue Generated" />
          <Stat value="24/7" label="Automation" />
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/templates">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/50">
              See Our Templates
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg glass-card hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Book Free Consultation
            </button>
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="pt-16 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">See what we can do for you</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">{value}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  )
}
