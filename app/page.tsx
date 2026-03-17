'use client'

import { useState, useEffect } from 'react'
import IntroScreen from '@/components/IntroScreen'
import { Navigation } from '@/components/Navigation'
import { AppleHero } from '@/components/sections/AppleHero'
import { LiveCounter } from '@/components/interactive/LiveCounter'
import { OutcomesSimple } from '@/components/sections/OutcomesSimple'
import { ROICalculator } from '@/components/interactive/ROICalculator'
import { WorkflowComparison } from '@/components/interactive/WorkflowComparison'
import { TemplateShowcase } from '@/components/sections/TemplateShowcase'
import { PricingSimple } from '@/components/sections/PricingSimple'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { CTAMinimal } from '@/components/sections/CTAMinimal'
import { GalaxyBackground } from '@/components/GalaxyBackground'
import { RealisticJellyfishBG } from '@/components/backgrounds/RealisticJellyfishBG'
import { InteractiveSpaceBackground } from '@/components/backgrounds/InteractiveSpaceBackground'
import { SpaceHeroBackground } from '@/components/backgrounds/SpaceHeroBackground'
import { ImmersiveJellyfishBG } from '@/components/backgrounds/ImmersiveJellyfishBG'
import { ScrollControlledJellyfish } from '@/components/backgrounds/ScrollControlledJellyfish'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { StickyBookCallButton } from '@/components/StickyBookCallButton'
import dynamic from 'next/dynamic'

const GhostCursor = dynamic(() => import('@/components/effects/GhostCursor'), { ssr: false })

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
      <StickyBookCallButton />
      
      {/* Scroll-Controlled Jellyfish Background (global) */}
      <ScrollControlledJellyfish />
      
      {/* Ghost Cursor Effect */}
      <GhostCursor
        color="#8B5CF6"
        brightness={2}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />
      
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
        <div className="w-full max-w-[1920px] flex flex-col gap-20">
        {/* 1. HERO - Introduction */}
        <AppleHero />
        <SectionDivider />
        
        {/* 2. LIVE COUNTER - Social proof */}
        <LiveCounter />
        <SectionDivider />
        
        {/* 3. OUTCOMES - Benefits (Why choose us) */}
        <OutcomesSimple />
        <SectionDivider />
        
        {/* 4. ROI CALCULATOR - Interactive engagement */}
        <ROICalculator />
        <SectionDivider />
        
        {/* 5. WORKFLOW COMPARISON - Before/After */}
        <WorkflowComparison />
        <SectionDivider />
        
        {/* 6. TEMPLATES - Products to buy */}
        <TemplateShowcase />
        <SectionDivider />
        
        {/* 7. PACKAGES - Service tiers */}
        <PricingSimple />
        <SectionDivider />
        
        {/* 8. COMPARISON TABLE - Why SolveXAI */}
        <ComparisonTable />
        <SectionDivider />
        
        {/* 9. CTA - Close */}
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
