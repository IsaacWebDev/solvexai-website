'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { Phone3D } from '@/components/3d/Phone3D'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function AIReceptionistPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative pt-40" style={{
        paddingBottom: spacing.section.vertical,
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div style={{ maxWidth: containers.full, margin: '0 auto' }}>
          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{
            marginBottom: spacing.content.gap
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-bold" style={{ 
                fontSize: typography.h1,
                marginBottom: spacing.element.margin
              }}>
                Never Miss a Customer Call Again
              </h1>
              <p className="text-gray-300 mb-8" style={{ fontSize: typography.body }}>
                AI receptionist that sounds human, works 24/7, costs 90% less
              </p>
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Book Demo Call →
                </LiquidGlassButton>
              </Link>
            </motion.div>
            
            {/* 3D Phone with Sound Waves */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Phone3D />
            </motion.div>
          </div>
          
          {/* Demo Calls */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">How It Sounds</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DemoCard title="Restaurant Reservation" duration="45 seconds" />
              <DemoCard title="Dental Appointment Booking" duration="60 seconds" />
              <DemoCard title="Service Business FAQs" duration="30 seconds" />
            </div>
          </section>
          
          {/* Features Deep Dive */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Six Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                number="1"
                title="Natural Voice"
                subtitle="Your customers won't know it's AI"
                features={[
                  'Trained on your voice or professional voice actor',
                  'Natural pauses and inflection',
                  'Handles interruptions gracefully'
                ]}
              />
              <FeatureCard
                number="2"
                title="Smart Booking"
                subtitle="Syncs with Google Calendar, Calendly, or your system"
                features={[
                  'Checks availability in real-time',
                  'Books appointments',
                  'Sends confirmation emails/SMS',
                  'Handles rescheduling'
                ]}
              />
              <FeatureCard
                number="3"
                title="Custom Personality"
                subtitle="Sounds like YOUR brand"
                features={[
                  'Friendly, professional, or casual tone',
                  'Uses your business language',
                  'Remembers repeat callers'
                ]}
              />
              <FeatureCard
                number="4"
                title="FAQ Mastery"
                subtitle="Answers 100+ questions instantly"
                features={[
                  'Hours of operation',
                  'Pricing information',
                  'Service descriptions',
                  'Directions and parking'
                ]}
              />
              <FeatureCard
                number="5"
                title="Smart Transfer"
                subtitle="Knows when to escalate to you"
                features={[
                  'Emergency detection',
                  'VIP caller recognition',
                  'Complex questions',
                  'Complaint handling'
                ]}
              />
              <FeatureCard
                number="6"
                title="Call Analytics"
                subtitle="See exactly what customers want"
                features={[
                  'Call volume by hour/day',
                  'Most asked questions',
                  'Booking conversion rate',
                  'Missed opportunity alerts'
                ]}
              />
            </div>
          </section>
          
          {/* ROI Calculator */}
          <ROICalculator />
          
          {/* Industries */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Industries We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <IndustryCard title="Medical Practices" example="Book checkup for Tuesday 3pm" />
              <IndustryCard title="Restaurants" example="Table for 4 tonight at 7?" />
              <IndustryCard title="Legal" example="Schedule consultation for divorce case" />
              <IndustryCard title="Home Services" example="Can you fix my AC tomorrow?" />
              <IndustryCard title="Fitness" example="Sign up for 6am yoga class" />
              <IndustryCard title="Salons" example="Cut and color this Friday?" />
              <IndustryCard title="Real Estate" example="Schedule property viewing" />
              <IndustryCard title="Automotive" example="Book oil change next week" />
            </div>
          </section>
          
          {/* Setup Process */}
          <LiquidGlassCard intensity="medium" className="p-12 mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Setup Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <SetupStep week="Week 1" steps={[
                  'Day 1: Kickoff call (30 min)',
                  'Day 2-3: Voice recording + FAQ collection',
                  'Day 4-5: AI training'
                ]} />
                <SetupStep week="Week 2" steps={[
                  'Day 6-8: Test calls with you',
                  'Day 9: Adjustments',
                  'Day 10: Go live!'
                ]} />
              </div>
              <div className="text-center mt-12">
                <Link href="/contact">
                  <LiquidGlassButton variant="primary" size="lg">
                    Start Setup →
                  </LiquidGlassButton>
                </Link>
              </div>
            </div>
          </LiquidGlassCard>
          
          {/* Pricing */}
          <LiquidGlassCard intensity="heavy" className="p-12">
            <h2 className="text-4xl font-bold text-center mb-12">Transparent Pricing</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Setup: $1,997 <span className="text-sm text-gray-400">(one-time)</span></h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Voice training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>FAQ programming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Calendar integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Testing & refinement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">└─</span>
                      <span>2 hours of live support</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Monthly: $297/mo</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Unlimited calls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Real-time analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Software updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">├─</span>
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">└─</span>
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-bold mb-4">Add-ons:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• SMS notifications: +$97/mo</li>
                  <li>• Multi-language: +$197/mo</li>
                  <li>• CRM integration: +$297 setup</li>
                </ul>
              </div>
              
              <div className="text-center mt-12">
                <Link href="/contact">
                  <LiquidGlassButton variant="primary" size="lg">
                    Get Started
                  </LiquidGlassButton>
                </Link>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </main>
    </>
  )
}

