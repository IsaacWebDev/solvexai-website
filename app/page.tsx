'use client'

import { useState, useEffect } from 'react'
import IntroScreen from '@/components/IntroScreen'
import { Navigation } from '@/components/Navigation'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { ServicesReveal } from '@/components/sections/ServicesReveal'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { HowItWorksExpanded } from '@/components/sections/HowItWorksExpanded'
import { UseCasesGrid } from '@/components/sections/UseCasesGrid'
import { TemplateShowcaseHorizontal } from '@/components/sections/TemplateShowcaseHorizontal'
import { StatsCountUp } from '@/components/sections/StatsCountUp'
import { TestimonialsGrid } from '@/components/sections/TestimonialsGrid'
import { FeaturesComparison } from '@/components/sections/FeaturesComparison'
import { FinalCTAParallax } from '@/components/sections/FinalCTAParallax'
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
      
      {/* Main Content - No restrictive containers */}
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
        {/* 1. Full-screen Hero with 3D */}
        <HeroImmersive />
        
        {/* Realistic Jellyfish Background (global) */}
        <RealisticJellyfishBG />
        
        {/* Content sections */}
        <div className="relative">
          {/* Services (NOW 6 boxes) */}
          <ServicesReveal />
          
          {/* Benefits Grid (NEW - 6 boxes) */}
          <BenefitsGrid />
          
          {/* How It Works (NEW - 6 steps) */}
          <HowItWorksExpanded />
          
          {/* Use Cases (NEW - 8 boxes) */}
          <UseCasesGrid />
          
          {/* Template Showcase */}
          <TemplateShowcaseHorizontal />
          
          {/* Stats */}
          <StatsCountUp />
          
          {/* Testimonials (NEW - 6 boxes) */}
          <TestimonialsGrid />
          
          {/* Features Comparison (NEW - 12 features) */}
          <FeaturesComparison />
        </div>
        
        {/* Ready to Automate Your Business? (separate, uses own LED jellyfish) */}
        <FinalCTAParallax />
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
