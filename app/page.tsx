'use client'

import { Navigation } from '@/components/Navigation'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { ServicesReveal } from '@/components/sections/ServicesReveal'
import { TemplateShowcaseHorizontal } from '@/components/sections/TemplateShowcaseHorizontal'
import { StatsCountUp } from '@/components/sections/StatsCountUp'
import { FinalCTAParallax } from '@/components/sections/FinalCTAParallax'

export default function HomePage() {
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
          position: 'relative'
        }}
      >
        {/* 1. Full-screen Hero with 3D */}
        <HeroImmersive />
        
        {/* 2. Services with Scroll Reveal */}
        <ServicesReveal />
        
        {/* 3. Horizontal Template Showcase */}
        <TemplateShowcaseHorizontal />
        
        {/* 4. Count-up Stats */}
        <StatsCountUp />
        
        {/* 5. Final CTA with Parallax */}
        <FinalCTAParallax />
      </main>
    </>
  )
}