function DemoCard({ title, duration }: { title: string; duration: string }) {
  return (
    <LiquidGlassCard intensity="medium" className="p-6 cursor-pointer group">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{duration}</p>
        </div>
      </div>
    </LiquidGlassCard>
  )
}

function FeatureCard({ number, title, subtitle, features }: { number: string; title: string; subtitle: string; features: string[] }) {
  return (
    <LiquidGlassCard intensity="medium" className="p-6">
      <div className="text-3xl font-bold gradient-text mb-2">{number}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{subtitle}</p>
      <ul className="space-y-2 text-sm text-gray-300">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </LiquidGlassCard>
  )
}

function ROICalculator() {
  const [calls, setCalls] = useState(100)
  const [missed, setMissed] = useState(30)
  const [value, setValue] = useState(100)
  
  const monthlyLoss = calls * (missed / 100) * value
  const roi = ((monthlyLoss - 297) / 297 * 100).toFixed(0)
  const breakEven = Math.ceil(297 / (calls * (missed / 100) * value / 30))
  
  return (
    <LiquidGlassCard intensity="heavy" className="p-12 mb-24 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <h2 className="text-4xl font-bold text-center mb-4">ROI Calculator</h2>
      <p className="text-center text-gray-400 mb-12">See how much you're losing without AI</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm mb-2">Current monthly calls: <span className="font-bold">{calls}</span></label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2">Missed calls (estimate): <span className="font-bold">{missed}%</span></label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={missed}
              onChange={(e) => setMissed(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2">Average customer value: <span className="font-bold">${value}</span></label>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              step="10"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Your Monthly Loss</div>
              <div className="text-3xl font-bold text-red-400">${monthlyLoss.toFixed(0)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">AI Cost</div>
              <div className="text-3xl font-bold text-white">$297/mo</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">ROI</div>
              <div className="text-3xl font-bold gradient-text">{roi}%</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Pays for itself in {breakEven} {breakEven === 1 ? 'day' : 'days'}
          </p>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/contact">
            <LiquidGlassButton variant="secondary" size="md">
              Get Your Custom ROI Report
            </LiquidGlassButton>
          </Link>
        </div>
      </div>
    </LiquidGlassCard>
  )
}

function IndustryCard({ title, example }: { title: string; example: string }) {
  return (
    <LiquidGlassCard intensity="light" className="p-6">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">"{example}"</p>
    </LiquidGlassCard>
  )
}

function SetupStep({ week, steps }: { week: string; steps: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 gradient-text">{week}:</h3>
      <ul className="space-y-2 text-gray-300">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  )
}
