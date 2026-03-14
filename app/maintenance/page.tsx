'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

const maintenancePlans = [
  {
    name: 'Peace of Mind',
    price: 97,
    priceAnnual: 82,
    icon: '🛡️',
    gradient: 'from-purple-500/20 to-purple-600/10',
    glowColor: '#8B5CF6',
    popular: false,
    features: [
      'Security updates & patches',
      'Content changes (2 hours/month)',
      'Monthly backups',
      '24-hour response time',
      'Email support',
      'Uptime monitoring',
      'SSL certificate renewal'
    ]
  },
  {
    name: 'Growth Partner',
    price: 297,
    priceAnnual: 252,
    icon: '🚀',
    gradient: 'from-blue-500/20 to-blue-600/10',
    glowColor: '#3B82F6',
    popular: true,
    features: [
      'Everything in Peace of Mind',
      'SEO optimization',
      'A/B testing',
      'Monthly analytics report',
      'Performance monitoring',
      'Priority support (4-hour response)',
      'Content changes (5 hours/month)',
      'Conversion optimization'
    ]
  },
  {
    name: 'Full Stack',
    price: 497,
    priceAnnual: 422,
    icon: '⚡',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    glowColor: '#00F0FF',
    popular: false,
    features: [
      'Everything in Growth Partner',
      'AI receptionist included ($297/mo value)',
      'Unlimited content changes',
      'Weekly strategy calls',
      'Dedicated account manager',
      '1-hour response time',
      'Weekly analytics reports',
      'Advanced automation setup'
    ]
  }
]

const comparisonFeatures = [
  { name: 'Security Updates', peace: '✓', growth: '✓', full: '✓' },
  { name: 'Content Changes', peace: '2 hrs/mo', growth: '5 hrs/mo', full: 'Unlimited' },
  { name: 'SEO Optimization', peace: '−', growth: '✓', full: '✓' },
  { name: 'Analytics Reports', peace: '−', growth: 'Monthly', full: 'Weekly' },
  { name: 'AI Receptionist', peace: '−', growth: '−', full: '✓' },
  { name: 'Response Time', peace: '24hr', growth: '4hr', full: '1hr' },
  { name: 'Account Manager', peace: '−', growth: '−', full: '✓' },
  { name: 'Strategy Calls', peace: '−', growth: '−', full: 'Weekly' }
]

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your maintenance plan anytime with 30 days notice. No long-term commitment required.'
  },
  {
    question: 'What counts as a content change?',
    answer: 'Content changes include text updates, image replacements, adding/editing pages, form modifications, and small feature tweaks. Major redesigns or new features are quoted separately.'
  },
  {
    question: 'Do I need this if I just bought a template?',
    answer: 'Maintenance plans are recommended for business-critical websites. If your website generates leads or revenue, keeping it secure, fast, and optimized is essential. However, it\'s optional for simple brochure sites.'
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.'
  }
]

export default function MaintenancePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative" style={{
        paddingBottom: spacing.section.vertical,
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div style={{ maxWidth: containers.full, margin: '0 auto' }}>
          {/* Hero */}
          <motion.div 
            className="text-center"
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold gradient-text" style={{ 
              fontSize: typography.h1,
              marginBottom: spacing.element.margin
            }}>
              Keep Your Website Running Smoothly
            </h1>
            <p className="text-gray-300" style={{ 
              fontSize: typography.body,
              maxWidth: containers.text,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Focus on your business. We'll handle the tech.
            </p>
          </motion.div>

          {/* Bundle & Save Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: spacing.content.gap }}
          >
            <LiquidGlassCard intensity="medium" glowColor="#8B5CF6" className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">💎 Bundle & Save</h3>
              <p className="text-gray-300 text-lg">
                Buy any template + maintenance plan together and <span className="text-purple-400 font-bold">save $200</span>
              </p>
            </LiquidGlassCard>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            className="flex justify-center items-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-gray-400'}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 rounded-full transition-colors"
              style={{
                background: billingCycle === 'annual' 
                  ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)' 
                  : 'rgba(255,255,255,0.1)'
              }}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full"
                animate={{ left: billingCycle === 'annual' ? '36px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={billingCycle === 'annual' ? 'text-white font-semibold' : 'text-gray-400'}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-400 font-semibold text-sm"
              >
                Save 15%
              </motion.span>
            )}
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            {maintenancePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}
              >
                <LiquidGlassCard
                  intensity={plan.popular ? 'heavy' : 'medium'}
                  glowColor={plan.glowColor}
                  className={`p-8 h-full flex flex-col relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white"
                         style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="text-5xl mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        ${billingCycle === 'annual' ? plan.priceAnnual : plan.price}
                      </span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-green-400 mt-1">
                        Save ${(plan.price - plan.priceAnnual) * 12}/year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <span className="text-purple-400 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="block">
                    <LiquidGlassButton 
                      variant={plan.popular ? 'primary' : 'secondary'} 
                      size="lg"
                      className="w-full"
                    >
                      Start {plan.name} →
                    </LiquidGlassButton>
                  </Link>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LiquidGlassCard intensity="medium" className="p-8 mb-24 overflow-x-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-8 font-semibold">Feature</th>
                    <th className="pb-4 px-4 font-semibold">Peace of Mind</th>
                    <th className="pb-4 px-4 font-semibold">Growth Partner</th>
                    <th className="pb-4 pl-4 font-semibold">Full Stack</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 pr-8 font-medium text-white">{feature.name}</td>
                      <td className="py-4 px-4">{feature.peace}</td>
                      <td className="py-4 px-4">{feature.growth}</td>
                      <td className="py-4 pl-4">{feature.full}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </LiquidGlassCard>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-24"
          >
            <LiquidGlassCard intensity="medium" className="p-12 text-center">
              <p className="text-xl text-gray-300 mb-8">
                Join <span className="text-purple-400 font-bold">50+ businesses</span> who trust us with their websites
              </p>
              <div className="max-w-2xl mx-auto">
                <p className="text-2xl italic text-gray-200 mb-4">
                  "Haven't worried about my website in 6 months. Everything just works."
                </p>
                <p className="text-gray-400">— Sarah M., Restaurant Owner</p>
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, index) => (
                <LiquidGlassCard key={index} intensity="light" className="p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </LiquidGlassCard>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <LiquidGlassCard intensity="heavy" className="text-center p-12" glowColor="#8B5CF6">
              <h2 className="text-3xl font-bold mb-4">Not sure which plan is right for you?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Book a free 15-minute consultation and we'll help you choose the perfect fit
              </p>
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Book Free Consultation →
                </LiquidGlassButton>
              </Link>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </main>
    </>
  )
}
