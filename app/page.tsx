'use client'

import { useState, useEffect } from 'react'
import IntroScreen from '@/components/IntroScreen'
import { CinematicEntrance } from '@/components/CinematicEntrance'
import { Navigation } from '@/components/Navigation'
import { MobileCTA } from '@/components/MobileCTA'
import { AppleHero } from '@/components/sections/AppleHero'
import { LiveCounter } from '@/components/interactive/LiveCounter'
import { OutcomesSimple } from '@/components/sections/OutcomesSimple'
import { PricingSimple } from '@/components/sections/PricingSimple'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { CTAMinimal } from '@/components/sections/CTAMinimal'
import { InteractiveGalaxyBG } from '@/components/backgrounds/InteractiveGalaxyBG'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { AutomationScanner } from '@/components/interactive/AutomationScanner'
import dynamic from 'next/dynamic'

// Dynamic imports for heavy components
const GhostCursor = dynamic(() => import('@/components/effects/GhostCursor'), { ssr: false })
const TemplateGalaxy = dynamic(() => import('@/components/TemplateGalaxy').then(mod => mod.TemplateGalaxy), {
  loading: () => (
    <div className="h-[500px] bg-gray-900/30 animate-pulse rounded-lg flex items-center justify-center" role="status" aria-label="Loading templates">
      <span className="text-gray-400">Loading templates...</span>
    </div>
  ),
  ssr: false,
})

export default function HomePage() {
  const [showCinematic, setShowCinematic] = useState(true)
  
  useEffect(() => {
    const hasVisited = localStorage.getItem('solvexai-visited')
    if (hasVisited === 'true') {
      setShowCinematic(false)
    }
  }, [])
  
  const handleCinematicComplete = () => {
    localStorage.setItem('solvexai-visited', 'true')
    setShowCinematic(false)
  }
  
  if (showCinematic) {
    return (
      <CinematicEntrance
        onComplete={handleCinematicComplete}
        gateImageUrl="/images/galaxy-bg-optimized.webp"
        videoUrl="/backgrounds/neural-network.mp4"
      />
    )
  }
  
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navigation />
      <MobileCTA />
      <InteractiveGalaxyBG />
      
      <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <GhostCursor
          color="#60A5FA"
          brightness={3}
          edgeIntensity={0}
          trailLength={60}
          inertia={0.6}
          grainIntensity={0.03}
          bloomStrength={0.3}
          bloomRadius={1.5}
          bloomThreshold={0.015}
          fadeDelayMs={800}
          fadeDurationMs={2000}
          mixBlendMode="screen"
        />
      </div>
      
      <main 
        id="main-content"
        role="main"
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
        <div className="w-full max-w-container-max flex flex-col gap-2xl">
          <section aria-labelledby="hero-heading">
            <AppleHero />
          </section>
          <SectionDivider />
          
          <LiveCounter />
          <SectionDivider />
          
          <OutcomesSimple />
          <SectionDivider />
          
          <AutomationScanner />
          <SectionDivider />
          
          <section className="pt-xl px-md sm:px-lg relative z-10" style={{ paddingBottom: 0, marginBottom: '-8rem' }}>
            <div className="text-center mb-md">
              <div className="inline-block">
                <h2 className="text-title font-bold gradient-text">
                  Template Showcase
                </h2>
                <p className="text-gray-400 text-body mt-sm">
                  Explore our industry-specific templates in 3D
                </p>
              </div>
            </div>
            <TemplateGalaxy />
          </section>
          
          <PricingSimple />
          <SectionDivider />
          
          <ComparisonTable />
          <SectionDivider />
          
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
    </div>
  )
}
