'use client'

import { useState, useEffect } from 'react'
import IntroScreen from '@/components/IntroScreen'
import { Navigation } from '@/components/Navigation'
import { AppleHero } from '@/components/sections/AppleHero'
import { LiveCounter } from '@/components/interactive/LiveCounter'
import { OutcomesSimple } from '@/components/sections/OutcomesSimple'
import { TemplateGalaxy } from '@/components/TemplateGalaxy'
import { PricingSimple } from '@/components/sections/PricingSimple'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { CTAMinimal } from '@/components/sections/CTAMinimal'
import { InteractiveGalaxyBG } from '@/components/backgrounds/InteractiveGalaxyBG'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { StickyBookCallButton } from '@/components/StickyBookCallButton'
import { AutomationScanner } from '@/components/interactive/AutomationScanner'
import dynamic from 'next/dynamic'

const GhostCursor = dynamic(() => import('@/components/effects/GhostCursor'), { ssr: false })

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  
  useEffect(() => {
    const hasVisited = localStorage.getItem('solvexai-visited')
    if (hasVisited === 'true') {
      setShowIntro(false)
    }
  }, [])
  
  const handleEnter = () => {
    localStorage.setItem('solvexai-visited', 'true')
    setFadeOut(true)
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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navigation />
      <StickyBookCallButton />
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
          <AppleHero />
          <SectionDivider />
          
          <LiveCounter />
          <SectionDivider />
          
          <OutcomesSimple />
          <SectionDivider />
          
          <AutomationScanner />
          <SectionDivider />
          
          <section className="py-20 px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 gradient-text">
                Template Showcase
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Explore our industry-specific templates in 3D
              </p>
            </div>
            <TemplateGalaxy />
          </section>
          <SectionDivider />
          
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
