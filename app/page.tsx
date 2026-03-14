'use client'

import { useState, useEffect } from 'react'
import IntroScreen from '@/components/IntroScreen'
import { Navigation } from '@/components/Navigation'
import { AppleHero } from '@/components/sections/AppleHero'
import { OutcomesSimple } from '@/components/sections/OutcomesSimple'
import { TestimonialSingle } from '@/components/sections/TestimonialSingle'
import { PricingSimple } from '@/components/sections/PricingSimple'
import { CTAMinimal } from '@/components/sections/CTAMinimal'
import { RealisticJellyfishBG } from '@/components/backgrounds/RealisticJellyfishBG'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  
  // Check localStorage for user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('solvexai-visited')
    if (hasVisited === 'true') {
      setShowIntro(false) // Skip intro for returning visitors
    }
  }, [])
  
  const handleEnter = () => {
    // Mark as visited
    localStorage.setItem('solvexai-visited', 'true')
    
    // Fade out animation
    setFadeOut(true)
    
    // Remove intro after animation
    setTimeout(() => {
      setShowIntro(false)
    }, 800)
  }
  
  if (showIntro) {
    return (
      <div style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.8s ease-out'
      }}>
        <IntroScreen onEnter={handleEnter} />
      </div>
    )
  }
  
  return (
    <>
      <Navigation />
      
      {/* Realistic Jellyfish Background (global) */}
      <RealisticJellyfishBG />
      
      {/* Main Content - Apple-Style Minimal */}
      <main 
        style={{
          width: '100%',
          maxWidth: 'none',
          margin: 0,
          padding: 0,
          position: 'relative',
          animation: 'fadeInContent 0.8s ease-in'
        }}
      >
        {/* 1. HERO - "The Outcome" with 3D Orb */}
        <AppleHero />
        
        {/* Section Divider */}
        <div className="border-b border-gray-500/20" />
        
        {/* 2. THE PROMISE - "Three Outcomes" */}
        <OutcomesSimple />
        
        {/* Section Divider */}
        <div className="border-b border-gray-500/20" />
        
        {/* 3. PACKAGES - "Three Options" */}
        <PricingSimple />
        
        {/* Section Divider */}
        <div className="border-b border-gray-500/20" />
        
        {/* 4. PROOF - "One Powerful Testimonial" */}
        <TestimonialSingle />
        
        {/* Section Divider */}
        <div className="border-b border-gray-500/20" />
        
        {/* 5. FINAL CTA - "The Invitation" */}
        <CTAMinimal />
      </main>
      
      <style>{`
        @keyframes fadeInContent {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
