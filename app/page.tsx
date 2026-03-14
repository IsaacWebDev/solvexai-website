'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import IntroScreen from '@/components/IntroScreen'
import { Navigation } from '@/components/Navigation'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { ServicesReveal } from '@/components/sections/ServicesReveal'
import { TemplateShowcaseHorizontal } from '@/components/sections/TemplateShowcaseHorizontal'
import { StatsCountUp } from '@/components/sections/StatsCountUp'
import { FinalCTAParallax } from '@/components/sections/FinalCTAParallax'

const DNABackground = dynamic(() => import('@/components/3d/DNABackground'), { ssr: false })

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
        
        {/* 2. Services + Stats with DNA Background (covers both sections) */}
        <div className="relative">
          <DNABackground />
          
          {/* 2a. Services with Scroll Reveal */}
          <ServicesReveal />
          
          {/* 3. Horizontal Template Showcase */}
          <TemplateShowcaseHorizontal />
          
          {/* 2b. Count-up Stats */}
          <StatsCountUp />
        </div>
        
        {/* 5. Final CTA with Parallax */}
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
