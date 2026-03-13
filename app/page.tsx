'use client'

import { Navigation } from '@/components/Navigation'
import { DiagonalDNAHelix } from '@/components/DiagonalDNAHelix'
import { InteractiveParticles } from '@/components/InteractiveParticles'
import { Hero } from '@/components/sections/Hero'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { SocialProof } from '@/components/sections/SocialProof'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navigation />
      
      {/* Diagonal DNA Background (z-2) */}
      <DiagonalDNAHelix />
      
      {/* Interactive Particles (z-1) */}
      <InteractiveParticles />
      
      {/* Main Content (z-10) */}
      <main className="relative z-10" style={{ background: 'black' }}>
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <ServicesPreview />
        <SocialProof />
        <FinalCTA />
      </main>
    </>
  )
}
