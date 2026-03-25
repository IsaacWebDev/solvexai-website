import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { LiquidGlassCard } from '@/components/ui'
import { LeadQualificationForm } from '@/components/LeadQualificationForm'

export const metadata: Metadata = {
  title: 'Get a Free Quote | SolveXAI',
  description:
    'Tell us about your project and get a tailored quote within 24 hours. Websites, e-commerce, and AI automation for South African businesses.',
}

export default function QualifyPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />

      <main className="relative px-4 min-h-screen flex items-center justify-center py-32">
        <div className="max-w-3xl mx-auto w-full space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-sm font-light uppercase tracking-widest text-purple-400">
              Free Consultation
            </p>
            <h1 className="text-5xl md:text-6xl font-light leading-tight">
              Let's Scope Your Project
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-xl mx-auto">
              Answer a few quick questions and we'll send you a tailored quote within 24 hours.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <TrustPill label="Free quote" />
              <TrustPill label="Reply in 24h" />
              <TrustPill label="No hard sell" />
            </div>
          </div>

          {/* Form card */}
          <LiquidGlassCard intensity="heavy" className="p-8 md:p-12">
            <LeadQualificationForm />
          </LiquidGlassCard>

          {/* Footer note */}
          <p className="text-center text-sm text-gray-600 font-light">
            Prefer to email?{' '}
            <a
              href="mailto:hello@solvexai.org"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              hello@solvexai.org
            </a>
          </p>
        </div>
      </main>
    </>
  )
}

function TrustPill({ label }: { label: string }) {
  return (
    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 font-light">
      {label}
    </span>
  )
}
