'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { AudioPlayer } from '@/components/AudioPlayer'
import { PhoneMockup } from '@/components/3d/PhoneMockup'
import { GuaranteeBadge } from '@/components/GuaranteeBadge'
import { Shield, CheckCircle2, Mic, Settings, TestTube, Wrench, Rocket, TrendingUp, Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function AIReceptionistPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative flex justify-center py-[120px]" style={{
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div className="flex flex-col gap-20" style={{ maxWidth: containers.full, width: '100%' }}>
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
              
              {/* NEW: Scroll to Explore */}
              <motion.div 
                className="flex flex-col items-center mt-8 cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                }}
              >
                <span className="text-sm gradient-text font-medium">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg 
                    className="w-6 h-6 gradient-text mt-1" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* High-Quality iPhone Mockup with Sound Waves */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <PhoneMockup />
            </motion.div>
          </div>
          
          {/* Audio Demo Samples */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-center mb-4">Hear It In Action</h2>
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Listen to real AI receptionist calls. Your customers won't know it's not human.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <AudioPlayer
                  src="/audio/demo-restaurant.mp3"
                  title="Restaurant Reservation"
                  description="45-second booking call"
                />
                <AudioPlayer
                  src="/audio/demo-dental.mp3"
                  title="Dental Appointment"
                  description="60-second scheduling"
                />
                <AudioPlayer
                  src="/audio/demo-service.mp3"
                  title="Service Business FAQ"
                  description="30-second inquiry"
                />
              </div>
              
              <p className="text-center mt-8 text-sm text-gray-500">
                🎧 Note: Audio demos are simulated examples. Actual voice can be customized to your brand.
              </p>
            </motion.div>
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
          
          {/* ROI Calculator - ENHANCED */}
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
          
          {/* Setup Process - ENHANCED */}
          <LiquidGlassCard intensity="medium" className="p-12 mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Setup Process</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
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
                <div className="text-center lg:text-left mt-8">
                  <Link href="/contact">
                    <LiquidGlassButton variant="primary" size="lg">
                      Start Setup →
                    </LiquidGlassButton>
                  </Link>
                </div>
              </div>
              
              {/* Right: Visual Timeline */}
              <div className="relative">
                <div className="space-y-6">
                  <TimelineItem 
                    icon={<Mic className="w-6 h-6" />}
                    title="Voice Recording"
                    description="Capture your brand voice"
                    delay={0}
                  />
                  <TimelineItem 
                    icon={<Settings className="w-6 h-6" />}
                    title="AI Training"
                    description="Configure responses & personality"
                    delay={0.2}
                  />
                  <TimelineItem 
                    icon={<TestTube className="w-6 h-6" />}
                    title="Testing Phase"
                    description="Test calls & refinement"
                    delay={0.4}
                  />
                  <TimelineItem 
                    icon={<Wrench className="w-6 h-6" />}
                    title="Adjustments"
                    description="Fine-tune based on feedback"
                    delay={0.6}
                  />
                  <TimelineItem 
                    icon={<Rocket className="w-6 h-6" />}
                    title="Launch!"
                    description="Go live & start saving"
                    delay={0.8}
                    isLast
                  />
                </div>
              </div>
            </div>
          </LiquidGlassCard>
          
          {/* Pricing - ENHANCED */}
          <LiquidGlassCard intensity="heavy" className="p-12">
            <h2 className="text-4xl font-bold text-center mb-12">Transparent Pricing</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Pricing Breakdown */}
              <div>
                <div className="mb-8">
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
                
                <div className="mb-8">
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
                
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xl font-bold mb-4">Add-ons:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• SMS notifications: +$97/mo</li>
                    <li>• Multi-language: +$197/mo</li>
                    <li>• CRM integration: +$297 setup</li>
                  </ul>
                </div>
              </div>
              
              {/* Right: Comparison Table */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-center">Compare Your Options</h3>
                <div className="space-y-4">
                  <ComparisonRow 
                    label="Traditional Receptionist"
                    cost="$3,500/mo"
                    details="+ benefits, vacation, sick days"
                    highlight={false}
                  />
                  <ComparisonRow 
                    label="Part-Time Staff"
                    cost="$1,800/mo"
                    details="Limited hours, no nights/weekends"
                    highlight={false}
                  />
                  <ComparisonRow 
                    label="SolvexAI"
                    cost="$297/mo"
                    details="24/7, unlimited calls, never sick"
                    highlight={true}
                  />
                </div>
                
                <div className="mt-8 p-6 rounded-lg border border-purple-500/30 bg-purple-900/10">
                  <div className="flex items-start gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">You Save $3,200+/month</h4>
                      <p className="text-sm text-gray-400">That's $38,400+ per year in your pocket</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Get Started
                </LiquidGlassButton>
              </Link>
              <div className="mt-6 flex justify-center">
                <GuaranteeBadge size="lg" variant="prominent">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Shield className="w-5 h-5 text-purple-400" />
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>Try risk-free for 14 days</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#d1d5db' }}>
                    Not satisfied? Full refund, no questions asked.
                  </span>
                </GuaranteeBadge>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Inputs & Results */}
        <div>
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
            <div className="grid grid-cols-1 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Your Monthly Loss</div>
                <div className="text-4xl font-bold text-red-400">${monthlyLoss.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">AI Cost</div>
                <div className="text-3xl font-bold text-white">$297/mo</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">ROI</div>
                <div className="text-4xl font-bold gradient-text">{roi}%</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Pays for itself in {breakEven} {breakEven === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>
        
        {/* Right: Visual Chart & Features */}
        <div className="space-y-6">
          {/* Animated Savings Chart */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6 text-center">Monthly Savings Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Without AI (Lost Revenue)</span>
                  <span className="font-bold text-red-400">-${monthlyLoss.toFixed(0)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">With AI (Net Savings)</span>
                  <span className="font-bold text-green-400">+${(monthlyLoss - 297).toFixed(0)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((monthlyLoss - 297) / monthlyLoss * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Grid */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 text-center">What You Get for $297/mo</h3>
            <div className="grid grid-cols-2 gap-4">
              <FeatureItem icon={<CheckCircle2 className="w-5 h-5" />} text="Unlimited calls" />
              <FeatureItem icon={<Clock className="w-5 h-5" />} text="24/7 availability" />
              <FeatureItem icon={<TrendingUp className="w-5 h-5" />} text="Real-time analytics" />
              <FeatureItem icon={<Zap className="w-5 h-5" />} text="Zero missed calls" />
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/contact">
              <LiquidGlassButton variant="secondary" size="md">
                Get Your Custom ROI Report
              </LiquidGlassButton>
            </Link>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  )
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-purple-400">{icon}</div>
      <span className="text-sm text-gray-300">{text}</span>
    </div>
  )
}

function TimelineItem({ icon, title, description, delay, isLast = false }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
  isLast?: boolean;
}) {
  return (
    <motion.div 
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        {!isLast && (
          <div className="absolute left-6 top-12 w-0.5 h-12 bg-gradient-to-b from-purple-600 to-transparent" />
        )}
      </div>
      <div className="pt-2">
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

function ComparisonRow({ label, cost, details, highlight }: { 
  label: string; 
  cost: string; 
  details: string; 
  highlight: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg border ${
      highlight 
        ? 'border-purple-500 bg-purple-900/20' 
        : 'border-white/10 bg-white/5'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-bold ${highlight ? 'gradient-text text-lg' : ''}`}>{label}</h4>
        <span className={`font-bold ${highlight ? 'text-2xl gradient-text' : 'text-gray-300'}`}>{cost}</span>
      </div>
      <p className="text-sm text-gray-400">{details}</p>
    </div>
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
