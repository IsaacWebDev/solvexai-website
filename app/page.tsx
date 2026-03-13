'use client'

import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { Hero } from '@/components/sections/Hero'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { TemplateShowcase } from '@/components/sections/TemplateShowcase'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { SocialProof } from '@/components/sections/SocialProof'
import { PricingClarity } from '@/components/sections/PricingClarity'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navigation />
      
      {/* Animated Gradient Mesh Background */}
      <AnimatedGradientMesh />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <ValueProposition />
        <TemplateShowcase />
        <HowItWorks />
        <SocialProof />
        <PricingClarity />
        <FinalCTA />
      </main>
    </>
  )
}
