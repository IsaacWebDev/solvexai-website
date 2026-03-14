'use client'

import { useState, useEffect } from 'react'
import IntroScreen from '@/components/IntroScreen'
import { Navigation } from '@/components/Navigation'
import { AppleHero } from '@/components/sections/AppleHero'
import { OutcomesSimple } from '@/components/sections/OutcomesSimple'
import { TemplateShowcase } from '@/components/sections/TemplateShowcase'
import { TestimonialSingle } from '@/components/sections/TestimonialSingle'
import { PricingSimple } from '@/components/sections/PricingSimple'
import { CTAMinimal } from '@/components/sections/CTAMinimal'
import { RealisticJellyfishBG } from '@/components/backgrounds/RealisticJellyfishBG'
import { SectionDivider } from '@/components/ui/SectionDivider'

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
        data-no-padding
        className="flex justify-center"
        style={{
          width: '100%',
          maxWidth: 'none',
          margin: 0,
          position: 'relative',
          animation: 'fadeInContent 0.8s ease-in'
        }}
      >
        <div className="w-full max-w-[1920px]">
        {/* 1. HERO - Introduction */}
        <AppleHero />
        <SectionDivider />
        
        {/* 2. OUTCOMES - Benefits (Why choose us) */}
        <OutcomesSimple />
        <SectionDivider />
        
        {/* 3. TEMPLATES - Products to buy (NEW) */}
        <TemplateShowcase />
        <SectionDivider />
        
        {/* 4. PACKAGES - Service tiers */}
        <PricingSimple />
        <SectionDivider />
        
        {/* 5. CTA - Close */}
        <CTAMinimal />
        </div>
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
