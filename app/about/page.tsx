'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { TeamOrbit3D } from '@/components/3d/TeamOrbit3D'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative" style={{
        paddingBottom: spacing.section.vertical,
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div style={{ maxWidth: containers.content, margin: '0 auto' }}>
          {/* Hero */}
          <motion.div 
            className="text-center"
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold" style={{ 
              fontSize: typography.h1,
              marginBottom: spacing.element.margin
            }}>
              We're on a Mission to Free Business Owners from Repetitive Work
            </h1>
            <div style={{ 
              maxWidth: containers.text,
              margin: '0 auto'
            }}>
              <LiquidGlassCard intensity="light" className="p-8">
                <p className="text-gray-300" style={{ fontSize: typography.body }}>
                  Founded 2026. Already saved 2,000+ hours for small businesses.
                </p>
              </LiquidGlassCard>
            </div>
          </motion.div>
          
          {/* 3D Team Orbit */}
          <motion.div
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <TeamOrbit3D />
          </motion.div>
          
          {/* Our Story */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-8">Our Story</h2>
            <LiquidGlassCard intensity="medium" className="p-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Most business owners spend 20+ hours/week on tasks a computer could do better. 
                We saw restaurant owners manually taking reservations, lawyers typing the same emails, 
                gyms chasing no-shows. It doesn't have to be this way.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                SolveXAI was built to give small businesses the AI automation that big companies have—without 
                the enterprise price tag.
              </p>
            </LiquidGlassCard>
          </section>
          
          {/* Our Values */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ValueCard
                title="Speed Over Perfection"
                description="Launch fast, optimize later. Every day you wait is money lost."
                icon="⚡"
              />
              <ValueCard
                title="Transparent Pricing"
                description="No hidden fees. No surprise charges. Know exactly what you pay."
                icon="💎"
              />
              <ValueCard
                title="Human Support"
                description="Real humans answer your questions. No chatbots (except the ones we build for you 😉)"
                icon="👥"
              />
              <ValueCard
                title="Results First"
                description="We only succeed if you save time and make money. Period."
                icon="🎯"
              />
            </div>
          </section>
          
          {/* Stats */}
          <LiquidGlassCard intensity="medium" className="p-12 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">127</div>
                <div className="text-sm text-gray-400">Websites Launched</div>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">2,000+</div>
                <div className="text-sm text-gray-400">Hours Saved</div>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">$2M+</div>
                <div className="text-sm text-gray-400">Revenue Generated</div>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">4.9★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </LiquidGlassCard>
          
          {/* CTA */}
          <LiquidGlassCard intensity="heavy" className="text-center p-12">
            <h2 className="text-4xl font-bold mb-6">
              Want to join the automation revolution?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Start Your Project
                </LiquidGlassButton>
              </Link>
              <Link href="/templates">
                <LiquidGlassButton variant="secondary" size="lg">
                  Browse Templates
                </LiquidGlassButton>
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </main>
    </>
  )
}

function ValueCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <LiquidGlassCard intensity="medium" className="p-8">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </LiquidGlassCard>
  )
}
